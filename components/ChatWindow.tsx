"use client";

import { useChat } from "ai/react";
import { useRef, useState, ReactElement } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import ChatMessageForm from "./ChatMessageForm";

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactElement;
  placeholder?: string;
  titleText?: string;
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const { endpoint, emptyStateComponent, titleText = "An LLM" } = props;

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: endpoint,
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
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading) {
      return;
    }
    handleSubmit(e);
  }

  return (
    <div className={"flex flex-col min-h-screen"}>
      {/* <h2 className={`${messages.length > 0 ? "" : "hidden"} text-2xl`}>
        {titleText}
      </h2>
      {messages.length === 0 ? emptyStateComponent : ""}
      <div
        className="flex flex-col-reverse w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out"
        ref={messageContainerRef}
      >
        {messages.length > 0
          ? [...messages].reverse().map((m, i) => {
              const sourceKey = (messages.length - 1 - i).toString();
              return (
                <ChatMessageBubble
                  key={m.id}
                  message={m}
                  sources={sourcesForMessages[sourceKey]}
                />
              );
            })
          : ""}
      </div> */}
      <div className="grow p-4 overflow-y-auto">
        {Array.from({ length: 100 }).map((_, i) => (
          <ChatMessageBubble
            key={i}
            message={{
              id: i.toString(),
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet ",
              role: i % 2 === 0 ? "user" : "system",
            }}
            sources={[]}
          />
        ))}
      </div>
      <div className="sticky bottom-0 p-4 z-10 bg-white">
        <ChatMessageForm
          handleInputChange={handleInputChange}
          input={input}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
