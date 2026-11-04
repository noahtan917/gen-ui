# Install GenUI for this session (any provider)

One centralized skill; pick your host via `Provider:` (optional).

## 1. Publish this repo

Repo must be **public** (or paste files manually). Replace `{REPO_URL}` below.

## 2. Copy into your GenAI chat

```text
Install the GenUI skill for this session from {REPO_URL}
Provider: generic-chat

Load spec/session-bootstrap.md and follow it. Default brand: demo.
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
