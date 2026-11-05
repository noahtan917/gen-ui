import {
  createParser,
  createStreamingParser,
  type ASTNode,
  type ElementNode,
  type ParseResult,
} from "@openuidev/lang-core";
import {
  validateGenUIDocument,
  type GenUIAction,
  type GenUIComponent,
  type GenUIDocument,
  type ValidationError,
  type ValidationResult,
} from "@gen-ui/core";
import { catalog, ROOT_COMPONENT } from "./catalog.js";
import { genuiSchemaLibrary } from "./library.js";
import { isPlainObject, splitHiddenContext } from "./metadata.js";

export interface OpenUIImportOptions {
  /** genuiVersion for the produced document (default "1.0.0"). */
  genuiVersion?: string;
  /** Out-of-band values OpenUI Lang cannot carry. */
  themeRef?: GenUIDocument["themeRef"];
  meta?: GenUIDocument["meta"];
}

export interface OpenUIImportResult extends ValidationResult {
  /** Non-fatal notes (dropped data, OpenUI warnings). */
  warnings: ValidationError[];
  /** False while the OpenUI parser reports truncated input (streaming). */
  complete: boolean;
}

const AST_KINDS = new Set([
  "Comp", "Str", "Num", "Bool", "Null", "Arr", "Obj", "Ref", "Ph", "StateRef",
  "RuntimeRef", "BinOp", "UnaryOp", "Ternary", "Member", "Index", "Assign",
]);
const CATALOG_NAMES = new Set<string>(catalog.map((c) => c.name));
const RETRY_HINTS = [
  "Use only GenUI components: Stack, Text, Button, Card, Image, Form, Select.",
  "Actions may use @ToAssistant(message, context?) or @Set($var, value) only.",
  "@OpenUrl, @Run, @Reset, Query(), Mutation() and @functions are not allowed in GenUI.",
  "Select must bind its value to a $variable.",
];

class ConversionError extends Error {
  constructor(readonly path: string, message: string) {
    super(message);
  }
}

function isAST(value: unknown): value is ASTNode {
  return (
    isPlainObject(value) &&
    typeof value.k === "string" &&
    AST_KINDS.has(value.k) &&
    value.type !== "element"
  );
}

function isElement(value: unknown): value is ElementNode {
  return isPlainObject(value) && value.type === "element" && typeof value.typeName === "string";
}

type Node = Record<string, unknown> & { k: string };

/** Static literal value of an AST (or an already-materialized prop). */
function toLiteral(value: unknown, path: string): unknown {
  if (!isAST(value)) return value;
  const n = value as unknown as Node;
  switch (n.k) {
    case "Str":
    case "Num":
    case "Bool":
      return n.v;
    case "Null":
      return null;
    case "Arr":
      return (n.els as unknown[]).map((el, i) => toLiteral(el, `${path}/${i}`));
    case "Obj":
      return Object.fromEntries(
        (n.entries as [string, unknown][]).map(([k, v]) => [k, toLiteral(v, `${path}/${k}`)]),
      );
    default:
      throw new ConversionError(path, `Expected a literal value, got ${describe(n)}.`);
  }
}

/** String template: literals plus `$var` reads (as `{{var}}`) joined with `+`. */
function toTemplate(value: unknown, path: string): string {
  if (!isAST(value)) {
    if (value === undefined || value === null) return "";
    return String(value);
  }
  const n = value as unknown as Node;
  switch (n.k) {
    case "Str":
    case "Num":
    case "Bool":
      return String(n.v);
    case "Null":
      return "";
    case "StateRef":
      return `{{${String(n.n).replace(/^\$/, "")}}}`;
    case "BinOp":
      if (n.op === "+") return toTemplate(n.left, path) + toTemplate(n.right, path);
      break;
  }
  throw new ConversionError(path, `Unsupported expression ${describe(n)}; use string literals and $variables joined with +.`);
}

/** Hidden context: literals, with `$var` reads resolved to "{{var}}" markers dropped. */
function toContextLiteral(value: unknown, path: string): unknown {
  if (!isAST(value)) return value;
  const n = value as unknown as Node;
  switch (n.k) {
    case "StateRef":
    case "BinOp":
      // Dynamic context values are re-derived from state at runtime; not part of the document.
      return undefined;
    case "Arr":
      return (n.els as unknown[]).map((el, i) => toContextLiteral(el, `${path}/${i}`));
    case "Obj":
      return Object.fromEntries(
        (n.entries as [string, unknown][])
          .map(([k, v]) => [k, toContextLiteral(v, `${path}/${k}`)])
          .filter(([, v]) => v !== undefined),
      );
    default:
      return toLiteral(value, path);
  }
}

function describe(n: Node): string {
  if (n.k === "Comp") return `@${String(n.name)}(...)`;
  if (n.k === "StateRef") return String(n.n);
  return `"${n.k}" expression`;
}

interface Step {
  name: string;
  node: Node;
}

function actionSteps(raw: unknown, path: string): Step[] {
  if (raw === undefined || raw === null) return [];
  if (!isAST(raw)) {
    // Legacy object form: { type: "continue_conversation", context? } / { type: "open_url", url }.
    if (isPlainObject(raw) && raw.type === "continue_conversation") {
      return [{ name: "LegacyToAssistant", node: { k: "Legacy", context: raw.context } }];
    }
    const type = isPlainObject(raw) ? String(raw.type) : typeof raw;
    throw new ConversionError(path, `Unsupported action "${type}".`);
  }
  const n = raw as unknown as Node;
  if (n.k !== "Comp") throw new ConversionError(path, `Expected an action, got ${describe(n)}.`);
  if (n.name === "Action") {
    const list = (n.args as unknown[])[0] as Node | undefined;
    const els = list?.k === "Arr" ? (list.els as Node[]) : [];
    return els.map((el, i) => {
      if (el.k !== "Comp") throw new ConversionError(`${path}/${i}`, `Expected an action step, got ${describe(el)}.`);
      return { name: String(el.name), node: el };
    });
  }
  return [{ name: String(n.name), node: n }];
}

function arg(step: Node, name: string, index: number): unknown {
  const mapped = step.mappedProps as Record<string, unknown> | undefined;
  return mapped?.[name] ?? (step.args as unknown[] | undefined)?.[index];
}

interface ConvertedAction {
  actionId: string;
  action: GenUIAction;
  propsContext?: Record<string, unknown>;
  componentId?: string;
}

class Converter {
  readonly errors: ValidationError[] = [];
  readonly warnings: ValidationError[] = [];
  readonly actions: Record<string, GenUIAction> = {};
  private readonly usedIds = new Set<string>();
  private counter = 0;

  error(path: string, message: string): void {
    this.errors.push({ path, message });
  }

  private uniqueId(preferred: string): string {
    let id = preferred;
    for (let n = 2; this.usedIds.has(id); n++) id = `${preferred}_${n}`;
    this.usedIds.add(id);
    return id;
  }

  private registerAction(preferredId: string, action: GenUIAction, path: string, reuse: boolean): string {
    const existing = this.actions[preferredId];
    if (existing && reuse) {
      if (JSON.stringify(existing) !== JSON.stringify(action)) {
        this.error(path, `Action "${preferredId}" is defined twice with different definitions.`);
      }
      return preferredId;
    }
    let id = preferredId;
    for (let n = 2; this.actions[id]; n++) id = `${preferredId}_${n}`;
    this.actions[id] = action;
    return id;
  }

  private convertAction(raw: unknown, componentKey: string, fallbackMessage: string | undefined, path: string): ConvertedAction | undefined {
    const steps = actionSteps(raw, path);
    if (steps.length === 0) {
      if (fallbackMessage === undefined) return undefined;
      // OpenUI convention: a Button without an action sends its label to the assistant.
      const action: GenUIAction = { type: "ai.request", promptTemplate: fallbackMessage };
      return { actionId: this.registerAction(`${componentKey}_ask`, action, path, false), action };
    }

    const unsupported = steps.find((s) => !["ToAssistant", "LegacyToAssistant", "Set"].includes(s.name));
    if (unsupported) {
      throw new ConversionError(path, `Action step @${unsupported.name} is not allowed in GenUI (safe rendering).`);
    }
    const asks = steps.filter((s) => s.name !== "Set");
    const sets = steps.filter((s) => s.name === "Set");
    if (asks.length > 0 && sets.length > 0) {
      throw new ConversionError(path, "GenUI v1 allows one action type per component; do not mix @ToAssistant and @Set.");
    }
    if (asks.length > 1) throw new ConversionError(path, "Only one @ToAssistant step is allowed per component.");

    if (sets.length > 0) {
      const updates: Record<string, string> = {};
      sets.forEach((s, i) => {
        const target = arg(s.node, "target", 0) as Node | undefined;
        if (target?.k !== "StateRef") {
          throw new ConversionError(`${path}/${i}`, "@Set must target a $variable.");
        }
        updates[String(target.n).replace(/^\$/, "")] = toTemplate(arg(s.node, "value", 1), `${path}/${i}`);
      });
      const action: GenUIAction = { type: "state.update", updates };
      return { actionId: this.registerAction(`${componentKey}_set`, action, path, false), action };
    }

    const ask = asks[0];
    const rawContext = ask.name === "LegacyToAssistant" ? ask.node.context : arg(ask.node, "context", 1);
    const context = toContextLiteral(rawContext, `${path}/context`);
    const { meta } = splitHiddenContext(context);
    if (meta?.action) {
      const actionId = this.registerAction(meta.actionId, meta.action, path, true);
      return { actionId, action: meta.action, propsContext: meta.propsContext, componentId: meta.componentId };
    }

    const message =
      ask.name === "LegacyToAssistant" ? fallbackMessage ?? "" : toTemplate(arg(ask.node, "message", 0), `${path}/message`);
    const action: GenUIAction = { type: "ai.request", promptTemplate: message };
    let propsContext: Record<string, unknown> | undefined;
    if (isPlainObject(context)) {
      propsContext = Object.keys(context).length ? context : undefined;
    } else if (context !== undefined && context !== null) {
      propsContext = { context };
      this.warnings.push({ path, message: "Non-object @ToAssistant context was wrapped as { context }." });
    }
    return { actionId: this.registerAction(`${componentKey}_ask`, action, path, false), action, propsContext };
  }

  convertChildren(raw: unknown, path: string): GenUIComponent[] {
    if (raw === undefined || raw === null) return [];
    if (!Array.isArray(raw)) {
      this.error(path, "Expected an array of components.");
      return [];
    }
    const out: GenUIComponent[] = [];
    raw.forEach((child, i) => {
      if (child === null || child === undefined) return; // dropped by the parser (already reported)
      const converted = this.convertElement(child, `${path}/${i}`);
      if (converted) out.push(converted);
    });
    return out;
  }

  convertElement(el: unknown, path: string): GenUIComponent | undefined {
    if (!isElement(el)) {
      this.error(path, "Expected a component.");
      return undefined;
    }
    const type = el.typeName;
    const at = el.statementId ? `openui.${el.statementId}` : path;
    if (!CATALOG_NAMES.has(type)) {
      this.error(at, `Unknown component "${type}".`);
      return undefined;
    }
    const key = el.statementId ?? `${type.toLowerCase()}${++this.counter}`;
    const p = el.props;
    const props: Record<string, unknown> = {};
    const set = (name: string, value: unknown) => {
      if (value !== undefined && value !== null) props[name] = value;
    };

    try {
      let children: GenUIComponent[] | undefined;
      let converted: ConvertedAction | undefined;

      switch (type) {
        case "Stack":
          set("direction", toLiteral(p.direction, `${at}/direction`));
          set("gap", toLiteral(p.gap, `${at}/gap`));
          set("align", toLiteral(p.align, `${at}/align`));
          children = this.convertChildren(p.children, `${at}/children`);
          break;
        case "Text":
          set("variant", toLiteral(p.variant, `${at}/variant`));
          set("content", toTemplate(p.content, `${at}/content`));
          break;
        case "Button": {
          const label = toLiteral(p.label, `${at}/label`) as string;
          set("label", label);
          converted = this.convertAction(p.action, key, label, `${at}/action`);
          break;
        }
        case "Card":
          set("title", toLiteral(p.title, `${at}/title`));
          set("subtitle", toLiteral(p.subtitle, `${at}/subtitle`));
          children = this.convertChildren(p.children, `${at}/children`);
          converted = this.convertAction(p.action, key, undefined, `${at}/action`);
          break;
        case "Image":
          set("src", toLiteral(p.src, `${at}/src`));
          set("alt", toLiteral(p.alt, `${at}/alt`));
          break;
        case "Form":
          set("submitLabel", toLiteral(p.submitLabel, `${at}/submitLabel`));
          children = this.convertChildren(p.children, `${at}/children`);
          converted = this.convertAction(p.action, key, undefined, `${at}/action`);
          break;
        case "Select": {
          const binding = p.value as Node | undefined;
          if (!isAST(binding) || binding.k !== "StateRef") {
            throw new ConversionError(`${at}/value`, "Select value must be bound to a $variable.");
          }
          set("stateKey", String(binding.n).replace(/^\$/, ""));
          set("label", toLiteral(p.label, `${at}/label`));
          set("options", toLiteral(p.options, `${at}/options`));
          break;
        }
      }

      if (converted?.propsContext) props.context = converted.propsContext;
      const id = this.uniqueId(converted?.componentId ?? key);
      const component: GenUIComponent = { id, type: type as GenUIComponent["type"], props };
      if (converted) component.actionId = converted.actionId;
      if (children && children.length) component.children = children;
      return component;
    } catch (err) {
      if (err instanceof ConversionError) {
        this.error(err.path, err.message);
        return undefined;
      }
      throw err;
    }
  }
}

function mapParserErrors(result: ParseResult, conv: Converter): void {
  for (const e of result.meta.errors) {
    const entry = {
      path: `openui.${e.statementId ?? e.component}${e.path}`,
      message: `[${e.code}] ${e.message}`,
    };
    (e.severity === "warning" ? conv.warnings : conv.errors).push(entry);
  }
}

/** Converts one OpenUI parse result into a validated GenUI document. */
export function convertParseResult(result: ParseResult, options: OpenUIImportOptions = {}): OpenUIImportResult {
  const conv = new Converter();
  const complete = !result.meta.incomplete;
  mapParserErrors(result, conv);

  if (result.rootExpression) conv.error("openui.root", "Conditional root expressions are not supported in GenUI.");
  for (const q of result.queryStatements) conv.error(`openui.${q.statementId}`, "Query() is not allowed in GenUI.");
  for (const m of result.mutationStatements) conv.error(`openui.${m.statementId}`, "Mutation() is not allowed in GenUI.");
  if (complete && result.meta.unresolved.length) {
    conv.error("openui", `Unresolved references: ${result.meta.unresolved.join(", ")}.`);
  }

  let components: GenUIComponent[] = [];
  const root = result.root;
  if (!root) {
    if (complete) conv.error("openui.root", "Program has no root component.");
  } else {
    const onlyChildren = Object.entries(root.props).every(([k, v]) => k === "children" || v === undefined || v === null);
    if (root.typeName === ROOT_COMPONENT && onlyChildren) {
      // `root = Stack([a, b])` with no layout props is the document's top-level list.
      components = conv.convertChildren(root.props.children, "openui.root/children");
    } else {
      const single = conv.convertElement(root, "openui.root");
      components = single ? [single] : [];
    }
  }

  const state: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(result.stateDeclarations)) {
    // null declarations only introduce a binding; GenUI treats absent and null alike.
    if (value !== null && value !== undefined) state[name.replace(/^\$/, "")] = value;
  }

  const document: GenUIDocument = {
    genuiVersion: options.genuiVersion ?? "1.0.0",
    ...(options.meta ? { meta: options.meta } : {}),
    ...(options.themeRef ? { themeRef: options.themeRef } : {}),
    ...(Object.keys(state).length ? { state } : {}),
    actions: conv.actions,
    components,
  };

  const validation = validateGenUIDocument(document);
  const errors = [...conv.errors, ...(complete || components.length ? validation.errors : [])];
  return {
    success: errors.length === 0 && validation.success,
    document: validation.success ? validation.document : undefined,
    errors,
    warnings: conv.warnings,
    retryHints: errors.length ? [...RETRY_HINTS, ...validation.retryHints] : [],
    complete,
  };
}

let parser: ReturnType<typeof createParser> | undefined;

/** Parses a complete OpenUI Lang program into a validated GenUI document. */
export function openUILangToGenUI(code: string, options?: OpenUIImportOptions): OpenUIImportResult {
  parser ??= createParser(genuiSchemaLibrary.toJSONSchema(), genuiSchemaLibrary.root);
  return convertParseResult(parser.parse(code), options);
}

export interface OpenUIStreamImporter {
  /** Feed the next chunk; returns the document converted so far. */
  push(chunk: string): OpenUIImportResult;
  /** Current result without new input. */
  result(): OpenUIImportResult;
}

/** Incremental importer for streamed model output. */
export function createOpenUIStreamImporter(options?: OpenUIImportOptions): OpenUIStreamImporter {
  const stream = createStreamingParser(genuiSchemaLibrary.toJSONSchema(), genuiSchemaLibrary.root);
  return {
    push: (chunk) => convertParseResult(stream.push(chunk), options),
    result: () => convertParseResult(stream.getResult(), options),
  };
}
