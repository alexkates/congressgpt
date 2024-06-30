import Parser from "rss-parser";
import { BillsFeed } from "./types";

export default async function getBillsFeed() {
  const parser = new Parser();
  const feed = (await parser.parseURL(
    "https://www.govinfo.gov/rss/bills.xml",
  )) as BillsFeed;

  return feed;
}
