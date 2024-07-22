"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tables } from "@/types/supabase";
import { Button } from "./ui/button";

type Props = {
  chats: Tables<"chats">[];
};

export default function ChatList({ chats }: Props) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path.split("?")[0];

  return (
    <ul className="flex flex-col gap-4 ">
      {chats.map((chat) => {
        const href = `/chat/${chat.id}`;
        const activeClass = isActive(href) ? "default" : "ghost";

        return (
          <li key={chat.id}>
            <Button variant={activeClass} asChild>
              <Link href={href}>
                <div className="flex">
                  <span className="w-40 lg:w-520 overflow-hidden">
                    {chat.name}
                  </span>
                </div>
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
