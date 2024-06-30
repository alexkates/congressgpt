import * as cheerio from "cheerio";
import getBillsFeed from "@/server/feeds/bills/get-bills-feed";
import { NextRequest, NextResponse } from "next/server";
import createBill from "@/server/feeds/bills/create-bill";

export async function POST(req: NextRequest) {
  const feed = await getBillsFeed();

  for (const item of feed.items) {
    if (item.guid === "BILLS-118s4344is") {
      const regex = /https:\/\/[^\s]+\.htm/g;
      const matches = item.content.match(regex);
      if (!matches) continue;

      const [link] = matches;
      const response = await fetch(link);
      const html = await response.text();

      const $ = cheerio.load(html);
      const text = $("body > pre").text();

      const scrubbedText = text
        .replace("<all>", "")
        .replace("<DOC>", "")
        .replace(/\n{3,}/g, "\n")
        .trim();

      await createBill(scrubbedText);
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
