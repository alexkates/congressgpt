import { Command, CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ChatMessageForm({
  input,
  handleInputChange,
  sendMessage,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      className="overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring w-full"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Tell me about the most recent bill introduced in the Senate."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center p-3 pt-0 float-right">
        <Button type="submit" size="sm" className="gap-4">
          <span>Send</span>
          <div className="flex items-center gap-1">
            <Command className="w-4" />
            <CornerDownLeft className="w-4" />
          </div>
        </Button>
      </div>
    </form>
  );
}
