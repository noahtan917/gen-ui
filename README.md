# GenUI — Provider-Agnostic Generative UI

Centralized engineering specification, JSON Schema contracts, provider adapters, and a reference runtime for interactive AI-generated user interfaces.

## Install the skill (Claude, ChatGPT, …)

**Users:** send this one message:

```text
install this skill for this session https://github.com/noahtan917/gen-ui
```

**AI assistants:** if asked to install this skill from this repo, read [SKILL.md](SKILL.md) only. It is the whole skill. Do not browse other repo files, do not load `SESSION-INSTALL.md`, and never use `demo` or `youtube`. Brand is **917v**, primary **#2F63D6**.

**Fetch blocked / Gemini:** paste [SKILL.md](SKILL.md) and say `Use this skill.` **Persistent on Claude web:** upload [adapters/claude-skill/genui.zip](adapters/claude-skill/genui.zip). Details: [INSTALL-SKILL.md](INSTALL-SKILL.md).

## Quick start

```bash
pnpm install
pnpm build
pnpm test
pnpm demo
```

Open the demo at the URL Vite prints (default `http://localhost:5173`). **917V brand** (blue `#2F63D6`, light header) — **Meals** shows the dinner cards; click **Sheet-pan salmon** and the **Assistant** panel streams a weeknight cooking plan (demo mock, no API key). **Chart** draws a sample stacked bar chart and redraws it when you change chamber.

Chat skill install generates branded UI in the host’s chat; **click → auto-answer** requires this reference host (`pnpm demo`) or your product’s `react-host` integration.

## Chat / web GenAI

One user prompt: [INSTALL-SKILL.md](INSTALL-SKILL.md) · Skill file: [SKILL.md](SKILL.md).

Maintainers: [spec/session-config.json](spec/session-config.json) → `pnpm generate:session-artifacts` · Bootstrap: [spec/session-bootstrap.md](spec/session-bootstrap.md)

## Repository layout

| Path | Purpose |
|------|---------|
| [`SKILL.md`](SKILL.md) | Chat skill. The repo-URL prompt loads this file |
| [`spec/`](spec/) | Authoritative GenUI specification and contracts |
| [`adapters/session/`](adapters/session/) | Centralized chat session skill + per-provider overlays |
| [`adapters/claude-skill/`](adapters/claude-skill/) | Generated Claude Skill (`genui.zip`) for persistent install on claude.ai |
| [`adapters/`](adapters/) | Coding-agent entry points (Cursor, Gemini CLI, Claude Code, OpenAI) |
| [`branding/`](branding/) | Brand token packs (`917v` session default, legacy `demo`) |
| [`design-system/`](design-system/) | 917V tokens, fonts, and product themes |
| [`INSTALL-SKILL.md`](INSTALL-SKILL.md) | Copy-paste install prompt for any chat provider |
| [`packages/genui-core`](packages/genui-core) | Validate and normalize GenUI documents |
| [`packages/genui-render`](packages/genui-render) | Safe React rendering and interaction dispatch |
| [`packages/genui-openui`](packages/genui-openui) | [OpenUI](https://www.openui.com) interop: GenUI JSON ↔ OpenUI Lang, React library, event bridge |
| [`apps/demo`](apps/demo) | Reference host: `@gen-ui/render` + mock LLM reply on `onAIRequest` |
| [`docs/`](docs/) | Architecture and provider matrix |
| [`openspec/`](openspec/) | OpenSpec proposals |

## Using the Cursor skill

Project skill path: [`.cursor/skills/genui/SKILL.md`](adapters/cursor/.cursor/skills/genui/SKILL.md) (copy or symlink into your consumer repo, or open this repo in Cursor).

## OpenUI (openui.com) interop

`@gen-ui/openui` converts GenUI documents to and from OpenUI Lang (`genuiToOpenUILang`, `openUILangToGenUI`, `createOpenUIStreamImporter`). It also renders OpenUI Lang with the GenUI component library (`@gen-ui/openui/react` → `GenUIOpenUIRenderer`) and maps OpenUI `onAction` to `onAIRequest`. In `pnpm demo`, use the **GenUI JSON | OpenUI Lang** toggle. Mapping rules: [spec/openui-interop.md](spec/openui-interop.md).

## Adding an AI provider

See [adapters/README.md](adapters/README.md).

## Progress & presentation

- [docs/PROGRESS-REPORT.md](docs/PROGRESS-REPORT.md) — status, architecture, demo script  
- [docs/PRESENTATION.md](docs/PRESENTATION.md) — slide-by-slide deck for stakeholders  
- [docs/LIMITATIONS-AND-CAUSES.md](docs/LIMITATIONS-AND-CAUSES.md) — provider limits, root causes, mitigations  

## License

UNLICENSED — internal engineering repository.
