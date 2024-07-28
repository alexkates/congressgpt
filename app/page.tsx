import Footer from "@/components/Footer";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function Page() {
  return (
    <div className="container flex min-h-[100dvh] flex-col">
      <section className="flex w-full grow flex-col items-center gap-8 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span>Finally</span> understand what
              <br />
              Congress is <span className="italic underline">actually</span>
              &nbsp;doing
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Engage in real-time conversations with actual bills from Congress and the Senate using natural language
              processing
            </p>
          </div>
        </div>

        <div>
          <GoogleSignInButton />
        </div>

        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              <span>How it works</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
