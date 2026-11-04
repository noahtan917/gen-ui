import type { AIRequestPayload, GenUIDocument, GenUIInteractEvent } from "./schema.js";
import { actionSchema } from "./schema.js";

function interpolate(template: string, context: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = context[key];
    return value === undefined || value === null ? "" : String(value);
  });
}

export function buildInteractEvent(
  actionId: string,
  componentId: string,
  context: Record<string, unknown>,
): GenUIInteractEvent {
  return {
    type: "genui.interact",
    actionId,
    componentId,
    context,
    timestamp: new Date().toISOString(),
  };
}

export function resolveAIRequest(
  document: GenUIDocument,
  event: GenUIInteractEvent,
): AIRequestPayload | null {
  const raw = document.actions[event.actionId];
  if (!raw) {
    return null;
  }
  const action = actionSchema.parse(raw);
  if (action.type !== "ai.request") {
    return null;
  }

  const merged: Record<string, unknown> = {
    ...(action.context ?? {}),
    ...event.context,
  };

  if (action.contextKeys) {
    for (const key of action.contextKeys) {
      if (merged[key] === undefined && event.context[key] !== undefined) {
        merged[key] = event.context[key];
      }
    }
  }

  return {
    prompt: interpolate(action.promptTemplate, merged),
    actionId: event.actionId,
    componentId: event.componentId,
    context: merged,
  };
}

export function applyStateUpdate(
  document: GenUIDocument,
  event: GenUIInteractEvent,
  currentState: Record<string, unknown>,
): Record<string, unknown> {
  const raw = document.actions[event.actionId];
  if (!raw) {
    return currentState;
  }
  const action = actionSchema.parse(raw);
  if (action.type !== "state.update") {
    return currentState;
  }

  const next = { ...currentState };
  for (const [key, template] of Object.entries(action.updates)) {
    next[key] = interpolate(template, { ...currentState, ...event.context });
  }
  return next;
}
