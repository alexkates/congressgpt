"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/shadcn";
import { Tables } from "@/types/supabase";
import MobileChatListToggle from "./MobileChatListToggle";

type Props = {
  chats: Tables<"chats">[];
};

export default function MobileChatList({ chats }: Props) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path.split("?")[0];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="pl-2">
          <MobileChatListToggle />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="text-left">CongressGPT</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-screen">
          <div className="flex flex-col space-y-3">
            {chats.map((chat) => (
              <MobileLink
                key={chat.id}
                href={`/chat/${chat.id}`}
                onOpenChange={setOpen}
                className={cn(isActive(`/chat/${chat.id}`) && "underline")}
              >
                {chat.name}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
