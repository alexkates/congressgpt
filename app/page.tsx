import Footer from "@/components/Footer";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import HeroCopy from "@/components/HeroCopy";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Page() {
  return (
    <div className="container flex min-h-[100dvh] flex-col">
      <div className="absolute right-2 top-2">
        <ThemeToggle />
      </div>
      <section className="flex grow flex-col items-center gap-12 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="flex flex-col items-center gap-4 text-center">
          <HeroCopy />
          <GoogleSignInButton />
        </div>
        <Stats />
        <HowItWorks />
      </section>
      <Footer />
    </div>
  );
}
