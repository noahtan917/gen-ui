# GenUI Interaction Contract (v1)

## Event envelope

When a user interacts with a GenUI control, the runtime emits:

```typescript
interface GenUIInteractEvent {
  type: "genui.interact";
  actionId: string;
  componentId: string;
  context: Record<string, unknown>;
  timestamp: string; // ISO 8601
}
```

## AI request resolution

For actions with `type: "ai.request"`:

1. Load action from `document.actions[actionId]`.
2. Merge `context` from the event with any static action context.
3. Interpolate `promptTemplate` using `{{key}}` placeholders.
4. Call host `onAIRequest({ prompt, actionId, context, componentId })`.

### Example: meal card

**Action:**

```json
{
  "planMeal": {
    "type": "ai.request",
    "promptTemplate": "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
    "contextKeys": ["meal", "cuisine"]
  }
}
```

**Component (Card):**

```json
{
  "id": "card-salmon",
  "type": "Card",
  "actionId": "planMeal",
  "props": {
    "title": "Sheet-pan salmon",
    "subtitle": "Mediterranean"
  }
}
```

**Event context** (provided by renderer from props + state):

```json
{
  "meal": "Sheet-pan salmon",
  "cuisine": "Mediterranean"
}
```

**Resolved prompt:**

> Help me cook Sheet-pan salmon (Mediterranean): ingredient list, steps, and total time for a weeknight dinner.

## State updates

For `type: "state.update"`:

```json
{
  "setBudget": {
    "type": "state.update",
    "updates": { "budget": "{{budget}}" }
  }
}
```

Form submit passes field values in `context`; runtime merges into local state and re-renders.

## Host responsibilities

| Layer | Responsibility |
|-------|----------------|
| AI agent | Generate valid GenUI JSON |
| `genui-core` | Validate and normalize |
| `genui-render` | Render allowlisted components, emit events |
| Host app | On `onAIRequest`, call the host’s AI backend (or demo mock) and show the reply in-app — not only log payload or ask the user to copy-paste the prompt |

Chat UIs that cannot run React still benefit: agents produce the same JSON; a separate host renders it.
