import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSessionArtifacts, RAW_SESSION_INSTALL_URL, REPO_URL } from "./lib/session-artifacts.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const requiredSpecFiles = [
  "spec/GENUI.md",
  "spec/interaction-contract.md",
  "spec/branding-extraction.md",
  "spec/session-bootstrap.md",
  "spec/session-config.json",
  "spec/session-visual-guide.md",
  "spec/rendering-profiles.md",
  "spec/contracts/genui-document.schema.json",
];

const adapterFiles = [
  "adapters/gemini/GEMINI.md",
  "adapters/claude-code/CLAUDE.md",
  "adapters/openai/AGENTS.md",
  "adapters/session/SKILL.md",
  "adapters/session/PASTE-BUNDLE.md",
  "adapters/session/PASTE-BUNDLE.template.md",
  "adapters/session/SESSION-INSTALL.md",
  "adapters/session/SESSION-INSTALL.template.md",
  "adapters/session/session-artifact-body.template.md",
  "adapters/session/ON-INSTALL.md",
  "adapters/claude-skill/SKILL.template.md",
  "adapters/claude-skill/genui/SKILL.md",
  ".cursor/skills/genui/SKILL.md",
  "INSTALL-SKILL.md",
  "GENUI-SESSION.md",
  "README.md",
  "SKILL.md",
];

const sessionProviders = [
  "adapters/session/providers/generic-chat.md",
  "adapters/session/providers/claude-web.md",
  "adapters/session/providers/chatgpt-web.md",
  "adapters/session/providers/gemini-app.md",
  "adapters/session/providers/deepseek-chat.md",
  "adapters/session/providers/grok-chat.md",
];

const HEX_PATTERN = /#[0-9A-Fa-f]{3,8}\b/g;

let failed = false;

function fail(msg) {
  console.error(msg);
  failed = true;
}

function assertGeneratedArtifact(rel, label) {
  const text = readFileSync(join(root, rel), "utf8");
  if (!text.includes("GENERATED:")) {
    fail(`${label} must be generated (missing GENERATED marker). Run pnpm generate:session-artifacts`);
  }
  if (expectedPrimary && !text.includes(expectedPrimary)) {
    fail(`${label} primary ${expectedPrimary} missing — run pnpm generate:session-artifacts`);
  }
  if (!text.includes(`"${brandId}"`)) {
    fail(`${label} must include brand id ${brandId}`);
  }
}

const config = JSON.parse(readFileSync(join(root, "spec/session-config.json"), "utf8"));
const brandId = config.defaultBrandPack;
const tokensPath = join(root, "branding", brandId, "tokens.json");
if (!existsSync(tokensPath)) {
  fail(`Missing branding pack for defaultBrandPack: ${brandId}`);
}
const tokens = existsSync(tokensPath)
  ? JSON.parse(readFileSync(tokensPath, "utf8"))
  : {};
const expectedPrimary = tokens.colors?.primary ?? "";

for (const rel of requiredSpecFiles) {
  const full = join(root, rel);
  if (!existsSync(full)) {
    fail(`Missing spec file: ${rel}`);
  }
}

for (const brandFile of ["branding/demo/tokens.json", "branding/917v/tokens.json"]) {
  if (!existsSync(join(root, brandFile))) {
    fail(`Missing ${brandFile}`);
  }
}

for (const rel of [...adapterFiles, ...sessionProviders]) {
  const full = join(root, rel);
  if (!existsSync(full)) {
    fail(`Missing adapter file: ${rel}`);
    continue;
  }
  const text = readFileSync(full, "utf8");
  const skipSpecRef =
    rel.includes("PASTE-BUNDLE.template") ||
    rel.includes("SESSION-INSTALL.template") ||
    rel.includes("session-artifact-body.template") ||
    rel === "GENUI-SESSION.md" ||
    rel === "README.md";
  const referencesSpec =
    text.includes("spec/GENUI") ||
    text.includes("GENUI.md") ||
    text.includes("session-bootstrap") ||
    text.includes("session-config") ||
    text.includes("SESSION-INSTALL");
  if (!skipSpecRef && !referencesSpec) {
    fail(`${rel} should reference spec or SESSION-INSTALL`);
  }
}

for (const rel of sessionProviders) {
  const text = readFileSync(join(root, rel), "utf8");
  if (text.includes("#2563eb") || text.includes("branding/demo")) {
    fail(`${rel} must not reference legacy demo blue or branding/demo`);
  }
  const hexMatches = text.match(HEX_PATTERN);
  if (hexMatches && hexMatches.length > 0) {
    fail(`${rel} must not contain hex colors (found: ${hexMatches.join(", ")})`);
  }
}

assertGeneratedArtifact("adapters/session/PASTE-BUNDLE.md", "PASTE-BUNDLE.md");
assertGeneratedArtifact("adapters/session/SESSION-INSTALL.md", "SESSION-INSTALL.md");
assertGeneratedArtifact("adapters/claude-skill/genui/SKILL.md", "Claude Skill SKILL.md");

// Every generated file on disk must equal a fresh in-memory build (OpenSpec 005).
const generated = buildSessionArtifacts(root);
const normalizeEol = (text) => text.replace(/\r\n/g, "\n");
for (const [rel, expected] of generated.files) {
  const full = join(root, rel);
  if (!existsSync(full)) {
    fail(`Missing generated file ${rel} — run pnpm generate:session-artifacts`);
    continue;
  }
  const actual = readFileSync(full);
  const inSync = Buffer.isBuffer(expected)
    ? actual.equals(expected)
    : normalizeEol(actual.toString("utf8")) === expected;
  if (!inSync) {
    fail(`${rel} is out of sync with its sources — run pnpm generate:session-artifacts`);
  }
  if (!Buffer.isBuffer(expected)) {
    if (!expected.includes(`installVersion: \`${generated.installVersion}\``)) {
      fail(`${rel} must carry installVersion ${generated.installVersion}`);
    }
    // Chat installs must be self-contained: no wording that invites follow-up fetches.
    if (/optional(ly)? secondary fetch|optionally (load|fetch)/i.test(expected)) {
      fail(`${rel} must not invite follow-up repo fetches (see OpenSpec 005)`);
    }
  }
}

const skillMd = generated.files.get("SKILL.md");
const claudeSkillMd = generated.files.get("adapters/claude-skill/genui/SKILL.md");
if (skillMd !== claudeSkillMd) {
  fail("Root SKILL.md must be the same body as adapters/claude-skill/genui/SKILL.md");
}
const frontmatter = /^---\nname: ([a-z0-9-]{1,64})\ndescription: (.+)\n---\n/.exec(skillMd ?? "");
if (!frontmatter) {
  fail("Root SKILL.md must start with name/description frontmatter");
} else if (frontmatter[2].length > 1024) {
  fail(`Claude Skill description is ${frontmatter[2].length} chars (max 1024)`);
}

const installPrompt = `install this skill for this session ${REPO_URL}`;
for (const rel of ["INSTALL-SKILL.md", "README.md", "GENUI-SESSION.md", "spec/session-bootstrap.md"]) {
  const text = readFileSync(join(root, rel), "utf8");
  if (!text.includes(installPrompt)) {
    fail(`${rel} must include the repo-URL install prompt`);
  }
  if (!text.includes("SKILL.md")) {
    fail(`${rel} must name root SKILL.md`);
  }
  if (text.includes(RAW_SESSION_INSTALL_URL)) {
    fail(`${rel} must not send hosts to the cached raw main SESSION-INSTALL URL`);
  }
}

const sessionSkill = readFileSync(join(root, "adapters/session/SKILL.md"), "utf8");
if (!sessionSkill.includes("SKILL.md")) {
  fail("adapters/session/SKILL.md must point at root SKILL.md");
}
if (sessionSkill.includes(RAW_SESSION_INSTALL_URL)) {
  fail("adapters/session/SKILL.md must not send hosts to the cached raw main SESSION-INSTALL URL");
}

const bootstrap = readFileSync(join(root, "spec/session-bootstrap.md"), "utf8");
if (!bootstrap.includes("SKILL.md")) {
  fail("session-bootstrap.md must reference root SKILL.md as the primary path");
}

const gemini = readFileSync(join(root, "adapters/gemini/GEMINI.md"), "utf8");
if (!gemini.includes("@../../spec/GENUI.md")) {
  fail("Gemini adapter should @-import spec/GENUI.md");
}

const providersDir = join(root, "adapters/session/providers");
for (const name of readdirSync(providersDir)) {
  if (!name.endsWith(".md") || name === "README.md") continue;
  const rel = `adapters/session/providers/${name}`;
  if (!sessionProviders.includes(rel)) {
    fail(`Provider ${rel} not listed in check-adapter-paths.mjs sessionProviders`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("Adapter path smoke check passed.");
