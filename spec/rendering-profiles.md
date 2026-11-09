# Rendering profiles (host capabilities)

GenUI behavior is **one spec**; **presentation** depends on what the host can run. Pick a profile per session (see [session-bootstrap.md](session-bootstrap.md)).

## Canonical model output

Always think in **GenUI JSON** ([`GENUI.md`](GENUI.md), [`contracts/`](contracts/)) plus the token file for [`defaultBrandPack`](session-config.json) under `branding/{id}/tokens.json` (unless the user explicitly requests another allowed pack) via `themeRef`. Adapters map that to the host UI. When [`session-config.json`](session-config.json) has `openuiOutput: true`, every chat reply also ends with one fenced OpenUI Lang program for the same UI.

## Profiles

| Profile ID | Typical hosts | Presentation | Interactivity |
|------------|---------------|--------------|---------------|
| `react-host` | Local app, [`apps/demo`](../apps/demo), embedded product | `@gen-ui/render` | Full: `genui.interact` → `onAIRequest` → **host calls LLM** (demo: mock stream) |
| `embedded-ui-host` | Claude Artifacts, some canvas-style UIs | React/HTML artifact styled with `themeRef` | In-ui answer via `window.claude.complete`; **Send this next** only if that API is missing |
| `json-visible-host` | Any chat with code blocks | Show GenUI JSON + short summary | User asks follow-ups; model uses `ai.request` text |
| `markdown-ui-host` | DeepSeek/Grok/text-only fallback | Branded markdown “cards”, numbered actions | Explicit follow-up messages per [`interaction-contract.md`](interaction-contract.md) |

## Chat-bridge (embedded-ui-host)

Hosts do not run `@gen-ui/render`. For each `ai.request` click:

1. **In-ui:** update artifact (expand card, tabs, selected state).
2. **Answer:** on Claude, call `window.claude.complete` with the interpolated `promptTemplate` and render the returned plan in the artifact. Do not ask the user to paste it. If that API is missing, show the same text as **Send this next:** so the user can send it manually.

Both steps use the **same** `actionId` and context keys — no provider-specific prompt wording in the core spec.

## Provider overlays

Platform quirks live only under [`adapters/session/providers/`](../adapters/session/providers/). They select a profile and note limits; they do **not** redefine GenUI rules.
