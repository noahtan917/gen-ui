import type { AIRequestPayload } from "@gen-ui/core";

type Ingredient = { qty: number; text: string };

type Recipe = {
  steps: string;
  time: string;
  ingredients: Ingredient[];
};

/** Quantities are for 1 serving. The reply multiplies them by the requested count. */
const MEAL_RECIPES: Record<string, Recipe> = {
  "Sheet-pan salmon": {
    ingredients: [
      { qty: 1, text: "salmon fillet (6 oz)" },
      { qty: 0.5, text: "lb baby potatoes, halved" },
      { qty: 0.5, text: "cup cherry tomatoes" },
      { qty: 0.5, text: "zucchini, sliced" },
      { qty: 1, text: "tbsp olive oil" },
      { qty: 0.5, text: "tsp dried oregano, plus salt and pepper" },
      { qty: 0.5, text: "lemon, cut into wedges" },
    ],
    steps: `1. Heat oven to 425°F (220°C). Line a sheet pan.
2. Toss potatoes with half the oil, salt, and oregano; roast 15 minutes.
3. Add salmon, zucchini, and tomatoes; drizzle remaining oil. Season everything.
4. Roast 12–14 minutes until salmon flakes and potatoes are tender.
5. Finish with lemon and fresh herbs if you have them.`,
    time: "Total time: about 35 minutes (10 min prep + 25 min oven).",
  },
  "Miso ramen bowl": {
    ingredients: [
      { qty: 1, text: "pack fresh or dried ramen noodles" },
      { qty: 2, text: "cups chicken or vegetable broth" },
      { qty: 1.5, text: "tbsp white miso paste" },
      { qty: 0.5, text: "tbsp soy sauce" },
      { qty: 1, text: "soft-boiled egg" },
      { qty: 1, text: "cup spinach or bok choy" },
      { qty: 0.5, text: "cup corn kernels, plus sliced green onion and nori" },
    ],
    steps: `1. Soft-boil eggs (6–7 minutes), then ice bath and halve.
2. Warm broth; whisk miso and soy in a ladle with a little hot broth, then stir into pot (do not boil miso hard).
3. Cook noodles per package; drain and divide into bowls.
4. Blanch greens in broth 1 minute; ladle broth over noodles.
5. Top with egg, corn, green onion, and nori.`,
    time: "Total time: about 25 minutes.",
  },
};

function formatQty(amount: number): string {
  const rounded = Math.round(amount * 10) / 10;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(1);
}

function servingsOf(payload: AIRequestPayload): number {
  const raw = Number(payload.context.servings);
  if (!Number.isFinite(raw) || raw <= 0) return 2;
  return raw;
}

function ingredientLines(items: Ingredient[], servings: number): string {
  return items.map((item) => `- ${formatQty(item.qty * servings)} ${item.text}`).join("\n");
}

function buildReply(payload: AIRequestPayload): string {
  const meal = String(payload.context.meal ?? "your meal");
  const cuisine = String(payload.context.cuisine ?? "home-style");
  const servings = servingsOf(payload);
  const heading = servings === 1 ? "1 serving" : `${formatQty(servings)} servings`;
  const recipe = MEAL_RECIPES[meal];
  if (recipe) {
    return `Weeknight plan: ${meal} (${cuisine})

Ingredients (${heading})
${ingredientLines(recipe.ingredients, servings)}

Steps
${recipe.steps}

${recipe.time}`;
  }
  return `Weeknight plan: ${meal} (${cuisine})

I'll keep this flexible since this demo only has full scripts for salmon and ramen.

Ingredients (${heading})
- Protein and vegetables of your choice for ${meal}
- Pantry aromatics (garlic, onion, oil)
- Salt, pepper, and one accent (citrus or miso/soy depending on cuisine)

Steps
1. Prep ingredients (10 minutes).
2. Cook protein through with high heat and rest briefly.
3. Cook sides in the same pan or a second burner.
4. Taste, adjust seasoning, and plate.

Total time: about 30–40 minutes for a typical weeknight.

(Resolved from prompt: ${payload.prompt})`;
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = setTimeout(() => resolve(), ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(id);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

/** Demo-only: streams a deterministic cooking answer without calling an LLM API. */
export async function streamMockAssistantReply(
  payload: AIRequestPayload,
  onChunk: (text: string) => void,
  options?: { signal?: AbortSignal; chunkDelayMs?: number },
): Promise<void> {
  const full = buildReply(payload);
  const delay = options?.chunkDelayMs ?? 18;
  const chunkSize = 4;

  for (let i = 0; i < full.length; i += chunkSize) {
    await sleep(delay, options?.signal);
    onChunk(full.slice(i, i + chunkSize));
  }
}
