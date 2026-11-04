# Provider overlay: claude-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/session-config.json](../../../spec/session-config.json).

**Profile:** `embedded-ui-host`

- Prefer a **React Artifact** for option-picker UIs.
- Style using colors from the loaded brand token file (see config `defaultBrandPack`).
- Layout example: [meal-artifact.reference.tsx](../examples/meal-artifact.reference.tsx) — copy structure, not hardcoded colors from this file.
- On click: update artifact state **and** chat-bridge text per [interactive-ui-guide.md](../interactive-ui-guide.md).
- If Artifacts unavailable → `markdown-ui-host` per [session-visual-guide.md](../../../spec/session-visual-guide.md).
