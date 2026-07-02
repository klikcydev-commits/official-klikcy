#!/usr/bin/env node
/**
 * Smoke-test legacy redirects against a running deployment or `next start`.
 * Usage: node scripts/verify-redirects.mjs [baseUrl]
 * Default base: http://localhost:3000
 */

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

/** Sample legacy URLs → expected Location path (relative, trailing slash). */
const SAMPLES = [
  {
    path: "/services/web-development",
    expectLocation: "/services/custom-website-development/",
  },
  {
    path: "/services/web-development/",
    expectLocation: "/services/custom-website-development/",
  },
  {
    path: "/services/app-development/",
    expectLocation: "/services/mobile-app-development/",
  },
  {
    path: "/services/digital-marketing/",
    expectLocation: "/services/digital-marketing-strategy/",
  },
  {
    path: "/services/ai-automations/",
    expectLocation: "/services/ai-chatbot-development/",
  },
  {
    path: "/services/e-commerce-development/",
    expectLocation: "/services/shopify-store-development/",
  },
  {
    path: "/web-development/new-york/manhattan/",
    expectLocation: "/custom-website-development/new-york/manhattan/",
  },
  {
    path: "/app-development/california/los-angeles/",
    expectLocation: "/mobile-app-development/california/los-angeles/",
  },
  {
    path: "/service-areas/new-york/bronx/",
    expectLocation: "/service-areas/new-york/the-bronx/",
  },
  {
    path: "/services",
    expectLocation: "/all-services/",
  },
];

function normalizeLocation(location, base) {
  if (!location) return "";
  try {
    const url = new URL(location, base);
    return url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
  } catch {
    return location.endsWith("/") ? location : `${location}/`;
  }
}

let failed = 0;

for (const { path, expectLocation } of SAMPLES) {
  const url = `${BASE}${path}`;
  let res;
  try {
    res = await fetch(url, { redirect: "manual" });
  } catch (err) {
    console.error(`FAIL ${path} — fetch error: ${err.message}`);
    failed++;
    continue;
  }

  const status = res.status;
  const location = normalizeLocation(res.headers.get("location"), BASE);
  const okStatus = status === 308 || status === 301;
  const okLocation = location === expectLocation;

  if (okStatus && okLocation) {
    console.log(`OK   ${status} ${path} → ${location}`);
  } else {
    console.error(
      `FAIL ${path} — status=${status} location=${location || "(none)"} expected=${expectLocation}`,
    );
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed}/${SAMPLES.length} redirect checks failed.`);
  process.exit(1);
}

console.log(`\nAll ${SAMPLES.length} redirect checks passed.`);
