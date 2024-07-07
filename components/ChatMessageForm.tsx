import { CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";

type Props = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ChatMessageForm({
  input,
  handleInputChange,
  sendMessage,
}: Props) {
  return (
    <form
      onSubmit={sendMessage}
      className="overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring w-full"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Input
        id="message"
        placeholder="Type your message here..."
        className="border-0 p-3 shadow-none focus-visible:ring-0"
        value={input}
        onChange={handleInputChange}
      />
      <div className="flex items-center p-3 pt-0">
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
