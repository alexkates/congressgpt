"use server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export async function createChat(content: string) {
  const client = createClient();

  const userId = (await client.auth.getUser())?.data?.user?.id;
  if (!userId) return;

  console.log(`Creating chat for user ${userId}`);
  const { data: insertResults } = await client
    .from("chats")
    .insert({ user_id: userId, name: new Date().toLocaleString() })
    .select();

  const newChat = insertResults?.[0];
  if (!newChat) return;

  console.log(
    `Creating chat message for chat ${newChat.id} with content: ${content}`,
  );

  const { data: newChatMessage, error } = await client
    .from("chat_messages")
    .insert({
      chat_id: newChat.id,
      content,
      role: "user",
    })
    .select();

  if (error) {
    console.error("Error creating chat message", error);
    return;
  }

  return redirect(`/chat/${newChat.id}`);
}
