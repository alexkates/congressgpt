import { ChatWindow } from "@/components/ChatWindow";
import SignOutButton from "@/components/SignOutButton";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("/sign-in");

  return (
    <>
      <SignOutButton />
      <ChatWindow
        endpoint="api/chat"
        titleText={`Welcome, ${data.user.email}`}
      />
    </>
  );
}
