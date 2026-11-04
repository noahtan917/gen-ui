# GenUI Engineering Specification (v1)

Provider-agnostic rules for generating, validating, and interacting with AI-produced user interfaces.

## Principles

1. **Interaction-first** — Every clickable control binds to an `actionId` with defined behavior.
2. **Branding-aware** — Generated UI uses `themeRef` and host design tokens; do not invent unrelated visual systems.
3. **Provider-agnostic** — Output is a versioned GenUI document (JSON), not provider-specific markup.
4. **Safe rendering** — Allowlisted components only; no arbitrary HTML or executable script in v1.
5. **Explicit contracts** — See [`interaction-contract.md`](interaction-contract.md) and [`contracts/`](contracts/).

## GenUI document (root)

Required top-level fields:

| Field | Type | Description |
|-------|------|-------------|
| `genuiVersion` | string | Semver, e.g. `"1.0.0"` |
| `actions` | object | Map of action id → action definition |
| `components` | array | Component tree |

Optional:

| Field | Type | Description |
|-------|------|-------------|
| `themeRef` | object | Design tokens / host branding reference |
| `state` | object | Initial UI state key-value store |
| `meta` | object | Title, description for accessibility |

## Actions

Each action defines what happens when a user interacts:

```json
{
  "planMeal": {
    "type": "ai.request",
    "promptTemplate": "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
    "contextKeys": ["meal", "cuisine"]
  }
}
```

Supported `type` values in v1:

- `ai.request` — Emit structured payload for the host app to send to the AI provider.
- `state.update` — Merge keys into document `state` (local UI only).

## Component catalog (v1)

| Type | Interactive | Notes |
|------|-------------|-------|
| `Stack` | No | Layout: `direction`, `gap`, `align` |
| `Text` | No | `variant`, `content` |
| `Button` | **Yes** | Requires `actionId` |
| `Card` | Optional | If `actionId` set, whole card is clickable |
| `Image` | No | `src`, `alt` |
| `Form` | **Yes** | `actionId` on submit |
| `Select` | No | Bound to `stateKey` |

Every node requires: `id`, `type`, `props`.

Interactive nodes **must** include `actionId` referencing a key in `actions`.

## Generation guidelines for AI agents

1. Read [`branding-extraction.md`](branding-extraction.md) when targeting an existing website.
2. Emit **only** JSON matching [`contracts/genui-document.schema.json`](contracts/genui-document.schema.json).
3. Prefer composing `Stack` + `Card` + `Text` + `Button` over bespoke layouts.
4. Bind real behaviors: clicks must map to meaningful `ai.request` prompts with context.
5. On validation errors, fix the document using error paths returned by the runtime.

## Error handling

- **Unknown component type** — Runtime renders fallback; log validation error.
- **Invalid document** — Do not render tree; return `ValidationResult` errors to the model.
- **Missing actionId** on interactive type — Validation failure.

## Provider integration

Adapters under `adapters/` must link to this file. Do not duplicate these rules in adapter bodies beyond a short checklist and pointers.

| Context | Entry |
|---------|--------|
| Chat / web GenAI (session install) | [`session-bootstrap.md`](session-bootstrap.md) → [`adapters/session/SKILL.md`](../adapters/session/SKILL.md) |
| Host UI capabilities | [`rendering-profiles.md`](rendering-profiles.md) |
| Cursor / CLI coding agents | [`adapters/README.md`](../adapters/README.md) |

## Related documents

- [`interaction-contract.md`](interaction-contract.md)
- [`branding-extraction.md`](branding-extraction.md)
- [`rendering-profiles.md`](rendering-profiles.md)
- [`session-bootstrap.md`](session-bootstrap.md)
- [`contracts/`](contracts/)
