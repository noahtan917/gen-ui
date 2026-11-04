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
| Claude: “robots disallowed” on repo URL install | GitHub blocks AI fetchers from browsing the repo; Claude only opens links it was given |
| ChatGPT: right meals, but no YouTube red | ChatGPT chat is **Markdown — no colour**; photo cards are ChatGPT’s own UI |
| DeepSeek: correct text cards, nothing clickable | Chat renders **Markdown only** — text profile by design |
| Click doesn’t send the prompt by itself | Chat hosts give the UI **no way to post into the conversation** |

**Mitigations:** raw-URL install, Claude Skill, `PASTE-BUNDLE.md`, visual-first rules, **`pnpm demo`** for real clicks.

*Full report: `docs/LIMITATIONS-AND-CAUSES.md` — use for Q&A.*

---

## Slide 9 — Findings from manual testing

**1. Installing from the GitHub repo URL fails on Claude web (L13)**

- GitHub’s `robots.txt` blocks AI fetchers from repo folders (`/tree/`, `/raw/`, `/commits/`) → “robots disallowed”
- Claude only opens links in the user’s message or earlier results — it won’t build the raw link itself
- Fetches can be cached → Claude read an **outdated** install
- **Fixed (OpenSpec 005):** the prompt carries the **raw** install URL; one self-contained file; `installVersion` stamp exposes stale copies; persistent **Claude Skill** zip

**2. ChatGPT loads the rules but not the branding (L10)**

- Install confirmed and the **two reference meals** were correct
- Cards came out as ChatGPT’s own layout: plain chat text + a host-inserted food photo
- Chat text is Markdown — **no way to colour it**, so `#FF0000` can’t be applied there
- Branded UI is only possible in **Canvas** (HTML/React preview) — *proposed*, not shipped

**3. Clicking an option doesn’t send the prompt (L4)**

- Today: click → **Send this next:** → user copies and pastes
- Claude: two candidate routes — the inline widget that sends into the chat (what powers its “Plan this” chips), or the Artifact asking Claude directly (answer shows in the panel) — *being verified (OpenSpec 006)*
- ChatGPT / Gemini / DeepSeek / Grok: **no** route — copy-paste stays
- `pnpm demo` already does click → auto-answer

*Key message: the spec and interaction semantics held up on every host; what varied is what each host lets the UI **draw** and **do**.*

---

## Slide 10 — DeepSeek test result: rules followed, no interactive UI

**What we saw** (prompt: *What do you want to cook?*)

- Heading *What do you want to cook?* + **two** text cards: Sheet-pan salmon — Mediterranean, Miso ramen bowl — Japanese
- Each card has **Send this next:** with the exact `planMeal` prompt
- No clickable UI, no YouTube red — emoji markers instead

| Rule | Result |
|------|--------|
| Exactly the two reference meals | ✅ |
| Cuisine subtitle | ✅ |
| **Send this next:** fully interpolated | ✅ matches the template word for word |
| No invented meals, filters, stock photos | ✅ |
| Brand colour | ❌ host limit — Markdown can’t be coloured |
| Clickable cards | ❌ host limit — no Artifact / Canvas panel |

**Why:** DeepSeek chat only renders Markdown text. The DeepSeek overlay deliberately uses `markdown-ui-host`: text cards + **Send this next:** (user pastes the line or replies “1” / “2”).

**Verdict:** **expected behaviour, not a bug** — the most spec-compliant result of the chat hosts tested; the host just can’t draw much.

**Possible upgrade (unverified):** DeepSeek may offer a **Run / preview** for HTML code blocks. If a test confirms it, the overlay can add a self-contained HTML block → branded, clickable cards in the preview (a click still cannot send into the chat).

*Use this slide to show that "no interactive UI" on DeepSeek is the host's ceiling — the GenUI contract (options, prompts) came through intact.*

---

## Slide 11 — Who can do Claude-like UI?

| Provider | Embedded panel? | Brand colour? | Click auto-sends? |
|----------|-----------------|---------------|-------------------|
| Claude web + Artifacts | **Yes** (primary chat demo); may swap in its native meal planner — see L12 | **Yes**, if the model writes the styles | **Being verified** (OpenSpec 006) |
| ChatGPT web | Only via **Canvas** | Canvas only — **not** in chat text (L10) | **No** |
| Gemini chat (Flash) | **No** — markdown profile | **No** | **No** |
| DeepSeek | **No** (HTML Run/preview untested) | **No** — emoji markers instead | **No** |
| Grok | **No** | **No** | **No** |
| Our `pnpm demo` | **Yes** (production path) | **Yes** | **Yes** |

*Say clearly: **product** will use `react-host`, not depend on Claude’s panel.*

---

## Slide 12 — Multi-provider session skill

**Install for this conversation — one message**

```text
Load GenUI for this chat from
https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md
```

- One generated file holds everything: config, brand tokens, reference document, reference layout, host overlays
- Confirmation must repeat `installVersion` → stale copies are visible
- **Claude web (persistent):** upload `adapters/claude-skill/genui.zip` as a Skill
- **Gemini / any blocked fetch:** paste `PASTE-BUNDLE.md`

*Tested expectation vs reality: a bare repo URL is not enough on Claude or Gemini — the raw link, the Skill, or paste are the reliable paths.*

---

## Slide 13 — Live demo (recommended)

**Option A — Browser**

`pnpm demo` → click **Sheet-pan salmon** → **Assistant** streams ingredients, steps, and time (mock LLM)

**Option B — Claude web**

Send the raw-URL install prompt (or use the uploaded Skill) → *Help me pick a weeknight dinner* → two red cards in an Artifact

**Option C — Gemini**

Paste raw `PASTE-BUNDLE.md` → ask for weeknight dinner UI

*Lead with Option A if the room is technical; B and C show the multi-provider story. Avoid ChatGPT for brand proof until the Canvas change ships.*

---

## Slide 14 — Repo tour (30 seconds)

| Path | Purpose |
|------|---------|
| `spec/` | Source of truth |
| `adapters/session/` | Chat install (`SESSION-INSTALL.md`, `PASTE-BUNDLE.md`) |
| `adapters/claude-skill/` | Claude Skill zip (persistent install) |
| `packages/genui-core` | Validation |
| `packages/genui-render` | React renderer |
| `spec/session-config.json` | Session brand + reference scenario |

---

## Slide 15 — Results

**Shipped**

- Public repo on GitHub
- 8 automated tests passing
- OpenSpec proposals 001–005 (005: fetch-resilient install)
- Install docs for Claude + ChatGPT + Gemini + generic chat
- Generated install artifacts kept in sync by lint (`pnpm lint:adapters`)

*Foundation is merge-ready for product integration.*

---

## Slide 16 — Next steps

1. **Click → auto-send on Claude** (OpenSpec 006) — verify which host function exists, then wire it into the reference layout  
2. **ChatGPT branding via Canvas** — require Canvas for option pickers; ban host image cards  
3. **DeepSeek HTML preview test** — if Run/preview renders HTML, add a branded HTML block to the DeepSeek overlay  
4. Feedback on spec v1 & component catalog  
5. Add **917v** brand pack under `branding/917v/`  
6. Pilot **brand extraction** on a real site  
7. **Trish** (or first consumer): registry overrides + backend `onAIRequest`  

*Questions?*

---

## Appendix — Demo script (60 seconds)

1. “One GenUI spec — validation, branding, interaction contract.”
2. **`pnpm demo`** → click salmon → Assistant auto-reply (real `react-host` runtime).
3. “Claude can show an **Artifact**; Gemini uses **markdown + Send this next** — same prompts, different host.”
4. “Gemini can’t install from GitHub — we paste one bundle; JSON at the bottom is optional dev output.”
5. “Chat hosts decide what the UI can draw and do — ChatGPT chat can’t show our red, and no chat host lets a click send the prompt yet.”
6. “Trish embeds **react-host**, not Claude’s panel.”

---

## Appendix — Q&A prep

**Why does Gemini show JSON?**  
No Artifact runtime + skill mentions JSON. Fix: visual-first paste bundle; JSON is internal. See LIMITATIONS-AND-CAUSES.md.

**Why did Claude say “robots disallowed”?**  
GitHub’s `robots.txt` blocks AI fetchers from repo folders, and Claude only opens links it was given. Fix: put the raw `SESSION-INSTALL.md` URL in the message, or upload the Claude Skill (L13, OpenSpec 005).

**Why doesn’t ChatGPT show the YouTube red?**  
ChatGPT chat is Markdown with no colour support, and the food photos are ChatGPT’s own UI. The rules loaded (right two meals); the host can’t draw the brand outside Canvas (L10).

**Why is there no interactive UI on DeepSeek?**  
DeepSeek chat only renders Markdown, so GenUI uses the text profile: branded text cards + **Send this next:**. The test result met every rule the host can support (two meals, exact prompts); colour and clicks are host limits. An HTML preview path is still to be tested.

**Why do I have to copy “Send this next”?**  
Chat hosts sandbox generated UI — it can’t post into the conversation. Claude may allow it (being verified, OpenSpec 006); `pnpm demo` and the product (`react-host`) do it today (L4).

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
