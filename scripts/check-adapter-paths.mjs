import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const requiredSpecFiles = [
  "spec/GENUI.md",
  "spec/interaction-contract.md",
  "spec/branding-extraction.md",
  "spec/session-bootstrap.md",
  "spec/rendering-profiles.md",
  "spec/contracts/genui-document.schema.json",
];

const adapterFiles = [
  "adapters/gemini/GEMINI.md",
  "adapters/claude-code/CLAUDE.md",
  "adapters/openai/AGENTS.md",
  "adapters/session/SKILL.md",
  "adapters/session/PASTE-BUNDLE.md",
  ".cursor/skills/genui/SKILL.md",
  "INSTALL-SKILL.md",
];

const sessionProviders = [
  "adapters/session/providers/generic-chat.md",
  "adapters/session/providers/claude-web.md",
  "adapters/session/providers/deepseek-chat.md",
];

let failed = false;

for (const rel of requiredSpecFiles) {
  const full = join(root, rel);
  if (!existsSync(full)) {
    console.error(`Missing spec file: ${rel}`);
    failed = true;
  }
}

for (const brandFile of ["branding/demo/tokens.json", "branding/youtube/tokens.json"]) {
  if (!existsSync(join(root, brandFile))) {
    console.error(`Missing ${brandFile}`);
    failed = true;
  }
}

for (const rel of [...adapterFiles, ...sessionProviders]) {
  const full = join(root, rel);
  if (!existsSync(full)) {
    console.error(`Missing adapter file: ${rel}`);
    failed = true;
    continue;
  }
  const text = readFileSync(full, "utf8");
  const referencesSpec =
    text.includes("spec/GENUI") ||
    text.includes("GENUI.md") ||
    text.includes("session-bootstrap");
  if (!referencesSpec) {
    console.error(`${rel} should reference spec (GENUI or session-bootstrap)`);
    failed = true;
  }
}

const sessionSkill = readFileSync(join(root, "adapters/session/SKILL.md"), "utf8");
if (!sessionSkill.includes("session-bootstrap.md")) {
  console.error("adapters/session/SKILL.md must reference session-bootstrap.md");
  failed = true;
}

const install = readFileSync(join(root, "INSTALL-SKILL.md"), "utf8");
if (!install.includes("adapters/session/providers")) {
  console.error("INSTALL-SKILL.md must reference session providers");
  failed = true;
}

const gemini = readFileSync(join(root, "adapters/gemini/GEMINI.md"), "utf8");
if (!gemini.includes("@../../spec/GENUI.md")) {
  console.error("Gemini adapter should @-import spec/GENUI.md");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("Adapter path smoke check passed.");
