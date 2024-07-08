import type { Message } from "ai/react";
import { MemoizedReactMarkdown } from "./Markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Props = {
  message: Message;
  sources: any[];
};

export function ChatMessage({ message, sources }: Props) {
  const distinctSources = Array.from(
    new Set(sources?.map((source) => source.metadata.title)),
  );

  const alignmentClassName = message.role === "user" ? "ml-auto" : "mr-auto";
  const colorClassNames =
    message.role === "user"
      ? "bg-primary text-primary-foreground"
      : "bg-secondary text-secondary-foreground";

  return (
    <div
      className={`${alignmentClassName} ${colorClassNames} rounded px-4 py-2 max-w-[80%] mb-8 flex flex-col gap-4`}
    >
      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
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
        <div>
          <h2>🔍 Sources:</h2>
          <ul>
            {distinctSources.map((title, i) => {
              const source = sources.find(
                (source) => source.metadata.title === title,
              );
              return (
                <li key={i}>
                  <a
                    href={source.metadata.link}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {source.metadata.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
