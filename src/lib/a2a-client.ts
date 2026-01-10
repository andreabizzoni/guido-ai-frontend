import { ClientFactory } from "@a2a-js/sdk/client";
import { v4 as uuidv4 } from "uuid";
import type { MessageSendParams } from "@a2a-js/sdk";

const A2A_BACKEND_URL = "http://localhost:9999";

const factory = new ClientFactory();
let clientPromise: ReturnType<typeof factory.createFromUrl> | null = null;

function getClient() {
  if (!clientPromise) {
    clientPromise = factory.createFromUrl(A2A_BACKEND_URL);
  }
  return clientPromise;
}

export interface StreamCallbacks {
  onTextChunk: (text: string) => void;
  onToolCall: (toolName: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
}

interface TaskStatusEvent {
  status?: {
    state?: string;
    message?: {
      parts?: Array<{
        kind: string;
        text?: string;
        data?: {
          type?: string;
          name?: string;
        };
      }>;
    };
  };
  final?: boolean;
}

export async function streamTask(
  query: string,
  callbacks: StreamCallbacks
): Promise<void> {
  try {
    const client = await getClient();

    const streamParams: MessageSendParams = {
      message: {
        messageId: uuidv4(),
        role: "user",
        parts: [{ kind: "text", text: query }],
        kind: "message",
      },
    };

    const stream = client.sendMessageStream(streamParams);

    for await (const event of stream as AsyncIterable<TaskStatusEvent>) {
      // Process message parts if present
      if (event.status?.message?.parts) {
        for (const part of event.status.message.parts) {
          if (part.kind === "text" && part.text && part.text.length > 0) {
            callbacks.onTextChunk(part.text);
          } else if (
            part.kind === "data" &&
            part.data?.type === "tool_call" &&
            part.data?.name
          ) {
            callbacks.onToolCall(part.data.name);
          }
        }
      }

      // Check for task completion or failure
      if (event.final) {
        if (event.status?.state === "failed") {
          // Extract error message from parts if available
          const errorText =
            event.status.message?.parts
              ?.filter((p) => p.kind === "text")
              .map((p) => p.text)
              .join("") || "Task failed";
          callbacks.onError(errorText);
        } else {
          callbacks.onComplete();
        }
        break;
      }
    }
  } catch (e) {
    callbacks.onError(e instanceof Error ? e.message : "Unknown error");
  }
}
