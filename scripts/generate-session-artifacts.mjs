import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const REPO_URL = "https://github.com/noahtan917/gen-ui";
const REPO_RAW_BASE = "https://raw.githubusercontent.com/noahtan917/gen-ui/main";
const SESSION_INSTALL_PATH = "adapters/session/SESSION-INSTALL.md";

const config = JSON.parse(readFileSync(join(root, "spec/session-config.json"), "utf8"));
const brandId = config.defaultBrandPack;
const tokensPath = join(root, "branding", brandId, "tokens.json");
const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
const primaryHex = tokens.colors?.primary ?? "";

const refRel = config.referenceDocument;
const refDoc = JSON.parse(readFileSync(join(root, refRel), "utf8"));

const tokensForPaste = {
  source: tokens.source ?? brandId,
  id: tokens.id ?? brandId,
  colors: tokens.colors,
  typography: tokens.typography,
  radius: tokens.radius,
};

const forbiddenPacks = (config.forbiddenBrandPacks ?? []).join("`, `");

function applyPlaceholders(template) {
  return template
    .replaceAll("{{BRAND_ID}}", brandId)
    .replaceAll("{{PRIMARY_HEX}}", primaryHex)
    .replaceAll("{{FORBIDDEN_PACKS}}", forbiddenPacks ? `\`${forbiddenPacks}\`` : "(none)")
    .replaceAll("{{CONFIG_JSON}}", JSON.stringify(config, null, 2))
    .replaceAll("{{TOKENS_JSON}}", JSON.stringify(tokensForPaste, null, 2))
    .replaceAll("{{REFERENCE_DOCUMENT_JSON}}", JSON.stringify(refDoc, null, 2))
    .replaceAll("{{REPO_URL}}", REPO_URL)
    .replaceAll("{{RAW_SESSION_INSTALL_URL}}", `${REPO_RAW_BASE}/${SESSION_INSTALL_PATH}`);
}

const bodyTemplate = readFileSync(
  join(root, "adapters/session/session-artifact-body.template.md"),
  "utf8",
);
const body = applyPlaceholders(bodyTemplate);

function writeArtifact(templateName, outName) {
  const header = readFileSync(join(root, "adapters/session", templateName), "utf8");
  const output = applyPlaceholders(header).replace("{{BODY}}", body);
  const outPath = join(root, "adapters/session", outName);
  writeFileSync(outPath, output, "utf8");
  console.log(`Wrote ${outPath}`);
}

writeArtifact("SESSION-INSTALL.template.md", "SESSION-INSTALL.md");
writeArtifact("PASTE-BUNDLE.template.md", "PASTE-BUNDLE.md");

console.log(`Brand: ${brandId}, primary: ${primaryHex}`);
