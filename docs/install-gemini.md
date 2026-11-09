# Install GenUI on Gemini (web / app)

Gemini **cannot** fetch files from GitHub inside the chat. Paste root [SKILL.md](../SKILL.md). Claude and ChatGPT use the repo-URL prompt in [INSTALL-SKILL.md](../INSTALL-SKILL.md).

## Option A — Paste the skill (fastest)

1. Open [SKILL.md](../SKILL.md) in your browser and copy all text.
2. Paste the **entire file** into Gemini.
3. Add only:

   ```text
   Use this skill.
   ```

   917V branding (#2F63D6) and the full rules are inside the file — no `Brand:` command.

4. Then ask:

   ```text
   Help me pick a weeknight dinner — show GenUI meal options I can click.
   ```

## Option B — Gemini Gem (persistent)

1. Create a new **Gem**.
2. In instructions, paste [SKILL.md](../SKILL.md).
3. Save. Every chat with that Gem starts with GenUI loaded.

## Option C — Gemini CLI (developers)

Use [adapters/gemini/GEMINI.md](../adapters/gemini/GEMINI.md) in a cloned repo — different product from Gemini chat.

## What success looks like

- Heading *What do you want to cook?* and exactly two cards: Sheet-pan salmon (Mediterranean), Miso ramen bowl (Japanese)
- **Send this next:** lines with the full cooking prompts
- GenUI JSON may follow the cards (`themeRef: 917v`); ask *Don’t show JSON* to hide it
- Gemini chat is Markdown, so the primary hex may not appear as color

If the reply shows only JSON, `themeRef: demo` / blue `#2563eb`, or YouTube red `#FF0000`, the skill file was not pasted — Gemini can’t read the GitHub URL.

## Local full runtime (click → auto-answer)

Gemini chat cannot run `@gen-ui/render`. For **click → assistant reply in the same UI**:

```bash
git clone https://github.com/noahtan917/gen-ui.git
cd gen-ui && pnpm install && pnpm build && pnpm demo
```

Not required for Gemini-only chat testing; required to demo true GenUI interactivity.
