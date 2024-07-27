import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Gavel } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh] container">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 grow">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span>Finally</span> understand what
              <br />
              Congress is{" "}
              <span className="italic underline underline-offset-4 text-primary">
                actually
              </span>{" "}
              doing
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Engage in real-time conversations with actual bills from Congress
              and the Senate using natural language processing
            </p>
          </div>
          <div>
            <GoogleSignInButton />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
