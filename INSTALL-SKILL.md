# Install GenUI for this session (any provider)

One centralized skill; pick your host via `Provider:` (optional).

## 1. Publish this repo

Repo must be **public** for hosts that can fetch URLs. Many **cannot** (including **Gemini chat**).

| Host | Install method |
|------|----------------|
| Claude web (often) | GitHub URL prompt below |
| **Gemini chat / app** | **[Paste bundle](adapters/session/PASTE-BUNDLE.md)** — see [docs/install-gemini.md](docs/install-gemini.md) |
| DeepSeek / others | Same paste bundle |
| Cursor / CLI | Clone repo |

**Gemini quick path:** open https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/PASTE-BUNDLE.md → copy all → paste into Gemini → *“Apply as GenUI skill for this chat.”*

## 2. Copy into your GenAI chat (URL fetch works)

```text
Install the GenUI skill for this session from {REPO_URL}
Provider: generic-chat

Load spec/session-bootstrap.md and follow it. Brand: youtube.
Confirm when ready.
```

**Provider ids** (see [adapters/session/providers/README.md](adapters/session/providers/README.md)):

| Provider | `Provider:` value |
|----------|-------------------|
| Claude web | `claude-web` |
| ChatGPT web | `chatgpt-web` |
| Gemini app | `gemini-app` |
| DeepSeek chat | `deepseek-chat` |
| Grok chat | `grok-chat` |
| Auto-detect | `generic-chat` |

## 3. Ask for interactive UI

```text
Help me pick a weeknight dinner — show GenUI meal options I can click.
```

You should get **demo-branded** meal cards and **actionable** follow-ups (artifact, markdown cards, or JSON per host).

## 4. Coding agents (Cursor, CLI)

Use [adapters/README.md](adapters/README.md) — same spec, different entry files.

## Central skill file

[adapters/session/SKILL.md](adapters/session/SKILL.md)
