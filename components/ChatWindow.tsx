"use client";

import { Message, useChat } from "ai/react";
import { useState } from "react";
import type { FormEvent } from "react";

import { ChatMessage } from "@/components/ChatMessage";
import ChatMessageForm from "./ChatMessageForm";
import { Card, CardHeader, CardDescription } from "./ui/card";
import { createChat } from "@/app/chat/[id]/actions";
import { createClient } from "@/supabase/client";
import { randomUUID as generateId } from "crypto";

type Props = {
  chatId?: string;
  initialMessages?: Message[];
};

export function ChatWindow({ chatId, initialMessages }: Props) {
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading: chatEndpointIsLoading,
  } = useChat({
    api: "/chat/completions",
    initialMessages,
    generateId,
    onFinish(message) {
      console.log("onFinish", message);
      // if (!chatId) return;

      // const client = createClient();
      // return client.from("chat_messages").insert({
      //   chat_id: chatId,
      //   content: message.content,
      //   role: message.role,
      //   id: message.id,
      // });
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
    streamMode: "text",
  });

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (chatEndpointIsLoading) return;

    handleSubmit(e);
  }

  async function initializeNewChat() {
    await createChat(input);
  }

  const prompts = [
    "Summarize a random bill",
    "What is the legislative process",
    "Tell me about an environmental bill",
    "Who introduced the last bill",
    "When was your last bill passed",
    "Quiz me on recent legislation",
  ];

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
                <form key={prompt} onSubmit={initializeNewChat}>
                  <button type="submit" onClick={() => setInput(prompt)}>
                    <Card className="max-w-[200px] cursor-pointer hover:border-primary transition-colors duration-200 ease-in-out">
                      <CardHeader>
                        <CardDescription>{prompt}</CardDescription>
                      </CardHeader>
                    </Card>
                  </button>
                </form>
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
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
