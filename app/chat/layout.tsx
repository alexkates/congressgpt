import AvatarMenu from "@/components/AvatarMenu";
import ChatList from "@/components/ChatList";
import MobileChatList from "@/components/MobileChatList";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { createClient } from "@/supabase/server";
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
    <main className="flex flex-col md:flex-row h-screen w-full">
      <aside className="md:hidden">
        <MobileChatList chats={chats} />
      </aside>
      <aside className="hidden md:flex flex-col p-4">
        <section>
          <Link href="/chat" className="font-bold">
            CongressGPT
          </Link>
        </section>
        <section className="flex-grow overflow-auto mt-4">
          <ChatList chats={chats} />
        </section>
        <section className="mt-4">
          <AvatarMenu />
        </section>
      </aside>

      <section className="flex-grow">{children}</section>
    </main>
  );
}

export default Layout;
