## Output format: OpenUI Lang (openui.com)

Every GenUI reply includes **one** fenced `openui` block for the UI just shown. Put the visual first (markdown cards or the React artifact). Do not lead with JSON. Do not wait for the user to ask for OpenUI.

OpenUI Lang is line-based: one `identifier = Expression` per line, `root = Stack([...])` first, positional arguments only. Use **only** these GenUI components (same catalog as the GenUI JSON contract):

```text
{{OPENUI_SIGNATURES}}
```

Rules:

- Actions: `@ToAssistant("<complete prompt>", {key: "value"})` for AI requests, `Action([@Set($var, value)])` for local state. Never use `@OpenUrl`, `@Run`, `@Reset`, `Query()`, `Mutation()` or `@functions`.
- Every clickable Card, Button and Form has an action. Bind every Select to a declared `$variable`. A Chart that filters with `stateKey` passes that same `$variable` as `filter`.
- Branding stays **{{BRAND_ID}}** ({{PRIMARY_HEX}}). OpenUI Lang carries no theme, so the host applies the brand tokens above.
- **Dinner replies:** the fence is the reference program below (the two meals). Do not add meals or a chart.
- **Chart replies:** the fence is a `Chart` program (`bar`, `column`, or `stacked-bar`) with the same `ariaLabel`, `series`, and `data` rows drawn in the visual. Include the `Select` binding when the chart filters on `stateKey`.

Reference scenario as OpenUI Lang (equivalent to the reference GenUI document above):

```openui
{{OPENUI_REFERENCE_PROGRAM}}
```
