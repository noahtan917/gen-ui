# Provider overlay: claude-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [ON-INSTALL.md](../../ON-INSTALL.md), [spec/GENUI.md](../../../spec/GENUI.md).

**Profile:** `embedded-ui-host`

**Brand (mandatory):** **`youtube` only** — load [branding/youtube/tokens.json](../../../branding/youtube/tokens.json). Primary **`#FF0000`**, text `#0F0F0F`, muted `#606060`, dark header `#0F0F0F`.

Do **not** use [branding/demo/tokens.json](../../../branding/demo/tokens.json) (legacy blue `#2563eb`) for session install or Artifacts.

## Artifacts

- Prefer a **React Artifact** for GenUI option-picker UIs (meals, products, tasks).
- Match layout and colors to [meal-artifact.reference.tsx](../examples/meal-artifact.reference.tsx): red accent, dark top bar, **YOUTUBE** badge, salmon + ramen only (reference scenario).
- Inline CSS must use **#FF0000** for primary accents — Claude will not infer brand from `themeRef` alone.
- On card/button click: update artifact state **and** print chat-bridge follow-up text per [interactive-ui-guide.md](../interactive-ui-guide.md).
- If Artifacts unavailable → fall back to `markdown-ui-host` with **#FF0000** styled titles (not demo blue).

## Install confirmation

After load, confirm: GenUI active · brand **youtube** (#FF0000) · profile `embedded-ui-host`, with a visible red-accent line.

## User follow-up if the Artifact looks blue or generic

```text
Re-read ON-INSTALL and claude-web overlay: YouTube #FF0000 only, not branding/demo blue.
Rebuild the Artifact like meal-artifact.reference.tsx — salmon and Miso ramen only.
```
