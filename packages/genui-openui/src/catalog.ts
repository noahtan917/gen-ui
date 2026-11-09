import { action, markReactive } from "@openuidev/lang-core";
import { z } from "zod/v4";

/**
 * GenUI v1 component catalog expressed as OpenUI Lang prop schemas.
 *
 * Zod key order IS the positional argument order in OpenUI Lang programs, so
 * reordering keys here is a breaking change for every emitted document.
 * See spec/openui-interop.md for the authoritative signatures.
 */

// Recursive child union, resolved lazily through the getters below.
// eslint-disable-next-line prefer-const
let nodeSchema: z.ZodType;

const selectValue = z.string();
// `markReactive` lets the OpenUI runtime keep `$var` bindings (two-way state) for this prop.
markReactive(selectValue);

export const stackProps = z.object({
  get children() {
    return z.array(nodeSchema);
  },
  direction: z.enum(["row", "column"]).optional(),
  gap: z.number().optional(),
  align: z.string().optional(),
});

export const textProps = z.object({
  content: z.string(),
  variant: z.string().optional(),
});

export const buttonProps = z.object({
  label: z.string(),
  action: action().optional(),
});

export const cardProps = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  get children() {
    return z.array(nodeSchema).optional();
  },
  action: action().optional(),
});

export const imageProps = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

export const formProps = z.object({
  get children() {
    return z.array(nodeSchema);
  },
  action: action(),
  submitLabel: z.string().optional(),
});

export const selectProps = z.object({
  value: selectValue,
  options: z.array(z.object({ value: z.string(), label: z.string() })),
  label: z.string().optional(),
});

const chartFilter = z.string().nullish();
markReactive(chartFilter);

export const chartProps = z.object({
  ariaLabel: z.string(),
  series: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      color: z.string().optional(),
    }),
  ),
  data: z.array(z.record(z.string(), z.union([z.string(), z.number()]))),
  chartType: z.enum(["bar", "column", "stacked-bar"]).nullish(),
  unit: z.string().nullish(),
  stateKey: z.string().nullish(),
  filter: chartFilter,
  action: action().nullish(),
});

export interface CatalogEntry {
  name: "Stack" | "Text" | "Button" | "Card" | "Image" | "Form" | "Select" | "Chart";
  description: string;
  props: z.ZodObject;
}

export const catalog: readonly CatalogEntry[] = [
  {
    name: "Stack",
    description: "Layout container. direction defaults to column; gap is in px.",
    props: stackProps,
  },
  {
    name: "Text",
    description: 'Text block. variant: "heading" | "body" (default body).',
    props: textProps,
  },
  {
    name: "Button",
    description: "Clickable button. Bind action to @ToAssistant(...) or Action([@Set(...)]).",
    props: buttonProps,
  },
  {
    name: "Card",
    description: "Card with optional title/subtitle; the whole card is clickable when action is set.",
    props: cardProps,
  },
  {
    name: "Image",
    description: "Image. Always provide alt text.",
    props: imageProps,
  },
  {
    name: "Form",
    description: "Form container; action runs on submit.",
    props: formProps,
  },
  {
    name: "Select",
    description: "Dropdown bound to a $variable, e.g. Select($cuisine, [{value: \"jp\", label: \"Japanese\"}], \"Cuisine\").",
    props: selectProps,
  },
  {
    name: "Chart",
    description:
      'Bar, column, or stacked-bar chart. series is [{key, label, color?}]; data rows include label and one number per series key. Pass filter as $stateKey (and the same stateKey string) to show only the selected rows. Optional action runs when a category is clicked.',
    props: chartProps,
  },
];

nodeSchema = z.union([
  stackProps,
  textProps,
  buttonProps,
  cardProps,
  imageProps,
  formProps,
  selectProps,
  chartProps,
]);

/** Root component name for OpenUI programs (`root = Stack(...)`). */
export const ROOT_COMPONENT = "Stack";

/** Positional prop order per component, derived from the Zod key order. */
export function propOrder(name: CatalogEntry["name"]): string[] {
  const entry = catalog.find((c) => c.name === name);
  return entry ? Object.keys(entry.props.shape) : [];
}
