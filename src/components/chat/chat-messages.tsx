import * as React from "react";

import { cn } from "@/lib/utils";

function ChatMessages({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-messages"
      className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}
      {...props}
    >
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Start a conversation with the agent
      </div>
    </div>
  );
}

export { ChatMessages };
