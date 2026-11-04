# Install GenUI on Gemini (web / app)

Gemini **cannot** clone or fetch files from GitHub inside the chat. Use **paste** or a **Gem**.

## Option A — Paste bundle (fastest)

1. Open in your browser (copy all text):
   - https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/PASTE-BUNDLE.md
2. Paste the **entire file** into Gemini.
3. Add:

   ```text
   Apply these as your GenUI skill for this chat. Confirm when loaded.
   ```

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

## Local full runtime

`pnpm demo` in a cloned repo — not required for Gemini chat testing.
