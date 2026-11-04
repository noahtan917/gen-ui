import type { AIRequestPayload } from "@gen-ui/core";
import { useCallback, useRef, useState } from "react";
import { streamMockAssistantReply } from "./mockAssistantStream.js";

export type AssistantStatus = "idle" | "streaming" | "error";

export function useAssistantReply() {
  const [status, setStatus] = useState<AssistantStatus>("idle");
  const [replyText, setReplyText] = useState("");
  const [lastPayload, setLastPayload] = useState<AIRequestPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleAIRequest = useCallback(async (payload: AIRequestPayload) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLastPayload(payload);
    setReplyText("");
    setErrorMessage(null);
    setStatus("streaming");

    try {
      await streamMockAssistantReply(
        payload,
        (chunk) => {
          setReplyText((prev) => prev + chunk);
        },
        { signal: controller.signal },
      );
      if (!controller.signal.aborted) {
        setStatus("idle");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Assistant request failed");
    }
  }, []);

  return {
    status,
    replyText,
    lastPayload,
    errorMessage,
    handleAIRequest,
  };
}
