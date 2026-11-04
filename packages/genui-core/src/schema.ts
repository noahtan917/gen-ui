import { z } from "zod";

export const componentTypes = [
  "Stack",
  "Text",
  "Button",
  "Card",
  "Image",
  "Form",
  "Select",
] as const;

export type ComponentType = (typeof componentTypes)[number];

export interface GenUIComponent {
  id: string;
  type: ComponentType;
  actionId?: string;
  props: Record<string, unknown>;
  children?: GenUIComponent[];
}

export const componentSchema: z.ZodType<GenUIComponent> = z.lazy(() =>
  z
    .object({
      id: z.string().min(1),
      type: z.enum(componentTypes),
      actionId: z.string().min(1).optional(),
      props: z.record(z.unknown()),
      children: z.array(componentSchema).optional(),
    })
    .superRefine((component, ctx) => {
      const interactive = component.type === "Button" || component.type === "Form";
      if (interactive && !component.actionId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${component.type} requires actionId`,
          path: ["actionId"],
        });
      }
    }),
);

export const actionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("ai.request"),
    promptTemplate: z.string().min(1),
    contextKeys: z.array(z.string()).optional(),
    context: z.record(z.unknown()).optional(),
  }),
  z.object({
    type: z.literal("state.update"),
    updates: z.record(z.string()),
    context: z.record(z.unknown()).optional(),
  }),
]);

export type GenUIAction = z.infer<typeof actionSchema>;

export const genuiDocumentSchema = z
  .object({
    genuiVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
    meta: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .passthrough()
      .optional(),
    themeRef: z.record(z.unknown()).optional(),
    state: z.record(z.unknown()).optional(),
    actions: z.record(actionSchema),
    components: z.array(componentSchema).min(1),
  })
  .superRefine((doc, ctx) => {
    const walk = (nodes: GenUIComponent[]) => {
      for (const node of nodes) {
        if (node.actionId && !doc.actions[node.actionId]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Unknown actionId "${node.actionId}" on component "${node.id}"`,
            path: ["components"],
          });
        }
        if (node.children?.length) {
          walk(node.children);
        }
      }
    };
    walk(doc.components);
  });

export type GenUIDocument = z.infer<typeof genuiDocumentSchema>;

export const interactEventSchema = z.object({
  type: z.literal("genui.interact"),
  actionId: z.string(),
  componentId: z.string(),
  context: z.record(z.unknown()),
  timestamp: z.string(),
});

export type GenUIInteractEvent = z.infer<typeof interactEventSchema>;

export interface AIRequestPayload {
  prompt: string;
  actionId: string;
  componentId: string;
  context: Record<string, unknown>;
}
