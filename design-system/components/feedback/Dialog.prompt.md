Modal dialog with Archivo title, short body and a verb-labelled primary button; `danger` uses Block red for destructive confirms.

```jsx
<Dialog title="Block this action?" confirm="Block action" danger onCancel={close} onConfirm={block}>
  The agent will stop and the requester is notified. This is logged.
</Dialog>
```
