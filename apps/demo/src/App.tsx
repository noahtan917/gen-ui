import { validateGenUIDocument } from "@gen-ui/core";
import { GenUIRenderer } from "@gen-ui/render";
import { useMemo, useState } from "react";
import { mealDemoDocument } from "./sample-document.js";
import { useAssistantReply } from "./useAssistantReply.js";
import "./app.css";

export function App() {
  const { status, replyText, lastPayload, errorMessage, handleAIRequest } =
    useAssistantReply();
  const [uiState, setUiState] = useState<Record<string, unknown>>(
    () => mealDemoDocument.state ?? {},
  );

  const validation = useMemo(() => validateGenUIDocument(mealDemoDocument), []);

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
          <GenUIRenderer
            document={validation.document}
            onAIRequest={(payload) => {
              void handleAIRequest(payload);
              console.log("[GenUI ai.request]", payload);
            }}
            onStateChange={setUiState}
          />
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
            <pre>{JSON.stringify(uiState, null, 2)}</pre>
          </details>
        </section>
      </div>
    </div>
  );
}
