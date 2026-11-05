---
name: genui
description: Renders GenUI interactive option pickers as a branded custom React Artifact (brand youtube, primary #FF0000). Use whenever the user asks to pick, choose, or plan between options such as "help me pick a weeknight dinner" or "what should I cook", or mentions GenUI. Always build the custom Artifact from the inlined reference document instead of Claude's built-in meal or recipe planner.
---

<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI (Claude Skill)

**installVersion: `96b9f578`**

This is the persistent form of the GenUI session install (same rules as `adapters/session/SESSION-INSTALL.md` in https://github.com/noahtan917/gen-ui). Everything required is inlined below — do **not** fetch anything from GitHub.

**As a Skill:** skip the “Confirm activation” step below unless the user asks whether GenUI is active (then reply with the confirmation line including installVersion **96b9f578**). Go straight to rendering the reference Artifact for option-picking prompts.

**Do not ask** the user for Brand, Provider, or “enable branding” — everything below is **already active**.

**Brand (automatic):** `youtube` — primary **#FF0000** on all GenUI UI for this session.

**Forbidden for session install:** ``demo`` (e.g. legacy demo blue). Do **not** use neutral styling when tokens are inlined below.

**Provider profile:** auto-detect host → `markdown-ui-host` or `embedded-ui-host`.

---

## Session config (inlined)

```json
{
  "defaultBrandPack": "youtube",
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

- Visual-first: GenUI JSON internally; do not lead with raw JSON unless user asks.
- Allowlisted components: Stack, Text, Button, Card, Image, Form, Select.
- Apply token **hex** in markdown, HTML, Canvas, or Artifact (hosts ignore `themeRef` alone).
- **Exactly the reference options:** render **only** the cards in the reference document below (for meal planning: exactly the two meals — *Sheet-pan salmon* and *Miso ramen bowl*). Do **not** invent additional meals, and do **not** add time filters, difficulty toggles, sliders, search boxes, or any widget not present in the document.
- **Every GenUI reply, not just install:** re-apply these rules on each turn. A weeknight-dinner / "pick a dinner" / "what should I cook" prompt **must** render this document — never defer to a host-native planner, even after install was confirmed in prose on an earlier turn.
- Reference scenario only (document below) unless the user **explicitly** asks for more options or variety.
- Each option: **Send this next:** with fully interpolated `ai.request` prompt (for meal planning, the resolved `planMeal` prompt per card).
- **Forbidden substitutions when GenUI was invoked:** host-native recipe/meal carousels or planners, card-grid pickers, stock photo cards, time/"weeknight" filters, "Plan this"-style chips, and any blue/neutral/default host chrome. Use the token **primary** color, not the host default.
- **embedded-ui-host:** build a **custom React Artifact** bound to **exactly** these option cards, with inlined `#FF0000` accent styling (titles, borders, buttons), mirroring the structure of the **reference Artifact layout** below (inlined — do not fetch it). On click, update Artifact state **and** surface **Send this next:** with the fully interpolated prompt. Do **not** emit Claude's built-in interactive meal/recipe UI.

### Brand tokens (`themeRef`)

```json
{
  "source": "youtube",
  "id": "youtube",
  "colors": {
    "primary": "#FF0000",
    "primaryHover": "#CC0000",
    "surface": "#FFFFFF",
    "surfaceAlt": "#F9F9F9",
    "surfaceDark": "#0F0F0F",
    "text": "#0F0F0F",
    "textOnDark": "#FFFFFF",
    "textMuted": "#606060",
    "border": "#E5E5E5"
  },
  "typography": {
    "fontFamily": "Roboto, Arial, Helvetica, sans-serif",
    "scale": {
      "body": "1rem",
      "heading": "1.25rem",
      "caption": "0.875rem"
    }
  },
  "radius": {
    "sm": "4px",
    "md": "12px"
  }
}
```

### Reference document

```json
{
  "genuiVersion": "1.0.0",
  "themeRef": {
    "source": "youtube",
    "id": "youtube"
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

Copy this structure for the Artifact (two cards, **Send this next:** on select). Keep every option bound to the reference document above.

```tsx
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
- On click: update artifact state **and** chat-bridge text (**Send this next:** with the fully interpolated prompt) per interactive-ui-guide.md.
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

## Output format: OpenUI Lang (openui.com), when requested

Use this only when the user or host asks for **OpenUI** / **OpenUI Lang** output, or says the chat renders OpenUI. Otherwise keep the default GenUI behaviour above.

OpenUI Lang is line-based: one `identifier = Expression` per line, `root = Stack([...])` first, positional arguments only. Use **only** these GenUI components (same catalog as the GenUI JSON contract):

```text
Stack(children: (Stack | Text | Button | Card | Image | Form | Select)[], direction?: "row" | "column", gap?: number, align?: string) — Layout container. direction defaults to column; gap is in px.
Text(content: string, variant?: string) — Text block. variant: "heading" | "body" (default body).
Button(label: string, action?: ActionExpression) — Clickable button. Bind action to @ToAssistant(...) or Action([@Set(...)]).
Card(title?: string, subtitle?: string, children?: (Stack | Text | Button | Card | Image | Form | Select)[], action?: ActionExpression) — Card with optional title/subtitle; the whole card is clickable when action is set.
Image(src: string, alt?: string) — Image. Always provide alt text.
Form(children: (Stack | Text | Button | Card | Image | Form | Select)[], action: ActionExpression, submitLabel?: string) — Form container; action runs on submit.
Select(value: $binding<string>, options: {value: string, label: string}[], label?: string) — Dropdown bound to a $variable, e.g. Select($cuisine, [{value: "jp", label: "Japanese"}], "Cuisine").
```

Rules:

- Actions: `@ToAssistant("<complete prompt>", {key: "value"})` for AI requests, `Action([@Set($var, value)])` for local state. Never use `@OpenUrl`, `@Run`, `@Reset`, `Query()`, `Mutation()` or `@functions`.
- Every clickable Card, Button and Form has an action. Bind every Select to a declared `$variable`.
- Branding stays **youtube** (#FF0000). OpenUI Lang carries no theme, so the host applies the brand tokens above.
- Emit the program as the whole reply (or in a fenced `openui` block if the host mixes text and UI).

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

Reply with: GenUI loaded · installVersion **96b9f578** · brand **youtube** (#FF0000) · profile {id} · include a **primary-color confirmation line**. Say: *Ask for weeknight dinner — branding applies automatically.*

**Repo (human reference):** https://github.com/noahtan917/gen-ui

