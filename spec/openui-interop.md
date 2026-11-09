# GenUI ↔ OpenUI interop (v1)

How GenUI v1 documents map to and from [OpenUI](https://www.openui.com) (`thesysdev/openui`) **OpenUI Lang**. Decision record: [OpenSpec 006](../openspec/proposals/006-openui-interop.md). Implementation: [`packages/genui-openui`](../packages/genui-openui) (`@gen-ui/openui`).

The **GenUI JSON contract stays authoritative** ([`contracts/`](contracts/)). OpenUI Lang is an interchange and rendering format alongside it. Principles 1–5 in [`GENUI.md`](GENUI.md) still apply, especially **safe rendering**: OpenUI features outside the GenUI catalog are rejected on import.

## Component library

OpenUI programs use a GenUI library whose components have the **same names** as the GenUI catalog. Arguments are **positional** in this order (Zod key order in [`catalog.ts`](../packages/genui-openui/src/catalog.ts)). Reordering them is a breaking change.

| Component | Signature |
|-----------|-----------|
| `Stack` | `Stack(children, direction?, gap?, align?)` |
| `Text` | `Text(content, variant?)` |
| `Button` | `Button(label, action?)`. Without an action, the label is sent to the assistant (OpenUI convention). |
| `Card` | `Card(title?, subtitle?, children?, action?)`. Clickable only when `action` is set. |
| `Image` | `Image(src, alt?)` |
| `Form` | `Form(children, action, submitLabel?)` |
| `Select` | `Select($binding, options, label?)`, where `value` is a two-way `$variable` binding |
| `Chart` | `Chart(ariaLabel, series, data, chartType?, unit?, stateKey?, filter?, action?)`. `filter` is the `$variable` for `stateKey`. |

The generated signature list is in [`adapters/session/examples/openui-signatures.txt`](../adapters/session/examples/openui-signatures.txt) (a golden file).

## Mapping

| GenUI v1 | OpenUI Lang |
|----------|-------------|
| `components[]` | `root = Stack([...])`. A root `Stack` with no layout props **is** the top-level list (on import, and when rendering). |
| node `id` | Statement name, camelCased to an identifier (`card-salmon` → `cardSalmon`). `root` is reserved; collisions get a numeric suffix. |
| `state` | `$key = <literal>` declarations. Keys that are only written by `state.update` or bound by `Select` are declared as `null`. |
| `{{key}}` read from state (Text content, prompts, updates) | Reactive concatenation, e.g. `"Servings: " + $servings`. A value that is exactly one read becomes a bare `$key`. |
| `ai.request` | `@ToAssistant("<prompt>", { ...resolvedContext, genui: {...} })`. The prompt is resolved exactly as `resolveAIRequest` would resolve it (via `buildInteractionContext`); state reads stay reactive. |
| `state.update` | `@Set($key, <value>)`, or `Action([@Set(...), ...])` for several keys |
| `themeRef`, `meta` | **Not representable.** Pass them out-of-band (`GenUIOpenUIRenderer themeRef`, `openUILangToGenUI(code, { themeRef, meta })`). |
| `genui.interact` → `AIRequestPayload` | OpenUI `onAction` `continue_conversation`: `humanFriendlyMessage` → `prompt`, and `params.context` → `context` (minus `genui`) |

### GenUI provenance (`genui` hidden context)

`ai.request` actions carry `genui: { actionId, componentId, action, propsContext? }` inside the `@ToAssistant` context, which OpenUI defines as hidden data for the assistant. It makes import lossless, including the full `promptTemplate` and the original kebab-case component id, and it lets the event bridge report the original `actionId`/`componentId`. The `genui` key is reserved.

## Import rules (OpenUI Lang → GenUI)

Allowed:

- the GenUI catalog components (`Stack`, `Text`, `Button`, `Card`, `Image`, `Form`, `Select`, `Chart`)
- string, number, boolean, null, array and object literals
- `$variables` and `+` string concatenation
- `@ToAssistant`, and the legacy `{type: "continue_conversation"}` object
- `@Set`

The following produce **validation errors** (with `retryHints`), never a partial render:

| Construct | Error |
|-----------|-------|
| `@OpenUrl`, `@Run`, `@Reset`, custom actions | "not allowed in GenUI (safe rendering)" |
| `Query()`, `Mutation()` | "not allowed in GenUI" |
| `@Count(...)` and other functions, ternaries, member access | "Unsupported expression" |
| `@ToAssistant` mixed with `@Set` in one action; two `@ToAssistant` | "one action type per component" |
| `Select` without a `$variable` | "must be bound to a $variable" |
| Unknown components, missing required args, type mismatches | OpenUI parser codes (`unknown-component`, `missing-required`, …), path `openui.<statement>/<prop>` |
| No `root`; conditional `root` | "no root component" / "not supported" |

Native (non-GenUI) programs get derived action ids: `<statement>_ask` for `@ToAssistant`, and `<statement>_set` for `@Set`. The `@ToAssistant` message becomes the `promptTemplate`, with `$var` → `{{var}}`. An object context becomes `props.context`.

Streaming: `createOpenUIStreamImporter()` converts every chunk. `complete` is false while OpenUI reports truncated input, and the final result equals a full parse.

## Round-trip guarantees

`openUILangToGenUI(genuiToOpenUILang(doc).code)` returns:

- **Identical** components, actions and state for documents whose ids are identifiers and whose interactive nodes use `ai.request` (for example the reference `meal-planning.document.json`, which is golden-tested).
- **Normalized**, with the same behaviour, in these cases:
  - non-identifier ids of nodes without an `ai.request` become camelCase;
  - `state.update` action ids become `<statement>_set`;
  - `null` state declarations are dropped (GenUI treats absent and null alike);
  - props outside the mapping are dropped (the export reports them in `warnings`).
- `themeRef`/`meta` only if supplied out-of-band.

## Known gaps

- Text containing a literal `{{word}}` is treated as a GenUI placeholder on import, the same way GenUIRenderer treats it.
- `Form` fields come only from `Select` bindings; GenUI v1 has no named form inputs.
- Static `props.context` of a `state.update` component is baked into the `@Set` values and is not restored on import.
- The OpenUI system prompt still lists `@OpenUrl` as a built-in step. The GenUI rules appended by `genuiOpenUISystemPrompt()` forbid it, and import rejects it.
