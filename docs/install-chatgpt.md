# Install GenUI on ChatGPT (web)

ChatGPT can **load** the skill from a public GitHub URL (as in your test). Visual output may still **differ from Claude** — see [LIMITATIONS-AND-CAUSES.md](LIMITATIONS-AND-CAUSES.md) (L10).

## Install

```text
Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui
```

On repo URL install, the model must fetch [SESSION-INSTALL.md](../adapters/session/SESSION-INSTALL.md) in full (see [INSTALL-SKILL.md](../INSTALL-SKILL.md)).

## Ask (strict demo)

```text
Help me pick a weeknight dinner — show GenUI with ONLY the two reference meals
(Sheet-pan salmon, Miso ramen bowl), 917V brand primary #2F63D6, and Send this next for each.
Do not use stock photo recipe cards.
```

## If the reply looks generic (your case)

Paste:

```text
You drifted from GenUI. Use exactly two options from meal-planning.document.json:
1) Sheet-pan salmon (Mediterranean)
2) Miso ramen bowl (Japanese)
Style with 917V #2F63D6, a light header, and flat cards. Each option needs Send this next with the planMeal prompt.
```

## Best proof of branding + auto-answer

Local: `pnpm demo` — `@gen-ui/render`, 917V tokens, click a card → **Assistant** streams the plan (mock LLM; no copy-paste).
