import ChatHeader from "@/components/ChatHeader";
import ChatList from "@/components/ChatList";
import { Tables } from "@/types/supabase";
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
        name: "Chat 2",
        created_at: new Date().toISOString(),
        user_id: "abc",
      },
    ]);
  });

  return (
    <>
      <ChatHeader chats={chats} />
      <ChatList chats={chats} />
      <main>{children}</main>
    </>
  );
}

export default Layout;
