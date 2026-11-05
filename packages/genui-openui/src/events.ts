import { BuiltinActionType, type ActionEvent } from "@openuidev/lang-core";
import type { AIRequestPayload } from "@gen-ui/core";
import { GENUI_CONTEXT_KEY, splitHiddenContext } from "./metadata.js";

/** actionId reported for OpenUI-native `@ToAssistant` steps that carry no GenUI provenance. */
export const OPENUI_NATIVE_ACTION_ID = "openui.continue_conversation";

/**
 * Maps an OpenUI `onAction` event to the GenUI host contract (`onAIRequest`).
 *
 * `continue_conversation` events become an `AIRequestPayload`. The prompt is
 * the evaluated `@ToAssistant` message, so state reads are current at click
 * time. Every other event type (`open_url`, custom actions) returns null,
 * because GenUI v1 does not allow them.
 */
export function openUIActionToAIRequest(event: ActionEvent): AIRequestPayload | null {
  if (event.type !== BuiltinActionType.ContinueConversation) return null;
  const { meta, rest } = splitHiddenContext(event.params?.context);
  return {
    prompt: event.humanFriendlyMessage,
    actionId: meta?.actionId ?? OPENUI_NATIVE_ACTION_ID,
    componentId: meta?.componentId ?? event.formName ?? "",
    context: rest,
  };
}

/**
 * Maps a GenUI `AIRequestPayload` to an OpenUI `continue_conversation` event,
 * for GenUI hosts that forward clicks to an OpenUI-based chat backend.
 */
export function aiRequestToOpenUIAction(payload: AIRequestPayload): ActionEvent {
  return {
    type: BuiltinActionType.ContinueConversation,
    params: {
      context: {
        ...payload.context,
        [GENUI_CONTEXT_KEY]: { actionId: payload.actionId, componentId: payload.componentId },
      },
    },
    humanFriendlyMessage: payload.prompt,
  };
}
