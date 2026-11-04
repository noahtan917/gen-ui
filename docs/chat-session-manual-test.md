# Manual test: session install (multi-provider)

Repeat on each host you care about.

## Prerequisites

- Public `{REPO_URL}` pointing at this repo
- Host can fetch GitHub raw files **or** you paste `adapters/session/SKILL.md` + `branding/demo/tokens.json`

## Steps

1. Send install prompt from [INSTALL-SKILL.md](../INSTALL-SKILL.md) with correct `Provider:`.
2. Confirm assistant acknowledges spec + brand + rendering profile.
3. Ask: *Help me pick a weeknight dinner — show clickable meal options.*
4. Verify:
   - [ ] UI uses demo brand (blue primary, clean cards — not random styling)
   - [ ] At least two meal options appear (e.g. salmon, ramen)
   - [ ] Interaction exposes planning follow-up (artifact click and/or **Send this next:** message)
   - [ ] Follow-up text matches interaction contract template (ingredients, steps, time)
5. Send the suggested follow-up; verify detailed plan (host-dependent).

## Expected profile by provider

| Provider | Typical UI |
|----------|------------|
| claude-web | React Artifact + chat-bridge |
| chatgpt-web | Embedded UI or markdown fallback |
| deepseek-chat / grok-chat | Branded markdown cards + **Send this next:** |
| generic-chat | Best effort per detection |

## Local runtime (optional)

Same JSON as chat: `pnpm demo` validates `react-host` profile.
