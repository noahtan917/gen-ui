---
name: genui
description: Renders GenUI interactive option pickers as a branded custom React Artifact (brand {{BRAND_ID}}, primary {{PRIMARY_HEX}}). Use whenever the user asks to pick, choose, or plan between options such as "help me pick a weeknight dinner" or "what should I cook", or mentions GenUI. Always build the custom Artifact from the inlined reference document instead of Claude's built-in meal or recipe planner.
---

<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI (Claude Skill)

**installVersion: `{{INSTALL_VERSION}}`**

This is the persistent form of the GenUI session install (same rules as `adapters/session/SESSION-INSTALL.md` in {{REPO_URL}}). Everything required is inlined below — do **not** fetch anything from GitHub.

**As a Skill:** skip the “Confirm activation” step below unless the user asks whether GenUI is active (then reply with the confirmation line including installVersion **{{INSTALL_VERSION}}**). Go straight to rendering the reference Artifact for option-picking prompts.

{{BODY}}
