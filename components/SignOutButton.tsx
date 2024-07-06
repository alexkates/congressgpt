"use client";

import { createClient } from "@/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/sign-in");
  }

  return (
    <Button variant="default" onClick={signOut}>
      Sign out
    </Button>
  );
}
