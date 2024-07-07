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
      <header className="flex items-center justify-between p-4">
        <div className="md:hidden">
          <MobileChatList chats={chats} />
        </div>
        <div className="hidden md:flex">
          <Link href="/chat" className="font-bold">
            CongressGPT
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex">
        <aside className="hidden md:flex px-4">
          <ChatList chats={chats} />
        </aside>
        <section className="grow px-4">{children}</section>
      </main>
    </>
  );
}

export default Layout;
