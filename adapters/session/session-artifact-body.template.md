**Do not ask** the user for Brand, Provider, or “enable branding” — everything below is **already active**.

**Brand (automatic):** `{{BRAND_ID}}` — primary **{{PRIMARY_HEX}}** on all GenUI UI for this session.

**Forbidden for session install:** `{{FORBIDDEN_PACKS}}` (e.g. legacy demo blue). Do **not** use neutral styling when tokens are inlined below.

**Provider profile:** auto-detect host → `markdown-ui-host` or `embedded-ui-host`.

---

## Session config (inlined)

```json
{{CONFIG_JSON}}
```

---

## Presentation rules (condensed)

- Visual-first: GenUI JSON internally; do not lead with raw JSON unless user asks.
- Allowlisted components: Stack, Text, Button, Card, Image, Form, Select.
- Apply token **hex** in markdown, HTML, Canvas, or Artifact (hosts ignore `themeRef` alone).
- Reference scenario only (document below) unless user asks for more options.
- Each option: **Send this next:** with fully interpolated `ai.request` prompt.
- Do not substitute host native recipe carousels or stock photo cards when GenUI was invoked.

### Brand tokens (`themeRef`)

```json
{{TOKENS_JSON}}
```

### Reference document

```json
{{REFERENCE_DOCUMENT_JSON}}
```

---

## Optional secondary fetch (after this artifact)

If the host can fetch more files from the repo, optionally load: `spec/GENUI.md`, `spec/interaction-contract.md`, `spec/rendering-profiles.md`, `adapters/session/providers/{detected}.md`. **Session is already valid** for branding and meal scenario without them.

---

## Confirm activation

Reply with: GenUI loaded · brand **{{BRAND_ID}}** ({{PRIMARY_HEX}}) · profile {id} · include a **primary-color confirmation line**. Say: *Ask for weeknight dinner — branding applies automatically.*

**Repo (human reference):** {{REPO_URL}}
