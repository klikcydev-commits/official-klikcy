/**
 * Lightweight SEO asset checks (not a full crawler audit).
 * Run: npm run seo:validate
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const required = ["robots.txt", "sitemap.xml"];
const errors = [];

for (const file of required) {
  const p = path.join(publicDir, file);
  if (!fs.existsSync(p)) errors.push(`Missing public/${file}`);
}

const robots = fs.readFileSync(path.join(publicDir, "robots.txt"), "utf8");
if (!robots.includes("Sitemap:")) errors.push("robots.txt missing Sitemap directive");

if (errors.length) {
  console.error("[seo:validate] FAILED\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("[seo:validate] OK — robots.txt and sitemap.xml present");
