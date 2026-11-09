# Install GenUI on ChatGPT (web)

Send the same prompt as Claude. ChatGPT opens root [SKILL.md](../SKILL.md). Visual output may still **differ from Claude** — see [LIMITATIONS-AND-CAUSES.md](LIMITATIONS-AND-CAUSES.md) (L10).

## Install

```text
install this skill for this session https://github.com/noahtan917/gen-ui/blob/main/SKILL.md
```

The model must read root `SKILL.md` in full (see [INSTALL-SKILL.md](../INSTALL-SKILL.md)). Do not load `SESSION-INSTALL.md`.

## Ask (strict demo)

```text
Help me pick a weeknight dinner — show GenUI with ONLY the two reference meals
(Sheet-pan salmon, Miso ramen bowl), 917V brand primary #2F63D6, and Send this next for each.
Do not use stock photo recipe cards.
```

## If the reply looks generic (your case)

Paste:

```text
You drifted from GenUI. Use exactly two options from the skill reference document:
1) Sheet-pan salmon (Mediterranean)
2) Miso ramen bowl (Japanese)
Style with 917V #2F63D6, a light header, and flat cards. Each option needs Send this next with the planMeal prompt.
```

## Best proof of branding + auto-answer

Local: `pnpm demo` — `@gen-ui/render`, 917V tokens, click a card → **Assistant** streams the plan (mock LLM; no copy-paste).
