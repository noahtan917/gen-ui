# GenUI — Provider-Agnostic Generative UI

Centralized engineering specification, JSON Schema contracts, provider adapters, and a reference runtime for interactive AI-generated user interfaces.

## Quick start

```bash
pnpm install
pnpm build
pnpm test
pnpm demo
```

Open the demo at the URL Vite prints (default `http://localhost:5173`). Click **Sheet-pan salmon** to see a structured contextual AI request payload in the panel.

## Chat / web GenAI (session install)

One skill for **Claude, ChatGPT, Gemini, DeepSeek, Grok**, and others: see [INSTALL-SKILL.md](INSTALL-SKILL.md).

**Gemini cannot fetch GitHub** — paste [adapters/session/PASTE-BUNDLE.md](adapters/session/PASTE-BUNDLE.md) ([guide](docs/install-gemini.md)).

Central bootstrap: [spec/session-bootstrap.md](spec/session-bootstrap.md) · Provider overlays: [adapters/session/providers/](adapters/session/providers/)

## Repository layout

| Path | Purpose |
|------|---------|
| [`spec/`](spec/) | Authoritative GenUI specification and contracts |
| [`adapters/session/`](adapters/session/) | Centralized chat session skill + per-provider overlays |
| [`adapters/`](adapters/) | Coding-agent entry points (Cursor, Gemini CLI, Claude Code, OpenAI) |
| [`branding/`](branding/) | Brand token packs (`demo`, future `917v`) |
| [`INSTALL-SKILL.md`](INSTALL-SKILL.md) | Copy-paste install prompt for any chat provider |
| [`packages/genui-core`](packages/genui-core) | Validate and normalize GenUI documents |
| [`packages/genui-render`](packages/genui-render) | Safe React rendering and interaction dispatch |
| [`apps/demo`](apps/demo) | Reference Vite app |
| [`docs/`](docs/) | Architecture and provider matrix |
| [`openspec/`](openspec/) | OpenSpec proposals |

## Using the Cursor skill

Project skill path: [`.cursor/skills/genui/SKILL.md`](adapters/cursor/.cursor/skills/genui/SKILL.md) (copy or symlink into your consumer repo, or open this repo in Cursor).

## Adding an AI provider

See [adapters/README.md](adapters/README.md).

## License

UNLICENSED — internal engineering repository.
