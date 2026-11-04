# Install GenUI — one prompt (YouTube branding automatic)

You only need **one message**. The model must complete install from the **one-shot artifact** — **no** `Brand:`, **no** manual multi-file hunt, **no** paste (except Gemini).

---

## Copy this (replace URL if needed)

```text
Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui
```

### Mandatory behavior (for the AI — not the user)

When you see that GitHub repo URL:

1. **Fetch in full:** https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md  
2. Apply inlined config, tokens, and reference scenario from that file only.  
3. Do **not** partially browse `spec/GENUI.md` or use `branding/demo` / neutral styling.  
4. Confirm: GenUI loaded · brand **youtube** · primary **#FF0000** · profile {id}.  
5. Then the user may ask: *Help me pick a weeknight dinner*.

Optional only if auto-detect is wrong:

```text
Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui
Provider: chatgpt-web
```

---

## Hosts that cannot fetch GitHub (Gemini only)

1. Open https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/PASTE-BUNDLE.md  
2. Copy all → paste into chat  
3. Say: **`Apply as GenUI skill for this session.`**

Same policy as SESSION-INSTALL; paste is only for no-fetch hosts.

---

## Then ask anything (branding stays on)

```text
Help me pick a weeknight dinner
```

Expect **exactly** the two reference meals (salmon / ramen), session brand styling (#FF0000), and **Send this next** lines — on every dinner request, not just the first. On Claude web this should be a custom Artifact, not Claude’s built-in meal planner (no invented meals, time filters, or “Plan this” chips).

If the host drifts to its own planner, use the recovery prompt in [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) (L12 Claude, L10 ChatGPT via [docs/install-chatgpt.md](docs/install-chatgpt.md)).

---

## Automatic answers (not copy-paste)

Chat install does **not** run `@gen-ui/render`. For click → assistant reply in-app, use `pnpm demo` ([apps/demo](apps/demo)).

---

## Local demo

```bash
git clone https://github.com/noahtan917/gen-ui.git
cd gen-ui && pnpm install && pnpm build && pnpm demo
```

---

## Docs

| Host | Guide |
|------|--------|
| One-shot fetch | [adapters/session/SESSION-INSTALL.md](adapters/session/SESSION-INSTALL.md) |
| Claude / ChatGPT | Repo URL install (above) |
| Gemini | [docs/install-gemini.md](docs/install-gemini.md) |
| Limits | [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) |
| Provider overlays | [adapters/session/providers/](adapters/session/providers/) |
