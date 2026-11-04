# Why Gemini shows JSON while Claude shows a UI

See also: **[LIMITATIONS-AND-CAUSES.md](LIMITATIONS-AND-CAUSES.md)** (full limitations report for presentations).

## Short answer

| | Claude web | Gemini chat |
|---|------------|-------------|
| **Side panel for UI** | **Artifacts** (React/HTML) | Usually **none** — reply is markdown/text |
| **What the model does** | Renders an Artifact + chat | Often outputs **code blocks** (JSON) when the skill mentions "GenUI JSON" |
| **Same spec?** | Yes | Yes |
| **Same pixels?** | No — different host capabilities |

GenUI JSON is the **contract** for engines and developers. **Claude adapts** by drawing an Artifact. **Gemini adapts** by formatting markdown — unless the skill pushes JSON to the front.

## What happened in your screenshot

1. The Gem/skill loaded correctly (`GenUI loaded`, brand `demo`).
2. The skill text still emphasizes **GenUI JSON** and includes large JSON examples → Gemini treats JSON as the deliverable.
3. Gemini chat has **no Artifact runtime** like Claude → you see a `json` fence instead of a panel.

## What to do

1. **Re-paste** updated [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) (visual-first rules), or add to your Gem:

   ```text
   Never lead with GenUI JSON. Show branded markdown meal cards and "Send this next:" lines first.
   ```

2. **Follow-up prompt** in the same chat:

   ```text
   Don't show JSON. Render GenUI as branded markdown cards with Send this next for each meal option.
   ```

3. **For demo parity with real GenUI:** use `pnpm demo` — click a card → **Assistant auto-reply** (mock stream). Claude Artifacts are closest in chat; Gemini stays "same skill, markdown profile."

## For your presentation

Say: **One spec, multiple rendering profiles** — Claude `embedded-ui-host`, Gemini `markdown-ui-host`; JSON is internal, not the user UI.
