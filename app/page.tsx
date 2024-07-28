import Footer from "@/components/Footer";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import HeroCopy from "@/components/HeroCopy";
import HowItWorks from "@/components/HowItWorks";
import HeroCallout from "@/components/HeroCallout";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col px-4">
      <div className="absolute right-2 top-2">
        <ThemeToggle />
      </div>
      <section className="flex grow flex-col items-center gap-12 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="flex flex-col items-center gap-8">
          <HeroCopy />
          <div className="flex w-full flex-col items-center justify-evenly gap-8 md:flex-row">
            <HeroCallout />
            <GoogleSignInButton />
          </div>
        </div>
        <HowItWorks />
      </section>
      <Footer />
    </div>
  );
}
