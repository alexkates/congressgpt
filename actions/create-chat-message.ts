"use server";

import { createClient } from "@/supabase/server";
import { Message } from "ai";
import { revalidatePath } from "next/cache";

type Props = {
  chatId: string;
  message: Message;
};

export async function createChatMessage({ chatId, message }: Props) {
  const client = createClient();

  const { error: createChatMessageError } = await client.from("chat_messages").insert({
    chat_id: chatId,
    content: message.content,
    role: message.role,
  });

  if (createChatMessageError) throw createChatMessageError;

  revalidatePath(`/chat/${chatId}`);
}
