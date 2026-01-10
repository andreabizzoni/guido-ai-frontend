import * as React from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/hooks/use-chat";

interface ChatMessagesProps extends React.ComponentProps<"div"> {
  messages?: ChatMessage[];
}

function ChatMessages({
  className,
  messages = [],
  ...props
}: ChatMessagesProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
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

  return (
    <div
      data-slot="chat-messages"
      className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}
      {...props}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 text-sm",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export { ChatMessages };
