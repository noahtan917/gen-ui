import type { AIRequestPayload } from "@gen-ui/core";

const MEAL_COPY: Record<string, string> = {
  "Sheet-pan salmon": `Weeknight plan: Sheet-pan salmon (Mediterranean)

Ingredients (2 servings)
- 2 salmon fillets (6 oz each)
- 1 lb baby potatoes, halved
- 1 cup cherry tomatoes
- 1 zucchini, sliced
- 2 tbsp olive oil, 1 tsp dried oregano, salt & pepper
- Lemon wedges

Steps
1. Heat oven to 425°F (220°C). Line a sheet pan.
2. Toss potatoes with half the oil, salt, and oregano; roast 15 minutes.
3. Add salmon, zucchini, and tomatoes; drizzle remaining oil. Season everything.
4. Roast 12–14 minutes until salmon flakes and potatoes are tender.
5. Finish with lemon and fresh herbs if you have them.

Total time: about 35 minutes (10 min prep + 25 min oven).`,

  "Miso ramen bowl": `Weeknight plan: Miso ramen bowl (Japanese)

Ingredients (2 servings)
- 2 packs fresh or dried ramen noodles
- 4 cups chicken or vegetable broth
- 3 tbsp white miso paste
- 1 tbsp soy sauce
- 2 soft-boiled eggs
- 2 cups spinach or bok choy
- 1 cup corn kernels, sliced green onion, nori strips

Steps
1. Soft-boil eggs (6–7 minutes), then ice bath and halve.
2. Warm broth; whisk miso and soy in a ladle with a little hot broth, then stir into pot (do not boil miso hard).
3. Cook noodles per package; drain and divide into bowls.
4. Blanch greens in broth 1 minute; ladle broth over noodles.
5. Top with egg, corn, green onion, and nori.

Total time: about 25 minutes.`,
};

function buildReply(payload: AIRequestPayload): string {
  const meal = String(payload.context.meal ?? "your meal");
  const known = MEAL_COPY[meal];
  if (known) {
    return known;
  }
  const cuisine = String(payload.context.cuisine ?? "home-style");
  return `Weeknight plan: ${meal} (${cuisine})

I'll keep this flexible since this demo only has full scripts for salmon and ramen.

Ingredients
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
