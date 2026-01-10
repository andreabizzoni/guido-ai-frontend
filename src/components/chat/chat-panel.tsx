import * as React from "react";

import { cn } from "@/lib/utils";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

function ChatPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-panel"
      className={cn(
        "flex-3 min-w-[320px] h-full flex flex-col bg-background",
        className
      )}
      {...props}
    >
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export { ChatPanel };
