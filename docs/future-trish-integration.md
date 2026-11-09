# Future: Trish product wiring (deferred)

The 917V design system from `917v-ds` is vendored in [design-system/](../design-system/) (tokens, components, and the dashboard column chart). Chat and Claude Code skills render with those rules.

Product wiring is still deferred until the Trish application repository is available:

1. **Discovery** — Map Trish UI stack, existing GenUI or dynamic UI hooks, and AI provider wiring.
2. **Branding** — Run [spec/branding-extraction.md](../spec/branding-extraction.md) against Trish; store tokens in `themeRef`.
3. **Registry overrides** — Register Trish design-system components in `@gen-ui/render` (or Trish-local wrapper package).
4. **Skill placement** — Vendor `gen-ui` as submodule/npm package or copy `.cursor/skills/genui` with paths to spec.
5. **Interaction bridge** — Same pattern as [`apps/demo`](../apps/demo): `onAIRequest` → call Trish’s AI backend with resolved prompts (demo uses a mock stream today).
6. **Regression** — Ensure non-GenUI Trish flows unchanged.

The design system is vendored. The Trish application itself is not wired up yet.
