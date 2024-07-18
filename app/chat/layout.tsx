import AvatarMenu from "@/components/AvatarMenu";
import ChatList from "@/components/ChatList";
import MobileChatList from "@/components/MobileChatList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createClient } from "@/supabase/server";
import { Tables } from "@/types/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  const supabase = createClient();

  const { data: chats, error: chatsError } = await supabase
    .from("chats")
    .select("*")
    .order("created_at", { ascending: false });

  if (chatsError) redirect("/error");

  return (
    <>
      <div className="md:hidden">
        <MobileChatList chats={chats} />
      </div>

      <main className="flex">
        <aside className="hidden md:flex flex-col p-4 min-h-screen">
          <section className="flex flex-col gap-4 grow">
            <Link href="/chat" className="font-bold">
              CongressGPT
            </Link>
            <ChatList chats={chats} />
          </section>
          <section>
            <AvatarMenu />
          </section>
        </aside>
        <section className="grow">{children}</section>
      </main>
    </>
  );
}

export default Layout;
