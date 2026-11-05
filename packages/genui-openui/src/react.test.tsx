import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AIRequestPayload, GenUIDocument } from "@gen-ui/core";
import { GenUIRenderer } from "@gen-ui/render";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { genuiToOpenUILang } from "./index.js";
import { GenUIOpenUIRenderer } from "./react.js";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const mealDoc = JSON.parse(
  readFileSync(join(repoRoot, "adapters/session/examples/meal-planning.document.json"), "utf8"),
) as GenUIDocument;

afterEach(cleanup);

/** Structural DOM signature: tag + genui class names, ignoring OpenUI wrapper elements. */
function genuiSignature(root: Element): string[] {
  return [...root.querySelectorAll("[class*='genui-']")]
    .filter((el) => !el.classList.contains("genui-root"))
    .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].sort().join(".")}:${el.childElementCount ? "" : el.textContent}`);
}

describe("GenUIOpenUIRenderer", () => {
  it("renders the same GenUI DOM as GenUIRenderer for the reference document", async () => {
    const native = render(<GenUIRenderer document={mealDoc} />);
    const expected = genuiSignature(native.container);
    native.unmount();

    const { container } = render(<GenUIOpenUIRenderer code={genuiToOpenUILang(mealDoc).code} themeRef={mealDoc.themeRef} />);
    await screen.findByText("Sheet-pan salmon");
    expect(genuiSignature(container)).toEqual(expected);
    expect((container.firstElementChild as HTMLElement).style.getPropertyValue("--genui-color-primary")).toBe(
      (mealDoc.themeRef as { colors?: { primary?: string } } | undefined)?.colors?.primary ?? "",
    );
  });

  it("sends the same AIRequestPayload as GenUIRenderer when a card is clicked", async () => {
    const nativeSpy = vi.fn<(p: AIRequestPayload) => void>();
    const native = render(<GenUIRenderer document={mealDoc} onAIRequest={nativeSpy} />);
    fireEvent.click(screen.getByText("Sheet-pan salmon"));
    native.unmount();

    const openuiSpy = vi.fn<(p: AIRequestPayload) => void>();
    render(<GenUIOpenUIRenderer code={genuiToOpenUILang(mealDoc).code} onAIRequest={openuiSpy} />);
    fireEvent.click(await screen.findByText("Sheet-pan salmon"));
    await waitFor(() => expect(openuiSpy).toHaveBeenCalledTimes(1));
    expect(openuiSpy.mock.calls[0][0]).toEqual(nativeSpy.mock.calls[0][0]);
  });

  it("keeps Select, @Set and reactive text in sync through OpenUI state", async () => {
    const doc: GenUIDocument = {
      genuiVersion: "1.0.0",
      state: { servings: "2" },
      actions: {
        apply: { type: "state.update", updates: { servings: "{{servingsCount}}" } },
        ask: { type: "ai.request", promptTemplate: "Cook for {{servings}}" },
      },
      components: [
        {
          id: "form",
          type: "Form",
          actionId: "apply",
          props: { submitLabel: "Save" },
          children: [
            {
              id: "select",
              type: "Select",
              props: { stateKey: "servingsCount", label: "Servings", options: [{ value: "1", label: "1" }, { value: "4", label: "4" }] },
            },
          ],
        },
        { id: "status", type: "Text", props: { content: "Servings: {{servings}}" } },
        { id: "go", type: "Card", actionId: "ask", props: { title: "Go" } },
      ],
    };
    const spy = vi.fn<(p: AIRequestPayload) => void>();
    render(<GenUIOpenUIRenderer code={genuiToOpenUILang(doc).code} onAIRequest={spy} />);

    await screen.findByText("Servings: 2");
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "4" } });
    fireEvent.click(screen.getByText("Save"));
    await screen.findByText("Servings: 4");

    fireEvent.click(screen.getByText("Go"));
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(spy.mock.calls[0][0]).toMatchObject({ prompt: "Cook for 4", actionId: "ask", componentId: "go" });
  });
});
