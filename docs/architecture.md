# GenUI architecture

## Layers

| Layer | Location | Role |
|-------|----------|------|
| Specification | `spec/` | Authoritative rules, schemas, branding workflow |
| Adapters | `adapters/` | Provider-specific entry points |
| Core | `packages/genui-core` | Validate, normalize, resolve interactions |
| Render | `packages/genui-render` | Allowlisted React registry, event dispatch |
| Demo | `apps/demo` | Reference host: `onAIRequest` → mock streamed assistant reply |

## Agent time vs runtime (chat-bridge path)

Many chat hosts cannot run the React runtime. The host may only surface the resolved prompt for the user to send on the next turn.

```mermaid
sequenceDiagram
  participant Agent as AI_Agent
  participant Spec as spec_GENUI
  participant Core as genui_core
  participant Render as genui_render
  participant Host as Host_App

  Agent->>Spec: Read via adapter
  Agent->>Host: GenUI JSON
  Host->>Core: validateGenUIDocument
  Core->>Render: GenUIDocument
  Render->>Host: onAIRequest prompt
  Host->>Agent: User message with prompt
```

Coding agents consume skills; consumer chat products often stop at chat-bridge unless they embed `react-host`.

## Reference host (`react-host`)

[`apps/demo`](../apps/demo) implements the full loop: validate → render → resolve prompt → **invoke assistant in-app** (mock stream today; real LLM in product).

```mermaid
sequenceDiagram
  participant User
  participant Render as genui_render
  participant Host as apps_demo
  participant LLM as Assistant

  User->>Render: Click control
  Render->>Host: onAIRequest payload
  Host->>LLM: Resolved prompt
  LLM-->>Host: Streamed reply
  Host-->>User: Assistant panel
```

## Security (v1)

- Component allowlist in `@gen-ui/render`
- Validation before render in `@gen-ui/core`
- No `html` / `script` types in schema

## Versioning

Document field `genuiVersion` follows semver. Breaking changes require a major bump and adapter notes.
