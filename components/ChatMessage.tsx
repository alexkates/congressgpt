import type { Message } from "ai/react";
import { MemoizedReactMarkdown } from "./Markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Props = {
  message: Message;
};

export function ChatMessage({ message }: Props) {
  const alignmentClassName = message.role === "user" ? "ml-auto" : "mr-auto";
  const colorClassNames =
    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground";

  const borderRoundedClassNames = message.role === "user" ? "rounded-br-none" : "rounded-bl-none";

  return (
    <div
      className={`${alignmentClassName} ${colorClassNames} ${borderRoundedClassNames} relative mb-8 flex max-w-[80%] flex-col gap-4 rounded-xl px-4 py-2`}
    >
      <MemoizedReactMarkdown
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>;
          },
        }}
      >
        {message.content}
      </MemoizedReactMarkdown>
    </div>
  );
}
