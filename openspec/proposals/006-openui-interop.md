# OpenSpec 006: OpenUI (openui.com) interop

**Status:** Implemented  
**Date:** 2026-11-05

## Problem

[OpenUI](https://www.openui.com) (`thesysdev/openui`, MIT) is an open standard for generative UI. It defines **OpenUI Lang**, a line-oriented, streaming-first language (`root = Stack([title])`), Zod-typed component libraries (`defineComponent` / `createLibrary`), library-generated system prompts, and a React `Renderer` that emits structured `onAction` events. GenUI v1 uses its own JSON document contract, so GenUI output can't be consumed by OpenUI hosts and OpenUI output can't be rendered by `@gen-ui/render`.

## Decision

Build an **interop adapter, not a migration**. The GenUI JSON v1 contract (`spec/contracts/*.schema.json`) stays the source of truth, and a two-way bridge is added beside it.

## Goals

- Emit any valid GenUI document as OpenUI Lang that OpenUI's `Renderer` can render with a GenUI component library.
- Ingest OpenUI Lang (including streamed chunks), convert it to GenUI JSON, and validate it with the existing `validateDocument`.
- Map action semantics between the two event models, and document every gap.

## Mapping

| GenUI v1 | OpenUI Lang |
|---|---|
| root `components[]` | `root = Stack([...])`; the root is wrapped in a Stack if there are several top-level nodes |
| node `id` | statement identifier, camelCased (`card-salmon` → `cardSalmon`; collisions get a suffix). `ai.request` nodes keep their original id via `genui` provenance |
| `Stack` / `Text` / `Button` / `Card` / `Image` / `Form` / `Select` | same-named components in `genuiLibrary`; Zod props mirror `components.schema.json`, and positional order follows Zod key order |
| `ai.request{promptTemplate,contextKeys,context}` | `@ToAssistant("<resolved prompt>", {...resolvedContext, genui: {actionId, componentId, action, propsContext}})`, with state reads kept reactive (`"Cook for " + $servings`) |
| `state.update{updates}` | `Action([@Set($key, value), ...])` |
| `state` initial values | `$key = <literal>` declarations (`null` for keys only written by updates or bound by Select) |
| `themeRef` / `meta` | not representable; carried out-of-band (host props / `themeToCssVars`) |
| `genui.interact` → `AIRequestPayload` | OpenUI `onAction` `continue_conversation` (`humanFriendlyMessage` → `prompt`, `formState` → `context`) |

## Solution

1. **Spec:** `spec/openui-interop.md`, the authoritative mapping, linked from `spec/GENUI.md`.
2. **Package `@gen-ui/openui`** (`packages/genui-openui`):
   - `genuiLibrary`, which wraps the existing `defaultRegistry` renderers.
   - `genuiToOpenUILang()`, a pure serializer.
   - `openUILangToGenUI()`, which uses the `@openuidev/lang-core` parser and then `validateDocument`.
   - The event bridge.
   - A system-prompt helper.
3. **Core:** export `interpolatePrompt` and a new `buildInteractionContext` from `@gen-ui/core`. The renderer registry and the OpenUI exporter now share one context definition, with no behaviour change.
4. **Demo:** a "GenUI JSON | OpenUI Lang" format toggle that renders the same document through both paths.
5. **Session adapters:** an opt-in `"openuiOutput": true` in `spec/session-config.json`. When it is set, the generator inserts `adapters/session/openui-output.template.md` (signatures + reference program) before "Confirm activation". The key is deliberately **absent** by default, because adding `false` would change the config hash and therefore `installVersion`. The fixtures `examples/meal-planning.openui` and `examples/openui-signatures.txt` are golden files checked by `@gen-ui/openui` tests (`UPDATE_GOLDEN=1` rewrites them).
6. **Docs:** provider matrix, architecture, README, limitations.

## Known gaps / safety

- OpenUI-only built-ins (`@OpenUrl`, `@Run`, Query/Mutation statements, functions like `@Count`) are **rejected on import** with a validation error, in line with GenUI principle 4 (safe rendering).
- Unknown component names keep the existing GenUI behaviour: validation error plus fallback.
- `themeRef` and `meta` are lost in OpenUI Lang and must be supplied by the host.
- Static values (card title, `props.context`) are baked into the exported `@ToAssistant` message; state reads stay reactive. `state.update` action ids and non-`ai.request` kebab-case ids are normalized on round trip (see spec).

## Non-goals

- Replacing the GenUI JSON contract or bumping `genuiVersion`.
- Adopting OpenUI's standard component library, Gateway, or Query/Mutation tooling.
- Changing brand packs or the reference scenario.

## Dependencies

- `@openuidev/react-lang@^1.1.0`, `@openuidev/lang-core@^1.1.0` (MIT) and `zod@^3.25` (for `zod/v4`), all inside `@gen-ui/openui` only. `@gen-ui/core` keeps its own zod range; it never touches OpenUI schemas, so no bump was needed.
- Demo production bundle: 213 kB → 388 kB (gzip 64 → 119 kB). It contains no devtools or CDN code.
- `@openuidev/lang-core` runs a **postinstall telemetry** script (PostHog, pseudonymous). Set `OPENUI_TELEMETRY_DISABLED=1` or `DO_NOT_TRACK=1` for installs.
- In development, `@openuidev/react-lang` auto-mounts a devtools widget loaded from jsdelivr (unpinned `@0`). `apps/demo/index.html` opts out.

## Acceptance criteria

- [x] `spec/openui-interop.md` exists and is linked from `spec/GENUI.md`
- [x] Round trip: exact for `meal-planning.document.json` (minus `themeRef`/`meta`). The demo sample (with `state.update` and kebab-case ids) reaches a fixpoint after one round trip, and its `ai.request` actions are unchanged
- [x] Golden test against `adapters/session/examples/meal-planning.openui`
- [x] Streaming: a chunked parse's final result equals a full parse
- [x] Import rejects `@OpenUrl`, `@Run`, `@Reset`, `Query`, functions, unknown components, and a Form without an action. A Button without an action follows the OpenUI convention and sends its label
- [x] Event bridge yields the same `AIRequestPayload` as `resolveAIRequest`
- [x] `pnpm build && pnpm test` pass; existing suites unchanged
- [x] `pnpm lint:adapters` passes; generated artifacts byte-identical while `openuiOutput` is `false`
- [ ] Manual: `pnpm demo` format toggle shows the same visuals and the same reply for "Sheet-pan salmon" (user to verify)

## Follow-up of

[001-provider-agnostic-genui.md](001-provider-agnostic-genui.md)
