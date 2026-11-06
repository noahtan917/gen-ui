# Install GenUI — one prompt (917V branding automatic)

You only need **one message**. It must contain the **raw** install URL — not just the repo URL (see [why](#why-the-raw-url)).

---

## Copy this

```text
Load GenUI for this chat from https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md
```

Expected confirmation: **GenUI loaded · installVersion `xxxxxxxx` · brand 917v (#2F63D6) · profile …**

Compare `installVersion` with the line at the top of [SESSION-INSTALL.md](adapters/session/SESSION-INSTALL.md) on GitHub. If it differs (or is missing), the host read a **stale cached copy** — use the [pinned URL](#stale-copy-pinned-url) or [paste](#fetch-blocked-paste).

Optional, only if host auto-detect is wrong — add a second line: `Provider: chatgpt-web`

### Mandatory behavior (for the AI — not the user)

1. Fetch the raw URL above **in full**. It is the whole install (config, tokens, reference document, reference Artifact layout, host overlays).
2. Do **not** fetch other repo files; do **not** look for a skills folder — this is a conversation-scoped load.
3. Confirm: GenUI loaded · installVersion · brand **917v** · primary **#2F63D6** · profile {id}.
4. Then the user may ask: *Help me pick a weeknight dinner*.

---

## Persistent on Claude web (recommended)

No fetch, no cache, works in every new chat:

1. Download [adapters/claude-skill/genui.zip](adapters/claude-skill/genui.zip) (GitHub → **Download raw file**).
2. claude.ai → **Settings → Capabilities → Skills → Upload skill** → select the zip.
3. New chat: *Help me pick a weeknight dinner*.

Requires Skills (and code execution) enabled on your plan. Source: [adapters/claude-skill/genui/SKILL.md](adapters/claude-skill/genui/SKILL.md) (generated — same rules as SESSION-INSTALL).

Alternative: a **Claude Project** with `SESSION-INSTALL.md` uploaded as project knowledge.

---

## Stale copy: pinned URL

Replace `main` with a commit SHA — a new URL cannot be served from an old cache:

```text
Load GenUI for this chat from https://raw.githubusercontent.com/noahtan917/gen-ui/<commit-sha>/adapters/session/SESSION-INSTALL.md
```

Get the SHA from the GitHub commit list (or `git rev-parse HEAD` locally after pushing).

---

## Fetch blocked: paste

Any host that cannot fetch (Gemini chat always; Claude / ChatGPT if the fetch fails):

1. Open https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/PASTE-BUNDLE.md in your browser
2. Copy all → paste into chat
3. Say: **`Apply as GenUI for this chat.`**

Same policy and `installVersion` as SESSION-INSTALL.

---

## Then ask anything (branding stays on)

```text
Help me pick a weeknight dinner
```

Expect **exactly** the two reference meals (salmon / ramen), session brand styling (#2F63D6), and **Send this next** lines — on every dinner request, not just the first. On Claude web this should be a custom Artifact, not Claude’s built-in meal planner (no invented meals, time filters, or “Plan this” chips).

If the host drifts to its own planner, use the recovery prompt in [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) (L12 Claude, L10 ChatGPT via [docs/install-chatgpt.md](docs/install-chatgpt.md)).

---

## Why the raw URL

Observed on Claude web with the old prompt (*“Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui”*) — see [L13](docs/LIMITATIONS-AND-CAUSES.md):

- GitHub’s `robots.txt` blocks `/tree/`, `/raw/`, `/commits/` paths for AI fetchers → repo browsing fails with “robots disallowed”.
- Claude only fetches URLs that appear in your message or earlier results; it will not build `raw.githubusercontent.com` links itself.
- Fetch results can be cached → the model may read an outdated install.
- “Install the skill” makes Claude look for its (read-only) skills folder.

`raw.githubusercontent.com` is not robots-blocked, and a URL in your own message is always fetchable.

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
| Claude (persistent) | [adapters/claude-skill/](adapters/claude-skill/) |
| Claude / ChatGPT | Raw URL prompt (above) |
| Gemini | [docs/install-gemini.md](docs/install-gemini.md) |
| Limits | [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) |
| Provider overlays | [adapters/session/providers/](adapters/session/providers/) |
