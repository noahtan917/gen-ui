---
name: genui
description: Renders GenUI option pickers and charts as branded UI (brand {{BRAND_ID}}, primary {{PRIMARY_HEX}}). Use when the user asks to pick or plan between options such as a weeknight dinner, or to visualize, chart, graph, or compare quantities, or mentions GenUI. Dinner prompts use the inlined meal reference. Chart prompts use a Chart component drawn in the host, never a third-party chart script or a host-native planner.
---

<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI

**installVersion: `{{INSTALL_VERSION}}`**

This file is the skill. Reading it finishes activation. Do **not** fetch other repo files and do **not** load `SESSION-INSTALL.md`. Do **not** use `demo` or `youtube`. Brand is **{{BRAND_ID}}**, primary **{{PRIMARY_HEX}}**.

When the user said “install this skill for this session” with {{REPO_URL}}, or pasted this file and said “Use this skill”, reply once with: GenUI loaded · installVersion **{{INSTALL_VERSION}}** · brand **{{BRAND_ID}}** ({{PRIMARY_HEX}}) · profile {id} · and a primary-color line. Then wait for their request.

**Uploaded Skill:** skip that confirmation unless the user asks whether GenUI is active. Go straight to rendering the reference Artifact for option-picking prompts.

{{BODY}}
