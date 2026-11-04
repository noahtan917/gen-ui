---
name: genui
description: >-
  Generates provider-agnostic interactive GenUI documents (JSON DSL) with
  validated components, branding-aware themeRef, and ai.request actions.
  Use when building generative UI, dynamic interfaces, or GenUI documents.
---

# GenUI (Cursor)

Follow the **central specification** — do not duplicate rules here.

## Required reading

1. [spec/GENUI.md](../../../spec/GENUI.md) — engineering spec and component catalog
2. [spec/interaction-contract.md](../../../spec/interaction-contract.md) — events and AI prompts
3. [spec/branding-extraction.md](../../../spec/branding-extraction.md) — host site tokens
4. [spec/contracts/](../../../spec/contracts/) — JSON Schema

## Output

Emit a single JSON object matching `genui-document.schema.json`.

## Chat / other web GenAI

For session install (Claude, ChatGPT, Gemini app, DeepSeek, Grok), use [adapters/session/SKILL.md](../../../adapters/session/SKILL.md) and [INSTALL-SKILL.md](../../../INSTALL-SKILL.md) — same spec, provider overlays only.

## Checklist

- [ ] `genuiVersion` semver (e.g. `1.0.0`)
- [ ] Every `Button` / `Form` has `actionId` present in `actions`
- [ ] Interactive cards bind meaningful `ai.request` prompts with `{{placeholders}}`
- [ ] No raw HTML, script, or unknown component types
- [ ] Include `themeRef` when targeting an existing website

## Examples

See [adapters/cursor/reference.md](../../../adapters/cursor/reference.md).
