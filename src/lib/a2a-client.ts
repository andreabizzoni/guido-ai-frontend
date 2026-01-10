import { ClientFactory } from "@a2a-js/sdk/client";
import type { Message, MessageSendParams } from "@a2a-js/sdk";
import { v4 as uuidv4 } from "uuid";

const A2A_BACKEND_URL = "http://localhost:9999";

const factory = new ClientFactory();
let clientPromise: ReturnType<typeof factory.createFromUrl> | null = null;

function getClient() {
  if (!clientPromise) {
    clientPromise = factory.createFromUrl(A2A_BACKEND_URL);
  }
  return clientPromise;
}

export async function sendMessage(query: string): Promise<string> {
  try {
    const client = await getClient();

    const sendParams: MessageSendParams = {
      message: {
        messageId: uuidv4(),
        role: "user",
        parts: [{ kind: "text", text: query }],
        kind: "message",
      },
    };

    const response = await client.sendMessage(sendParams);
    const result = response as Message;

    const textPart = result.parts.find((part) => part.kind === "text");
    if (textPart && textPart.kind === "text") {
      return textPart.text;
    }

    return "";
  } catch (e) {
    throw e;
  }
}
