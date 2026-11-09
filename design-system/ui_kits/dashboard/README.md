# 917 AgentBase console: internal dashboard UI kit

This is an internal operations console following the brand book's Digital and product UI chapter (14): calm surfaces, one action color, one Facet pair per view, and state colors paired with words. No product code was supplied, so the screens are built from the book's rules and Core components demo. They don't recreate a shipped product.

- `index.html`: click-through. Sidebar nav, the Overview "Waiting for you" list opens the Agent Guard queue, selecting a row opens the detail panel, and Allow (toast) or Block (confirm dialog, then toast) records a decision. AgentRank has live search.
- `Shell.jsx`: 917 Black sidebar with the AgentBase lockup and brand capability icons, plus a 64px top bar.
- `Overview.jsx`: four metric cards (the Facet sits on the one that matters), a chart in the blue scale with one highlighted bar, and the held list.
- `GuardQueue.jsx`: Held, Allowed and Blocked tabs, a table and a detail panel.
- `AgentRank.jsx`: the agent table with score bars.
- `data.js`: example data.
