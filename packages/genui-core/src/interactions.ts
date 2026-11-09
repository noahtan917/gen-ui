import type {
  AIRequestPayload,
  GenUIComponent,
  GenUIDocument,
  GenUIInteractEvent,
} from "./schema.js";
import { actionSchema } from "./schema.js";

/**
 * Replace `{{key}}` placeholders with values from `context`.
 * Missing, null, and undefined values render as an empty string.
 */
export function interpolatePrompt(
  template: string,
  context: Record<string, unknown>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = context[key];
    return value === undefined || value === null ? "" : String(value);
  });
}

/**
 * Context a component contributes to its interaction event, as defined by the
 * interaction contract. Shared by the React renderer and format bridges so the
 * resolved prompt is identical everywhere.
 *
 * - Button: `props.context`
 * - Card: `meal`/`cuisine`/`title`/`subtitle` from the card, then UI state, then `props.context`
 * - Form: UI state, then submitted form fields
 * - Chart: UI state, then `props.context`. The renderer adds the clicked row `label`.
 */
export function buildInteractionContext(
  component: GenUIComponent,
  state: Record<string, unknown>,
  formFields: Record<string, unknown> = {},
): Record<string, unknown> {
  const propsContext = component.props.context as Record<string, unknown> | undefined;
  switch (component.type) {
    case "Card": {
      const title = component.props.title as string | undefined;
      const subtitle = component.props.subtitle as string | undefined;
      return {
        meal: title,
        cuisine: subtitle,
        title,
        subtitle,
        ...state,
        ...propsContext,
      };
    }
    case "Form":
      return { ...state, ...formFields };
    case "Chart":
      return { ...state, ...propsContext };
    default:
      return { ...propsContext };
  }
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
    prompt: interpolatePrompt(action.promptTemplate, merged),
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
    next[key] = interpolatePrompt(template, { ...currentState, ...event.context });
  }
  return next;
}
