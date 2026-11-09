---
name: genui
description: Renders GenUI option pickers and charts as branded UI (brand {{BRAND_ID}}, primary {{PRIMARY_HEX}}). Use when the user asks to pick or plan between options such as a weeknight dinner, or to visualize, chart, graph, or compare quantities, or mentions GenUI. Dinner prompts use the inlined meal reference. Chart prompts use a Chart component drawn in the host, never a third-party chart script or a host-native planner.
---

<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI (Claude Skill)

**installVersion: `{{INSTALL_VERSION}}`**

This is the persistent form of the GenUI session install (same rules as `adapters/session/SESSION-INSTALL.md` in {{REPO_URL}}). Everything required is inlined below — do **not** fetch anything from GitHub.

**As a Skill:** skip the “Confirm activation” step below unless the user asks whether GenUI is active (then reply with the confirmation line including installVersion **{{INSTALL_VERSION}}**). Go straight to rendering the reference Artifact for option-picking prompts.

{{BODY}}
