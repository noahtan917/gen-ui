/**
 * Reference only — for embedded-ui-host (Artifacts / canvas-style UIs).
 * Visuals follow the 917V core light theme.
 */
import { useState } from "react";

const tokens = {
  primary: "#2F63D6",
  surface: "#F4F6F9",
  card: "#FFFFFF",
  text: "#0A0C11",
  textMuted: "#586173",
  border: "#D8DEE7",
  radiusCard: "6px",
};

const fontText = '"Instrument Sans", "Helvetica Neue", Arial, sans-serif';
const fontDisplay = '"Archivo", "Helvetica Neue", Arial, sans-serif';

const meals = [
  {
    id: "card-salmon",
    title: "Sheet-pan salmon",
    cuisine: "Mediterranean",
    bridgePrompt:
      "Help me cook Sheet-pan salmon (Mediterranean): ingredient list, steps, and total time for a weeknight dinner.",
  },
  {
    id: "card-ramen",
    title: "Miso ramen bowl",
    cuisine: "Japanese",
    bridgePrompt:
      "Help me cook Miso ramen bowl (Japanese): ingredient list, steps, and total time for a weeknight dinner.",
  },
];

type ClaudeWindow = Window & {
  claude?: { complete?: (prompt: string) => Promise<string> };
};

async function completeInArtifact(prompt: string): Promise<string> {
  const complete = (window as ClaudeWindow).claude?.complete;
  if (!complete) {
    throw new Error("window.claude.complete is not available");
  }
  return complete(prompt);
}

export default function MealGenUIReference() {
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "fallback">("idle");

  async function choose(id: string) {
    const meal = meals.find((item) => item.id === id);
    if (!meal) return;
    setSelected(id);
    setReply("");
    setStatus("loading");
    try {
      setReply(await completeInArtifact(meal.bridgePrompt));
      setStatus("done");
    } catch {
      setReply(meal.bridgePrompt);
      setStatus("fallback");
    }
  }

  return (
    <div style={{ fontFamily: fontText, color: tokens.text, background: tokens.surface, padding: 16 }}>
      <div
        style={{
          background: tokens.card,
          color: tokens.text,
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          margin: "-16px -16px 16px",
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13 }}>917V</span>
      </div>
      <h2 style={{ marginTop: 0, fontFamily: fontDisplay, fontWeight: 600, fontSize: 26, lineHeight: "32px" }}>
        What do you want to cook?
      </h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {meals.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => void choose(m.id)}
            disabled={status === "loading"}
            style={{
              textAlign: "left",
              cursor: "pointer",
              fontFamily: fontText,
              color: tokens.text,
              background: tokens.card,
              border: 0,
              boxShadow: `inset 0 0 0 1px ${selected === m.id ? tokens.primary : tokens.border}`,
              borderRadius: tokens.radiusCard,
              padding: 16,
              minWidth: 160,
            }}
          >
            <strong style={{ fontFamily: fontDisplay }}>{m.title}</strong>
            <div style={{ color: tokens.textMuted, fontSize: 14 }}>{m.cuisine}</div>
          </button>
        ))}
      </div>
      {status === "loading" ? <p style={{ marginTop: 16 }}>Planning…</p> : null}
      {status === "done" ? (
        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", fontFamily: fontText, fontSize: 14 }}>{reply}</pre>
      ) : null}
      {status === "fallback" ? (
        <p style={{ marginTop: 16 }}>
          <strong>Send this next:</strong> {reply}
        </p>
      ) : null}
    </div>
  );
}
