/**
 * Create OLS-compatible directory stubs for old sitemap URLs.
 * Each stub directory gets .htaccess → 301 to canonical sitemap index.
 * Run after `npm run build` (writes into out/).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../out");
const TARGET = "https://www.klikcy.com/sitemap.xml";

const stubNames = [
  "sitemap_index.xml",
  "sitemap-index.xml",
  "server-sitemap.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "category-sitemap.xml",
  "service-sitemap.xml",
  "location-sitemap.xml",
  "wp-sitemap.xml",
  "wp-sitemap-posts-page-1.xml",
  "wp-sitemap-posts-post-1.xml",
  ...Array.from({ length: 10 }, (_, i) => `sitemap-${i}.xml`),
];

const htaccess = `RewriteEngine On
RewriteRule ^ ${TARGET} [R=301,L]
`;

if (!fs.existsSync(outDir)) {
  console.error("out/ not found — run npm run build first");
  process.exit(1);
}

for (const name of stubNames) {
  const dir = path.join(outDir, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".htaccess"), htaccess);
  fs.writeFileSync(path.join(dir, "index.html"), "");
}

const sitemapDir = path.join(outDir, "sitemap");
fs.mkdirSync(sitemapDir, { recursive: true });
fs.writeFileSync(path.join(sitemapDir, ".htaccess"), htaccess);
fs.writeFileSync(path.join(sitemapDir, "index.html"), "");

console.log(`Created ${stubNames.length + 1} old-sitemap stub directories in out/`);
