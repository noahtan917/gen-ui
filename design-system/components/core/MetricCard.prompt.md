Flat KPI card (label, big tabular number, caption) and a generic `Card` panel; give `facet` to exactly one card per view.

```jsx
<MetricCard label="Active agents" value="1,284" caption="Last 7 days" facet="agentbase" />
<Card padding={24}>…</Card>
```

- 6px radius, 1px keyline, no drop shadow.
- Numbers use Archivo Semibold with tabular figures.
