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

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) redirect("/error");
  const { user } = data;

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
            <AvatarMenu user={user} />
          </section>
        </aside>
        <section className="grow">{children}</section>
      </main>
    </>
  );
}

export default Layout;
