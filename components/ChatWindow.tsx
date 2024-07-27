"use client";

import { Message, useChat } from "ai/react";
import { useState } from "react";

import { ChatMessage } from "@/components/ChatMessage";
import ChatMessageForm from "./ChatMessageForm";
import { Card, CardHeader, CardDescription } from "./ui/card";
import { createClient } from "@/supabase/client";
import { v4 as generateId } from "uuid";
import { usePathname, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {
  chatId?: string;
  initialMessages?: any[];
};

type SourcesByMessageIndex = Record<string, any>;

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
    useState<SourcesByMessageIndex>(() => {
      const initialSources: SourcesByMessageIndex = {};

      initialMessages?.forEach((message, i) => {
        if (message.sources) {
          initialSources[i] = message.sources;
        }
      });

      return initialSources;
    });

  const router = useRouter();
  const pathname = usePathname();

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
      if (!chatId) {
        const chat = await createChat(message.content);
        chatId = chat.id;
      }

      await createChatMessage(chatId, message);

      if (pathname !== `/chat/${chatId}`) {
        router.push(`/chat/${chatId}`);
      }
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
        <div className="flex flex-col grow justify-center container gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Get started</h2>
            <p className="text-primary">
              Try one of the prompts below to get started.
            </p>
          </div>
          <div className="grid place-items-center gap-4">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={async () => {
                    if (!chatId) {
                      const chat = await createChat(prompt);
                      chatId = chat.id;
                    }
                    await createChatMessage(chatId, {
                      content: prompt,
                      role: "user",
                      id: generateId(),
                    });

                    await append({
                      content: prompt,
                      role: "user",
                    });
                  }}
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
                sources={sourcesForMessages?.[i]}
              />
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 p-4 z-10 bg-background">
        <ChatMessageForm
          handleInputChange={handleInputChange}
          input={input}
          sendMessage={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (chatEndpointIsLoading) return;

            if (!chatId) {
              const chat = await createChat(input);
              chatId = chat.id;
            }

            await createChatMessage(chatId, {
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

  async function createChat(title: string) {
    const client = createClient();

    const { data, error: getUserError } = await client.auth.getUser();
    if (getUserError) throw getUserError;

    const { user } = data;

    const { data: chat, error: createChatError } = await client
      .from("chats")
      .insert({
        id: generateId(),
        user_id: user.id,
        name: title,
      })
      .select();

    if (createChatError) throw createChatError;

    return chat[0];
  }

  async function createChatMessage(chatId: string, message: Message) {
    const client = createClient();

    const sources =
      message.role === "assistant"
        ? sourcesForMessages[messages?.length - 1]
        : undefined;

    const { error: createChatMessageError } = await client
      .from("chat_messages")
      .insert({
        chat_id: chatId,
        content: message.content,
        role: message.role,
        sources,
      });

    if (createChatMessageError) throw createChatMessageError;
  }
}
