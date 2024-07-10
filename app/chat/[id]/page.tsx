import { ChatWindow } from "@/components/ChatWindow";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  console.log(params.id);
  return <></>;
}
