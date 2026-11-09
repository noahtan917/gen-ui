import {
  type GenUIComponent,
  type GenUIDocument,
  genuiDocumentSchema,
} from "./schema.js";

export interface ValidationError {
  path: string;
  message: string;
}

export interface ValidationResult {
  success: boolean;
  document?: GenUIDocument;
  errors: ValidationError[];
  retryHints: string[];
}

function zodErrorsToValidation(err: unknown): ValidationError[] {
  if (err && typeof err === "object" && "issues" in err) {
    const issues = (err as { issues: { path: (string | number)[]; message: string }[] })
      .issues;
    return issues.map((i) => ({
      path: i.path.join(".") || "(root)",
      message: i.message,
    }));
  }
  return [{ path: "(root)", message: String(err) }];
}

export function validateGenUIDocument(input: unknown): ValidationResult {
  const parsed = genuiDocumentSchema.safeParse(input);
  if (parsed.success) {
    return {
      success: true,
      document: parsed.data,
      errors: [],
      retryHints: [],
    };
  }

  const errors = zodErrorsToValidation(parsed.error);
  return {
    success: false,
    errors,
    retryHints: [
      "Ensure genuiVersion matches semver (e.g. 1.0.0).",
      "Button and Form components must include actionId referencing actions.",
      "Every actionId must exist in the actions map.",
      "Use only allowlisted types: Stack, Text, Button, Card, Image, Form, Select, Chart.",
    ],
  };
}

export function normalizeGenUIDocument(document: GenUIDocument): GenUIDocument {
  return {
    ...document,
    state: document.state ?? {},
    components: document.components.map(normalizeComponent),
  };
}

function normalizeComponent(component: GenUIComponent): GenUIComponent {
  return {
    ...component,
    children: component.children?.map(normalizeComponent),
  };
}
