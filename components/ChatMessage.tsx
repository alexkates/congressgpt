import type { Message } from "ai/react";
import { MemoizedReactMarkdown } from "./Markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Props = {
  message: Message;
  sources?: any[];
};

export function ChatMessage({ message, sources }: Props) {
  const distinctSources = Array.from(new Set(sources?.map((source) => source.metadata.title)));

  const alignmentClassName = message.role === "user" ? "ml-auto" : "mr-auto";
  const colorClassNames =
    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground";

  return (
    <div className={`${alignmentClassName} ${colorClassNames} mb-8 flex max-w-[80%] flex-col gap-4 rounded px-4 py-2`}>
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
      {distinctSources?.length > 0 && (
        <ul>
          {distinctSources.map((title, i) => {
            const source = sources?.find((source) => source.metadata.title === title);
            return (
              <li key={i}>
                <a
                  href={source.metadata.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground underline"
                >
                  {source.metadata.title}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
