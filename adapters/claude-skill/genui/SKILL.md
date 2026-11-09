---
name: genui
description: Renders GenUI option pickers and charts as branded UI (brand 917v, primary #2F63D6). Use when the user asks to pick or plan between options such as a weeknight dinner, or to visualize, chart, graph, or compare quantities, or mentions GenUI. Dinner prompts use the inlined meal reference. Chart prompts use a Chart component drawn in the host, never a third-party chart script or a host-native planner.
---

<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI (Claude Skill)

**installVersion: `4365f57e`**

This is the persistent form of the GenUI session install (same rules as `adapters/session/SESSION-INSTALL.md` in https://github.com/noahtan917/gen-ui). Everything required is inlined below — do **not** fetch anything from GitHub.

**As a Skill:** skip the “Confirm activation” step below unless the user asks whether GenUI is active (then reply with the confirmation line including installVersion **4365f57e**). Go straight to rendering the reference Artifact for option-picking prompts.

**Do not ask** the user for Brand, Provider, or “enable branding” — everything below is **already active**.

**Brand (automatic):** `917v` — primary **#2F63D6** on all GenUI UI for this session.

**Brand rules:** Use that primary only for the primary button, links, the selected state, and focus. Cards are flat: `radius.md`, a 1px keyline, no drop shadow. Buttons and inputs use `radius.sm` and are at least 44px tall; hover is `primaryHover` and press is `primaryPressed`. Sentence case. Use the text and display font stacks from the tokens below.

**Forbidden for session install:** ``demo`` (e.g. legacy demo blue). Do **not** use neutral styling when tokens are inlined below.

**Provider profile:** auto-detect host → `markdown-ui-host` or `embedded-ui-host`.

---

## Session config (inlined)

```json
{
  "defaultBrandPack": "917v",
  "forbiddenBrandPacks": [
    "demo"
  ],
  "referenceScenario": "meal-planning",
  "referenceDocument": "adapters/session/examples/meal-planning.document.json",
  "openuiOutput": true
}
```

---

## Presentation rules (condensed)

- Visual-first: GenUI JSON internally; do not lead with raw JSON unless user asks. After the visual, every reply ends with one fenced `openui` block for that same UI (dinner: the reference OpenUI program later in this install; chart: a `Chart` program with the same series and rows).
- Allowlisted components: Stack, Text, Button, Card, Image, Form, Select, Chart.
- **Charts:** when the user asks to visualize, chart, graph, or compare quantities, include a `Chart`. `chartType` is `bar`, `column`, or `stacked-bar`. `series` is `{key, label, color?}[]`. `data` rows have `label` plus one number per series key. Optional `stateKey` keeps rows whose field equals `state[stateKey]` — pair it with a `Select` on that key. `ariaLabel` is required. Series colors default to brand primary, then `#DB6E4F`, `#8EA1BD`, `#52BCD5`, `#DA4E8F`. Draw the bars in the host from that data (div widths or SVG). Do not load amCharts, Chart.js, or any other chart script. Dinner requests stay on the meal reference and do not add a chart.
- Apply token **hex** in markdown, HTML, Canvas, or Artifact (hosts ignore `themeRef` alone).
- **Exactly the reference options:** render **only** the cards in the reference document below (for meal planning: exactly the two meals — *Sheet-pan salmon* and *Miso ramen bowl*). Do **not** invent additional meals, and do **not** add time filters, difficulty toggles, sliders, search boxes, or any widget not present in the document.
- **Every GenUI reply, not just install:** re-apply these rules on each turn. A weeknight-dinner / "pick a dinner" / "what should I cook" prompt **must** render this document — never defer to a host-native planner, even after install was confirmed in prose on an earlier turn.
- Reference scenario only (document below) unless the user **explicitly** asks for more options or variety.
- **markdown-ui-host:** each option includes **Send this next:** with the fully interpolated `ai.request` prompt (for meal planning, the resolved `planMeal` prompt per card).
- **Forbidden substitutions when GenUI was invoked:** host-native recipe/meal carousels or planners, card-grid pickers, stock photo cards, time/"weeknight" filters, "Plan this"-style chips, and host-default chrome. Use the token **primary** color, not the host default.
- **embedded-ui-host:** build a **custom React Artifact** bound to **exactly** these option cards, with inlined `#2F63D6` accent styling (titles, borders, buttons), mirroring the structure of the **reference Artifact layout** below (inlined — do not fetch it). On click, call `window.claude.complete` with the fully interpolated prompt and render the returned plan in the Artifact. Do **not** ask the user to copy or paste it. If `window.claude.complete` is missing, show **Send this next:** with that prompt. Do **not** emit Claude's built-in interactive meal/recipe UI.

### Brand tokens (`themeRef`)

```json
{
  "source": "917v",
  "id": "917v",
  "colors": {
    "primary": "#2F63D6",
    "primaryHover": "#2551B6",
    "primaryPressed": "#1A3A8C",
    "onPrimary": "#FFFFFF",
    "surface": "#F4F6F9",
    "surfaceElevated": "#FFFFFF",
    "text": "#0A0C11",
    "textMuted": "#586173",
    "border": "#D8DEE7",
    "focus": "#2F63D6"
  },
  "typography": {
    "fontFamily": "\"Instrument Sans\", \"Helvetica Neue\", Arial, sans-serif",
    "fontFamilyDisplay": "\"Archivo\", \"Helvetica Neue\", Arial, sans-serif",
    "fontFamilyMono": "\"JetBrains Mono\", ui-monospace, Menlo, Consolas, monospace",
    "scale": {
      "body": "16px",
      "heading": "26px",
      "caption": "13px"
    }
  },
  "radius": {
    "sm": "4px",
    "md": "6px"
  }
}
```

### Reference document

```json
{
  "genuiVersion": "1.0.0",
  "themeRef": {
    "source": "917v",
    "id": "917v"
  },
  "actions": {
    "planMeal": {
      "type": "ai.request",
      "promptTemplate": "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
      "contextKeys": [
        "meal",
        "cuisine"
      ]
    }
  },
  "components": [
    {
      "id": "layout",
      "type": "Stack",
      "props": {
        "direction": "column",
        "gap": 16
      },
      "children": [
        {
          "id": "heading",
          "type": "Text",
          "props": {
            "variant": "heading",
            "content": "What do you want to cook?"
          }
        },
        {
          "id": "cards",
          "type": "Stack",
          "props": {
            "direction": "row",
            "gap": 12
          },
          "children": [
            {
              "id": "card-salmon",
              "type": "Card",
              "actionId": "planMeal",
              "props": {
                "title": "Sheet-pan salmon",
                "subtitle": "Mediterranean",
                "context": {
                  "meal": "Sheet-pan salmon",
                  "cuisine": "Mediterranean"
                }
              }
            },
            {
              "id": "card-ramen",
              "type": "Card",
              "actionId": "planMeal",
              "props": {
                "title": "Miso ramen bowl",
                "subtitle": "Japanese",
                "context": {
                  "meal": "Miso ramen bowl",
                  "cuisine": "Japanese"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

---

### Reference Artifact layout (`embedded-ui-host`)

Copy this structure for the Artifact (two cards). On select, call `window.claude.complete` and show the plan in the Artifact. Keep every option bound to the reference document above.

```tsx
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
```

### Host overlays (inlined — pick the one for your host)

Detect your host and apply its overlay. Capabilities only; brand and scenario always come from the config, tokens, and reference document above.

#### chatgpt-web

**Profile:** Prefer `embedded-ui-host` (Canvas / HTML). If unavailable → `markdown-ui-host`.

##### Host drift (L10)

| Symptom | Cause |
|---------|--------|
| Unrelated recipes, stock photos | ChatGPT native widgets override GenUI |
| Missing **Send this next:** | Overlay profile not applied |

Do **not** use the host’s default recipe carousel when the user invoked GenUI. Follow session-visual-guide.md and the reference document from config.

Brand and meals: **only** session-config.json + loaded tokens — not this file.

#### claude-web

**Profile:** `embedded-ui-host`

- **Build a React Artifact every turn** that an option-picker is needed (e.g. any weeknight-dinner / "what should I cook" prompt) — not just at install. Re-apply these rules on each reply; a prose "GenUI loaded" confirmation on an earlier turn does **not** exempt later turns.
- Bind the Artifact to **exactly** the cards in the reference document (for meal planning: the two meals only). Do **not** invent extra options.
- Style using colors from the loaded brand token file (see config `defaultBrandPack`); use the token **primary** for accents, not Claude's default.
- Layout example: meal-artifact.reference.tsx (inlined in SESSION-INSTALL — do not fetch) — copy structure, not hardcoded colors from this file.
- **Install:** the user message must contain the raw SESSION-INSTALL URL (Claude only fetches user-supplied links; GitHub robots-blocks repo browsing). Persistent alternative: the generated Claude Skill (`adapters/claude-skill/genui.zip`).
- On click: call `window.claude.complete` with the fully interpolated `ai.request` prompt and render the returned plan inside the Artifact. Do not ask the user to copy or paste it. If `window.claude.complete` is missing, fall back to **Send this next:** per interactive-ui-guide.md.
- **Do not** emit Claude's native patterns here: the built-in meal/recipe planner, card-grid pickers, time/"weeknight" filters, "Plan this"-style chips, invented meals, or blue/default chrome.
- If Artifacts unavailable → `markdown-ui-host` per session-visual-guide.md.

#### deepseek-chat

**Profile:** `markdown-ui-host`

- Present branded markdown cards per session-visual-guide.md.
- Each card includes **Send this next:** with the interpolated `ai.request` message.
- Optional collapsible GenUI JSON for developers.
- If embedded UI becomes available, switch to `embedded-ui-host` without changing spec.

#### gemini-app

**Profile:** `markdown-ui-host` by default in Gemini chat. Do **not** dump raw GenUI JSON as the first response.

Use `embedded-ui-host` only when Gemini Canvas explicitly supports an interactive panel (product-dependent).

**GitHub:** Gemini chat **cannot** fetch from a URL. User must paste ../PASTE-BUNDLE.md (same policy as ../SESSION-INSTALL.md; see ../../../docs/install-gemini.md).

Interactions: session-visual-guide.md.

**Gemini CLI:** ../../gemini/GEMINI.md, not this overlay.

#### generic-chat

Detect the product (Claude, ChatGPT, Gemini, DeepSeek, Grok, other).

1. Embedded React/HTML UI available → `embedded-ui-host` (claude-web.md capabilities).
2. Else → `markdown-ui-host` (deepseek-chat.md capabilities).

Brand, scenario, and colors: session-config.json + session-visual-guide.md only.

#### grok-chat

**Profile:** `markdown-ui-host`

- Branded markdown cards + **Send this next:** per session-visual-guide.md.
- Same GenUI JSON and reference document as other providers.

---

## No further fetches

This file is **complete**. Do **not** fetch other repo files (spec, tokens, overlays, examples) — they are already inlined above, and GitHub blocks most repo paths for AI fetchers. If a fetch was attempted and failed, **ignore the failure and continue**: the install is still valid.

---

## Output format: OpenUI Lang (openui.com)

Every GenUI reply includes **one** fenced `openui` block for the UI just shown. Put the visual first (markdown cards or the React artifact). Do not lead with JSON. Do not wait for the user to ask for OpenUI.

OpenUI Lang is line-based: one `identifier = Expression` per line, `root = Stack([...])` first, positional arguments only. Use **only** these GenUI components (same catalog as the GenUI JSON contract):

```text
Stack(children: (Stack | Text | Button | Card | Image | Form | Select | Chart)[], direction?: "row" | "column", gap?: number, align?: string) — Layout container. direction defaults to column; gap is in px.
Text(content: string, variant?: string) — Text block. variant: "heading" | "body" (default body).
Button(label: string, action?: ActionExpression) — Clickable button. Bind action to @ToAssistant(...) or Action([@Set(...)]).
Card(title?: string, subtitle?: string, children?: (Stack | Text | Button | Card | Image | Form | Select | Chart)[], action?: ActionExpression) — Card with optional title/subtitle; the whole card is clickable when action is set.
Image(src: string, alt?: string) — Image. Always provide alt text.
Form(children: (Stack | Text | Button | Card | Image | Form | Select | Chart)[], action: ActionExpression, submitLabel?: string) — Form container; action runs on submit.
Select(value: $binding<string>, options: {value: string, label: string}[], label?: string) — Dropdown bound to a $variable, e.g. Select($cuisine, [{value: "jp", label: "Japanese"}], "Cuisine").
Chart(ariaLabel: string, series: {key: string, label: string, color?: string}[], data: Record<string, string | number>[], chartType?: "bar" | "column" | "stacked-bar", unit?: string, stateKey?: string, filter?: $binding<string>, action?: ActionExpression) — Bar, column, or stacked-bar chart. series is [{key, label, color?}]; data rows include label and one number per series key. Pass filter as $stateKey (and the same stateKey string) to show only the selected rows. Optional action runs when a category is clicked.
```

Rules:

- Actions: `@ToAssistant("<complete prompt>", {key: "value"})` for AI requests, `Action([@Set($var, value)])` for local state. Never use `@OpenUrl`, `@Run`, `@Reset`, `Query()`, `Mutation()` or `@functions`.
- Every clickable Card, Button and Form has an action. Bind every Select to a declared `$variable`. A Chart that filters with `stateKey` passes that same `$variable` as `filter`.
- Branding stays **917v** (#2F63D6). OpenUI Lang carries no theme, so the host applies the brand tokens above.
- **Dinner replies:** the fence is the reference program below (the two meals). Do not add meals or a chart.
- **Chart replies:** the fence is a `Chart` program (`bar`, `column`, or `stacked-bar`) with the same `ariaLabel`, `series`, and `data` rows drawn in the visual. Include the `Select` binding when the chart filters on `stateKey`.

Reference scenario as OpenUI Lang (equivalent to the reference GenUI document above):

```openui
root = Stack([layout])
layout = Stack([heading, cards], "column", 16)
heading = Text("What do you want to cook?", "heading")
cards = Stack([cardSalmon, cardRamen], "row", 12)
cardSalmon = Card("Sheet-pan salmon", "Mediterranean", null, @ToAssistant("Help me cook Sheet-pan salmon (Mediterranean): ingredient list, steps, and total time for a weeknight dinner.", {meal: "Sheet-pan salmon", cuisine: "Mediterranean", title: "Sheet-pan salmon", subtitle: "Mediterranean", genui: {actionId: "planMeal", componentId: "card-salmon", action: {type: "ai.request", promptTemplate: "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.", contextKeys: ["meal", "cuisine"]}, propsContext: {meal: "Sheet-pan salmon", cuisine: "Mediterranean"}}}))
cardRamen = Card("Miso ramen bowl", "Japanese", null, @ToAssistant("Help me cook Miso ramen bowl (Japanese): ingredient list, steps, and total time for a weeknight dinner.", {meal: "Miso ramen bowl", cuisine: "Japanese", title: "Miso ramen bowl", subtitle: "Japanese", genui: {actionId: "planMeal", componentId: "card-ramen", action: {type: "ai.request", promptTemplate: "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.", contextKeys: ["meal", "cuisine"]}, propsContext: {meal: "Miso ramen bowl", cuisine: "Japanese"}}}))
```

---

## Confirm activation

Reply with: GenUI loaded · installVersion **4365f57e** · brand **917v** (#2F63D6) · profile {id} · include a **primary-color confirmation line**. Say: *Ask for weeknight dinner — branding applies automatically.*

**Repo (human reference):** https://github.com/noahtan917/gen-ui

