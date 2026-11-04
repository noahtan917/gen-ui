# GenUI — Provider-Agnostic Generative UI

Centralized engineering specification, JSON Schema contracts, provider adapters, and a reference runtime for interactive AI-generated user interfaces.

## AI session install (Claude, ChatGPT, …)

If the user asks to install GenUI from this repo, **fetch and read in full** (do not browse random spec files):

https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md

See also [GENUI-SESSION.md](GENUI-SESSION.md). Never use `branding/demo` for session; brand comes from the generated artifact only.

**Gemini chat** cannot fetch GitHub — paste [PASTE-BUNDLE.md](adapters/session/PASTE-BUNDLE.md) instead ([guide](docs/install-gemini.md)).

## Quick start

```bash
pnpm install
pnpm build
pnpm test
pnpm demo
```

Open the demo at the URL Vite prints (default `http://localhost:5173`). **YouTube brand pack** (red `#FF0000`, dark header) — click **Sheet-pan salmon** and the **Assistant** panel streams a weeknight cooking plan automatically (demo mock, no API key).

Chat skill install generates branded UI in the host’s chat; **click → auto-answer** requires this reference host (`pnpm demo`) or your product’s `react-host` integration.

## Chat / web GenAI (session install)

One user prompt: [INSTALL-SKILL.md](INSTALL-SKILL.md) · One-shot artifact: [adapters/session/SESSION-INSTALL.md](adapters/session/SESSION-INSTALL.md) (raw URL above).

Maintainers: [spec/session-config.json](spec/session-config.json) → `pnpm generate:session-artifacts` · Bootstrap: [spec/session-bootstrap.md](spec/session-bootstrap.md)

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
| [`apps/demo`](apps/demo) | Reference host: `@gen-ui/render` + mock LLM reply on `onAIRequest` |
| [`docs/`](docs/) | Architecture and provider matrix |
| [`openspec/`](openspec/) | OpenSpec proposals |

## Using the Cursor skill

Project skill path: [`.cursor/skills/genui/SKILL.md`](adapters/cursor/.cursor/skills/genui/SKILL.md) (copy or symlink into your consumer repo, or open this repo in Cursor).

## Adding an AI provider

See [adapters/README.md](adapters/README.md).

## Progress & presentation

- [docs/PROGRESS-REPORT.md](docs/PROGRESS-REPORT.md) — status, architecture, demo script  
- [docs/PRESENTATION.md](docs/PRESENTATION.md) — slide-by-slide deck for stakeholders  
- [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) — provider limits, root causes, mitigations  

## License

UNLICENSED — internal engineering repository.
