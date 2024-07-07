import type { Message } from "ai/react";

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
      className={`${alignmentClassName} ${colorClassNames} rounded px-4 py-2 max-w-[80%] mb-8 flex flex-col`}
    >
      <span>{message.content}</span>
      {distinctSources?.length > 0 && (
        <>
          <br />
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
        </>
      )}
    </div>
  );
}
