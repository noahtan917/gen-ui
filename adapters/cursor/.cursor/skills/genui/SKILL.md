---
name: genui
description: >-
  Generates provider-agnostic interactive GenUI documents (JSON DSL) with
  validated components, branding-aware themeRef, and ai.request actions.
  Use when building generative UI, dynamic interfaces, or GenUI documents.
---

# GenUI (Cursor adapter)

Copy this directory to your project's `.cursor/skills/genui/` or open the `gen-ui` repository in Cursor.

## Specification (source of truth)

Read from the repo root (adjust paths if vendored):

- `spec/GENUI.md`
- `spec/interaction-contract.md`
- `spec/branding-extraction.md`
- `spec/contracts/*.schema.json`

## Checklist

- [ ] Valid GenUI JSON only — see `genui-document.schema.json`
- [ ] Interaction-first: clicks map to `ai.request` actions
- [ ] Branding via `themeRef` for host sites

See [reference.md](../../../reference.md) for a meal card example.
