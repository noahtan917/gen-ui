import type { AIRequestPayload, GenUIComponent, GenUIDocument } from "@gen-ui/core";
import { defaultRegistry, themeToCssVars, type RenderContext } from "@gen-ui/render";
import {
  createLibrary,
  defineComponent,
  Renderer,
  useFormName,
  useStateField,
  useTriggerAction,
  type ComponentRenderProps,
  type OpenUIError,
} from "@openuidev/react-lang";
import { catalog, ROOT_COMPONENT, type CatalogEntry } from "./catalog.js";
import { openUIActionToAIRequest } from "./events.js";

type Props = Record<string, unknown>;
type Interactivity = "always" | "ifAction" | "never";

/**
 * Placeholder child: the GenUI registry renders `children` by calling
 * `renderChild` per entry. One placeholder routes the whole evaluated OpenUI
 * child list through `renderNode`, which keys elements correctly.
 */
const CHILDREN_SLOT: GenUIComponent = { id: "__openui_children__", type: "Stack", props: {} };

const INTERACTIVITY: Record<CatalogEntry["name"], Interactivity> = {
  Stack: "never",
  Text: "never",
  Image: "never",
  Select: "never",
  Chart: "ifAction",
  // OpenUI convention: a Button without an action sends its label.
  Button: "always",
  Card: "ifAction",
  Form: "always",
};

const NO_STATE: Record<string, unknown> = {};
const noop = () => undefined;

function labelOf(type: CatalogEntry["name"], props: Props): string {
  const label = type === "Form" ? props.submitLabel : type === "Card" ? props.title : props.label;
  return typeof label === "string" ? label : "";
}

function isDocumentRoot(type: CatalogEntry["name"], statementId: string | undefined, layoutProps: Props): boolean {
  return (
    type === ROOT_COMPONENT &&
    statementId === "root" &&
    Object.values(layoutProps).every((v) => v === undefined || v === null)
  );
}

/** Wraps a GenUI registry renderer so OpenUI renders the exact same DOM and styles. */
function adapt(type: CatalogEntry["name"]) {
  function GenUIOpenUIComponent({ props, renderNode, statementId }: ComponentRenderProps<Props>) {
    const triggerAction = useTriggerAction();
    const formName = useFormName();
    const { children, action, ...rest } = props;
    if (isDocumentRoot(type, statementId, rest)) {
      // `root = Stack([...])` without layout props is the document's top-level list,
      // matching how GenUIRenderer lays out `components` (and how import unwraps it).
      return <>{renderNode(children)}</>;
    }
    const mode = INTERACTIVITY[type];
    const interactive = mode === "always" || (mode === "ifAction" && action != null);

    const component: GenUIComponent = {
      id: statementId ?? type.toLowerCase(),
      type,
      props: rest,
      ...(interactive ? { actionId: "openui" } : {}),
      ...(Array.isArray(children) && children.length ? { children: [CHILDREN_SLOT] } : {}),
    };
    const ctx: RenderContext = {
      onInteract: () => {
        void triggerAction(labelOf(type, props), formName, action as Parameters<typeof triggerAction>[2]);
      },
      state: NO_STATE,
      setStateKey: noop,
    };
    return <>{defaultRegistry[type](component, ctx, () => renderNode(children))}</>;
  }
  GenUIOpenUIComponent.displayName = `GenUIOpenUI(${type})`;
  return GenUIOpenUIComponent;
}

/** Chart reads `filter` as the OpenUI binding for `stateKey` and draws with the GenUI registry. */
function GenUIOpenUIChart({ props, statementId }: ComponentRenderProps<Props>) {
  const triggerAction = useTriggerAction();
  const formName = useFormName();
  const field = useStateField<string>("filter", props.filter as string);
  const { action, filter: _filter, children: _children, ...rest } = props;
  const stateKey = typeof rest.stateKey === "string" ? rest.stateKey : "";
  const selected = field.value == null ? "" : String(field.value);
  const component: GenUIComponent = {
    id: statementId ?? "chart",
    type: "Chart",
    props: rest,
    ...(action != null ? { actionId: "openui" } : {}),
  };
  const ctx: RenderContext = {
    onInteract: (_actionId, _componentId, context) => {
      void triggerAction(
        typeof context.label === "string" && context.label ? context.label : "Chart",
        formName,
        action as Parameters<typeof triggerAction>[2],
      );
    },
    state: stateKey ? { [stateKey]: selected } : NO_STATE,
    setStateKey: noop,
  };
  return <>{defaultRegistry.Chart(component, ctx, () => null)}</>;
}

/** Select binds its value to an OpenUI `$variable` (two-way). */
function GenUIOpenUISelect({ props, statementId }: ComponentRenderProps<Props>) {
  const field = useStateField<string>("value", props.value as string);
  const { value: _binding, ...rest } = props;
  const component: GenUIComponent = {
    id: statementId ?? "select",
    type: "Select",
    props: { ...rest, stateKey: "value" },
  };
  const ctx: RenderContext = {
    onInteract: noop,
    state: { value: field.value },
    setStateKey: (_key, value) => field.setValue(String(value)),
  };
  return <>{defaultRegistry.Select(component, ctx, () => null)}</>;
}

/**
 * OpenUI library for the GenUI catalog, rendered with `@gen-ui/render`'s
 * default registry. Pass it to OpenUI's `<Renderer library={...} />`.
 */
export const genuiOpenUILibrary = createLibrary({
  root: ROOT_COMPONENT,
  components: catalog.map((entry) =>
    defineComponent({
      name: entry.name,
      description: entry.description,
      props: entry.props,
      component:
        entry.name === "Select" ? GenUIOpenUISelect : entry.name === "Chart" ? GenUIOpenUIChart : adapt(entry.name),
    }),
  ),
});

export interface GenUIOpenUIRendererProps {
  /** OpenUI Lang program (complete, or partial while streaming). */
  code: string | null;
  isStreaming?: boolean;
  /** Branding is out-of-band in OpenUI Lang; pass the GenUI themeRef here. */
  themeRef?: GenUIDocument["themeRef"];
  /** Same contract as `GenUIRenderer`'s `onAIRequest`. */
  onAIRequest?: (payload: AIRequestPayload) => void;
  /** OpenUI store snapshot, including `$variable` values such as servings. */
  onStateUpdate?: (state: Record<string, unknown>) => void;
  onError?: (errors: OpenUIError[]) => void;
}

/** Renders OpenUI Lang with the GenUI library and reports clicks as `AIRequestPayload`s. */
export function GenUIOpenUIRenderer({
  code,
  isStreaming = false,
  themeRef,
  onAIRequest,
  onStateUpdate,
  onError,
}: GenUIOpenUIRendererProps) {
  return (
    <div className="genui-root" style={themeToCssVars(themeRef)} data-genui-format="openui">
      <Renderer
        response={code}
        library={genuiOpenUILibrary}
        isStreaming={isStreaming}
        onError={onError}
        onStateUpdate={onStateUpdate}
        onAction={(event) => {
          const payload = openUIActionToAIRequest(event);
          if (payload) onAIRequest?.(payload);
        }}
      />
    </div>
  );
}
