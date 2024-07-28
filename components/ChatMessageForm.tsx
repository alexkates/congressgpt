import { Command, CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ChatMessageForm({ input, handleInputChange, sendMessage }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form && input.trim().length) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      className="w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        autoFocus
        placeholder="Ask me anything about Congressional bills ..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className="float-right flex items-center p-3 pt-0">
        <Button type="submit" size="sm" className="gap-2" disabled={!input.length}>
          <span>Send</span>
          <div className="flex items-center">
            <Command className="w-4" />
            <CornerDownLeft className="w-4" />
          </div>
        </Button>
      </div>
    </form>
  );
}
