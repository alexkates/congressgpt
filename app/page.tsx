import { ChatWindow } from "@/components/ChatWindow";

export default function Page() {
  return (
    <ChatWindow
      endpoint="api/chat"
      emptyStateComponent={<>Empty State</>}
      placeholder={""}
      titleText="Title"
    />
  );
}
