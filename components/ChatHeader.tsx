import Link from "next/link";
import MobileChatList from "./MobileChatList";
import { ThemeToggle } from "./ThemeToggle";
import { Tables } from "@/types/supabase";

type Props = {
  chats: Tables<"chats">[];
};

function ChatHeader({ chats }: Props) {
  return (
    <header className="mb-4 flex items-center justify-between">
      <div className="md:hidden">
        <MobileChatList chats={chats} />
      </div>
      <div className="hidden md:flex">
        <Link href="/chat">CongressGPT</Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default ChatHeader;
