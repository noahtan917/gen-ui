Pagination for results: `numbered` for data tables, `count` for large lists, `compact` for tight spaces, `dots` for carousels.

```jsx
<Pagination page={page} pageCount={12} onChange={setPage} />
<Pagination variant="count" page={page} pageCount={52} total={1284} pageSize={25} onPageSizeChange={setSize} onChange={setPage} />
<Pagination variant="compact" page={3} pageCount={12} onChange={setPage} />
<Pagination variant="dots" page={2} pageCount={5} onChange={setSlide} />
```

- Current page uses 917 Blue (selected state). Previous/Next are disabled at the ends, never removed.
- Place directly below the table or list it controls.
