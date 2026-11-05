import { validateGenUIDocument, type AIRequestPayload } from "@gen-ui/core";
import { genuiToOpenUILang } from "@gen-ui/openui";
import { GenUIOpenUIRenderer } from "@gen-ui/openui/react";
import { GenUIRenderer } from "@gen-ui/render";
import { useMemo, useState } from "react";
import { mealDemoDocument } from "./sample-document.js";
import { useAssistantReply } from "./useAssistantReply.js";
import "./app.css";

type RenderFormat = "genui" | "openui";

const FORMATS: { id: RenderFormat; label: string }[] = [
  { id: "genui", label: "GenUI JSON" },
  { id: "openui", label: "OpenUI Lang" },
];

export function App() {
  const { status, replyText, lastPayload, errorMessage, handleAIRequest } =
    useAssistantReply();
  const [uiState, setUiState] = useState<Record<string, unknown>>(
    () => mealDemoDocument.state ?? {},
  );

  const [format, setFormat] = useState<RenderFormat>("genui");

  const validation = useMemo(() => validateGenUIDocument(mealDemoDocument), []);
  // Same document, converted to OpenUI Lang (openui.com) and rendered by OpenUI's runtime.
  const openui = useMemo(
    () => (validation.document ? genuiToOpenUILang(validation.document) : null),
    [validation.document],
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
        <span className="app-header__brand">YOUTUBE BRAND PACK</span>
        <h1>GenUI Demo</h1>
        <p>
          YouTube red #FF0000 — click a meal card and the assistant answers automatically.
        </p>
      </header>
      <div className="app-grid">
        <section className="app-panel">
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
              document={validation.document}
              onAIRequest={onAIRequest}
              onStateChange={setUiState}
            />
          ) : (
            <GenUIOpenUIRenderer
              code={openui?.code ?? null}
              themeRef={validation.document.themeRef}
              onAIRequest={onAIRequest}
            />
          )}
          {format === "openui" && openui ? (
            <details className="app-details">
              <summary>OpenUI Lang program</summary>
              <pre>{openui.code}</pre>
              {openui.warnings.length ? (
                <ul className="muted">
                  {openui.warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              ) : null}
            </details>
          ) : null}
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
            <p className="muted">Click a meal card to get ingredients, steps, and timing.</p>
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
