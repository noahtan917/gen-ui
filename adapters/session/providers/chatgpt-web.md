# Provider overlay: chatgpt-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/GENUI.md](../../../spec/GENUI.md).

**Profile:** Prefer `embedded-ui-host` (Canvas / HTML) when the user asks for **GenUI** or **demo branding**. If unavailable, use `markdown-ui-host` — **not** ChatGPT’s default recipe carousel with stock photos unless the user asks for a generic dinner list.

## ChatGPT-specific causes of drift

| Symptom | Cause |
|---------|--------|
| Random recipes (adobo, pasta, …) | Model improvises instead of **reference scenario** |
| No blue `#2563eb` | Native ChatGPT widgets ignore `themeRef`; host UI wins |
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
   - If ChatGPT only allows plain markdown, state at the top: **Brand: demo (#2563eb)** and use markdown/HTML where supported (e.g. `<span style="color:#2563eb">` for titles).

3. **Do not** use stock-image recipe cards as a substitute for GenUI when the user invoked the GenUI skill.

4. **Interaction:** Each option must include **Send this next:** with the full interpolated `planMeal` prompt (see reference JSON).

5. **GenUI JSON:** Build internally; show only if user asks, or in a brief “Developer” section after the cards.

## User follow-up if the reply looks generic

```text
Follow GenUI reference scenario only: Sheet-pan salmon and Miso ramen bowl.
Apply demo brand primary #2563eb. Include Send this next for each. No stock photo carousel.
```
