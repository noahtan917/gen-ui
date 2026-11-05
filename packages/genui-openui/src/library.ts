import { createLibrary, defineComponent, type Library } from "@openuidev/lang-core";
import { catalog, ROOT_COMPONENT } from "./catalog.js";

/**
 * Framework-agnostic OpenUI library for the GenUI v1 catalog. It drives the
 * parser and system-prompt generation. For rendering, use
 * `genuiOpenUILibrary` from `@gen-ui/openui/react`, which shares these schemas.
 */
export const genuiSchemaLibrary: Required<Library> = createLibrary({
  root: ROOT_COMPONENT,
  components: catalog.map((entry) =>
    defineComponent({
      name: entry.name,
      description: entry.description,
      props: entry.props,
      component: null,
    }),
  ),
});
