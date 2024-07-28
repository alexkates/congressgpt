import { BillsFeed } from "@/types/BillsFeed";
import { createClient } from "@supabase/supabase-js";
import { Document } from "@langchain/core/documents";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import * as cheerio from "cheerio";
import * as entities from "entities";
import Parser from "rss-parser";

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`)
    return new Response(null, { status: 401 });

  const parser = new Parser();
  const feed = (await parser.parseURL(
    "https://www.govinfo.gov/rss/bills.xml",
  )) as BillsFeed;

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PRIVATE_KEY!,
  );

  const processedIds = new Set<string>();
  const skippedIds = new Set<string>();
  const documents: Document<Record<string, any>>[] = [];

  for (const item of feed.items) {
    try {
      // const textIds = ["BILLS-113s1447rs", "BILLS-118hr8446ih"];
      // if (!textIds.includes(item.guid)) continue; // Useful for testing just one item

      // if (processedIds.size > 5) {
      //   console.log("Processed 5 items, stopping");
      //   break;
      // }

      console.log("Processing", item.guid);
      const alreadyExists = await client
        .from("documents")
        .select("metadata->billId", { head: true, count: "exact" })
        .eq("metadata->>billId", item.guid);

      if (Boolean(alreadyExists.count)) {
        skippedIds.add(item.guid);
        continue;
      }

      const regex = /https:\/\/[^\s]+\.htm/g;
      const matches = item.content.match(regex);
      if (!matches) continue;

      const [link] = matches;
      const response = await fetch(link);
      const html = await response.text();

      const $ = cheerio.load(html);
      const rawText = $("body > pre").text();

      const text = rawText
        .replace("<all>", "")
        .replace("<DOC>", "")
        .replace(/\n{3,}/g, "\n")
        .replace(/_{3,}/g, "")
        .trim();

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 400,
      });

      const metadata = {
        billId: item.guid,
        categories: item.categories,
        createdAt: new Date().toISOString(),
        link,
        publishedAt: item.isoDate,
        title: entities.decodeHTML(item.title),
      };
      const splitDocuments = await splitter.createDocuments([text], [metadata]);
      documents.push(...splitDocuments);
      processedIds.add(item.guid);
    } catch (e) {
      console.log(`Error processing ${item.guid}: ${(e as Error).message}`);
      skippedIds.add(item.guid);
    }
  }

  await SupabaseVectorStore.fromDocuments(documents, new OpenAIEmbeddings(), {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });

  if (processedIds.size > 0)
    console.log(
      `Processed the following IDs: ${Array.from(processedIds).join(", ")}`,
    );

  if (skippedIds.size > 0)
    console.log(
      `Skipped the following IDs: ${Array.from(skippedIds).join(", ")}`,
    );

  if (processedIds.size > 0)
    return NextResponse.json(
      { ok: true, count: processedIds.size },
      { status: 200 },
    );

  return new Response(null, { status: 204 });
}
