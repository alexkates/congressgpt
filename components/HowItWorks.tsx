export default function HowItWorks() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl/none">How it works</h2>
      <ol className="mx-auto flex max-w-[700px] list-decimal flex-col gap-6 text-muted-foreground md:text-xl">
        <li className="flex items-center gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
            1
          </span>
          <span>
            New bills are found nightly using&nbsp;
            <a
              href="https://www.govinfo.gov/app/collection/bills"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              govinfo.gov
            </a>
            &nbsp;and&nbsp;
            <a href="https://vercel.com/docs/cron-jobs" className="underline" target="_blank" rel="noopener noreferrer">
              Vercel Cron
            </a>
          </span>
        </li>
        <li className="flex items-center gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
            2
          </span>
          <span>
            Bills are downloaded, vectorized, and stored in a&nbsp;
            <a href="https://supabase.com/" className="underline" target="_blank" rel="noopener noreferrer">
              Supabase
            </a>
            &nbsp;database
          </span>
        </li>
        <li className="flex items-center gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
            3
          </span>
          <span>
            Users can chat with bills using&nbsp;
            <a
              href="https://supabase.com/docs/guides/ai/rag-with-permissions"
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
