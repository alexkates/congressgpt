"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tables } from "@/types/supabase";

type Props = {
  chats: Tables<"chats">[];
};

export default function ChatList({ chats }: Props) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path.split("?")[0];

  return (
    <ul className="hidden md:flex flex-col">
      {chats.map((chat) => (
        <li key={chat.id}>
          <Link
            href={`/chat/${chat.id}`}
            className={cn(
              isActive(`/chat/${chat.id}`) && "underline",
              "hover:underline",
            )}
          >
            {chat.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
