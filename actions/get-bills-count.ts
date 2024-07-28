"use server";

import { createClient } from "@/supabase/server";

export async function getBillsCount() {
  const client = createClient();

  return await client.rpc("count_distinct_bill_ids");
}
