"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import ChatMessageForm from "./ChatMessageForm";

export function ChatWindow() {
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
  } = useChat({
    api: "api/chat",
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

  return (
    <div className={"flex flex-col min-h-screen"}>
      <div className="grow p-4 overflow-y-auto">
        <div className="h-4" />
        <div className="flex flex-col space-y-4 grow">
          {messages.map((message, i) => (
            <ChatMessageBubble
              key={i}
              message={message}
              sources={sourcesForMessages[i]}
            />
          ))}
        </div>
      </div>
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
