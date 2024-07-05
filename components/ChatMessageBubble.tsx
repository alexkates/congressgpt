import type { Message } from "ai/react";

export function ChatMessageBubble(props: { message: Message; sources: any[] }) {
  const colorClassName =
    props.message.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto";
  const prefix = props.message.role === "user" ? "🧑" : "🤖";
  const distinctSources = Array.from(
    new Set(props.sources?.map((source) => source.metadata.title)),
  );

  return (
    <div
      className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8 flex`}
    >
      <div className="mr-2">{prefix}</div>
      <div className="whitespace-pre-wrap flex flex-col">
        <span>{props.message.content}</span>
        {distinctSources && distinctSources.length ? (
          <>
            <br />
            <h2>🔍 Sources:</h2>
            <ul>
              {distinctSources.map((title, i) => {
                const source = props.sources.find(
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
