"use client";

import { createClient } from "@/supabase/client";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { getHostname } from "@/lib/url";

export default function GoogleSignInButton() {
  async function signInWithGoogle() {
    const client = createClient();

    return await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getHostname()}/auth/callback`,
      },
    });
  }

  return (
    <Button variant="default" className="flex items-center" size="hero" onClick={signInWithGoogle}>
      <span className="text-lg">Get started</span>
      <LogIn className="ml-2" />
    </Button>
  );
}
