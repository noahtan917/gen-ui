# Install GenUI — one prompt (YouTube branding automatic)

You only need **one message**. The model must load the full spec, apply **YouTube** brand (`#FF0000`), and keep it for the whole session — **no** `Brand:`, **no** extra load commands.

---

## Copy this (replace URL if needed)

```text
Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui
```

That is enough. The assistant must automatically:

- Load [spec/session-config.json](spec/session-config.json), [spec/session-bootstrap.md](spec/session-bootstrap.md), and [adapters/session/ON-INSTALL.md](adapters/session/ON-INSTALL.md)
- Apply brand from config (`defaultBrandPack` → `branding/{id}/tokens.json`; today **youtube**)
- Auto-detect provider overlay (`chatgpt-web`, `claude-web`, `gemini-app`, …)
- Confirm with a **red (#FF0000) branded** acknowledgment

Optional only if auto-detect is wrong:

```text
Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui
Provider: chatgpt-web
```

---

## Hosts that cannot fetch GitHub (Gemini, etc.)

One paste = full install (includes YouTube rules):

1. Open https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/PASTE-BUNDLE.md  
2. Copy all → paste into chat  
3. Say only: **`Apply as GenUI skill for this session.`**

No separate brand command.

---

## Then ask anything (branding stays on)

```text
Help me pick a weeknight dinner
```

You should get **YouTube red** styling (where the host allows), reference meals (salmon / ramen), and **Send this next** lines.

---

## Automatic answers (not copy-paste)

Session install in ChatGPT, Gemini, Claude, etc. **does not** run `@gen-ui/render`. Clicks there usually mean **Send this next** (you paste or send the follow-up yourself).

For **true GenUI** — click a card → assistant answers in the same app — use the reference host:

```bash
git clone https://github.com/noahtan917/gen-ui.git
cd gen-ui && pnpm install && pnpm build && pnpm demo
```

Click a meal card; the **Assistant** panel streams the plan (demo uses a mock LLM; production hosts call your real AI backend from `onAIRequest`).

---

## Local demo (always shows YouTube UI)

```bash
git clone https://github.com/noahtan917/gen-ui.git
cd gen-ui && pnpm install && pnpm build && pnpm demo
```

---

## Claude web

Use the same one-line install. After fetch, follow [session-config.json](spec/session-config.json) and [claude-web.md](adapters/session/providers/claude-web.md) (capabilities only).

If branding looks wrong (e.g. legacy demo blue), start a **new chat** or paste [PASTE-BUNDLE.md](adapters/session/PASTE-BUNDLE.md) (generated from config).

## Docs

| Host | Guide |
|------|--------|
| Claude web | [adapters/session/providers/claude-web.md](adapters/session/providers/claude-web.md) |
| Gemini | [docs/install-gemini.md](docs/install-gemini.md) |
| ChatGPT | [docs/install-chatgpt.md](docs/install-chatgpt.md) |
| Limits | [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) |
| Provider overlays | [adapters/session/providers/](adapters/session/providers/) |
