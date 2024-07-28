import { BotMessageSquare, DatabaseZap, ScrollText } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl/none">How it works</h2>
      <ol className="mx-auto flex max-w-[700px] list-decimal flex-col gap-4 md:text-xl">
        <li className="flex items-center gap-3">
          <ScrollText className="h-6 w-6" />
          <span>
            New bills are added nightly from&nbsp;
            <a
              href="https://www.govinfo.gov/app/collection/bills"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              govinfo.gov
            </a>
            &nbsp;using&nbsp;
            <a href="https://vercel.com/docs/cron-jobs" className="underline" target="_blank" rel="noopener noreferrer">
              Vercel Cron
            </a>
          </span>
        </li>
        <li className="flex items-center gap-3">
          <DatabaseZap className="h-6 w-6" />
          <span>
            Bills are downloaded, vectorized, and stored in a&nbsp;
            <a href="https://supabase.com/" className="underline" target="_blank" rel="noopener noreferrer">
              Supabase
            </a>
            &nbsp;database
          </span>
        </li>
        <li className="flex items-center gap-3">
          <BotMessageSquare className="h-6 w-6" />
          <span>
            Users can chat with bills using&nbsp;
            <a
              href="https://en.wikipedia.org/wiki/Natural_language_processing"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              NLP
            </a>
            ,&nbsp;
            <a
              href="https://en.wikipedia.org/wiki/Retrieval-augmented_generation"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              RAG
            </a>
            &nbsp;and&nbsp;
            <a href="https://openai.com/" className="underline" target="_blank" rel="noopener noreferrer">
              OpenAI
            </a>
          </span>
        </li>
      </ol>
    </div>
  );
}
