import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const config = JSON.parse(readFileSync(join(root, "spec/session-config.json"), "utf8"));
const brandId = config.defaultBrandPack;
const tokensPath = join(root, "branding", brandId, "tokens.json");
const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
const primaryHex = tokens.colors?.primary ?? "";

const refRel = config.referenceDocument;
const refDoc = JSON.parse(readFileSync(join(root, refRel), "utf8"));

const template = readFileSync(
  join(root, "adapters/session/PASTE-BUNDLE.template.md"),
  "utf8",
);

const tokensForPaste = {
  source: tokens.source ?? brandId,
  id: tokens.id ?? brandId,
  colors: tokens.colors,
  typography: tokens.typography,
  radius: tokens.radius,
};

const output = template
  .replaceAll("{{BRAND_ID}}", brandId)
  .replaceAll("{{PRIMARY_HEX}}", primaryHex)
  .replaceAll("{{TOKENS_JSON}}", JSON.stringify(tokensForPaste, null, 2))
  .replaceAll(
    "{{REFERENCE_DOCUMENT_JSON}}",
    JSON.stringify(refDoc, null, 2),
  );

const outPath = join(root, "adapters/session/PASTE-BUNDLE.md");
writeFileSync(outPath, output, "utf8");
console.log(`Wrote ${outPath} (brand: ${brandId}, primary: ${primaryHex})`);
