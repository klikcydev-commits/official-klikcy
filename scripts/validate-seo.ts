/**
 * Full SEO audit against generators + sitemap + sample built HTML.
 * Run after `npm run build`: npm run seo:validate
 */
import fs from "node:fs";
import path from "node:path";
import { categories } from "../src/lib/categories";
import { getCitiesForState } from "../src/lib/cities";
import { homeFaqs } from "../src/content/home";
import {
  getAboutSeo,
  getAllServicesSeo,
  getCategorySeo,
  getCityAreaSeo,
  getContactSeo,
  getHomeSeo,
  getNotFoundSeo,
  getServiceAreasSeo,
  getServiceCitySeo,
  getServiceSeo,
  getServiceStateSeo,
  getStateAreaSeo,
} from "../src/lib/seo/generators";
import type { SeoPayload } from "../src/lib/seo/metadata";
import {
  buildCityAreaFaqs,
  hasForbiddenLocalClaim,
  visibleServiceCityFaqs,
} from "../src/lib/geo-aeo-content";
import {
  assertCatalogIntegrity,
  buildLastmodReport,
  dateModifiedForCanonical,
  lastModifiedForPath,
} from "../src/lib/seo/lastmod";
import { buildSitemapEntries } from "../src/lib/sitemap-urls";
import { getAllSitemapPaths, SITE_URL } from "../src/lib/sitemap-urls";
import { services } from "../src/lib/services";
import { states } from "../src/lib/states";

const CANONICAL_HOST = "https://www.klikcy.com";
const TITLE_MIN = 30;
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 160;

type PageAudit = {
  path: string;
  seo: SeoPayload;
};

const errors: string[] = [];
const warnings: string[] = [];

function err(msg: string) {
  errors.push(msg);
}

function warn(msg: string) {
  warnings.push(msg);
}

function collectAllPages(): PageAudit[] {
  const pages: PageAudit[] = [];

  const push = (pathname: string, seo: SeoPayload) => pages.push({ path: pathname, seo });

  push("/", getHomeSeo(homeFaqs));
  push("/about", getAboutSeo());
  push("/contact", getContactSeo());
  push("/all-services", getAllServicesSeo());
  push("/service-areas", getServiceAreasSeo());
  push("/404", getNotFoundSeo());

  for (const category of categories) push(`/categories/${category.slug}`, getCategorySeo(category));
  for (const service of services) push(`/services/${service.slug}`, getServiceSeo(service));
  for (const state of states) {
    push(`/service-areas/${state.slug}`, getStateAreaSeo(state));
    for (const city of getCitiesForState(state)) {
      push(`/service-areas/${state.slug}/${city.slug}`, getCityAreaSeo(city));
    }
    for (const service of services) {
      push(`/${service.slug}/${state.slug}`, getServiceStateSeo(service, state));
      for (const city of getCitiesForState(state)) {
        push(`/${service.slug}/${state.slug}/${city.slug}`, getServiceCitySeo(service, city));
      }
    }
  }

  return pages;
}

function validateMetadata(pages: PageAudit[]) {
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();

  for (const { path: pathname, seo } of pages) {
    if (!seo.title?.trim()) err(`Missing title: ${pathname}`);
    if (!seo.description?.trim()) err(`Missing description: ${pathname}`);
    if (!seo.canonical?.trim()) err(`Missing canonical: ${pathname}`);

    if (seo.canonical && !seo.canonical.startsWith(CANONICAL_HOST)) {
      err(`Canonical not on ${CANONICAL_HOST}: ${pathname} → ${seo.canonical}`);
    }
    if (seo.canonical?.includes("localhost")) {
      err(`Localhost canonical: ${pathname}`);
    }

    const expectedPath =
      pathname === "/"
        ? `${CANONICAL_HOST}/`
        : `${CANONICAL_HOST}${pathname.startsWith("/") ? pathname : `/${pathname}`}${pathname.endsWith("/") ? "" : "/"}`;
    if (seo.canonical && seo.canonical !== expectedPath) {
      err(`Canonical mismatch on ${pathname}: expected ${expectedPath}, got ${seo.canonical}`);
    }

    if (seo.robots?.index === false && pathname !== "/404") {
      err(`Accidental noindex on indexable page: ${pathname}`);
    }
    if (pathname === "/404" && seo.robots?.index !== false) {
      err("404 page must be noindex");
    }

    const titleLen = seo.title.length;
    if (titleLen < TITLE_MIN && pathname !== "/404") warn(`Title short (${titleLen}): ${pathname}`);
    if (titleLen > TITLE_MAX) warn(`Title long (${titleLen}): ${pathname}`);

    const descLen = seo.description.length;
    if (descLen < DESC_MIN) warn(`Description short (${descLen}): ${pathname}`);
    const hubPaths = new Set(["/", "/about", "/contact", "/all-services", "/service-areas"]);
    if (descLen > DESC_MAX && (hubPaths.has(pathname) || pathname.startsWith("/categories/"))) {
      warn(`Description long (${descLen}): ${pathname}`);
    }

    if (!seo.jsonLd?.length) warn(`Missing JSON-LD: ${pathname}`);

    const titleKey = seo.title.trim().toLowerCase();
    titles.set(titleKey, [...(titles.get(titleKey) ?? []), pathname]);
    const descKey = seo.description.trim().toLowerCase();
    descriptions.set(descKey, [...(descriptions.get(descKey) ?? []), pathname]);
  }

  for (const [title, paths] of Array.from(titles.entries())) {
    if (paths.length > 1) err(`Duplicate title (${paths.length}): "${title.slice(0, 60)}…" → ${paths.slice(0, 3).join(", ")}${paths.length > 3 ? "…" : ""}`);
  }
  for (const [desc, paths] of Array.from(descriptions.entries())) {
    if (paths.length > 1) err(`Duplicate description (${paths.length}) on ${paths.slice(0, 3).join(", ")}${paths.length > 3 ? "…" : ""}`);
  }
}

const MIN_CITY_FAQS = 5;

function countFaqSchemaItems(jsonLd?: object[]): number {
  if (!jsonLd) return 0;
  for (const block of jsonLd) {
    const typed = block as { "@type"?: string; mainEntity?: unknown[] };
    if (typed["@type"] === "FAQPage" && Array.isArray(typed.mainEntity)) {
      return typed.mainEntity.length;
    }
  }
  return 0;
}

function validateGeoAeoFaqs(pages: PageAudit[]) {
  let cityAreaCount = 0;
  let serviceCityCount = 0;

  for (const { path: pathname, seo } of pages) {
    const isCityArea = /^\/service-areas\/[^/]+\/[^/]+$/.test(pathname);
    const isServiceCity = /^\/[^/]+\/[^/]+\/[^/]+$/.test(pathname) && !pathname.startsWith("/service-areas/");

    if (isCityArea) {
      cityAreaCount += 1;
      const stateSlug = pathname.split("/")[2];
      const citySlug = pathname.split("/")[3];
      const state = states.find((s) => s.slug === stateSlug);
      const city = state ? getCitiesForState(state).find((c) => c.slug === citySlug) : undefined;
      if (!city) {
        err(`City area page missing city data: ${pathname}`);
        continue;
      }
      const faqs = buildCityAreaFaqs(city);
      if (faqs.length < MIN_CITY_FAQS) err(`City area page has fewer than ${MIN_CITY_FAQS} FAQs: ${pathname}`);
      const schemaCount = countFaqSchemaItems(seo.jsonLd);
      if (schemaCount < MIN_CITY_FAQS) err(`City area FAQ schema count (${schemaCount}) below ${MIN_CITY_FAQS}: ${pathname}`);
      if (schemaCount !== faqs.length) err(`City area FAQ schema (${schemaCount}) does not match visible FAQs (${faqs.length}): ${pathname}`);
      for (const f of faqs) {
        if (hasForbiddenLocalClaim(f.a) || hasForbiddenLocalClaim(f.q)) err(`Forbidden local claim in city FAQ: ${pathname}`);
      }
    }

    if (isServiceCity) {
      serviceCityCount += 1;
      const [, serviceSlug, stateSlug, citySlug] = pathname.split("/");
      const service = services.find((s) => s.slug === serviceSlug);
      const state = states.find((s) => s.slug === stateSlug);
      const city = state ? getCitiesForState(state).find((c) => c.slug === citySlug) : undefined;
      if (!service || !city) {
        err(`Service-city page missing data: ${pathname}`);
        continue;
      }
      const faqs = visibleServiceCityFaqs(service, city);
      if (faqs.length < MIN_CITY_FAQS) err(`Service-city page has fewer than ${MIN_CITY_FAQS} FAQs: ${pathname}`);
      const schemaCount = countFaqSchemaItems(seo.jsonLd);
      if (schemaCount < MIN_CITY_FAQS) err(`Service-city FAQ schema count (${schemaCount}) below ${MIN_CITY_FAQS}: ${pathname}`);
      if (schemaCount !== faqs.length) err(`Service-city FAQ schema (${schemaCount}) does not match visible FAQs (${faqs.length}): ${pathname}`);
      for (const f of faqs) {
        if (hasForbiddenLocalClaim(f.a) || hasForbiddenLocalClaim(f.q)) err(`Forbidden local claim in service-city FAQ: ${pathname}`);
      }
    }

    if (pathname.startsWith("/service-areas/") || isServiceCity || /^\/[^/]+\/[^/]+$/.test(pathname)) {
      if (hasForbiddenLocalClaim(seo.description)) err(`Forbidden local claim in meta description: ${pathname}`);
    }
  }

  console.log(`[seo:validate] City area pages: ${cityAreaCount.toLocaleString()}`);
  console.log(`[seo:validate] Service-city pages: ${serviceCityCount.toLocaleString()}`);
}

function validateLastmod(pages: PageAudit[]) {
  assertCatalogIntegrity();

  const indexablePaths = pages.filter((p) => p.path !== "/404").map((p) => (p.path === "/" ? "/" : p.path.endsWith("/") ? p.path : `${p.path}/`));
  const sitemapEntries = buildSitemapEntries();
  const isoSet = new Set<string>();

  if (sitemapEntries.length !== indexablePaths.length) {
    err(`Sitemap entry count (${sitemapEntries.length}) != indexable pages (${indexablePaths.length})`);
  }

  for (const entry of sitemapEntries) {
    if (!entry.lastModified) {
      err(`Sitemap entry missing lastModified: ${entry.url}`);
      continue;
    }
    const iso = entry.lastModified.toISOString().slice(0, 10);
    isoSet.add(iso);

    const pathKey = entry.url.replace(SITE_URL, "") || "/";
    const expected = lastModifiedForPath(pathKey);
    if (iso !== expected.iso) {
      err(`Sitemap lastModified mismatch on ${pathKey}: sitemap=${iso}, expected=${expected.iso}`);
    }
  }

  if (isoSet.size <= 1) {
    err("All sitemap URLs share the same lastModified date");
  }

  const report = buildLastmodReport(indexablePaths);
  const reportDir = path.join(process.cwd(), "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "seo-lastmod-report.json"), JSON.stringify(report, null, 2));

  console.log(`[seo:validate] Unique lastModified dates: ${report.uniqueLastModifiedDates}`);
  console.log(`[seo:validate] Page-specific dates: ${report.pageSpecificCount.toLocaleString()}`);
  console.log(`[seo:validate] Fallback catalog dates: ${report.fallbackCount.toLocaleString()}`);
  console.log(`[seo:validate] Lastmod report → reports/seo-lastmod-report.json`);

  for (const f of report.futureDates) err(`Future lastModified: ${f}`);
  for (const inv of report.invalidDates) err(`Invalid lastModified: ${inv}`);

  for (const { path: pathname, seo } of pages) {
    if (pathname === "/404") continue;
    const canonical = seo.canonical;
    const expectedIso = dateModifiedForCanonical(canonical);
    for (const block of seo.jsonLd ?? []) {
      const typed = block as { "@type"?: string; dateModified?: string; url?: string };
      if (typed["@type"] === "WebPage" && typed.dateModified && typed.dateModified !== expectedIso) {
        err(`JSON-LD dateModified mismatch on ${pathname}: schema=${typed.dateModified}, expected=${expectedIso}`);
      }
    }
  }

  for (const w of report.warnings) warn(`Lastmod: ${w}`);
}

function validateSitemap(pages: PageAudit[]) {
  const indexablePages = pages.filter((p) => p.path !== "/404");
  const sitemapPaths = new Set(getAllSitemapPaths());
  const pagePaths = new Set(
    indexablePages.map((p) => (p.path === "/" ? "/" : p.path.endsWith("/") ? p.path : `${p.path}/`)),
  );

  if (sitemapPaths.size !== pagePaths.size) {
    err(`Sitemap/page count mismatch: sitemap=${sitemapPaths.size}, indexable pages=${pagePaths.size}`);
  }

  for (const p of pagePaths) {
    if (!sitemapPaths.has(p)) err(`Page missing from sitemap: ${p}`);
  }
  for (const p of sitemapPaths) {
    if (!pagePaths.has(p)) err(`Sitemap URL without page: ${p}`);
    if (p === "/api" || p.startsWith("/api/")) err(`API route in sitemap: ${p}`);
  }

  for (const entry of getAllSitemapPaths()) {
    const url = `${SITE_URL}${entry}`;
    if (!url.startsWith(CANONICAL_HOST)) err(`Sitemap URL not canonical host: ${url}`);
  }
}

function readBuiltHtml(relativePath: string): string | null {
  const file = path.join(process.cwd(), ".next", "server", "app", relativePath);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

function validateSampleHtml() {
  const samples: { label: string; file: string }[] = [
    { label: "home", file: "index.html" },
    { label: "contact", file: "contact.html" },
    { label: "service", file: "services/custom-website-development.html" },
    { label: "category", file: "categories/web-development.html" },
    { label: "state-area", file: "service-areas/new-york.html" },
    { label: "city-area", file: "service-areas/new-york/manhattan.html" },
    { label: "service-state", file: "custom-website-development/new-york.html" },
    { label: "service-city", file: "custom-website-development/new-york/manhattan.html" },
  ];

  for (const { label, file } of samples) {
    const html = readBuiltHtml(file);
    if (!html) {
      warn(`Built HTML not found for sample "${label}" (${file}) — run npm run build first`);
      continue;
    }

    if (!/<title[^>]*>[^<]+<\/title>/i.test(html)) err(`Sample ${label}: missing <title> in HTML`);
    if (!/name="description"/i.test(html)) err(`Sample ${label}: missing meta description in HTML`);
    if (!/rel="canonical"/i.test(html)) err(`Sample ${label}: missing canonical link in HTML`);
    if (!/property="og:title"/i.test(html)) err(`Sample ${label}: missing og:title`);
    if (!/property="og:description"/i.test(html)) err(`Sample ${label}: missing og:description`);
    if (!/name="twitter:card"/i.test(html)) err(`Sample ${label}: missing twitter:card`);

    const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
    if (h1Count === 0) err(`Sample ${label}: missing H1`);
    if (h1Count > 1) warn(`Sample ${label}: multiple H1 (${h1Count})`);

    if (!/application\/ld\+json/i.test(html)) err(`Sample ${label}: missing JSON-LD`);
    if (/noindex/i.test(html) && label !== "404") err(`Sample ${label}: unexpected noindex in HTML`);
    if ((label === "city-area" || label === "service-city") && !/Common questions/i.test(html)) {
      err(`Sample ${label}: missing visible FAQ section`);
    }
  }
}

function main() {
  console.log("[seo:validate] Auditing metadata for all generated routes…");
  const pages = collectAllPages();
  console.log(`[seo:validate] Pages in audit: ${pages.length.toLocaleString()}`);

  validateMetadata(pages);
  validateGeoAeoFaqs(pages);
  validateLastmod(pages);
  validateSitemap(pages);
  validateSampleHtml();

  console.log("\n--- SEO audit summary ---");
  console.log(`Pages audited:     ${pages.length.toLocaleString()}`);
  console.log(`Sitemap URLs:      ${getAllSitemapPaths().length.toLocaleString()}`);
  console.log(`Canonical host:    ${CANONICAL_HOST}`);
  console.log(`Errors:            ${errors.length}`);
  console.log(`Warnings:          ${warnings.length}`);

  if (warnings.length) {
    console.log("\nWarnings:");
    for (const w of warnings.slice(0, 20)) console.log(`  ⚠ ${w}`);
    if (warnings.length > 20) console.log(`  … and ${warnings.length - 20} more`);
  }

  if (errors.length) {
    console.error("\nErrors:");
    for (const e of errors.slice(0, 30)) console.error(`  ✗ ${e}`);
    if (errors.length > 30) console.error(`  … and ${errors.length - 30} more`);
    process.exit(1);
  }

  console.log("\n[seo:validate] PASSED — all indexable routes have unique metadata and sitemap alignment.");
}

main();
