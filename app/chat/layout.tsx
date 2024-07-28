import AvatarMenu from "@/components/AvatarMenu";
import ChatList from "@/components/ChatList";
import MobileChatList from "@/components/MobileChatList";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    <main className="flex h-screen w-full flex-col md:flex-row">
      <aside className="md:hidden">
        <MobileChatList chats={chats} />
      </aside>
      <aside className="hidden flex-col p-4 md:flex">
        <section>
          <Link href="/chat" className="font-bold">
            CongressGPT
          </Link>
        </section>
        <section className="mt-4 flex-grow overflow-auto">
          <ChatList chats={chats} />
        </section>
        <section className="mt-4 flex items-center justify-between">
          <AvatarMenu />
          <ThemeToggle />
        </section>
      </aside>

      <section className="flex-grow">{children}</section>
    </main>
  );
}

export default Layout;
