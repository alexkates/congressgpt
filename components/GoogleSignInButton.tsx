"use client";

import { createClient } from "@/supabase/client";
import { Button } from "./ui/button";
import { Gavel } from "lucide-react";

export default function GoogleSignInButton() {
  function getUrl() {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000/";
    url = url.includes("http") ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  }

  async function signInWithGoogle() {
    const client = createClient();

    return await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getUrl()}/auth/callback`,
      },
    });
  }

  return (
    <Button
      variant="default"
      className="flex items-center gap-1"
      size="lg"
      onClick={signInWithGoogle}
    >
      <span className="text-lg">Get Started</span>
    </Button>
  );
}
