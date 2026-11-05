import {
  applyStateUpdate,
  buildInteractEvent,
  buildInteractionContext,
  interpolatePrompt,
  resolveAIRequest,
  validateGenUIDocument,
  type GenUIComponent,
  type GenUIDocument,
} from "@gen-ui/core";
import { propOrder, ROOT_COMPONENT, type CatalogEntry } from "./catalog.js";
import { GENUI_CONTEXT_KEY, type GenUIActionMetadata } from "./metadata.js";

export interface OpenUIExportResult {
  /** OpenUI Lang program; `root` first, then state, then components top-down (stream-friendly). */
  code: string;
  /** Information that could not be represented and was dropped. */
  warnings: string[];
}

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
const SENTINEL_OPEN = "";
const SENTINEL_CLOSE = "";
const SENTINEL_PATTERN = /([A-Za-z_][A-Za-z0-9_]*)/g;

/** Props each component consumes natively; anything else is reported as dropped. */
const MAPPED_PROPS: Record<CatalogEntry["name"], string[]> = {
  Stack: ["direction", "gap", "align"],
  Text: ["content", "variant"],
  Button: ["label", "context"],
  Card: ["title", "subtitle", "context"],
  Image: ["src", "alt"],
  Form: ["submitLabel"],
  Select: ["stateKey", "options", "label"],
};

/** An OpenUI Lang source fragment, already serialized. */
class Expr {
  constructor(readonly code: string) {}
}

/**
 * Serializes a JS value as an OpenUI Lang literal. Strings use JSON escaping,
 * which the OpenUI tokenizer accepts verbatim. Strings carrying state
 * sentinels become `"..." + $key` concatenations.
 */
function literal(value: unknown): string {
  if (value instanceof Expr) return value.code;
  if (value === undefined || value === null) return "null";
  if (typeof value === "string") return stringExpr(value);
  if (typeof value === "number" || typeof value === "boolean") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(literal).join(", ")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${IDENTIFIER.test(k) ? k : JSON.stringify(k)}: ${literal(v)}`);
    return `{${entries.join(", ")}}`;
  }
  return JSON.stringify(String(value));
}

/** `"Hi name!"` → `"Hi " + $name + "!"`. */
function stringExpr(text: string): string {
  if (!text.includes(SENTINEL_OPEN)) return JSON.stringify(text);
  const parts: string[] = [];
  let last = 0;
  for (const match of text.matchAll(SENTINEL_PATTERN)) {
    const index = match.index ?? 0;
    parts.push(JSON.stringify(text.slice(last, index)));
    parts.push(`$${match[1]}`);
    last = index + match[0].length;
  }
  parts.push(JSON.stringify(text.slice(last)));
  const nonEmpty = parts.filter((p) => p !== '""');
  // A value that is exactly one state read stays a bare `$key`, which preserves its type.
  if (nonEmpty.length === 1 && nonEmpty[0].startsWith("$")) return nonEmpty[0];
  // Otherwise make sure the first operand is a string literal so `+` concatenates.
  if (nonEmpty[0]?.startsWith("$")) nonEmpty.unshift('""');
  return nonEmpty.join(" + ");
}

function walk(nodes: GenUIComponent[], visit: (node: GenUIComponent) => void): void {
  for (const node of nodes) {
    visit(node);
    if (node.children?.length) walk(node.children, visit);
  }
}

function toIdentifier(id: string, used: Set<string>): string {
  let base = id
    .replace(/[^A-Za-z0-9]+(.)?/g, (_, ch: string | undefined) => (ch ? ch.toUpperCase() : ""))
    .replace(/^[^A-Za-z_]+/, (lead) => `n${lead}`);
  if (!base) base = "node";
  if (base === "root") base = "rootNode";
  let candidate = base;
  for (let n = 2; used.has(candidate); n++) candidate = `${base}${n}`;
  used.add(candidate);
  return candidate;
}

/**
 * Converts a GenUI v1 document into an OpenUI Lang program rendered by the
 * GenUI OpenUI library. Throws if the document is not valid GenUI.
 */
export function genuiToOpenUILang(input: GenUIDocument): OpenUIExportResult {
  const validation = validateGenUIDocument(input);
  if (!validation.success || !validation.document) {
    const details = validation.errors.map((e) => `${e.path}: ${e.message}`).join("; ");
    throw new TypeError(`Cannot export an invalid GenUI document: ${details}`);
  }
  const doc = validation.document;
  const warnings: string[] = [];

  // --- State: every key the UI can read or write becomes a $variable. -------
  const initialState = doc.state ?? {};
  const stateKeys = new Set(Object.keys(initialState));
  walk(doc.components, (node) => {
    if (node.type === "Select") stateKeys.add(String(node.props.stateKey ?? node.id));
  });
  for (const action of Object.values(doc.actions)) {
    if (action.type === "state.update") Object.keys(action.updates).forEach((k) => stateKeys.add(k));
  }

  // Sentinel state: interpolating with it yields strings that mark state reads.
  const sentinelState: Record<string, unknown> = {};
  for (const key of stateKeys) {
    if (IDENTIFIER.test(key)) {
      sentinelState[key] = `${SENTINEL_OPEN}${key}${SENTINEL_CLOSE}`;
    } else {
      sentinelState[key] = initialState[key];
      warnings.push(`State key "${key}" is not a valid OpenUI identifier; its initial value is inlined.`);
    }
  }

  // --- Statement ids ---------------------------------------------------------
  const used = new Set<string>(["root"]);
  const ids = new Map<GenUIComponent, string>();
  walk(doc.components, (node) => ids.set(node, toIdentifier(node.id, used)));

  const actionExpr = (node: GenUIComponent): Expr | undefined => {
    if (!node.actionId) return undefined;
    const action = doc.actions[node.actionId];
    const context = buildInteractionContext(node, sentinelState);
    const event = buildInteractEvent(node.actionId, node.id, context);

    if (action.type === "ai.request") {
      const payload = resolveAIRequest(doc, event);
      if (!payload) return undefined;
      const propsContext = node.props.context as Record<string, unknown> | undefined;
      const meta: GenUIActionMetadata = {
        actionId: node.actionId,
        componentId: node.id,
        action,
        ...(propsContext ? { propsContext } : {}),
      };
      if (GENUI_CONTEXT_KEY in payload.context) {
        warnings.push(`Context key "${GENUI_CONTEXT_KEY}" on "${node.id}" is reserved and was replaced.`);
      }
      const hidden = { ...payload.context, [GENUI_CONTEXT_KEY]: meta };
      return new Expr(`@ToAssistant(${literal(payload.prompt)}, ${literal(hidden)})`);
    }

    const next = applyStateUpdate(doc, event, sentinelState);
    const steps = Object.keys(action.updates)
      .filter((key) => {
        if (IDENTIFIER.test(key)) return true;
        warnings.push(`State key "${key}" in action "${node.actionId}" is not a valid identifier; update dropped.`);
        return false;
      })
      .map((key) => `@Set($${key}, ${literal(next[key])})`);
    if (steps.length === 0) return undefined;
    return new Expr(steps.length === 1 ? steps[0] : `Action([${steps.join(", ")}])`);
  };

  const childRefs = (node: GenUIComponent): Expr | undefined =>
    node.children?.length
      ? new Expr(`[${node.children.map((c) => ids.get(c)).join(", ")}]`)
      : undefined;

  const argsFor = (node: GenUIComponent): Record<string, unknown> => {
    const p = node.props;
    switch (node.type) {
      case "Stack":
        return {
          children: childRefs(node) ?? new Expr("[]"),
          direction: p.direction,
          gap: p.gap,
          align: p.align,
        };
      case "Text":
        return {
          content: interpolatePrompt(String(p.content ?? ""), sentinelState),
          variant: p.variant,
        };
      case "Button":
        return { label: p.label ?? "Button", action: actionExpr(node) };
      case "Card":
        return { title: p.title, subtitle: p.subtitle, children: childRefs(node), action: actionExpr(node) };
      case "Image":
        return { src: p.src ?? "", alt: p.alt };
      case "Form":
        return { children: childRefs(node) ?? new Expr("[]"), action: actionExpr(node), submitLabel: p.submitLabel };
      case "Select": {
        const key = String(p.stateKey ?? node.id);
        return {
          value: IDENTIFIER.test(key) ? new Expr(`$${key}`) : String(initialState[key] ?? ""),
          options: p.options ?? [],
          label: p.label,
        };
      }
    }
  };

  const statement = (node: GenUIComponent): string => {
    for (const key of Object.keys(node.props)) {
      if (!MAPPED_PROPS[node.type].includes(key)) {
        warnings.push(`Prop "${key}" on ${node.type} "${node.id}" has no OpenUI mapping and was dropped.`);
      }
    }
    if (node.type !== "Card" && node.type !== "Stack" && node.type !== "Form" && node.children?.length) {
      warnings.push(`Children of ${node.type} "${node.id}" were dropped (not a container).`);
    }
    const args = argsFor(node);
    const order = propOrder(node.type);
    let lastDefined = -1;
    order.forEach((name, i) => {
      if (args[name] !== undefined) lastDefined = i;
    });
    const rendered = order.slice(0, lastDefined + 1).map((name) => literal(args[name]));
    return `${ids.get(node)} = ${node.type}(${rendered.join(", ")})`;
  };

  // --- Emit ------------------------------------------------------------------
  const lines: string[] = [];
  lines.push(`root = ${ROOT_COMPONENT}([${doc.components.map((c) => ids.get(c)).join(", ")}])`);
  for (const key of [...stateKeys].sort()) {
    if (IDENTIFIER.test(key)) lines.push(`$${key} = ${literal(initialState[key] ?? null)}`);
  }
  walk(doc.components, (node) => lines.push(statement(node)));

  if (doc.themeRef) warnings.push("themeRef is not representable in OpenUI Lang; supply it to the host renderer.");
  if (doc.meta) warnings.push("meta is not representable in OpenUI Lang; supply it to the host.");

  return { code: `${lines.join("\n")}\n`, warnings };
}
