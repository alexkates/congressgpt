"use client";

import { Message, useChat } from "ai/react";
import { useState } from "react";

import { ChatMessage } from "@/components/ChatMessage";
import ChatMessageForm from "./ChatMessageForm";
import { Card, CardHeader, CardDescription } from "./ui/card";
import { createClient } from "@/supabase/client";
import { v4 as generateId } from "uuid";
import { useRouter } from "next/navigation";

type Props = {
  chatId?: string;
  initialMessages?: Message[];
};

type SourceForMessage = Record<string, any>;

const prompts = [
  "Summarize a random bill",
  "What is the legislative process",
  "Tell me about an environmental bill",
  "Who introduced the last bill",
  "When was your last bill passed",
  "Quiz me on recent legislation",
];

export function ChatWindow({ chatId, initialMessages }: Props) {
  const [sourcesForMessages, setSourcesForMessages] =
    useState<SourceForMessage>({});

  const router = useRouter();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading: chatEndpointIsLoading,
  } = useChat({
    api: "/chat/completions",
    initialMessages,
    generateId,
    streamMode: "text",
    async onFinish(message) {
      await saveChatMessage(message);
    },

    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
  });

  return (
    <div className={"flex flex-col min-h-screen"}>
      {messages?.length === 0 ? (
        <div className="flex flex-col grow items-center justify-center p-4">
          <div className="grid place-items-center gap-4">
            <h2 className="text-2xl font-semibold">Get started</h2>
            <p className="text-primary">
              Try one of the prompts below to get started.
            </p>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => append({ content: prompt, role: "user" })}
                >
                  <Card className="max-w-[200px] cursor-pointer hover:border-primary transition-colors duration-200 ease-in-out">
                    <CardHeader>
                      <CardDescription>{prompt}</CardDescription>
                    </CardHeader>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grow overflow-y-auto">
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message, i) => (
              <ChatMessage
                key={i}
                message={message}
                sources={sourcesForMessages[i]}
              />
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 p-4 z-10 bg-background">
        <ChatMessageForm
          handleInputChange={handleInputChange}
          input={input}
          sendMessage={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (chatEndpointIsLoading) return;

            saveChatMessage({
              content: input,
              role: "user",
              id: generateId(),
            });

            handleSubmit(e);
          }}
        />
      </div>
    </div>
  );

  async function saveChatMessage(message: Message) {
    const client = createClient();

    if (!chatId) {
      const { data: userData, error: getUserError } =
        await client.auth.getUser();
      if (getUserError) throw getUserError;

      const { data: chatInsertResults, error: createChatError } = await client
        .from("chats")
        .insert({
          user_id: userData.user.id,
          name: new Date().toLocaleString(),
        })
        .select();
      if (createChatError) throw createChatError;
      const newChat = chatInsertResults[0];

      const { error: createChatMessageError } = await client
        .from("chat_messages")
        .insert({
          chat_id: newChat.id,
          content: message.content,
          role: message.role,
          sources: sourcesForMessages[messages.length - 1],
        });
      if (createChatMessageError) throw createChatMessageError;

      router.push(`/chat/${newChat.id}`);
    } else {
      const { error: createChatMessageError } = await client
        .from("chat_messages")
        .insert({
          chat_id: chatId,
          content: message.content,
          role: message.role,
          sources: sourcesForMessages[messages.length - 1],
        });
      if (createChatMessageError) throw createChatMessageError;
    }
  }
}
