import type { GenUIAction } from "@gen-ui/core";

/**
 * Key inside `@ToAssistant(message, context)` hidden context that carries GenUI
 * provenance. It lets `ai.request` actions round-trip losslessly and lets the
 * event bridge report the original actionId and componentId.
 */
export const GENUI_CONTEXT_KEY = "genui";

export interface GenUIActionMetadata {
  actionId: string;
  componentId: string;
  /**
   * The full GenUI action definition, including its promptTemplate. Present in
   * exported programs (needed for lossless import); optional for event provenance.
   */
  action?: GenUIAction;
  /** The component's own `props.context`, kept apart from the resolved context. */
  propsContext?: Record<string, unknown>;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Splits an evaluated hidden context into GenUI metadata and the assistant-facing rest. */
export function splitHiddenContext(context: unknown): {
  meta?: GenUIActionMetadata;
  rest: Record<string, unknown>;
} {
  if (!isPlainObject(context)) {
    return { rest: context === undefined || context === null ? {} : { context } };
  }
  const { [GENUI_CONTEXT_KEY]: rawMeta, ...rest } = context;
  if (
    isPlainObject(rawMeta) &&
    typeof rawMeta.actionId === "string" &&
    typeof rawMeta.componentId === "string" &&
    (rawMeta.action === undefined || isPlainObject(rawMeta.action))
  ) {
    return { meta: rawMeta as unknown as GenUIActionMetadata, rest };
  }
  return { rest: context };
}
