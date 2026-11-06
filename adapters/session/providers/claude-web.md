# Provider overlay: claude-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/session-config.json](../../../spec/session-config.json).

**Profile:** `embedded-ui-host`

- **Build a React Artifact every turn** that an option-picker is needed (e.g. any weeknight-dinner / "what should I cook" prompt) — not just at install. Re-apply these rules on each reply; a prose "GenUI loaded" confirmation on an earlier turn does **not** exempt later turns.
- Bind the Artifact to **exactly** the cards in the reference document (for meal planning: the two meals only). Do **not** invent extra options.
- Style using colors from the loaded brand token file (see config `defaultBrandPack`); use the token **primary** for accents, not Claude's default.
- Layout example: [meal-artifact.reference.tsx](../examples/meal-artifact.reference.tsx) (inlined in SESSION-INSTALL — do not fetch) — copy structure, not hardcoded colors from this file.
- **Install:** the user message must contain the raw SESSION-INSTALL URL (Claude only fetches user-supplied links; GitHub robots-blocks repo browsing). Persistent alternative: the generated Claude Skill (`adapters/claude-skill/genui.zip`).
- On click: call `window.claude.complete` with the fully interpolated `ai.request` prompt and render the returned plan inside the Artifact. Do not ask the user to copy or paste it. If `window.claude.complete` is missing, fall back to **Send this next:** per [interactive-ui-guide.md](../interactive-ui-guide.md).
- **Do not** emit Claude's native patterns here: the built-in meal/recipe planner, card-grid pickers, time/"weeknight" filters, "Plan this"-style chips, invented meals, or blue/default chrome.
- If Artifacts unavailable → `markdown-ui-host` per [session-visual-guide.md](../../../spec/session-visual-guide.md).
