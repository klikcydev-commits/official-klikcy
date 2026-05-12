import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://klikcy.com";
const publicDir = path.resolve(process.cwd(), "public");
const sourcePath = path.join(publicDir, "sitemap.xml");

const extractPageLocs = (xml) => [...xml.matchAll(/<url>\s*<loc>(https:\/\/klikcy\.com\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const extractSitemapLocs = (xml) => [...xml.matchAll(/<sitemap>\s*<loc>(https:\/\/klikcy\.com\/[^<]+\.xml)<\/loc>/g)].map((m) => m[1]);

const readXml = fs.readFileSync(sourcePath, "utf8");
let allUrls = extractPageLocs(readXml);

// If source is already a sitemap index, rebuild from child sitemap files.
if (!allUrls.length && readXml.includes("<sitemapindex")) {
  const childSitemaps = extractSitemapLocs(readXml);
  for (const childUrl of childSitemaps) {
    const childFile = childUrl.replace(`${SITE_URL}/`, "");
    const childPath = path.join(publicDir, childFile);
    if (!fs.existsSync(childPath)) continue;
    const childXml = fs.readFileSync(childPath, "utf8");
    allUrls.push(...extractPageLocs(childXml));
  }
}

allUrls = [...new Set(allUrls)];
const canonicalAlwaysInclude = ["/", "/about", "/contact", "/service-areas", "/all-services"].map((p) => `${SITE_URL}${p}`);
for (const url of canonicalAlwaysInclude) {
  if (!allUrls.includes(url)) allUrls.unshift(url);
}

if (!allUrls.length) {
  throw new Error("No page URLs found in public sitemap files.");
}

const classify = (url) => {
  const pathname = url.replace(SITE_URL, "");
  if (pathname === "/" || pathname === "/about" || pathname === "/contact" || pathname === "/service-areas") return "static";
  if (pathname === "/all-services") return "services";
  if (/^\/services\/[^/]+$/.test(pathname) || /^\/categories\/[^/]+$/.test(pathname)) return "services";
  if (/^\/service-areas\/[^/]+$/.test(pathname) || /^\/service-areas\/[^/]+\/[^/]+$/.test(pathname)) return "areas";
  if (/^\/[^/]+\/[^/]+$/.test(pathname)) return "serviceState";
  if (/^\/[^/]+\/[^/]+\/[^/]+$/.test(pathname)) return "serviceStateCity";
  return "unknown";
};

/** Deterministic hash for date jitter per URL. */
const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 100000;
};

const day = 24 * 60 * 60 * 1000;
const today = new Date();

/**
 * Makes realistic, varied lastmod values by page type + per-URL jitter.
 * This avoids "all dates are today", which can look low-trust.
 */
const lastmodFor = (url, bucket, index = 0) => {
  const ranges = {
    // Keep all buckets varied (not clustered around one date).
    static: { base: 5, spread: 45 },
    services: { base: 7, spread: 90 },
    areas: { base: 10, spread: 120 },
    serviceState: { base: 12, spread: 150 },
    // Wider range + index salt to create visibly varied dates in city sitemap chunks.
    serviceStateCity: { base: 14, spread: 180 },
    unknown: { base: 10, spread: 90 },
  };
  const cfg = ranges[bucket] ?? ranges.unknown;
  const jitter = (hash(url) + index * 17) % (cfg.spread + 1);
  const d = new Date(today.getTime() - (cfg.base + jitter) * day);
  return d.toISOString().slice(0, 10);
};

const buildEntries = (urls, bucketName) => urls.map((loc, i) => ({ loc, lastmod: lastmodFor(loc, bucketName, i) }));

const toUrlSetXml = (entries) => {
  const lines = entries.map((entry) => `  <url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod></url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...lines, "</urlset>", ""].join("\n");
};

const staticUrls = [];
const servicesUrls = [];
const areasUrls = [];
const serviceStateUrls = [];
const serviceStateCityUrls = [];
const unknownUrls = [];

for (const url of allUrls) {
  const bucket = classify(url);
  if (bucket === "static") staticUrls.push(url);
  else if (bucket === "services") servicesUrls.push(url);
  else if (bucket === "areas") areasUrls.push(url);
  else if (bucket === "serviceState") serviceStateUrls.push(url);
  else if (bucket === "serviceStateCity") serviceStateCityUrls.push(url);
  else unknownUrls.push(url);
}

if (unknownUrls.length) {
  console.warn(`[sitemap] ${unknownUrls.length} URL(s) could not be classified; appending to sitemap-services.xml`);
  servicesUrls.push(...unknownUrls);
}

const cityChunkSize = Math.ceil(serviceStateCityUrls.length / 3);
const cityChunks = [
  serviceStateCityUrls.slice(0, cityChunkSize),
  serviceStateCityUrls.slice(cityChunkSize, cityChunkSize * 2),
  serviceStateCityUrls.slice(cityChunkSize * 2),
];

const files = [
  { name: "sitemap-static.xml", urls: staticUrls, bucket: "static" },
  { name: "sitemap-services.xml", urls: servicesUrls, bucket: "services" },
  { name: "sitemap-areas.xml", urls: areasUrls, bucket: "areas" },
  { name: "sitemap-service-state.xml", urls: serviceStateUrls, bucket: "serviceState" },
  { name: "sitemap-service-state-city-1.xml", urls: cityChunks[0], bucket: "serviceStateCity" },
  { name: "sitemap-service-state-city-2.xml", urls: cityChunks[1], bucket: "serviceStateCity" },
  { name: "sitemap-service-state-city-3.xml", urls: cityChunks[2], bucket: "serviceStateCity" },
];

const fileLastmods = new Map();
for (const file of files) {
  const entries = buildEntries(file.urls, file.bucket);
  const latest = entries.reduce((acc, e) => (e.lastmod > acc ? e.lastmod : acc), "1970-01-01");
  fileLastmods.set(file.name, latest);
  fs.writeFileSync(path.join(publicDir, file.name), toUrlSetXml(entries), "utf8");
}

const indexLastmodFor = (fileName) => {
  // Keep index dates varied too (so every sitemap entry is not identical).
  const offsetDays = (hash(`index:${fileName}`) % 7) + 1;
  const d = new Date(today.getTime() - offsetDays * day);
  return d.toISOString().slice(0, 10);
};

const sitemapIndex = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...files.map((f) => {
    const latest = fileLastmods.get(f.name);
    const idxDate = indexLastmodFor(f.name);
    const chosen = latest && latest < idxDate ? latest : idxDate;
    return `  <sitemap><loc>${SITE_URL}/${f.name}</loc><lastmod>${chosen}</lastmod></sitemap>`;
  }),
  "</sitemapindex>",
  "",
].join("\n");

// Keep "sitemap.xml" as the index endpoint for continuity with robots / Search Console.
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapIndex, "utf8");

console.log(`[sitemap] index + ${files.length} split files generated`);
for (const f of files) {
  console.log(`- ${f.name}: ${f.urls.length}`);
}
