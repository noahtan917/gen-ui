/**
 * Reference only — for embedded-ui-host (Artifacts / canvas-style UIs).
 */
import { useState } from "react";

const tokens = {
  primary: "#FF0000",
  surface: "#F9F9F9",
  text: "#0F0F0F",
  textMuted: "#606060",
  border: "#E5E5E5",
  header: "#0F0F0F",
  radius: "12px",
};

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

export default function MealGenUIReference() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = meals.find((m) => m.id === selected);

  return (
    <div style={{ fontFamily: "Roboto, Arial, sans-serif", color: tokens.text, background: tokens.surface, padding: 16 }}>
      <div style={{ background: tokens.header, color: "#fff", padding: "8px 12px", margin: "-16px -16px 16px", borderBottom: `3px solid ${tokens.primary}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: tokens.primary, background: "#fff", padding: "2px 6px", borderRadius: 4 }}>YOUTUBE</span>
      </div>
      <h2 style={{ marginTop: 0 }}>What do you want to cook?</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {meals.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelected(m.id)}
            style={{
              textAlign: "left",
              cursor: "pointer",
              background: "#fff",
              border: `1px solid ${selected === m.id ? tokens.primary : tokens.border}`,
              borderRadius: tokens.radius,
              padding: 16,
              minWidth: 160,
            }}
          >
            <strong>{m.title}</strong>
            <div style={{ color: tokens.textMuted, fontSize: 14 }}>{m.cuisine}</div>
          </button>
        ))}
      </div>
      {active ? (
        <p style={{ marginTop: 16 }}>
          <strong>Send this next:</strong> {active.bridgePrompt}
        </p>
      ) : null}
    </div>
  );
}
