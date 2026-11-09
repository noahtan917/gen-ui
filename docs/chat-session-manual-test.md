# Manual test: session install (multi-provider)

Repeat on each host you care about.

## Prerequisites

- Public repo https://github.com/noahtan917/gen-ui
- Host can open root [SKILL.md](../SKILL.md) **or** you paste that file (includes **917v** #2F63D6)
- Current `installVersion` from the top of [SKILL.md](../SKILL.md) on GitHub

## Steps

1. **Fresh chat.** Send: `install this skill for this session https://github.com/noahtan917/gen-ui/blob/main/SKILL.md` ([INSTALL-SKILL.md](../INSTALL-SKILL.md)). Add `Provider:` only if auto-detect is wrong.
2. Confirm assistant acknowledges **installVersion** (must match GitHub) + brand + rendering profile, and reports **no** “robots disallowed” / extra fetch attempts.
3. Ask: *Help me pick a weeknight dinner — show clickable meal options.*
4. Verify:
   - [ ] UI uses the **917V** brand (#2F63D6 primary, light page, flat cards — not legacy demo blue or host default)
   - [ ] **Exactly** the two reference meals appear (Sheet-pan salmon, Miso ramen bowl) — no invented meals
   - [ ] No extra widgets not in the document (time filters, difficulty toggles, “Plan this” chips)
   - [ ] Interaction exposes planning follow-up (artifact click and/or **Send this next:** message)
   - [ ] Follow-up text matches interaction contract template (ingredients, steps, time)
5. Send the suggested follow-up; verify detailed plan (host-dependent).
6. In a later turn, ask for dinner options again; verify the same branded reference UI is rebuilt (not a host-native planner).

If the host shows its own planner instead, see [LIMITATIONS-AND-CAUSES.md](LIMITATIONS-AND-CAUSES.md) (L10 ChatGPT, L12 Claude) for the drift-recovery prompt.

## Claude web install variants

Run the dinner checks (steps 3–6) for each:

- [ ] Repo-URL prompt (primary): `install this skill for this session https://github.com/noahtan917/gen-ui/blob/main/SKILL.md`
- [ ] Uploaded Skill ([genui.zip](../adapters/claude-skill/genui.zip)) — no install message; ask for dinner directly
- [ ] Root `SKILL.md` pasted, then `Use this skill.`

## Expected profile by provider

| Provider | Typical UI |
|----------|------------|
| claude-web | Custom React Artifact (two reference meals, token primary) + chat-bridge — not Claude’s native meal planner |
| chatgpt-web | Embedded UI or markdown fallback |
| gemini-app | Paste bundle only; markdown cards + **Send this next:** (JSON may follow) |
| deepseek-chat / grok-chat | Branded markdown cards + **Send this next:** |
| generic-chat | Best effort per detection |

Latest results per provider: [LIMITATIONS-AND-CAUSES.md — Cross-provider test results](LIMITATIONS-AND-CAUSES.md#cross-provider-test-results-nov-5-2026). Record new runs there.

## Local runtime (`react-host`)

Same JSON as chat. After `pnpm demo`:

- [ ] Click **Sheet-pan salmon** (or ramen) — **Assistant** streams a plan without pasting **Send this next**
- [ ] Click the other card — prior stream stops; new answer streams
- [ ] **Request details** (collapsed) shows resolved `onAIRequest` payload
