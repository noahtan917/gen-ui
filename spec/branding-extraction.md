# Website Branding and Design System Extraction

Use this workflow when GenUI must feel native to an **existing** website (any host, not a specific product).

## Step 1 — Discover tokens

Inspect:

- CSS custom properties (`--color-*`, `--spacing-*`, etc.)
- Tailwind / theme config if present
- Design system package exports (e.g. `@company/ui`)

Record in `themeRef`:

```json
{
  "source": "host-website",
  "colors": {
    "primary": "#0066cc",
    "surface": "#ffffff",
    "text": "#1a1a1a"
  },
  "typography": {
    "fontFamily": "Inter, system-ui, sans-serif",
    "scale": { "body": "1rem", "heading": "1.5rem" }
  },
  "spacing": { "unit": 4, "md": 16 },
  "radius": { "md": "8px" },
  "shadows": { "card": "0 1px 3px rgba(0,0,0,0.12)" }
}
```

## Step 2 — Component inventory

Document existing patterns:

- Primary / secondary buttons
- Cards and list items
- Form fields and selects
- Navigation and responsive breakpoints

Prefer **reusing** host components in the render registry (custom overrides) over generating look-alike CSS.

## Step 3 — GenUI generation rules

1. Set `themeRef` on every document intended for that host.
2. Map GenUI types to host components where a registry override exists.
3. Do not introduce a color absent from `themeRef`, even when the user asks for another color. Do not introduce fonts or radii absent from `themeRef` unless the user explicitly asks for a variant.
4. Match spacing rhythm (multiples of `spacing.unit` when applicable).

## Step 4 — Validation

Visual check: generated blocks should be indistinguishable from adjacent native UI at a glance.

## Output artifact

Store extracted tokens under `themeRef` in the GenUI document or a sidecar JSON file referenced by `themeRef.id`.
