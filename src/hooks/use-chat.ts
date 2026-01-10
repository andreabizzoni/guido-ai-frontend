import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage as sendA2AMessage } from "@/lib/a2a-client";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: "user",
        content: content.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await sendA2AMessage(content.trim());

        // Add agent response
        const agentMessage: ChatMessage = {
          id: uuidv4(),
          role: "assistant",
          content: response,
        };

        setMessages((prev) => [...prev, agentMessage]);
      } catch (error) {
        console.error("Failed to send message:", error);

        const errorMessage: ChatMessage = {
          id: uuidv4(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { messages, isLoading, sendMessage };
}
