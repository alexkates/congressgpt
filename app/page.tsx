import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Gavel } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh] container">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 grow">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span>Really</span> understand U.S.
              <br />
              Congressional legislation
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Engage in real-time conversations with actual bills from Congress
              and the Senate using natural language processing
            </p>
          </div>
          <div>
            <Button size={"lg"} asChild>
              <Link href="/chat" className="flex items-center">
                Get Started
                <Gavel className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
