import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Welcome!</h1>
      <Link href="/chat">Get Started</Link>
    </>
  );
}
