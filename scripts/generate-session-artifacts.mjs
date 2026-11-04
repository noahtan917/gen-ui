import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSessionArtifacts } from "./lib/session-artifacts.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { brandId, primaryHex, installVersion, files } = buildSessionArtifacts(root);

for (const [rel, content] of files) {
  const outPath = join(root, rel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, content);
  console.log(`Wrote ${rel}`);
}

console.log(`Brand: ${brandId}, primary: ${primaryHex}, installVersion: ${installVersion}`);
