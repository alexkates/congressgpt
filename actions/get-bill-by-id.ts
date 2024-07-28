"use server";

import { createClient } from "@/supabase/server";

export async function getBillById(id: string) {
  const client = createClient();

  return await client
    .from("documents")
    .select("metadata->billId", { head: true, count: "exact" })
    .eq("metadata->>billId", id);
}
