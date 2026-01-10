import * as React from "react";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  InputGroupAddon,
  InputGroup,
  InputGroupButton,
} from "../ui/input-group";
import TextareaAutosize from "react-textarea-autosize";

interface ChatInputProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSend?: (message: string) => void;
  isLoading?: boolean;
}

function ChatInput({ className, onSend, isLoading, ...props }: ChatInputProps) {
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    if (value.trim() && !isLoading && onSend) {
      onSend(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      data-slot="chat-input"
      className={cn("flex gap-2 p-2 border-border", className)}
      {...props}
    >
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Chat with Guido"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            className="ml-auto rounded-full"
            size="icon-xs"
            variant="default"
            onClick={handleSubmit}
            disabled={isLoading || !value.trim()}
          >
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export { ChatInput };
