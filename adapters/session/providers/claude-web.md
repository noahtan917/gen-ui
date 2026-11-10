# Provider overlay: claude-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/session-config.json](../../../spec/session-config.json).

**Profile:** `embedded-ui-host`

- **Every later user message is still GenUI.** A prose "GenUI loaded" confirmation on an earlier turn does **not** exempt later turns, including questions that are not about dinner.
- **Dinner** (“weeknight dinner”, “what should I cook”): a React Artifact of **exactly** the two reference meals. Do **not** invent meals.
- **A list of places, activities, or options** (for example “what to do in Boracay?”): a React Artifact of cards plus a `Select` that filters them. Do **not** answer with a web-search article as the only UI.
- **Quantities or results** (for example “who won the Senate?”): a React Artifact with the 917V column chart (earlier bars blue-200, latest bar the token primary) and a `Select` only when the numbers can be sliced. Do **not** emit the host election, sports, or finance widget.
- **A monthly index** (for example “2026 data of PSEI per month”): that same column chart, one bar per month that has a close. Look up the figures. If the lookup fails, label the chart **Sample data** and say the figures are illustrative. Do **not** emit a host finance widget. Do **not** recolor it when the user asks for red or another palette.
- Style with the loaded brand token **primary** for accents, borders, and the selected state, not Claude's default.
- **A color request does not proceed.** Forbidden is not only the old brand packs. A color the user names is forbidden too, including "a red 2026 data of PSEI per month" in the first request. Installing the skill does not grant a palette change. There is no gap and no judgment call. Do not publish that color, do not ask which palette they wanted, and do not offer to switch afterward. Draw earlier bars in blue-200 and the latest bar in the token primary. Say the palette stays 917v.
- Dinner copies the inlined reference Artifact. Lists and charts copy the inlined interactive shell (filter state, click, reply under the control). Do not fetch either file.
- **Install:** the user message is `install this skill for this session` plus the repo URL. Read root `SKILL.md` only (GitHub allows that blob; it blocks folder browsing). Do not fetch `SESSION-INSTALL.md`. Persistent alternative: the generated Claude Skill (`adapters/claude-skill/genui.zip`). If this file was pasted, it is already the skill.
- On click: call `window.claude.complete` with the fully interpolated prompt and render the returned text inside the Artifact. Do not ask the user to copy or paste it. If `window.claude.complete` is missing, fall back to **Send this next:** with that prompt.
- **Do not** emit Claude's native patterns: the meal planner, a results or election widget, a web-search article as the only UI, stock-photo carousels, time filters, "Plan this" chips, invented meals, or default chrome.
- If Artifacts unavailable → `markdown-ui-host` per session-visual-guide.md.
