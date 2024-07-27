"use server";

import { createClient } from "@/supabase/server";
import { Message } from "ai";
import { revalidatePath } from "next/cache";

export async function createChatMessage(
  chatId: string,
  sources: any,
  message: Message,
) {
  const client = createClient();

  const { error: createChatMessageError } = await client
    .from("chat_messages")
    .insert({
      chat_id: chatId,
      content: message.content,
      role: message.role,
      sources,
    });

  if (createChatMessageError) throw createChatMessageError;

  revalidatePath(`/chat/${chatId}`);
}