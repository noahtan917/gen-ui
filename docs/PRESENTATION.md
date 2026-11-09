# GenUI — Presentation deck (copy to PowerPoint / Google Slides)

**Suggested length:** 15–18 minutes + 5 min Q&A (skip slides 10a–10e if short on time)  
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
- UI respects **brand tokens** (917v / `#2F63D6` for chat; customer sites later)
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
| ChatGPT: right meals, but no brand color in Markdown (Nov 5 brand was YouTube red) | ChatGPT chat is **Markdown — no colour**; Canvas not chosen by the model |
| DeepSeek: correct text cards, nothing clickable | Chat renders **Markdown only** — text profile by design |
| Grok: different heading + stock food photo | Model **embellishes** the reference (L14) — rules say “no stock photos” but it still adds one |
| Gemini: correct cards, then the full JSON | Markdown profile allows “optional” JSON; Gemini can’t collapse it (L3) |
| Click doesn’t send the prompt by itself | Chat hosts give the UI **no way to post into the conversation** |

**Mitigations:** root `SKILL.md` via the repo-URL prompt, Claude Skill zip, paste `SKILL.md`, visual-first rules, **`pnpm demo`** for real clicks. Current brand is **917v** / `#2F63D6`. Slides 10–10e record the **5 Nov 2026** test, when the brand was still YouTube red.

*Full report: `docs/LIMITATIONS-AND-CAUSES.md` — use for Q&A.*

---

## Slide 9 — Findings from manual testing

**1. Installing from the GitHub repo URL fails on Claude web (L13)**

- GitHub’s `robots.txt` blocks AI fetchers from repo folders (`/tree/`, `/raw/`, `/commits/`) → “robots disallowed”
- Claude only opens links in the user’s message or earlier results — it won’t build the raw link itself
- Fetches can be cached → Claude read an **outdated** install
- **Current fix:** root `SKILL.md`. Prompt: `install this skill for this session https://github.com/noahtan917/gen-ui`. GitHub allows that blob and blocks folder browsing.
- A stable `main` raw URL can still be cached. `installVersion` exposes a stale copy.
- The Nov 5 failure mode (no root `SKILL.md`, cached YouTube install) is L13.

**2. ChatGPT loads the rules but not the branding (L10)**

- Install confirmed and the **two reference meals** were correct
- Earlier runs added a host-inserted food photo; the **Nov 5 retest** with `installVersion 401e4c93` showed clean text cards — no photo, no native recipe carousel
- Chat text is Markdown — **no way to colour it**, so the Nov 5 primary `#FF0000` could not be applied there. Current primary is **#2F63D6**; Markdown hosts still cannot draw it.
- Branded UI is only possible in **Canvas** (HTML/React preview) — *proposed*, not shipped

**3. Clicking an option doesn’t send the prompt (L4)**

- Today: click → **Send this next:** → user copies and pastes
- Claude: two candidate routes — the inline widget that sends into the chat (what powers its “Plan this” chips), or the Artifact asking Claude directly (answer shows in the panel) — *being verified (OpenSpec 006)*
- ChatGPT / Gemini / DeepSeek / Grok: **no** route — copy-paste stays
- `pnpm demo` already does click → auto-answer

*Key message: the spec and interaction semantics held up on every host; what varied is what each host lets the UI **draw** and **do**.*

---

## Slide 10 — Cross-provider test: is GenUI AI-agnostic?

**Test (Nov 5, 2026, historical):** fresh chat per provider → install → *Help me pick a weeknight dinner*. Install file `installVersion 401e4c93`, brand **youtube** (#FF0000). **Not the current brand.** Current brand is **917v** / `#2F63D6` from root `SKILL.md`.

| Provider | Install path | Install confirmed | Exactly the 2 meals + **Send this next** | Brand red visible | Drift |
|----------|--------------|-------------------|------------------------------------------|-------------------|-------|
| Claude web | Raw URL | ✅ `embedded-ui-host` | ✅ | ✅ Artifact | None |
| ChatGPT web | Raw URL | ✅ `markdown-ui-host` | ✅ | ❌ Markdown | Chose Markdown over Canvas |
| DeepSeek | Raw URL | ✅ | ✅ | ❌ Markdown | Emoji markers |
| Grok | Raw URL | ✅ (red brand card) | ⚠️ meals promised, layout drifted | ⚠️ install card only | New heading + stock photo |
| Gemini (1st try) | Raw URL | ❌ cannot fetch | ❌ raw JSON, `demo` blue | ❌ | Used the forbidden brand |
| Gemini (retest) | **Pasted bundle** | ✅ | ✅ | ❌ Markdown | Full JSON appended |

**Verdict:** **Yes at the contract level** — every provider produced the same two options and the same `planMeal` prompts from one install file. **Not identical UI** — only Claude draws the brand; Markdown hosts can’t colour text. **Install differs on Gemini** (paste, not URL).

*Headline for the room: one spec, five providers, same options and prompts. What changes per host is the pixels and the install path, not the rules.*

---

## Slide 10a — Claude web: the reference result

- Confirmation: `installVersion 401e4c93` · brand youtube · `embedded-ui-host` · primary-colour line
- Built a **React Artifact**: dark header, red **YOUTUBE** badge, red underline, two cards (*Sheet-pan salmon — Mediterranean*, *Miso ramen bowl — Japanese*)
- Tapping a card shows **Send this next:** below the cards
- **No** native meal planner, no invented meals, no time filter — the L12 drift did **not** recur

**Verdict:** ✅ closest to the target experience in a chat host. Still to verify: click → auto-send (OpenSpec 006).

---

## Slide 10b — ChatGPT web: rules followed, brand not drawable

- Confirmation: `installVersion 401e4c93` · youtube · `markdown-ui-host` · “Primary color active: #FF0000”
- Heading *What do you want to cook?*, two text cards, each with the word-for-word **Send this next:** prompt
- **Improved since the earlier run:** no host food photo, no native recipe carousel (L10 not reproduced)
- No red — ChatGPT chat is Markdown; the overlay prefers **Canvas**, but the model picked Markdown

**Verdict:** ✅ contract followed. Branding needs Canvas to be required, not just preferred.

---

## Slide 10c — DeepSeek: most literal Markdown result

- Install confirmed; heading *🎬 What do you want to cook?*, two cards with emoji markers, cuisine in italics
- **Send this next:** in a quote block, matches the template word for word
- Ends with *“Rules active for every turn…”* — and on a later turn (*What do you want to cook?*) it **rebuilt the same two cards**
- No clickable UI, no red — Markdown only

| Rule | Result |
|------|--------|
| Exactly the two reference meals | ✅ |
| **Send this next:** fully interpolated | ✅ |
| Rules re-applied on a later turn | ✅ |
| No invented meals, filters, stock photos | ✅ (emojis are cosmetic) |
| Brand colour / clickable cards | ❌ host limit |

**Verdict:** ✅ expected behaviour, not a bug. **Possible upgrade (unverified):** DeepSeek’s HTML Run/preview could show branded cards.

---

## Slide 10d — Grok: loaded, then embellished

- Install shown as a **dark card with red “YOUTUBE” and `#FF0000`** — Grok can render some styled blocks, unlike the other Markdown hosts
- Listed the session rules back (two meals, **Send this next**, no stock photos, YouTube red)
- Dinner reply **drifted**: heading *“What’s for dinner tonight?”* + tagline *“Two delicious options. One easy decision.”* + a large **stock food photo** — all forbidden by the rules it had just repeated

**Verdict:** ⚠️ install works, but the model decorates the reference (L14). Weakest of the URL installs; needs a retest and tighter wording (“heading verbatim; no images”).

---

## Slide 10e — Gemini: paste required, then correct

- **Raw URL:** Gemini can’t fetch from GitHub. It described generic GenUI with **demo** tokens (`#2563eb`), then dumped **raw JSON** with `themeRef: demo` — the brand the install forbids
- **Pasted `PASTE-BUNDLE.md`:** heading, two numbered meals with cuisine, **Send this next:** word for word, `themeRef: youtube`
- After the cards it appended the **full GenUI JSON** — allowed (“not first”), but noisy since Gemini can’t collapse it (L3)

**Verdict:** ✅ after paste. Install path is the only Gemini-specific step; the output matches the other Markdown hosts.

*Use slides 10a–10e for Q&A: each failure maps to a host limit or a known drift with a mitigation — none required a spec change.*

---

## Slide 11 — Who can do Claude-like UI?

| Provider | Embedded panel? | Brand colour? | Click auto-sends? |
|----------|-----------------|---------------|-------------------|
| Claude web + Artifacts | **Yes** (primary chat demo); native planner did not recur on Nov 5 (L12) | **Yes** — confirmed Nov 5 | **Being verified** (OpenSpec 006) |
| ChatGPT web | Only via **Canvas** | Canvas only — **not** in chat text (L10) | **No** |
| Gemini chat (Flash) | **No** — markdown profile | **No** | **No** |
| DeepSeek | **No** (HTML Run/preview untested) | **No** — emoji markers instead | **No** |
| Grok | **No** | Partly — drew a red brand card at install, not on the picker | **No** |
| Our `pnpm demo` | **Yes** (production path) | **Yes** | **Yes** |

*Say clearly: **product** will use `react-host`, not depend on Claude’s panel.*

---

## Slide 12 — Chat skill

**Install for this conversation — one message**

```text
install this skill for this session https://github.com/noahtan917/gen-ui
```

- Root `SKILL.md` holds everything: config, brand tokens, reference document, reference layout, host overlays
- Confirmation must repeat `installVersion`, brand **917v**, primary **#2F63D6**
- **Claude web (persistent):** upload `adapters/claude-skill/genui.zip` as a Skill
- **Gemini / any blocked fetch:** paste `SKILL.md` and say `Use this skill.`

*The repo URL works because `SKILL.md` is at the root. A cached `SESSION-INSTALL.md` on `main` is not the install path.*

---

## Slide 13 — Live demo (recommended)

**Option A — Browser**

`pnpm demo` → click **Sheet-pan salmon** → **Assistant** streams ingredients, steps, and time (mock LLM)

**Option B — Claude web**

Send the raw-URL install prompt (or use the uploaded Skill) → *Help me pick a weeknight dinner* → two red cards in an Artifact

**Option C — Gemini**

Paste raw `PASTE-BUNDLE.md` → ask for weeknight dinner UI → two cards + **Send this next** (JSON may follow)

*Lead with Option A if the room is technical; B and C show the multi-provider story. Avoid ChatGPT for brand proof until the Canvas change ships, and avoid Grok live until its drift is fixed.*

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
- **Cross-provider test (Nov 5):** Claude, ChatGPT, DeepSeek, Grok, and Gemini all loaded the same install and produced the same two options and prompts (Gemini via paste; Grok with cosmetic drift)

*Foundation is merge-ready for product integration.*

---

## Slide 16 — Next steps

1. **Click → auto-send on Claude** (OpenSpec 006) — verify which host function exists, then wire it into the reference layout  
2. **ChatGPT branding via Canvas** — require Canvas for option pickers; ban host image cards  
3. **DeepSeek HTML preview test** — if Run/preview renders HTML, add a branded HTML block to the DeepSeek overlay  
4. **Tighten Markdown-host wording** — heading verbatim, no images; Gemini: no JSON unless asked (fixes Grok drift and Gemini noise)  
5. **Repeat runs** — 3–5 fresh chats per provider, including the follow-up and a later-turn re-ask  
6. Feedback on spec v1 & component catalog  
7. Add **917v** brand pack under `branding/917v/`  
8. Pilot **brand extraction** on a real site  
9. **Trish** (or first consumer): registry overrides + backend `onAIRequest`  

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

**Is it really AI-agnostic?**  
Yes at the contract level: on Nov 5 all five providers produced the same two options and the same `planMeal` prompts from one install file. The UI is not identical (only Claude draws the brand), and Gemini needs the paste bundle instead of the URL. Slides 10–10e have the per-model evidence.

**Why does Gemini show JSON?**  
No Artifact runtime, and the Markdown profile allows optional developer JSON — Gemini can’t collapse it, so it appears in full after the cards. Before the paste bundle, Gemini couldn’t read the install at all and showed only JSON in the old `demo` blue. See LIMITATIONS-AND-CAUSES.md (L2, L3).

**Why did Grok change the heading and add a photo?**  
The model decorated the reference despite repeating the rules back (L14). Install and options were right; the fix is stricter wording for Markdown hosts.

**Why did Claude say “robots disallowed”?**  
GitHub’s `robots.txt` blocks AI fetchers from repo folders. The current prompt opens root `SKILL.md`, which is a blob page GitHub allows. A cached `SESSION-INSTALL.md` from 4 Nov still said YouTube red; confirm `installVersion` against `SKILL.md`.

**Why doesn’t ChatGPT show the brand color?**  
ChatGPT chat is Markdown with no colour support. On the Nov 5 retest the rules loaded (right two meals) while the brand was still YouTube red; the host can’t draw **#2F63D6** outside Canvas either (L10).

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
