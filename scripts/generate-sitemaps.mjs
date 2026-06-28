/**
 * Generate sitemap URLs from src/lib/states.ts and src/lib/services.ts (regex parse).
 * Run: npm run sitemap:generate
 * Then optionally: npm run sitemap:split
 */
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://www.klikcy.com").replace(
  /\/$/,
  "",
);
const root = process.cwd();
const publicDir = path.join(root, "public");
const MAX_PER_FILE = 49_000;

const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

function extractServiceSlugs(src) {
  const slugs = [];
  const blocks = src.split(/make\(\{/);
  for (let i = 1; i < blocks.length; i += 1) {
    const m = blocks[i].match(/slug:\s*"([^"]+)"/);
    if (m) slugs.push(m[1]);
  }
  return [...new Set(slugs)];
}

function extractStates(src) {
  const blocks = [...src.matchAll(/\{\s*slug:\s*"([^"]+)"[\s\S]*?cities:\s*\[([\s\S]*?)\]/g)];
  return blocks.map((b) => ({
    slug: b[1],
    cities: [...b[2].matchAll(/"([^"]+)"/g)].map((c) =>
      c[1]
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    ),
  }));
}

function extractCategorySlugs(src) {
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

const servicesSrc = read("src/lib/services.ts");
const statesSrc = read("src/lib/states.ts");
const categoriesSrc = read("src/lib/categories.ts");

const serviceSlugs = extractServiceSlugs(servicesSrc);
const states = extractStates(statesSrc);
const categorySlugs = extractCategorySlugs(categoriesSrc);

const urls = new Set();

/** Match Next.js trailingSlash: true — canonical URLs end with / (except homepage). */
const add = (pathname) => {
  let p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p !== "/" && !p.endsWith("/")) p = `${p}/`;
  urls.add(`${SITE_URL}${p}`);
};

add("/");
add("/about");
add("/contact");
add("/all-services");
add("/service-areas");

for (const slug of categorySlugs) add(`/categories/${slug}`);
for (const slug of serviceSlugs) add(`/services/${slug}`);

for (const state of states) {
  add(`/service-areas/${state.slug}`);
  for (const city of state.cities) add(`/service-areas/${state.slug}/${city}`);
  for (const svc of serviceSlugs) {
    add(`/${svc}/${state.slug}`);
    for (const city of state.cities) add(`/${svc}/${state.slug}/${city}`);
  }
}

const allUrls = [...urls].sort();
const today = new Date().toISOString().slice(0, 10);

const urlEntry = (loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;

const fullXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls.map(urlEntry).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(publicDir, "sitemap-full.xml"), fullXml);

if (allUrls.length <= MAX_PER_FILE) {
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), fullXml);
  console.log(`[sitemap] Wrote ${allUrls.length} URLs to public/sitemap.xml (+ sitemap-full.xml for split)`);
} else {
  const chunks = [];
  for (let i = 0; i < allUrls.length; i += MAX_PER_FILE) {
    chunks.push(allUrls.slice(i, i + MAX_PER_FILE));
  }
  const childFiles = [];
  chunks.forEach((chunk, i) => {
    const name = `sitemap-generated-${i + 1}.xml`;
    childFiles.push(name);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${chunk.map(urlEntry).join("\n")}\n</urlset>\n`;
    fs.writeFileSync(path.join(publicDir, name), xml);
  });
  const index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${childFiles
    .map((f) => `  <sitemap>\n    <loc>${SITE_URL}/${f}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`)
    .join("\n")}\n</sitemapindex>\n`;
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), index);
  console.log(`[sitemap] Wrote index + ${chunks.length} child files (${allUrls.length} URLs); sitemap-full.xml kept for split`);
}

console.log(`[sitemap] Services: ${serviceSlugs.length}, States: ${states.length}, Total URLs: ${allUrls.length}`);
