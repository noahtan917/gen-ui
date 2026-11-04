import { validateGenUIDocument, type AIRequestPayload } from "@gen-ui/core";
import { GenUIRenderer } from "@gen-ui/render";
import { useMemo, useState } from "react";
import { mealDemoDocument } from "./sample-document.js";
import "./app.css";

export function App() {
  const [aiLog, setAiLog] = useState<AIRequestPayload | null>(null);
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
        <h1>GenUI Demo</h1>
        <p>Click a meal card to emit a structured AI request.</p>
      </header>
      <div className="app-grid">
        <section className="app-panel">
          <GenUIRenderer
            document={validation.document}
            onAIRequest={(payload) => {
              setAiLog(payload);
              console.log("[GenUI ai.request]", payload);
            }}
            onStateChange={setUiState}
          />
        </section>
        <section className="app-panel app-panel--log">
          <h2>AI request payload</h2>
          {aiLog ? (
            <pre>{JSON.stringify(aiLog, null, 2)}</pre>
          ) : (
            <p className="muted">Interact with a card to see the contextual prompt.</p>
          )}
          <h2>UI state</h2>
          <pre>{JSON.stringify(uiState, null, 2)}</pre>
        </section>
      </div>
    </div>
  );
}
