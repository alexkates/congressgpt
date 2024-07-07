import { ChatWindow } from "@/components/ChatWindow";
import SignOutButton from "@/components/SignOutButton";

export default async function Page() {
  return (
    <>
      <SignOutButton />
      <ChatWindow />
    </>
  );
}
