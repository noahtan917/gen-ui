# Install GenUI on Gemini (web / app)

Gemini **cannot** fetch files from GitHub inside the chat. **Only Gemini** needs paste; Claude/ChatGPT should fetch [SESSION-INSTALL.md](../adapters/session/SESSION-INSTALL.md) from the repo URL ([INSTALL-SKILL.md](../INSTALL-SKILL.md)).

## Option A — Paste bundle (fastest)

1. Open in your browser (copy all text):
   - https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/PASTE-BUNDLE.md
2. Paste the **entire file** into Gemini.
3. Add only:

   ```text
   Apply as GenUI skill for this session.
   ```

   YouTube branding (#FF0000) and full rules are inside the bundle — no `Brand:` command.

4. Then ask:

   ```text
   Help me pick a weeknight dinner — show GenUI meal options I can click.
   ```

## Option B — Gemini Gem (persistent)

1. Create a new **Gem**.
2. In instructions, paste [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) (or the raw URL content).
3. Save. Every chat with that Gem starts with GenUI loaded.

## Option C — Gemini CLI (developers)

Use [adapters/gemini/GEMINI.md](../adapters/gemini/GEMINI.md) in a cloned repo — different product from Gemini chat.

## What success looks like

- Branded cards (salmon / ramen or similar)
- **Send this next:** lines with cooking prompts
- Optional GenUI JSON in a code block

## Local full runtime (click → auto-answer)

Gemini chat cannot run `@gen-ui/render`. For **click → assistant reply in the same UI**:

```bash
git clone https://github.com/noahtan917/gen-ui.git
cd gen-ui && pnpm install && pnpm build && pnpm demo
```

Not required for Gemini-only chat testing; required to demo true GenUI interactivity.
