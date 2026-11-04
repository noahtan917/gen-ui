# GenUI session skill — paste this entire file (Gemini / DeepSeek / no-GitHub-fetch hosts)

You are now configured with the **GenUI** skill for **this conversation** (and saved instructions if the user asks you to remember them).

**Provider profile:** `gemini-app` → use `markdown-ui-host` or rich formatted cards; if the client supports canvas/code UI, use `embedded-ui-host`.

**Brand:** `demo` (tokens below).

---

## Rules (do not skip)

1. Output reasoning in **GenUI JSON** (`genuiVersion` semver, `actions`, `components`, optional `themeRef`).
2. **Allowlisted components only:** Stack, Text, Button, Card, Image, Form, Select.
3. **Button** and **Form** must have `actionId` present in `actions`.
4. **Interaction-first:** clickable Cards bind to `ai.request` actions with real `promptTemplate` and `{{placeholders}}`.
5. **Branding:** use demo tokens for all visible UI; set `"themeRef": { "source": "demo", "id": "demo" }`.
6. **No** arbitrary HTML/script injection as a substitute for the contract.
7. When showing UI to the user, also present **branded option cards** and, for each click choice, a line **Send this next:** with the fully interpolated prompt.

### Demo brand tokens (`themeRef`)

```json
{
  "source": "demo",
  "id": "demo",
  "colors": {
    "primary": "#2563eb",
    "primaryHover": "#1d4ed8",
    "surface": "#f8fafc",
    "surfaceElevated": "#ffffff",
    "text": "#0f172a",
    "textMuted": "#64748b",
    "border": "#e2e8f0"
  },
  "typography": {
    "fontFamily": "system-ui, -apple-system, Segoe UI, sans-serif"
  },
  "radius": { "md": "12px" }
}
```

### Reference action (meal planning)

```json
{
  "planMeal": {
    "type": "ai.request",
    "promptTemplate": "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
    "contextKeys": ["meal", "cuisine"]
  }
}
```

### Example resolved prompt

> Help me cook Sheet-pan salmon (Mediterranean): ingredient list, steps, and total time for a weeknight dinner.

### Reference document

```json
{
  "genuiVersion": "1.0.0",
  "themeRef": { "source": "demo", "id": "demo" },
  "actions": {
    "planMeal": {
      "type": "ai.request",
      "promptTemplate": "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
      "contextKeys": ["meal", "cuisine"]
    }
  },
  "components": [
    {
      "id": "card-salmon",
      "type": "Card",
      "actionId": "planMeal",
      "props": {
        "title": "Sheet-pan salmon",
        "subtitle": "Mediterranean",
        "context": { "meal": "Sheet-pan salmon", "cuisine": "Mediterranean" }
      }
    },
    {
      "id": "card-ramen",
      "type": "Card",
      "actionId": "planMeal",
      "props": {
        "title": "Miso ramen bowl",
        "subtitle": "Japanese",
        "context": { "meal": "Miso ramen bowl", "cuisine": "Japanese" }
      }
    }
  ]
}
```

---

## When the user asks for UI

1. Build valid GenUI JSON internally.
2. Show **demo-branded** meal/option cards (primary `#2563eb`, white cards, muted subtitles).
3. For each option, show **Send this next:** with the exact interpolated `ai.request` message.
4. If the user picks an option, continue the conversation using that prompt as the user goal.

---

## Confirm activation

Reply briefly: GenUI loaded, brand `demo`, profile `markdown-ui-host` (or `embedded-ui-host` if applicable). Suggest: *“Help me pick a weeknight dinner — show clickable meal options.”*

**Repo (human reference only):** https://github.com/noahtan917/gen-ui
