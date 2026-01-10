import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import { Response } from "@/components/ui/response";
import { ShimmeringText } from "@/components/ui/shimmering-text";
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
        className={cn("flex-1 overflow-y-auto p-4 space-y-6", className)}
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
      className={cn("flex-1 overflow-y-auto p-4 space-y-6", className)}
      {...props}
    >
      {messages.map((message) => (
        <div key={message.id} className="w-full">
          {message.role === "user" ? (
            <div className="w-full">
              <TextareaAutosize
                className="w-full resize-none rounded-md border border-input bg-muted/30 px-3 py-2.5 text-sm text-foreground cursor-default"
                value={message.content}
                readOnly
                disabled
              />
            </div>
          ) : (
            <div className="w-full">
              {message.toolCall && (
                <div className="mb-2">
                  <ShimmeringText
                    text={`Calling ${message.toolCall}...`}
                    repeat={true}
                    duration={2}
                  />
                </div>
              )}
              {message.content ? (
                <Response className="text-sm">{message.content}</Response>
              ) : message.isStreaming && !message.toolCall ? (
                <span className="inline-block w-2 h-4 bg-foreground/50 animate-pulse" />
              ) : null}
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export { ChatMessages };
