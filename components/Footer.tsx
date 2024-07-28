import Link from "next/link";
import React from "react";

function Footer() {
  const links = [
    { href: "https://nextjs.org", label: "Next.js" },
    { href: "https://ui.shadcn.com", label: "shadcn/ui" },
    { href: "https://vercel.com", label: "Vercel" },
    { href: "https://supabase.com", label: "Supabase" },
  ];

  return (
    <footer className="flex flex-col items-center justify-center py-4 text-center text-xs leading-snug text-muted-foreground">
      <span>
        Powered by&nbsp;
        {links.map((link, index) => (
          <React.Fragment key={link.href}>
            <Link href={link.href} target="_blank" rel="noopener noreferrer" className="underline">
              {link.label}
            </Link>
            {index < links.length - 1 ? (
              index === links.length - 2 ? (
                <span>&nbsp;and&nbsp;</span>
              ) : (
                <span>,&nbsp;</span>
              )
            ) : null}
          </React.Fragment>
        ))}
        .
      </span>
      <span>
        Built by&nbsp;
        <Link href="https://twitter.com/thealexkates" target="_blank" rel="noreferrer" className="underline">
          Alex Kates
        </Link>
        . Source code is available on&nbsp;
        <Link href="https://github.com/alexkates/congressgpt" target="_blank" rel="noreferrer" className="underline">
          GitHub
        </Link>
        .
      </span>
    </footer>
  );
}

export default Footer;
