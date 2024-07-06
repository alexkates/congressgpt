"use client";

import { createClient } from "@/supabase/client";
import { Button } from "./ui/button";

export default function GoogleSignInButton() {
  async function signInWithGoogle() {
    const client = createClient();

    return await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Button variant="default" className="w-full" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
}
