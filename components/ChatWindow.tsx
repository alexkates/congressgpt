"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

import { ChatMessage } from "@/components/ChatMessage";
import ChatMessageForm from "./ChatMessageForm";
import { Card, CardHeader, CardDescription } from "./ui/card";
import { v4 as generateId } from "uuid";
import { usePathname, useRouter } from "next/navigation";
import { createChat } from "@/actions/create-chat";
import { createChatMessage } from "@/actions/create-chat-message";

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
  const [sourcesForMessages, setSourcesForMessages] = useState<SourcesByMessageIndex>(() => {
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
    streamMode: "text",
    async onFinish(message) {
      console.log("form onFinish: Source for message", sourcesForMessages);
      if (!chatId) {
        const chat = await createChat(message.content);
        chatId = chat.id;
      }

      const sources = sourcesForMessages[messages?.length - 1];

      await createChatMessage({ chatId, sources, message });

      if (pathname !== `/chat/${chatId}`) router.push(`/chat/${chatId}`);
    },
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8")) : [];
      const messageIndexHeader = response.headers.get("x-message-index");

      console.log(`From onResponse: Sources for message ${messageIndexHeader}`, sources);

      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current)
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={"flex min-h-screen flex-col"}>
      {messages?.length === 0 ? (
        <div className="container flex grow flex-col justify-center gap-4">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">Welcome to CongressGPT</h2>
            <p>
              Finally understand what Congress is <span className="bold italic">actually</span> doing
            </p>
          </div>
          <div className="grid place-items-center gap-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={async () => {
                    if (!chatId) {
                      const chat = await createChat(prompt);
                      chatId = chat.id;
                    }

                    await createChatMessage({
                      chatId,
                      message: {
                        content: prompt,
                        role: "user",
                        id: generateId(),
                      },
                    });

                    await append({
                      content: prompt,
                      role: "user",
                    });
                  }}
                >
                  <Card className="max-w-[200px] cursor-pointer transition-colors duration-200 ease-in-out hover:border-primary">
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
        <div className="flex h-40 grow flex-col gap-4 overflow-y-auto p-4" ref={messagesContainerRef}>
          {messages.map((message, i) => (
            <ChatMessage key={i} message={message} sources={sourcesForMessages?.[i]} />
          ))}
        </div>
      )}

      <div className="sticky bottom-0 z-10 bg-background p-4">
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

            await createChatMessage({
              chatId,
              message: {
                content: input,
                role: "user",
                id: generateId(),
              },
            });

            handleSubmit(e);
          }}
        />
      </div>
    </div>
  );
}
