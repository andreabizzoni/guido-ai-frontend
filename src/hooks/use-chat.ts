import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { streamTask } from "@/lib/a2a-client";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  toolCall?: string | null;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const assistantMessageIdRef = useRef<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: "user",
        content: content.trim(),
      };

      // Create placeholder assistant message
      const assistantMessageId = uuidv4();
      assistantMessageIdRef.current = assistantMessageId;

      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        isStreaming: true,
        toolCall: null,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsLoading(true);

      try {
        await streamTask(content.trim(), {
          onTextChunk: (text) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageIdRef.current
                  ? { ...msg, content: msg.content + text, toolCall: null }
                  : msg
              )
            );
          },
          onToolCall: (toolName) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageIdRef.current
                  ? { ...msg, toolCall: toolName }
                  : msg
              )
            );
          },
          onComplete: () => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageIdRef.current
                  ? { ...msg, isStreaming: false, toolCall: null }
                  : msg
              )
            );
            setIsLoading(false);
          },
          onError: (error) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageIdRef.current
                  ? {
                      ...msg,
                      content: `Sorry, something went wrong: ${error}`,
                      isStreaming: false,
                      toolCall: null,
                    }
                  : msg
              )
            );
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error("Failed to send message:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageIdRef.current
              ? {
                  ...msg,
                  content: "Sorry, something went wrong. Please try again.",
                  isStreaming: false,
                  toolCall: null,
                }
              : msg
          )
        );
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { messages, isLoading, sendMessage };
}
