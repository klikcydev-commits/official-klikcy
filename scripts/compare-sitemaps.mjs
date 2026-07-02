#!/usr/bin/env node
/**
 * Compare legacy public/ sitemap XML (if present) against generator paths.
 * Throwaway audit helper — legacy files removed after Phase 2 migration.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const publicDir = path.join(process.cwd(), "public");
const legacyFiles = fs.existsSync(publicDir)
  ? fs.readdirSync(publicDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"))
  : [];

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const legacyUrls = new Set();
for (const file of legacyFiles) {
  for (const loc of extractLocs(fs.readFileSync(path.join(publicDir, file), "utf8"))) {
    legacyUrls.add(loc);
  }
}

const expectedJson = execFileSync(
  "npx",
  [
    "tsx",
    "-e",
    `import { getAllSitemapPaths } from './src/lib/sitemap-urls.ts'; import { getSiteUrl } from './src/lib/site-url.ts'; const base=getSiteUrl(); console.log(JSON.stringify(getAllSitemapPaths().map(p=>base+p)));`,
  ],
  { encoding: "utf8", cwd: process.cwd(), shell: true },
);

const generatedUrls = new Set(JSON.parse(expectedJson.trim()));

const onlyLegacy = [...legacyUrls].filter((u) => !generatedUrls.has(u));
const onlyGenerated = [...generatedUrls].filter((u) => !legacyUrls.has(u));

console.log("Legacy XML files:", legacyFiles.length ? legacyFiles.join(", ") : "(none)");
console.log("Legacy URL count:", legacyUrls.size);
console.log("Generated URL count:", generatedUrls.size);
console.log("Only in legacy:", onlyLegacy.length);
console.log("Only in generator:", onlyGenerated.length);

if (onlyLegacy.length) {
  console.log("Sample legacy-only:", onlyLegacy.slice(0, 5).join("\n"));
}
if (onlyGenerated.length) {
  console.log("Sample generator-only:", onlyGenerated.slice(0, 5).join("\n"));
}
