import * as React from "react";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  InputGroupAddon,
  InputGroup,
  InputGroupButton,
} from "../ui/input-group";
import TextareaAutosize from "react-textarea-autosize";

function ChatInput({ className, ...props }: React.ComponentProps<"div">) {
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
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            className="ml-auto rounded-full"
            size="icon-xs"
            variant="default"
          >
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export { ChatInput };
