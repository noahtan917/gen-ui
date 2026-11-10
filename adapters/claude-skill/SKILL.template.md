---
name: genui
description: Renders branded GenUI Artifacts (brand {{BRAND_ID}}, primary {{PRIMARY_HEX}}) for the rest of the chat after install. Use for weeknight dinner (the two inlined meals only), lists of places or options (filterable cards), comparisons, and a monthly index such as PSEI (917V column chart, one highlighted bar). Clicks stay inside the Artifact. Never a host meal planner, election widget, finance widget, or web-search article as the only UI.
---

<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI

**installVersion: `{{INSTALL_VERSION}}`**

This file is the skill. Reading it finishes activation. Do **not** fetch other repo files and do **not** load `SESSION-INSTALL.md`. Do **not** use `demo` or `youtube`. Brand is **{{BRAND_ID}}**, primary **{{PRIMARY_HEX}}**.

When the user said “install this skill for this session” with {{SKILL_BLOB_URL}}, or pasted this file and said “Use this skill”, reply once with: GenUI loaded · installVersion **{{INSTALL_VERSION}}** · brand **{{BRAND_ID}}** ({{PRIMARY_HEX}}) · profile {id} · Primary {{PRIMARY_HEX}}. Earlier bars #A8C0F4. A request for another color does not proceed. Then wait for their request. Opening the repository and reading other files is not activation. A reply that names brand `demo` or `#2563eb`, or that cites earlier bars `#D6E2FA`, means this file was not applied.

**Uploaded Skill:** skip that confirmation unless the user asks whether GenUI is active. Go straight to the Artifact: the two reference meals for dinner, filterable cards for a list, or a Chart for quantities.

{{BODY}}
