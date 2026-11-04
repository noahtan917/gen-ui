# Rendering profiles (host capabilities)

GenUI behavior is **one spec**; **presentation** depends on what the host can run. Pick a profile per session (see [session-bootstrap.md](session-bootstrap.md)).

## Canonical model output

Always think in **GenUI JSON** ([`GENUI.md`](GENUI.md), [`contracts/`](contracts/)) plus [`branding/demo/tokens.json`](../branding/demo/tokens.json) or extracted `themeRef`. Adapters map that to the host UI.

## Profiles

| Profile ID | Typical hosts | Presentation | Interactivity |
|------------|---------------|--------------|---------------|
| `react-host` | Local app, Vite demo, embedded product | `@gen-ui/render` | Full: `genui.interact` → `onAIRequest` |
| `embedded-ui-host` | Claude Artifacts, some canvas-style UIs | React/HTML artifact styled with `themeRef` | In-ui state + **chat-bridge** (see below) |
| `json-visible-host` | Any chat with code blocks | Show GenUI JSON + short summary | User asks follow-ups; model uses `ai.request` text |
| `markdown-ui-host` | DeepSeek/Grok/text-only fallback | Branded markdown “cards”, numbered actions | Explicit follow-up messages per [`interaction-contract.md`](interaction-contract.md) |

## Chat-bridge (embedded-ui-host)

Hosts do not run `@gen-ui/render`. For each `ai.request` click:

1. **In-ui:** update artifact (expand card, tabs, selected state).
2. **In-chat:** emit the interpolated user message from `promptTemplate` (same as [`interaction-contract.md`](interaction-contract.md)) so the next turn continues planning.

Both steps use the **same** `actionId` and context keys — no provider-specific prompt wording in the core spec.

## Provider overlays

Platform quirks live only under [`adapters/session/providers/`](../adapters/session/providers/). They select a profile and note limits; they do **not** redefine GenUI rules.
