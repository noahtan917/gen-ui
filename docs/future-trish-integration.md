# Future: Trish integration (deferred)

Checklist when the Trish repository is available:

1. **Discovery** — Map Trish UI stack, existing GenUI or dynamic UI hooks, and AI provider wiring.
2. **Branding** — Run [spec/branding-extraction.md](../spec/branding-extraction.md) against Trish; store tokens in `themeRef`.
3. **Registry overrides** — Register Trish design-system components in `@gen-ui/render` (or Trish-local wrapper package).
4. **Skill placement** — Vendor `gen-ui` as submodule/npm package or copy `.cursor/skills/genui` with paths to spec.
5. **Interaction bridge** — Implement Trish `onAIRequest` to call the existing AI backend with resolved prompts.
6. **Regression** — Ensure non-GenUI Trish flows unchanged.

No Trish-specific code belongs in this repository until integration begins.
