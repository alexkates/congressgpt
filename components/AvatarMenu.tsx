import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, UserIcon } from "lucide-react";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function AvatarMenu() {
  const client = createClient();
  const { data, error } = await client.auth.getUser();
  if (error) redirect("/error");

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
          <AvatarImage src={data.user.user_metadata.avatar_url} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 mb-2">
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
