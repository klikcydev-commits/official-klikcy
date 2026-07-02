#!/usr/bin/env node
/**
 * Validate sitemap index + shards on a running server.
 * Usage: node scripts/verify-sitemaps.mjs [baseUrl]
 */
import { execFileSync } from "node:child_process";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const CANONICAL_HOST = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.klikcy.com"
).replace(/\/$/, "");

function getExpectedPaths() {
  const out = execFileSync(
    "npx",
    [
      "tsx",
      "-e",
      `import { getAllSitemapPaths, getSitemapShardDefs } from './src/lib/sitemap-urls.ts'; console.log(JSON.stringify({ paths: getAllSitemapPaths(), shards: getSitemapShardDefs().map(s=>s.id) }));`,
    ],
    { encoding: "utf8", cwd: process.cwd(), shell: true },
  );
  return JSON.parse(out.trim());
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function assertWellFormed(xml, label) {
  if (!xml.includes("<?xml") || !xml.includes("<")) {
    throw new Error(`${label}: not valid XML`);
  }
}

const { paths: expectedPaths, shards: expectedShardIds } = getExpectedPaths();
const expectedUrlSet = new Set(expectedPaths.map((p) => `${CANONICAL_HOST}${p}`));

let failed = 0;
const collected = new Set();

try {
  const indexRes = await fetch(`${BASE}/sitemap.xml`);
  if (!indexRes.ok) throw new Error(`index status ${indexRes.status}`);
  const indexXml = await indexRes.text();
  assertWellFormed(indexXml, "sitemap index");

  const shardLocs = extractLocs(indexXml);
  const shardIdsFromIndex = shardLocs.map((loc) => {
    const m = loc.match(/\/sitemap\/([^/]+)\.xml$/);
    return m ? decodeURIComponent(m[1]) : null;
  });

  if (shardIdsFromIndex.length !== expectedShardIds.length) {
    console.error(
      `FAIL shard count: index=${shardIdsFromIndex.length} expected=${expectedShardIds.length}`,
    );
    failed++;
  }

  for (const id of expectedShardIds) {
    const url = `${BASE}/sitemap/${encodeURIComponent(id)}.xml`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`FAIL shard ${id}: status ${res.status}`);
      failed++;
      continue;
    }
    const xml = await res.text();
    assertWellFormed(xml, `shard ${id}`);
    for (const loc of extractLocs(xml)) {
      collected.add(loc);
      if (!loc.startsWith(CANONICAL_HOST)) {
        console.error(`FAIL non-canonical host: ${loc}`);
        failed++;
      }
      const pathname = loc.slice(CANONICAL_HOST.length);
      if (pathname !== "/" && !pathname.endsWith("/")) {
        console.error(`FAIL missing trailing slash: ${loc}`);
        failed++;
      }
    }
    console.log(`OK   shard ${id} (${extractLocs(xml).length} URLs)`);
  }
} catch (err) {
  console.error(`FAIL ${err.message}`);
  console.error("Start the server with `npm run build && npm run start` to verify live sitemaps.");
  process.exit(1);
}

if (collected.size !== expectedUrlSet.size) {
  console.error(`FAIL URL count: live=${collected.size} expected=${expectedUrlSet.size}`);
  failed++;
}

for (const url of expectedUrlSet) {
  if (!collected.has(url)) {
    console.error(`FAIL missing URL in shards: ${url}`);
    failed++;
    if (failed > 10) break;
  }
}

if (failed > 0) {
  console.error(`\n${failed} sitemap verification issue(s).`);
  process.exit(1);
}

console.log(`\nAll sitemap checks passed (${collected.size} URLs across ${expectedShardIds.length} shards).`);
