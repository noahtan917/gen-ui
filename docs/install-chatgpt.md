# Install GenUI on ChatGPT (web)

ChatGPT can **load** the skill from a public GitHub URL (as in your test). Visual output may still **differ from Claude** — see [LIMITATIONS-AND-CAUSES.md](LIMITATIONS-AND-CAUSES.md) (L10).

## Install

```text
Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui
```

YouTube brand and full spec load **automatically** (see [ON-INSTALL.md](../adapters/session/ON-INSTALL.md)).

## Ask (strict demo)

```text
Help me pick a weeknight dinner — show GenUI with ONLY the two reference meals
(Sheet-pan salmon, Miso ramen bowl), demo brand primary #2563eb, and Send this next for each.
Do not use stock photo recipe cards.
```

## If the reply looks generic (your case)

Paste:

```text
You drifted from GenUI. Use exactly two options from meal-planning.document.json:
1) Sheet-pan salmon (Mediterranean)
2) Miso ramen bowl (Japanese)
Style with #2563eb / #64748b. Each option needs Send this next with the planMeal prompt.
```

## Best proof of branding + clicks

Local: `pnpm demo` (uses `@gen-ui/render` and demo tokens).
