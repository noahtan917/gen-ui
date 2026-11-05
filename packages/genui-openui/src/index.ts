// Framework-agnostic entry: converters, event bridge, prompts. No React import.
// React rendering lives in "@gen-ui/openui/react".
export { catalog, propOrder, ROOT_COMPONENT, type CatalogEntry } from "./catalog.js";
export { genuiSchemaLibrary } from "./library.js";
export { genuiToOpenUILang, type OpenUIExportResult } from "./toOpenUI.js";
export {
  convertParseResult,
  createOpenUIStreamImporter,
  openUILangToGenUI,
  type OpenUIImportOptions,
  type OpenUIImportResult,
  type OpenUIStreamImporter,
} from "./fromOpenUI.js";
export {
  aiRequestToOpenUIAction,
  openUIActionToAIRequest,
  OPENUI_NATIVE_ACTION_ID,
} from "./events.js";
export { GENUI_CONTEXT_KEY, type GenUIActionMetadata } from "./metadata.js";
export {
  GENUI_OPENUI_RULES,
  genuiOpenUISignatures,
  genuiOpenUISystemPrompt,
} from "./systemPrompt.js";
