import { ChatWindow } from "@/components/ChatWindow";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  return (
    <>
      <ChatWindow />
    </>
  );
}
