import { ChatWindow } from "@/components/ChatWindow";

export default function Page() {
  return (
    <ChatWindow
      endpoint="api/chat"
      emptyStateComponent={<>Empty State</>}
      showIngestForm={true}
      placeholder={""}
      // emoji="🐶"
      titleText="Title"
    />
  );
}
