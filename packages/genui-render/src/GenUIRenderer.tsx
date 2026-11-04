import {
  applyStateUpdate,
  buildInteractEvent,
  resolveAIRequest,
  type AIRequestPayload,
  type GenUIDocument,
} from "@gen-ui/core";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { GenUIComponent } from "@gen-ui/core";
import {
  defaultRegistry,
  isAllowlisted,
  renderFallback,
  type ComponentRenderer,
} from "./registry.js";
import { themeToCssVars } from "./theme.js";

export interface GenUIRendererProps {
  document: GenUIDocument;
  registry?: Record<string, ComponentRenderer>;
  onAIRequest?: (payload: AIRequestPayload) => void;
  onStateChange?: (state: Record<string, unknown>) => void;
}

export function GenUIRenderer({
  document,
  registry = defaultRegistry,
  onAIRequest,
  onStateChange,
}: GenUIRendererProps) {
  const [state, setState] = useState<Record<string, unknown>>(() => ({
    ...(document.state ?? {}),
  }));

  const setStateKey = useCallback(
    (key: string, value: unknown) => {
      setState((prev) => {
        const next = { ...prev, [key]: value };
        onStateChange?.(next);
        return next;
      });
    },
    [onStateChange],
  );

  const onInteract = useCallback(
    (actionId: string, componentId: string, context: Record<string, unknown>) => {
      const event = buildInteractEvent(actionId, componentId, context);
      const action = document.actions[actionId];
      if (!action) {
        return;
      }
      if (action.type === "ai.request") {
        const payload = resolveAIRequest(document, event);
        if (payload) {
          onAIRequest?.(payload);
        }
      } else if (action.type === "state.update") {
        setState((prev) => {
          const next = applyStateUpdate(document, event, prev);
          onStateChange?.(next);
          return next;
        });
      }
    },
    [document, onAIRequest, onStateChange],
  );

  const ctx = useMemo(
    () => ({
      onInteract,
      state,
      setStateKey,
    }),
    [onInteract, state, setStateKey],
  );

  const renderComponent = useCallback(
    (component: GenUIComponent): ReactNode => {
      if (!isAllowlisted(component.type)) {
        return renderFallback(component);
      }
      const renderer = registry[component.type];
      if (!renderer) {
        return renderFallback(component);
      }
      return renderer(component, ctx, renderComponent);
    },
    [ctx, registry],
  );

  const rootStyle = themeToCssVars(document.themeRef);

  return (
    <div className="genui-root" style={rootStyle} data-genui-version={document.genuiVersion}>
      {document.components.map((c) => (
        <div key={c.id}>{renderComponent(c)}</div>
      ))}
    </div>
  );
}
