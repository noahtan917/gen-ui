# Provider overlay: chatgpt-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/GENUI.md](../../../spec/GENUI.md).

**Profile:** Prefer `embedded-ui-host` (Canvas / HTML) when the user asks for **GenUI** or **YouTube branding** (`#FF0000`). If unavailable, use `markdown-ui-host` — **not** ChatGPT’s default recipe carousel with stock photos unless the user asks for a generic dinner list.

**Brand SSOT:** [session-bootstrap.md](../../../spec/session-bootstrap.md) and [ON-INSTALL.md](../../ON-INSTALL.md) require **`youtube`** only. Do **not** use legacy `branding/demo` blue (`#2563eb`).

## ChatGPT-specific causes of drift

| Symptom | Cause |
|---------|--------|
| Random recipes (adobo, pasta, …) | Model improvises instead of **reference scenario** |
| No red `#FF0000` on cards | Native ChatGPT widgets ignore `themeRef`; host UI wins — force inline hex in markdown/HTML |
| No **Send this next:** | Skill not enforced for this provider |

## Required behavior (weeknight dinner / GenUI demo)

1. **Reference fidelity:** For “weeknight dinner” / “GenUI meal options”, show **exactly these two options** (from [meal-planning.document.json](../examples/meal-planning.document.json)):
   - **Sheet-pan salmon** · Mediterranean
   - **Miso ramen bowl** · Japanese  
   Do **not** substitute other dishes unless the user asks for “more options” or “different meals.”

2. **Branding (youtube — default demo pack):** Visible UI must use:
   - Primary accent **#FF0000** (titles, borders, buttons, links)
   - Text **#0F0F0F**, muted **#606060**, dark chrome **#0F0F0F**
   - If using HTML/Canvas, inline CSS with these hex values.
   - If ChatGPT only allows plain markdown, state at the top: **Brand: youtube (#FF0000)** and use markdown/HTML where supported (e.g. `<span style="color:#FF0000">` for titles).

3. **Do not** use stock-image recipe cards as a substitute for GenUI when the user invoked the GenUI skill.

4. **Interaction:** Each option must include **Send this next:** with the full interpolated `planMeal` prompt (see reference JSON).

5. **GenUI JSON:** Build internally; show only if user asks, or in a brief “Developer” section after the cards.

## User follow-up if the reply looks generic

```text
Follow GenUI reference scenario only: Sheet-pan salmon and Miso ramen bowl.
Apply YouTube brand primary #FF0000. Include Send this next for each. No stock photo carousel.
```
