# GenUI architecture

## Layers

| Layer | Location | Role |
|-------|----------|------|
| Specification | `spec/` | Authoritative rules, schemas, branding workflow |
| Adapters | `adapters/` | Provider-specific entry points |
| Core | `packages/genui-core` | Validate, normalize, resolve interactions |
| Render | `packages/genui-render` | Allowlisted React registry, event dispatch |
| Demo | `apps/demo` | Reference host integrating `onAIRequest` |

## Agent time vs runtime

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

Coding agents consume skills; the host application validates and renders. Consumer chat products do not automatically execute this pipeline unless integrated.

## Security (v1)

- Component allowlist in `@gen-ui/render`
- Validation before render in `@gen-ui/core`
- No `html` / `script` types in schema

## Versioning

Document field `genuiVersion` follows semver. Breaking changes require a major bump and adapter notes.
