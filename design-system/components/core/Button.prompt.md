Action button for 917V sites and product UI; use exactly one `primary` per view, everything else `secondary` or `ghost`.

```jsx
<Button>Deploy agent</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="ghost">View logs</Button>
```

- Labels say what will happen, in sentence case ("Deploy agent", never "Submit").
- `inverse` is for 917 Black / Deep Blue grounds where the blue primary would compete with a lit Facet.
- Sizes: sm 32px, md 40px, lg 48px (use lg for touch).
