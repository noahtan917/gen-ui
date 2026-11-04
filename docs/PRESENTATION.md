# GenUI — Presentation deck (copy to PowerPoint / Google Slides)

**Suggested length:** 12–15 minutes + 5 min Q&A  
**Audience:** Engineering / product stakeholders

Use one slide per `---` section below. Speaker notes are in *italics*.

---

## Slide 1 — Title

**Provider-Agnostic Generative UI (GenUI)**  
One skill. Many AI providers. Interactive, branded UI.

Noah Tan · 917 · `github.com/noahtan917/gen-ui`

*We set out to replicate the “install skill from GitHub → branded GenUI → click to plan” experience without locking ourselves to one AI vendor.*

---

## Slide 2 — The ask

**What we wanted**

- AI generates **interactive** UI, not static text
- **One engineering spec**, not a copy per Claude / Gemini / DeepSeek
- UI respects **brand tokens** (demo today; 917v / customer sites later)
- Clicks produce **structured follow-up prompts** for the model

*Same pattern as destination or product cards: user clicks an option, the system knows exactly what to ask the AI next.*

---

## Slide 3 — What we did **not** do yet

**Deferred on purpose**

- Trish app integration (checklist only)
- Full 917v brand pack in repo
- Official “skill store” integrations

*We built the **platform** first so Trish plugs in without rewriting rules.*

---

## Slide 4 — Architecture

**Three layers**

1. **Spec** — `spec/GENUI.md`, JSON schemas, interaction contract  
2. **Adapters** — session skill + Cursor / CLI entry points  
3. **Runtime** — validate JSON → render safely → dispatch clicks  

*Agents read the spec; the app (or chat host) renders. That split is critical.*

---

## Slide 5 — GenUI document (the contract)

**Versioned JSON**

- `genuiVersion`, `actions`, `components`, optional `themeRef`
- v1 components: Stack, Text, Button, Card, Form, Select, Image
- Actions: `ai.request` (prompt templates), `state.update`

*Provider-agnostic output: Claude, Gemini, and DeepSeek can all target the same shape.*

---

## Slide 6 — Interaction model

**Click → structured AI request**

Example (meal demo):

> Help me cook Sheet-pan salmon (Mediterranean): ingredient list, steps, and total time for a weeknight dinner.

*Defined in `interaction-contract.md` — hosts implement UI differently, semantics stay the same.*

---

## Slide 7 — Rendering profiles

| Profile | Where |
|---------|--------|
| `react-host` | Local demo / future product |
| `embedded-ui-host` | Claude Artifacts, rich chat UI |
| `markdown-ui-host` | Gemini, DeepSeek when no embed |

*One skill; the overlay picks how to **show** the UI.*

---

## Slide 8 — Limitations & root causes

**Not every AI chat looks like Claude**

| What you see | Why |
|--------------|-----|
| Claude: side panel UI | **Artifacts** host feature |
| Gemini: markdown + JSON block | **No embed panel**; model also exposes GenUI JSON |
| No GitHub “install” on Gemini | Chat **cannot fetch** repo files |
| “Click” in Gemini | User sends **Send this next** — chat-bridge, not npm runtime |
| Claude: extra meals, time filter, blue chips | Host’s **native planner** replaced the custom Artifact |

**Mitigations:** `PASTE-BUNDLE.md`, visual-first rules, **`pnpm demo`** for real clicks.

*Full report: `docs/LIMITATIONS-AND-CAUSES.md` — use for Q&A.*

---

## Slide 9 — Who can do Claude-like UI?

| Provider | Embedded panel? |
|----------|-----------------|
| Claude web + Artifacts | **Yes** (primary chat demo); may swap in its native meal planner — see L12 |
| ChatGPT web | Skill loads; UI often host-native (not demo blue) — see L10 |
| Gemini chat (Flash) | **No** — markdown profile |
| DeepSeek / Grok | **No** |
| Our `pnpm demo` | **Yes** (production path) |

*Say clearly: **product** will use `react-host`, not depend on Claude’s panel.*

---

## Slide 10 — Multi-provider session skill

**Install for this conversation**

- Central: `spec/session-bootstrap.md` + `adapters/session/SKILL.md`
- Thin overlays: `claude-web`, `gemini-app`, `deepseek-chat`, …
- **Gemini:** paste `PASTE-BUNDLE.md` (no GitHub fetch)

*Tested expectation vs reality: Gemini cannot clone repos from a URL — we documented and shipped a paste path.*

---

## Slide 11 — Live demo (recommended)

**Option A — Browser**

`pnpm demo` → click **Sheet-pan salmon** → **Assistant** streams ingredients, steps, and time (mock LLM)

**Option B — Gemini**

Paste raw `PASTE-BUNDLE.md` → ask for weeknight dinner UI

*Lead with Option A if the room is technical; Option B shows multi-provider story.*

---

## Slide 12 — Repo tour (30 seconds)

| Path | Purpose |
|------|---------|
| `spec/` | Source of truth |
| `adapters/session/` | Chat install |
| `packages/genui-core` | Validation |
| `packages/genui-render` | React renderer |
| `spec/session-config.json` | Session brand + reference scenario |

---

## Slide 13 — Results

**Shipped**

- Public repo on GitHub
- 8 automated tests passing
- OpenSpec proposals 001 & 002
- Install docs for Claude + Gemini + generic chat

*Foundation is merge-ready for product integration.*

---

## Slide 14 — Next steps

1. Feedback on spec v1 & component catalog  
2. Add **917v** brand pack under `branding/917v/`  
3. Pilot **brand extraction** on a real site  
4. **Trish** (or first consumer): registry overrides + backend `onAIRequest`  

*Questions?*

---

## Appendix — Demo script (60 seconds)

1. “One GenUI spec — validation, branding, interaction contract.”
2. **`pnpm demo`** → click salmon → Assistant auto-reply (real `react-host` runtime).
3. “Claude can show an **Artifact**; Gemini uses **markdown + Send this next** — same prompts, different host.”
4. “Gemini can’t install from GitHub — we paste one bundle; JSON at the bottom is optional dev output.”
5. “Trish embeds **react-host**, not Claude’s panel.”

---

## Appendix — Q&A prep

**Why does Gemini show JSON?**  
No Artifact runtime + skill mentions JSON. Fix: visual-first paste bundle; JSON is internal. See LIMITATIONS-AND-CAUSES.md.

**Why not only Claude Artifacts?**  
Artifacts are one host; spec + profiles support Gemini markdown, local React, future embeds.

**Can Globe / enterprise Gemini do Artifacts?**  
Same chat UI limits unless product exposes Canvas/embed — test your exact portal.

**Is this secure?**  
v1 allowlist only; no arbitrary HTML/script in the schema.

**How long to add a provider?**  
One markdown overlay + matrix row; no core rewrite.

**Relation to jerwyn917/generative-ui-917v-branding?**  
Same UX goal; our repo separates spec, runtime, and multi-provider adapters for long-term maintenance.

**Is the project blocked?**  
No — chat limits are expected; production uses `@gen-ui/render` in the app.
