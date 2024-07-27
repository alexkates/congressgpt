"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { v4 as generateId } from "uuid";

export async function createChat(title: string) {
  const client = createClient();

  const { data, error: getUserError } = await client.auth.getUser();
  if (getUserError) throw getUserError;

  const { user } = data;

  const { data: chat, error: createChatError } = await client
    .from("chats")
    .insert({
      id: generateId(),
      user_id: user.id,
      name: title,
    })
    .select();

  if (createChatError) throw createChatError;

  revalidatePath("/chat", "layout");

  return chat[0];
}
