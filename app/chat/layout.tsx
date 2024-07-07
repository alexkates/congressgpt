import ChatList from "@/components/ChatList";
import MobileChatList from "@/components/MobileChatList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tables } from "@/types/supabase";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  const chats = await new Promise<Tables<"chats">[]>((resolve) => {
    resolve([
      {
        id: 1,
        name: "Chat 1",
        created_at: new Date().toISOString(),
        user_id: "abc",
      },
      {
        id: 2,
        name: "Chat 2 with a much longer name to test button sizes",
        created_at: new Date().toISOString(),
        user_id: "abc",
      },
      {
        id: 3,
        name: "Chat 3",
        created_at: new Date().toISOString(),
        user_id: "abc",
      },
    ]);
  });

  return (
    <>
      <div className="md:hidden">
        <MobileChatList chats={chats} />
      </div>

      <main className="flex">
        <aside className="hidden md:flex flex-col gap-4 p-4">
          <Link href="/chat" className="font-bold">
            CongressGPT
          </Link>
          <ChatList chats={chats} />
        </aside>
        <section className="grow">{children}</section>
      </main>
    </>
  );
}

export default Layout;
