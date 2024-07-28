"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

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

const prompts = [
  "Summarize a random bill",
  "When was the last bill",
  "Explain the bill process",
  "Tell me about an env bill",
  "Who wrote the last bill",
  "Quiz me on recent bills",
];

export function ChatWindow({ chatId, initialMessages }: Props) {
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
      if (!chatId) {
        const chat = await createChat(message.content);
        chatId = chat.id;
      }

      await createChatMessage({ chatId, message });

      if (pathname !== `/chat/${chatId}`) router.push(`/chat/${chatId}`);
    },
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current)
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex min-h-screen flex-col">
      {messages?.length === 0 ? (
        <div className="container flex grow flex-col justify-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl font-semibold">Welcome to CongressGPT</h2>
            <p className="md:text-md text-sm tracking-tighter md:tracking-normal">
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
                  <Card className="max-w-[300px] cursor-pointer transition-colors duration-200 ease-in-out hover:border-primary">
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
            <ChatMessage key={i} message={message} />
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
