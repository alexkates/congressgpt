import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, UserIcon } from "lucide-react";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

type Props = {
  user: User;
};

export default function AvatarMenu({ user }: Props) {
  async function signOut() {
    "use server";

    const client = createClient();
    await client.auth.signOut();

    redirect("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 mb-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
