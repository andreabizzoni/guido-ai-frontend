import * as React from "react";

import { cn } from "@/lib/utils";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { useChat } from "@/hooks/use-chat";

function ChatPanel({ className, ...props }: React.ComponentProps<"div">) {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div
      data-slot="chat-panel"
      className={cn(
        "flex-3 min-w-[320px] h-full flex flex-col bg-background",
        className
      )}
      {...props}
    >
      <ChatMessages messages={messages} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}

export { ChatPanel };
