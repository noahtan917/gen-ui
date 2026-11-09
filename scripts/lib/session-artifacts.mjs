// Builds every generated session artifact in memory. Used by the generator (writes
// to disk) and by check-adapter-paths.mjs (compares against disk) so the two can
// never disagree about what "in sync" means.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createStoredZip } from "./zip.mjs";

export const REPO_URL = "https://github.com/noahtan917/gen-ui";
export const SKILL_BLOB_URL = `${REPO_URL}/blob/main/SKILL.md`;
export const REPO_RAW_BASE = "https://raw.githubusercontent.com/noahtan917/gen-ui/main";
export const SESSION_INSTALL_PATH = "adapters/session/SESSION-INSTALL.md";
export const RAW_SESSION_INSTALL_URL = `${REPO_RAW_BASE}/${SESSION_INSTALL_PATH}`;

const SESSION_DIR = "adapters/session";
const PROVIDERS_DIR = `${SESSION_DIR}/providers`;
const REFERENCE_ARTIFACT_PATH = `${SESSION_DIR}/examples/meal-artifact.reference.tsx`;
// OpenSpec 006: optional OpenUI Lang output section (opt-in via `openuiOutput: true`).
// The program and signatures are golden files kept in sync by @gen-ui/openui's tests.
const OPENUI_TEMPLATE_PATH = `${SESSION_DIR}/openui-output.template.md`;
const OPENUI_PROGRAM_PATH = `${SESSION_DIR}/examples/meal-planning.openui`;
const OPENUI_SIGNATURES_PATH = `${SESSION_DIR}/examples/openui-signatures.txt`;
const OPENUI_ANCHOR = "\n---\n\n## Confirm activation";
const CLAUDE_SKILL_DIR = "adapters/claude-skill";
const CLAUDE_SKILL_NAME = "genui";

const read = (root, rel) => readFileSync(join(root, rel), "utf8").replace(/\r\n/g, "\n");

/** Provider overlay as standalone text: drop the "Rules:" link line and unwrap links. */
function inlineOverlay(text) {
  return text
    .split("\n")
    .filter((line) => !line.startsWith("Rules:"))
    .join("\n")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^# Provider overlay: (.+)$/m, "#### $1")
    .replace(/^## /gm, "##### ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function loadProviderOverlays(root) {
  return readdirSync(join(root, PROVIDERS_DIR))
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .sort()
    .map((name) => inlineOverlay(read(root, `${PROVIDERS_DIR}/${name}`)))
    .join("\n\n");
}

/**
 * @param {string} root repository root
 * @returns {{ brandId: string, primaryHex: string, installVersion: string,
 *             files: Map<string, string | Buffer> }}
 */
export function buildSessionArtifacts(root) {
  const config = JSON.parse(read(root, "spec/session-config.json"));
  const brandId = config.defaultBrandPack;
  const tokens = JSON.parse(read(root, `branding/${brandId}/tokens.json`));
  const primaryHex = tokens.colors?.primary ?? "";
  const refDoc = JSON.parse(read(root, config.referenceDocument));
  const referenceArtifact = read(root, REFERENCE_ARTIFACT_PATH).trim();
  const providerOverlays = loadProviderOverlays(root);

  const tokensForPaste = {
    source: tokens.source ?? brandId,
    id: tokens.id ?? brandId,
    colors: tokens.colors,
    typography: tokens.typography,
    radius: tokens.radius,
  };

  const templates = {
    body: read(root, `${SESSION_DIR}/session-artifact-body.template.md`),
    sessionInstall: read(root, `${SESSION_DIR}/SESSION-INSTALL.template.md`),
    pasteBundle: read(root, `${SESSION_DIR}/PASTE-BUNDLE.template.md`),
    claudeSkill: read(root, `${CLAUDE_SKILL_DIR}/SKILL.template.md`),
  };

  const openui =
    config.openuiOutput === true
      ? {
          template: read(root, OPENUI_TEMPLATE_PATH).trim(),
          program: read(root, OPENUI_PROGRAM_PATH).trim(),
          signatures: read(root, OPENUI_SIGNATURES_PATH).trim(),
        }
      : null;

  // Hash of every input — changes whenever any generated output would change.
  // `openui` is only added when enabled, so the default hash (and output) is unchanged.
  const installVersion = createHash("sha256")
    .update(
      JSON.stringify({
        config,
        tokensForPaste,
        refDoc,
        referenceArtifact,
        providerOverlays,
        templates,
        ...(openui ? { openui } : {}),
      }),
    )
    .digest("hex")
    .slice(0, 8);

  const forbiddenPacks = (config.forbiddenBrandPacks ?? []).join("`, `");

  const applyPlaceholders = (template) =>
    template
      .replaceAll("{{BRAND_ID}}", brandId)
      .replaceAll("{{PRIMARY_HEX}}", primaryHex)
      .replaceAll("{{INSTALL_VERSION}}", installVersion)
      .replaceAll("{{FORBIDDEN_PACKS}}", forbiddenPacks ? `\`${forbiddenPacks}\`` : "(none)")
      .replaceAll("{{CONFIG_JSON}}", JSON.stringify(config, null, 2))
      .replaceAll("{{TOKENS_JSON}}", JSON.stringify(tokensForPaste, null, 2))
      .replaceAll("{{REFERENCE_DOCUMENT_JSON}}", JSON.stringify(refDoc, null, 2))
      .replaceAll("{{REFERENCE_ARTIFACT_TSX}}", referenceArtifact)
      .replaceAll("{{PROVIDER_OVERLAYS}}", providerOverlays)
      .replaceAll("{{REPO_URL}}", REPO_URL)
      .replaceAll("{{SKILL_BLOB_URL}}", SKILL_BLOB_URL)
      .replaceAll("{{RAW_SESSION_INSTALL_URL}}", RAW_SESSION_INSTALL_URL);

  let bodyTemplate = templates.body;
  if (openui) {
    if (!bodyTemplate.includes(OPENUI_ANCHOR)) {
      throw new Error(`session-artifact-body.template.md lost its "## Confirm activation" anchor`);
    }
    const section = openui.template
      .replaceAll("{{OPENUI_SIGNATURES}}", openui.signatures)
      .replaceAll("{{OPENUI_REFERENCE_PROGRAM}}", openui.program);
    bodyTemplate = bodyTemplate.replace(OPENUI_ANCHOR, () => `\n---\n\n${section}\n${OPENUI_ANCHOR}`);
  }
  const body = applyPlaceholders(bodyTemplate);
  const render = (template) => applyPlaceholders(template).replace("{{BODY}}", () => body);

  const skillMd = render(templates.claudeSkill);

  const files = new Map([
    ["SKILL.md", skillMd],
    [`${SESSION_DIR}/SESSION-INSTALL.md`, render(templates.sessionInstall)],
    [`${SESSION_DIR}/PASTE-BUNDLE.md`, render(templates.pasteBundle)],
    [`${CLAUDE_SKILL_DIR}/${CLAUDE_SKILL_NAME}/SKILL.md`, skillMd],
    [
      `${CLAUDE_SKILL_DIR}/${CLAUDE_SKILL_NAME}.zip`,
      createStoredZip([{ name: `${CLAUDE_SKILL_NAME}/SKILL.md`, data: skillMd }]),
    ],
  ]);

  return { brandId, primaryHex, installVersion, files };
}
