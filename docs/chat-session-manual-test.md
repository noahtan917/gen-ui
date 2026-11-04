# Manual test: session install (multi-provider)

Repeat on each host you care about.

## Prerequisites

- Public `{REPO_URL}` pointing at this repo
- Host can fetch GitHub raw files **or** you paste [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) (includes **youtube** #FF0000)

## Steps

1. Send install prompt from [INSTALL-SKILL.md](../INSTALL-SKILL.md) with correct `Provider:`.
2. Confirm assistant acknowledges spec + brand + rendering profile.
3. Ask: *Help me pick a weeknight dinner — show clickable meal options.*
4. Verify:
   - [ ] UI uses **YouTube** brand (#FF0000 primary, dark chrome — not legacy demo blue or host default)
   - [ ] **Exactly** the two reference meals appear (Sheet-pan salmon, Miso ramen bowl) — no invented meals
   - [ ] No extra widgets not in the document (time filters, difficulty toggles, “Plan this” chips)
   - [ ] Interaction exposes planning follow-up (artifact click and/or **Send this next:** message)
   - [ ] Follow-up text matches interaction contract template (ingredients, steps, time)
5. Send the suggested follow-up; verify detailed plan (host-dependent).
6. In a later turn, ask for dinner options again; verify the same branded reference UI is rebuilt (not a host-native planner).

If the host shows its own planner instead, see [LIMITATIONS-AND-CAUSES.md](LIMITATIONS-AND-CAUSES.md) (L10 ChatGPT, L12 Claude) for the drift-recovery prompt.

## Expected profile by provider

| Provider | Typical UI |
|----------|------------|
| claude-web | Custom React Artifact (two reference meals, token primary) + chat-bridge — not Claude’s native meal planner |
| chatgpt-web | Embedded UI or markdown fallback |
| deepseek-chat / grok-chat | Branded markdown cards + **Send this next:** |
| generic-chat | Best effort per detection |

## Local runtime (`react-host`)

Same JSON as chat. After `pnpm demo`:

- [ ] Click **Sheet-pan salmon** (or ramen) — **Assistant** streams a plan without pasting **Send this next**
- [ ] Click the other card — prior stream stops; new answer streams
- [ ] **Request details** (collapsed) shows resolved `onAIRequest` payload
