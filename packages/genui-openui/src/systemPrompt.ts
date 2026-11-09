import type { PromptOptions } from "@openuidev/lang-core";
import { genuiSchemaLibrary } from "./library.js";

/** GenUI safety rules layered on top of OpenUI's generated prompt. */
export const GENUI_OPENUI_RULES: readonly string[] = [
  "Use only the GenUI components listed above: Stack, Text, Button, Card, Image, Form, Select, Chart.",
  "Use Chart for visualize, chart, graph, or compare-quantities requests. chartType is bar, column, or stacked-bar. Do not load a chart library.",
  "Allowed action steps are @ToAssistant(message, context?) and @Set($var, value). Never use @OpenUrl, @Run, @Reset, Query() or Mutation().",
  "Every clickable Card, Button and Form must have an action. @ToAssistant messages must be complete, specific prompts (for example \"Help me cook Miso ramen (Japanese): ingredients, steps, total time.\").",
  "Put structured data for the assistant in the @ToAssistant context object, e.g. {meal: \"Miso ramen\", cuisine: \"Japanese\"}.",
  "Bind every Select to a $variable and declare it, e.g. $cuisine = \"jp\".",
];

/**
 * System prompt that teaches a model to answer in OpenUI Lang using the GenUI
 * catalog. It is generated from the same schemas the parser validates against.
 */
export function genuiOpenUISystemPrompt(options: PromptOptions = {}): string {
  return genuiSchemaLibrary.prompt({
    // $variables + @Set are needed for Select/state; built-in @functions are not allowed.
    bindings: true,
    builtinFunctions: false,
    ...options,
    additionalRules: [...GENUI_OPENUI_RULES, ...(options.additionalRules ?? [])],
  });
}

/** Component signature lines only (e.g. for docs and session skills). */
export function genuiOpenUISignatures(): string {
  return Object.values(genuiSchemaLibrary.toSpec().components)
    .map((spec) => `${spec.signature} — ${spec.description ?? ""}`)
    .join("\n");
}
