# 917V brand pack

Core light theme from the 917V design system in `design-system/`. Session install inlines [tokens.json](tokens.json) because chat hosts cannot load that CSS.

## Quick visual check

- Primary button, links, selected state, and focus: **#2F63D6**
- Hover **#2551B6**, pressed **#1A3A8C**
- Page **#F4F6F9**, cards **#FFFFFF**, text **#0A0C11**, muted **#586173**, border **#D8DEE7**
- Text: Instrument Sans. Headings: Archivo. Code: JetBrains Mono

## Rules tokens do not carry

- 917 Blue is only for the primary button, links, the selected state, and focus.
- Sentence case. No gradients.
- Cards are flat: 6px radius, a 1px keyline, no drop shadow.
- Buttons and inputs are 4px radius and at least 44px tall.
- Focus is a 2px ring with a 2px offset.
- Body text is at least 14px.

## GenUI `themeRef`

```json
{ "source": "917v", "id": "917v" }
```

Session install uses this pack via `spec/session-config.json`.
