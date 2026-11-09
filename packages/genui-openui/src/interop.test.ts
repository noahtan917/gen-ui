import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildInteractEvent,
  buildInteractionContext,
  normalizeGenUIDocument,
  resolveAIRequest,
  type GenUIDocument,
} from "@gen-ui/core";
import { describe, expect, it } from "vitest";
import {
  aiRequestToOpenUIAction,
  createOpenUIStreamImporter,
  genuiOpenUISignatures,
  genuiOpenUISystemPrompt,
  genuiToOpenUILang,
  openUIActionToAIRequest,
  openUILangToGenUI,
  OPENUI_NATIVE_ACTION_ID,
} from "./index.js";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const examplesDir = join(repoRoot, "adapters/session/examples");
const readText = (path: string) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const mealDoc = JSON.parse(readText(join(examplesDir, "meal-planning.document.json"))) as GenUIDocument;

/** Golden files live next to the reference document; `UPDATE_GOLDEN=1 pnpm test` rewrites them. */
function expectGolden(fileName: string, actual: string) {
  const path = join(examplesDir, fileName);
  if (process.env.UPDATE_GOLDEN === "1") writeFileSync(path, actual);
  if (!existsSync(path)) {
    throw new Error(`Missing golden ${fileName}; run UPDATE_GOLDEN=1 pnpm --filter @gen-ui/openui test`);
  }
  expect(actual).toBe(readText(path));
}

const withoutOutOfBand = (doc: GenUIDocument): GenUIDocument => {
  const { themeRef: _t, meta: _m, ...rest } = normalizeGenUIDocument(doc);
  return { ...rest, state: rest.state ?? {} };
};

const servingsDoc: GenUIDocument = {
  genuiVersion: "1.0.0",
  state: { servings: "2" },
  actions: {
    planMeal: {
      type: "ai.request",
      promptTemplate: "Cook {{meal}} for {{servings}}",
      contextKeys: ["meal", "servings"],
    },
    applyServings: {
      type: "state.update",
      updates: { servings: "{{servingsCount}}", note: "Portions set to {{servingsCount}}" },
    },
  },
  components: [
    {
      id: "layout",
      type: "Stack",
      props: { direction: "column", gap: 16 },
      children: [
        {
          id: "card-salmon",
          type: "Card",
          actionId: "planMeal",
          props: { title: "Salmon", subtitle: "Med", context: { meal: "Salmon" } },
        },
        {
          id: "servings-form",
          type: "Form",
          actionId: "applyServings",
          props: { submitLabel: "Save" },
          children: [
            {
              id: "servings-select",
              type: "Select",
              props: {
                stateKey: "servingsCount",
                label: "Servings",
                options: [
                  { value: "1", label: "1 person" },
                  { value: "4", label: "4 people" },
                ],
              },
            },
          ],
        },
        { id: "status", type: "Text", props: { content: "Servings: {{servings}} — {{note}}" } },
      ],
    },
  ],
};

describe("GenUI → OpenUI Lang", () => {
  it("round-trips a Chart filtered by Select state", () => {
    const doc: GenUIDocument = {
      genuiVersion: "1.0.0",
      state: { chamber: "senate" },
      actions: {
        explainBar: {
          type: "ai.request",
          promptTemplate: "Explain the {{label}} bar on the sample {{chamber}} seat chart.",
        },
      },
      components: [
        {
          id: "seats",
          type: "Chart",
          actionId: "explainBar",
          props: {
            chartType: "stacked-bar",
            ariaLabel: "Sample seats",
            stateKey: "chamber",
            series: [{ key: "democrats", label: "Democrats", color: "#2F63D6" }],
            data: [
              { label: "Before", chamber: "senate", democrats: 47 },
              { label: "Before", chamber: "house", democrats: 213 },
            ],
          },
        },
      ],
    };
    const exported = genuiToOpenUILang(doc);
    expect(exported.code).toContain("$chamber");
    const imported = openUILangToGenUI(exported.code);
    expect(imported.errors).toEqual([]);
    const chart = imported.document!.components[0];
    expect(chart).toMatchObject({
      type: "Chart",
      actionId: "explainBar",
      props: {
        stateKey: "chamber",
        chartType: "stacked-bar",
        series: doc.components[0].props.series,
        data: doc.components[0].props.data,
      },
    });
  });

  it("matches the golden OpenUI program for the reference meal document", () => {
    const { code, warnings } = genuiToOpenUILang(mealDoc);
    expectGolden("meal-planning.openui", code);
    expect(code.startsWith("root = Stack([layout])\n")).toBe(true);
    expect(warnings).toEqual([
      "themeRef is not representable in OpenUI Lang; supply it to the host renderer.",
    ]);
  });

  it("turns state reads into $variables and state.update into @Set", () => {
    const { code } = genuiToOpenUILang(servingsDoc);
    expect(code).toContain('$servings = "2"');
    expect(code).toContain("$servingsCount = null");
    expect(code).toContain(
      'servingsForm = Form([servingsSelect], Action([@Set($servings, $servingsCount), @Set($note, "Portions set to " + $servingsCount)]), "Save")',
    );
    expect(code).toContain('servingsSelect = Select($servingsCount, [{value: "1", label: "1 person"}, {value: "4", label: "4 people"}], "Servings")');
    expect(code).toContain('status = Text("Servings: " + $servings + " — " + $note)');
    // Card prompt reads state reactively and carries GenUI provenance in the hidden context.
    expect(code).toContain('@ToAssistant("Cook Salmon for " + $servings, {');
    expect(code).toContain('genui: {actionId: "planMeal", componentId: "card-salmon"');
  });

  it("rejects invalid GenUI documents", () => {
    const invalid = { ...mealDoc, components: [{ id: "b", type: "Button", props: {} }] } as GenUIDocument;
    expect(() => genuiToOpenUILang(invalid)).toThrow(/invalid GenUI document/);
  });

  it("reports props that have no OpenUI mapping", () => {
    const doc: GenUIDocument = {
      genuiVersion: "1.0.0",
      actions: {},
      components: [{ id: "t", type: "Text", props: { content: "x", tone: "loud" } }],
    };
    expect(genuiToOpenUILang(doc).warnings).toContain(
      'Prop "tone" on Text "t" has no OpenUI mapping and was dropped.',
    );
  });
});

describe("OpenUI Lang → GenUI round trip", () => {
  it("is lossless for the reference meal document (minus themeRef/meta)", () => {
    const result = openUILangToGenUI(genuiToOpenUILang(mealDoc).code);
    expect(result.errors).toEqual([]);
    expect(result.success).toBe(true);
    expect(withoutOutOfBand(result.document!)).toEqual(withoutOutOfBand(mealDoc));
  });

  it("restores themeRef/meta when supplied out-of-band", () => {
    const result = openUILangToGenUI(genuiToOpenUILang(mealDoc).code, { themeRef: mealDoc.themeRef });
    expect(normalizeGenUIDocument(result.document!)).toEqual(normalizeGenUIDocument(mealDoc));
  });

  it("round-trips state, Select bindings and state.update with documented normalization", () => {
    const result = openUILangToGenUI(genuiToOpenUILang(servingsDoc).code);
    expect(result.errors).toEqual([]);
    const doc = result.document!;
    // ai.request: lossless, including the original kebab-case componentId.
    expect(doc.actions.planMeal).toEqual(servingsDoc.actions.planMeal);
    // state.update: ids are derived from the (camelCased) component statement.
    expect(doc.actions.servingsForm_set).toEqual(servingsDoc.actions.applyServings);
    expect(doc.state).toEqual({ servings: "2" });

    const layout = doc.components[0];
    expect(layout.children!.map((c) => c.id)).toEqual(["card-salmon", "servingsForm", "status"]);
    expect(layout.children![1].children![0]).toEqual({
      id: "servingsSelect",
      type: "Select",
      props: servingsDoc.components[0].children![1].children![0].props,
    });
    expect(layout.children![2].props.content).toBe("Servings: {{servings}} — {{note}}");
  });

  it("reaches a fixpoint for the demo sample document (behaviourally identical after one round trip)", async () => {
    // Runtime path so tsc does not pull the demo app into this package's rootDir.
    const samplePath = join(repoRoot, "apps/demo/src/sample-document.ts");
    const { mealDemoDocument } = (await import(/* @vite-ignore */ samplePath)) as {
      mealDemoDocument: GenUIDocument;
    };
    const first = genuiToOpenUILang(mealDemoDocument).code;
    const imported = openUILangToGenUI(first, { themeRef: mealDemoDocument.themeRef, meta: mealDemoDocument.meta });
    expect(imported.errors).toEqual([]);
    expect(genuiToOpenUILang(imported.document!).code).toBe(first);
    expect(imported.document!.actions.planMeal).toEqual(mealDemoDocument.actions.planMeal);
    expect(imported.document!.themeRef).toEqual(mealDemoDocument.themeRef);
  });

  it("resolves the same prompt from the imported document as from the original", () => {
    const imported = openUILangToGenUI(genuiToOpenUILang(mealDoc).code).document!;
    const card = (doc: GenUIDocument) => doc.components[0].children![1].children![0];
    const prompt = (doc: GenUIDocument) =>
      resolveAIRequest(doc, buildInteractEvent("planMeal", card(doc).id, buildInteractionContext(card(doc), {})))!
        .prompt;
    expect(prompt(imported)).toBe(prompt(mealDoc));
  });
});

describe("OpenUI-native programs", () => {
  it("imports @ToAssistant with context, Button label fallback and $variables", () => {
    const code = [
      "root = Stack([title, row, more])",
      '$cuisine = "jp"',
      'title = Text("Pick a dinner for " + $cuisine, "heading")',
      "row = Stack([c1], \"row\", 12)",
      'c1 = Card("Ramen", "Japanese", null, @ToAssistant("Help me cook ramen", {meal: "Ramen"}))',
      'more = Button("Show more")',
    ].join("\n");
    const result = openUILangToGenUI(code);
    expect(result.errors).toEqual([]);
    const doc = result.document!;
    expect(doc.state).toEqual({ cuisine: "jp" });
    expect(doc.components.map((c) => c.id)).toEqual(["title", "row", "more"]);
    expect(doc.components[0].props).toEqual({ variant: "heading", content: "Pick a dinner for {{cuisine}}" });
    const card = doc.components[1].children![0];
    expect(card).toMatchObject({ id: "c1", actionId: "c1_ask", props: { context: { meal: "Ramen" } } });
    expect(doc.actions.c1_ask).toEqual({ type: "ai.request", promptTemplate: "Help me cook ramen" });
    expect(doc.actions.more_ask).toEqual({ type: "ai.request", promptTemplate: "Show more" });
  });

  it.each([
    ['root = Stack([b])\nb = Button("Docs", @OpenUrl("https://example.com"))', /@OpenUrl is not allowed/],
    ['root = Stack([b])\nb = Button("Go", @Run(q))', /@Run is not allowed/],
    ['root = Stack([b])\nb = Button("Go", @Reset($x))\n$x = 1', /@Reset is not allowed/],
    ['root = Stack([b])\nb = Button("Go", Action([@ToAssistant("a"), @Set($x, "b")]))', /one action type/],
    ['root = Stack([s])\ns = Select("fixed", [])', /bound to a \$variable/],
    ['root = Stack([t])\nt = Text(@Count([1, 2]))', /Unsupported expression/],
    ['root = Stack([Gauge("x")])', /unknown-component/],
    ['root = Stack([f])\nf = Form([])', /missing-required/],
    ['root = Stack([t])\nq = Query("tool", {})\nt = Text("x")', /Query\(\) is not allowed/],
  ])("rejects unsupported construct %#", (code, message) => {
    const result = openUILangToGenUI(code);
    expect(result.success).toBe(false);
    expect(result.errors.map((e) => e.message).join("\n")).toMatch(message);
    expect(result.retryHints.length).toBeGreaterThan(0);
  });

  it("reports a missing root", () => {
    const result = openUILangToGenUI('title = Text("orphan")');
    expect(result.success).toBe(false);
  });
});

describe("streaming import", () => {
  it("produces the same final document as a full parse", () => {
    const code = genuiToOpenUILang(servingsDoc).code;
    const importer = createOpenUIStreamImporter();
    const partials = [];
    for (let i = 0; i < code.length; i += 9) partials.push(importer.push(code.slice(i, i + 9)));
    const final = importer.result();
    expect(final.complete).toBe(true);
    expect(final).toEqual(openUILangToGenUI(code));
    // The tree grows progressively: an early chunk already yields a partial, valid-shaped document.
    expect(partials.some((p) => !p.complete)).toBe(true);
  });
});

describe("event bridge", () => {
  it("maps continue_conversation with GenUI provenance to the resolveAIRequest payload", () => {
    const card = mealDoc.components[0].children![1].children![0];
    const expected = resolveAIRequest(
      mealDoc,
      buildInteractEvent("planMeal", card.id, buildInteractionContext(card, {})),
    )!;
    const event = aiRequestToOpenUIAction(expected);
    expect(event.type).toBe("continue_conversation");
    expect(openUIActionToAIRequest(event)).toEqual(expected);
  });

  it("maps native events and ignores non-GenUI actions", () => {
    expect(
      openUIActionToAIRequest({
        type: "continue_conversation",
        params: { context: { meal: "Ramen" } },
        humanFriendlyMessage: "Help me cook ramen",
      }),
    ).toEqual({
      prompt: "Help me cook ramen",
      actionId: OPENUI_NATIVE_ACTION_ID,
      componentId: "",
      context: { meal: "Ramen" },
    });
    expect(
      openUIActionToAIRequest({ type: "open_url", params: { url: "https://x" }, humanFriendlyMessage: "" }),
    ).toBeNull();
  });
});

describe("system prompt", () => {
  it("lists every GenUI component signature and the GenUI safety rules", () => {
    const signatures = genuiOpenUISignatures();
    expectGolden("openui-signatures.txt", `${signatures}\n`);
    for (const name of ["Stack", "Text", "Button", "Card", "Image", "Form", "Select", "Chart"]) {
      expect(signatures).toMatch(new RegExp(`^${name}\\(`, "m"));
    }
    const prompt = genuiOpenUISystemPrompt();
    expect(prompt).toContain("Never use @OpenUrl, @Run, @Reset, Query() or Mutation().");
    expect(prompt).toContain("Card(title?: string");
  });
});
