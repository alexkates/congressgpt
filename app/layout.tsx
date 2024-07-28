import { cn } from "@/lib/shadcn";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const description =
  "Finally understand what Congress is actually doing. Chat with real bills from the U.S. House of Representatives and Senate";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>CongressGPT</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="description" content={description} />
        <meta property="og:title" content="CongressGPT" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CongressGPT" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
