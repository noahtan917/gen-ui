# GenUI — Limitations, root causes, and mitigations

Report for stakeholders and presentation. Complements [provider-matrix.md](provider-matrix.md) and [rendering-profiles.md](../spec/rendering-profiles.md).

---

## Executive summary

GenUI delivers **one specification** across many AI products, but **each chat host renders differently**. The full loop (click → **assistant answer in the same UI**) exists only on **`react-host`**, especially **`pnpm demo`**. Chat install (GitHub URL or paste) gives branded UI and planning **semantics** on some hosts (**Claude Artifacts**, markdown profiles), but usually **not** automatic in-app replies — those use **markdown + “Send this next”** or chat-bridge.

This is a **platform capability gap**, not a failure of the centralized skill.

---

## Root cause #1 — Three different layers (often confused)

| Layer | What it is | Who runs it |
|-------|------------|-------------|
| **Skill / spec** | Rules + GenUI JSON shape | Any model that reads instructions |
| **Chat host UI** | Artifacts, Canvas, plain markdown | Claude, ChatGPT, Gemini, etc. |
| **Product runtime** | `@gen-ui/render`, validation, real clicks | Your app or `apps/demo` |

**Cause of “it works in Claude but not Gemini”:** Claude’s **host** includes an **Artifact renderer**; default **Gemini chat** does not. The skill loads in both; the **pixels** are the host’s job.

```mermaid
flowchart LR
  Skill[GenUI_spec_and_skill]
  Model[LLM_generates_intent]
  Host[Chat_host_UI]
  App[react-host_demo_or_product]

  Skill --> Model
  Model --> Host
  Model --> App
```

---

## Root cause #2 — Rendering profiles (by design)

We document four profiles in [spec/rendering-profiles.md](../spec/rendering-profiles.md):

| Profile | User experience | Typical hosts |
|---------|-----------------|---------------|
| `embedded-ui-host` | Side panel / canvas UI, in-panel interaction | **Claude Artifacts**, some **ChatGPT Canvas** |
| `markdown-ui-host` | Branded cards in message + **Send this next:** | **Gemini chat**, DeepSeek, Grok |
| `json-visible-host` | JSON code block + text instructions | Models over-indexing on “output JSON” |
| `react-host` | Full GenUI runtime | **`pnpm demo`**, future Trish/product |

**Cause:** Provider-agnostic spec intentionally **does not assume** every vendor ships the same embed runtime.

---

## Root cause #3 — “Install skill from GitHub URL”

| Observation | Cause | Mitigation |
|-------------|-------|------------|
| Gemini says it cannot clone/pull the repo | **No file fetch** from arbitrary URLs in chat | Paste [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) or use a **Gem** with instructions |
| Claude sometimes works with URL | May fetch/browse depending on plan/settings | Same paste fallback if fetch fails |
| Skill not persistent in chat | Session-only unless **Project / Gem** | Upload bundle to Gem or Claude Project |

---

## Root cause #4 — Gemini shows JSON after markdown cards

Observed behavior (tested): options + **Send this next** (correct `markdown-ui-host`), then a **JSON block**.

| Factor | Cause |
|--------|--------|
| Skill/Gem description mentions “GenUI JSON” | Model treats JSON as required **visible output** |
| Large JSON examples in training bundle | Reinforces code-block response |
| No Artifact panel | JSON becomes the only “structured” artifact in the thread |
| Enterprise/partner portals (e.g. Globe) | Same chat UI limits; may add policy banners |

**Mitigation:** Updated [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) — **visual first**, JSON internal or under “Developer only.” User prompt: *Don’t show JSON; markdown cards only.*

Details: [why-gemini-shows-json.md](why-gemini-shows-json.md).

---

## Root cause #5 — “Clickable” in chat ≠ `genui.interact` in npm

| In `pnpm demo` | In Gemini / markdown profile |
|----------------|------------------------------|
| Real DOM click → `onAIRequest` → **mock assistant reply in-panel** | User replies **1**, **2**, or pastes **Send this next** |
| `@gen-ui/core` validates events | Same **prompt templates**, manual chat-bridge |

**Cause:** Chat products do not execute our monorepo packages inside the conversation.

---

## Provider comparison (Claude-like UI)

| Provider | Claude-like embedded panel? | GenUI session install | Best demo for stakeholders |
|----------|----------------------------|------------------------|----------------------------|
| **Claude web** + Artifacts | **Yes** | URL or paste | **Primary chat demo** |
| **ChatGPT web** + Canvas | **Often** (plan-dependent) | URL or paste | Secondary chat demo; may ignore brand and reference meals — see L10 |
| **Gemini chat / Flash** | **No** (default) | **Paste only** | Show markdown + Send this next; explain profile |
| **Gemini Canvas** (if available) | Partial / product-specific | Paste | Verify on your account before presenting |
| **DeepSeek / Grok** | **No** | Paste | Markdown profile only |
| **`pnpm demo`** | **Yes** (real runtime) | Clone repo | **Strongest technical proof** |

---

## Limitations list (explicit)

| # | Limitation | Cause | Mitigation / status |
|---|------------|-------|---------------------|
| L1 | Not identical UI across all AI chats | Host renderers differ | Rendering profiles + overlays |
| L2 | Gemini cannot install from GitHub URL | No repo fetch in chat | PASTE-BUNDLE, Gem instructions |
| L3 | Gemini may append JSON blocks | Skill wording + no embed panel | Visual-first bundle; user follow-up prompt |
| L4 | No auto AI reply on click in markdown hosts | No shared runtime in chat | Chat-bridge; use **`pnpm demo`** for click→answer |
| L5 | Chat ≠ coding agent | Cursor/CLI vs web chat | Separate adapter paths, same spec |
| L6 | Trish not integrated yet | Phase 1 = platform only | [future-trish-integration.md](future-trish-integration.md) |
| L7 | 917v brand not shipped | Generic demo brand first | `branding/917v/` planned |
| L8 | v1 component allowlist | Security / validation | Extensible catalog in spec minor versions |
| L9 | Enterprise Gemini variants | Partner policies, model tier | Test on exact portal you demo |
| L10 | ChatGPT generic recipe UI | Host **native widgets** (images, badges) override GenUI; model improvises meals | Strict [chatgpt-web.md](../adapters/session/providers/chatgpt-web.md) overlay; user follow-up prompt; prefer `pnpm demo` for brand proof |

---

## Root cause #6 — ChatGPT “looks good” but isn’t GenUI

Observed: skill loads (`chatgpt-web`, brand `demo`, `markdown-ui-host`) but the reply shows **four unrelated recipes**, stock photos, gray/green badges — **no demo blue**.

| Factor | Cause |
|--------|--------|
| Profile `markdown-ui-host` | ChatGPT uses its own rich list UI, not your CSS |
| No reference-meal enforcement in first install | Model optimizes for “helpful dinner ideas” |
| `themeRef` in JSON | Not wired to ChatGPT’s native card renderer |
| Images | Host feature; not in GenUI v1 catalog |

**Mitigation:** Re-prompt with reference scenario + hex colors; use **Canvas/HTML** when available; demo **`pnpm demo`** for true branded clicks.

---

## What is **not** a limitation (clarify in Q&A)

- **One centralized spec** — working; adapters link to `spec/`.
- **Same interaction semantics** — `ai.request` templates work on all tested hosts.
- **Validation and React renderer** — working in repo; 8 tests passing.
- **Multi-provider session skill** — working with paste; URL where host allows fetch.

---

## Recommended presentation narrative (60 seconds)

1. We built **one GenUI contract** so we do not maintain five copies of the rules.
2. **Claude** can show an **Artifact**; **Gemini chat** shows **markdown + follow-up prompts** — same skill, different **rendering profile**.
3. **Production** will use **`react-host`** in the product, not the chat vendor’s panel.
4. We documented **limitations and causes** so expectations match reality before Trish integration.

---

## Related docs

- [why-gemini-shows-json.md](why-gemini-shows-json.md)
- [chat-session-setup.md](chat-session-setup.md)
- [install-gemini.md](install-gemini.md)
- [PROGRESS-REPORT.md](PROGRESS-REPORT.md)
