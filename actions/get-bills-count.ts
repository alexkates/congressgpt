"use server";

import { createClient } from "@/supabase/server";

export async function getBillsCount() {
  const client = createClient();

  return await client.from("documents").select("metadata->billId", { head: true, count: "estimated" });
}
