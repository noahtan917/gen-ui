# Install GenUI — one prompt (917V branding automatic)

You only need **one message**. It is the repository URL. Claude opens root [SKILL.md](SKILL.md) from that link.

---

## Copy this

```text
install this skill for this session https://github.com/noahtan917/gen-ui
```

Expected confirmation: **GenUI loaded · installVersion `xxxxxxxx` · brand 917v (#2F63D6) · profile …**

Compare `installVersion` with the line at the top of [SKILL.md](SKILL.md) on GitHub. If it differs (or is missing), the host read a **stale cached copy** — use the [pinned blob](#stale-copy-pinned-blob) or [paste](#fetch-blocked-paste).

Optional, only if host auto-detect is wrong — add a second line: `Provider: chatgpt-web`

### Mandatory behavior (for the AI — not the user)

1. Read root `SKILL.md` **in full**. It is the whole skill (config, tokens, reference document, reference Artifact layout, host overlays).
2. Do **not** fetch other repo files and do **not** load `SESSION-INSTALL.md`. Do **not** look for a skills folder.
3. Confirm: GenUI loaded · installVersion · brand **917v** · primary **#2F63D6** · profile {id}.
4. Then the user may ask: *Help me pick a weeknight dinner*.

---

## Persistent on Claude web

No fetch, no cache, works in every new chat:

1. Download [adapters/claude-skill/genui.zip](adapters/claude-skill/genui.zip) (GitHub → **Download raw file**).
2. claude.ai → **Settings → Capabilities → Skills → Upload skill** → select the zip.
3. New chat: *Help me pick a weeknight dinner*.

Requires Skills (and code execution) enabled on your plan. The zip is the same generated body as root [SKILL.md](SKILL.md).

---

## Stale copy: pinned blob

Replace the repo URL with a commit blob. A new URL cannot be served from an old cache:

```text
install this skill for this session https://github.com/noahtan917/gen-ui/blob/<commit-sha>/SKILL.md
```

Get the SHA from the GitHub commit list (or `git rev-parse HEAD` locally after pushing).

---

## Fetch blocked: paste

Any host that cannot fetch (Gemini chat always; Claude / ChatGPT if the fetch fails):

1. Open [SKILL.md](SKILL.md) on GitHub (the raw file view) and copy all of it
2. Paste into chat
3. Say: **`Use this skill.`**

Same policy and `installVersion` as the repo-URL prompt.

---

## Then ask anything (branding stays on)

```text
Help me pick a weeknight dinner
```

Expect **exactly** the two reference meals (salmon / ramen), session brand styling (#2F63D6), and **Send this next** lines — on every dinner request, not just the first. On Claude web this should be a custom Artifact, not Claude’s built-in meal planner (no invented meals, time filters, or “Plan this” chips).

If the host drifts to its own planner, use the recovery prompt in [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) (L12 Claude, L10 ChatGPT via [docs/install-chatgpt.md](docs/install-chatgpt.md)).

---

## Why this prompt

A root `SKILL.md` is the file Claude opens from a repository URL. GitHub’s `robots.txt` blocks `/tree/`, `/raw/`, and `/commits/` for AI fetchers, and allows the blob page for `SKILL.md`.

The older prompt that fetched `adapters/session/SESSION-INSTALL.md` from `main` kept returning a cached copy (YouTube red, `installVersion` `401e4c93`). That URL is no longer the install path.

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
| Skill file | [SKILL.md](SKILL.md) |
| Claude (persistent) | [adapters/claude-skill/](adapters/claude-skill/) |
| Claude / ChatGPT | Repo-URL prompt (above) |
| Gemini | [docs/install-gemini.md](docs/install-gemini.md) |
| Limits | [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) |
| Provider overlays | [adapters/session/providers/](adapters/session/providers/) |
