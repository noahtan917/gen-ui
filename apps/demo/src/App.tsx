import { interpolatePrompt, validateGenUIDocument, type AIRequestPayload } from "@gen-ui/core";
import { genuiToOpenUILang } from "@gen-ui/openui";
import { GenUIOpenUIRenderer } from "@gen-ui/openui/react";
import { GenUIRenderer } from "@gen-ui/render";
import { useCallback, useMemo, useRef, useState } from "react";
import { chartDemoDocument } from "./chart-document.js";
import { mealDemoDocument } from "./sample-document.js";
import { useAssistantReply } from "./useAssistantReply.js";
import "./app.css";

type RenderFormat = "genui" | "openui";
type Scenario = "meals" | "chart";

const SCENARIOS: { id: Scenario; label: string; document: typeof mealDemoDocument }[] = [
  { id: "meals", label: "Meals", document: mealDemoDocument },
  { id: "chart", label: "Chart", document: chartDemoDocument },
];

const FORMATS: { id: RenderFormat; label: string }[] = [
  { id: "genui", label: "GenUI JSON" },
  { id: "openui", label: "OpenUI Lang" },
];

function readServings(value: unknown): string | undefined {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value && typeof value === "object" && "value" in value) {
    return readServings((value as { value: unknown }).value);
  }
  return undefined;
}

export function App() {
  const { status, replyText, lastPayload, errorMessage, handleAIRequest } =
    useAssistantReply();
  const [uiState, setUiState] = useState<Record<string, unknown>>(
    () => mealDemoDocument.state ?? {},
  );

  const [format, setFormat] = useState<RenderFormat>("genui");
  const [scenario, setScenario] = useState<Scenario>("meals");
  const activeDocument = SCENARIOS.find((item) => item.id === scenario)?.document ?? mealDemoDocument;

  const validation = useMemo(() => validateGenUIDocument(activeDocument), [activeDocument]);
  // Same document, converted to OpenUI Lang (openui.com) and rendered by OpenUI's runtime.
  const openui = useMemo(
    () => (validation.document ? genuiToOpenUILang(validation.document) : null),
    [validation.document],
  );

  const lastPayloadRef = useRef(lastPayload);
  lastPayloadRef.current = lastPayload;

  const refreshForServings = useCallback(
    (servings: unknown) => {
      const prev = lastPayloadRef.current;
      const action = validation.document?.actions.planMeal;
      const next = readServings(servings);
      if (!prev || !action || action.type !== "ai.request" || next === undefined) return;
      if (String(prev.context.servings ?? "") === next) return;
      const context = { ...prev.context, servings: next };
      void handleAIRequest({
        ...prev,
        context,
        prompt: interpolatePrompt(action.promptTemplate, context),
      });
    },
    [handleAIRequest, validation.document],
  );

  const onGenUIState = useCallback(
    (state: Record<string, unknown>) => {
      setUiState(state);
      refreshForServings(state.servings);
    },
    [refreshForServings],
  );

  const onOpenUIState = useCallback(
    (state: Record<string, unknown>) => {
      refreshForServings(state.servings ?? state.$servings);
    },
    [refreshForServings],
  );

  const onAIRequest = (payload: AIRequestPayload) => {
    void handleAIRequest(payload);
    console.log(`[GenUI ai.request via ${format}]`, payload);
  };

  if (!validation.success || !validation.document) {
    return (
      <div className="app">
        <h1>GenUI Demo — validation failed</h1>
        <ul>
          {validation.errors.map((e) => (
            <li key={e.path}>
              {e.path}: {e.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header__brand">917V</span>
        <h1>GenUI Demo</h1>
        <p>
          {scenario === "chart"
            ? "917V Blue #2F63D6 — switch chamber and click a bar. Counts are sample data."
            : "917V Blue #2F63D6 — click a meal card and the assistant answers automatically."}
        </p>
      </header>
      <div className="app-grid">
        <section className="app-panel">
          <div className="format-toggle" role="radiogroup" aria-label="Demo scenario">
            {SCENARIOS.map(({ id, label, document }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={scenario === id}
                className={`format-toggle__option${scenario === id ? " format-toggle__option--active" : ""}`}
                onClick={() => {
                  setScenario(id);
                  setUiState(document.state ?? {});
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="format-toggle" role="radiogroup" aria-label="Render format">
            {FORMATS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={format === id}
                className={`format-toggle__option${format === id ? " format-toggle__option--active" : ""}`}
                onClick={() => setFormat(id)}
              >
                {label}
              </button>
            ))}
          </div>
          {format === "genui" ? (
            <GenUIRenderer
              key={scenario}
              document={validation.document}
              onAIRequest={onAIRequest}
              onStateChange={onGenUIState}
            />
          ) : (
            <GenUIOpenUIRenderer
              key={scenario}
              code={openui?.code ?? null}
              themeRef={validation.document.themeRef}
              onAIRequest={onAIRequest}
              onStateUpdate={onOpenUIState}
            />
          )}
        </section>
        <section className="app-panel app-panel--assistant">
          <div className="assistant-header">
            <h2>Assistant</h2>
            <span className="assistant-badge">Demo mock — no API key</span>
          </div>
          {errorMessage ? (
            <p className="assistant-error">{errorMessage}</p>
          ) : null}
          {replyText ? (
            <div
              className={`assistant-reply${status === "streaming" ? " assistant-reply--streaming" : ""}`}
              aria-live="polite"
            >
              <pre className="assistant-reply__text">{replyText}</pre>
            </div>
          ) : (
            <p className="muted">
              {scenario === "chart"
                ? "Click a bar to explain that sample row."
                : "Click a meal card to get ingredients, steps, and timing."}
            </p>
          )}
          <details className="app-details">
            <summary>Request details</summary>
            {lastPayload ? (
              <pre>{JSON.stringify(lastPayload, null, 2)}</pre>
            ) : (
              <p className="muted">No request yet.</p>
            )}
          </details>
          <details className="app-details">
            <summary>UI state</summary>
            {format === "genui" ? (
              <pre>{JSON.stringify(uiState, null, 2)}</pre>
            ) : (
              <p className="muted">In OpenUI mode, state lives in OpenUI $variables.</p>
            )}
          </details>
        </section>
      </div>
    </div>
  );
}
