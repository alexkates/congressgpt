import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createClient } from "@supabase/supabase-js";

export default async function createBill(text: string) {
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
    chunkSize: 256,
    chunkOverlap: 20,
  });

  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PRIVATE_KEY!,
  );

  const splitDocuments = await splitter.createDocuments([text]);

  await SupabaseVectorStore.fromDocuments(
    splitDocuments,
    new OpenAIEmbeddings(),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    },
  );
}
