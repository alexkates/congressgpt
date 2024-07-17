import { ChatWindow } from "@/components/ChatWindow";
import { createClient } from "@/supabase/server";
import { Message } from "ai";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;
  if (!id) notFound();

  const client = createClient();
  const { data: messages, error } = await client
    .from("chat_messages")
    .select("*")
    .eq("chat_id", id)
    .order("created_at", { ascending: true })
    .returns<Message[]>();

  if (error) throw error;

  return <ChatWindow initialMessages={messages ?? undefined} chatId={id} />;
}
