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
import type { GeoFaq } from "../src/lib/geo-aeo-content";
import {
  buildCategoryFaqs,
  buildCityAreaAeoSections,
  buildCityAreaFaqs,
  buildStateAreaAeoSections,
  buildStateAreaFaqs,
  buildServiceCityAeoSections,
  buildServiceStateAeoSections,
  aeoSectionsToFaqs,
  hasForbiddenLocalClaim,
  validateAeoSectionCoverage,
  visibleServiceCityFaqs,
  visibleServiceStateFaqs,
  FAQ_SECTION_HEADING,
} from "../src/lib/geo-aeo-content";
import { accordionItemId } from "../src/lib/accordion-id";
import robots from "../src/app/robots";
import { getAllKnownContentDates } from "../src/lib/seo/content-dates";
import {
  assertCatalogIntegrity,
  buildLastmodReport,
  dateModifiedForCanonical,
  formatIsoDate,
  lastModifiedForPath,
  lastmodIsDeterministic,
} from "../src/lib/seo/lastmod";
import { buildSitemapEntries } from "../src/lib/sitemap-urls";
import { getAllSitemapPaths, SITE_URL } from "../src/lib/sitemap-urls";
import { getService, services } from "../src/lib/services";
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
  for (const service of services) {
    const enriched = getService(service.slug)!;
    push(`/services/${service.slug}`, getServiceSeo(enriched));
  }
  for (const state of states) {
    push(`/service-areas/${state.slug}`, getStateAreaSeo(state));
    for (const city of getCitiesForState(state)) {
      push(`/service-areas/${state.slug}/${city.slug}`, getCityAreaSeo(city));
    }
    for (const service of services) {
      const enriched = getService(service.slug)!;
      push(`/${service.slug}/${state.slug}`, getServiceStateSeo(enriched, state));
      for (const city of getCitiesForState(state)) {
        push(`/${service.slug}/${state.slug}/${city.slug}`, getServiceCitySeo(enriched, city));
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

const MIN_GEO_FAQS = 5;

function extractFaqSchema(jsonLd?: object[]): GeoFaq[] {
  if (!jsonLd) return [];
  for (const block of jsonLd) {
    const typed = block as {
      "@type"?: string;
      mainEntity?: { name?: string; acceptedAnswer?: { text?: string } }[];
    };
    if (typed["@type"] === "FAQPage" && Array.isArray(typed.mainEntity)) {
      return typed.mainEntity.map((item) => ({
        q: item.name ?? "",
        a: item.acceptedAnswer?.text ?? "",
      }));
    }
  }
  return [];
}

function validatePageFaqs(pathname: string, visibleFaqs: GeoFaq[], seo: SeoPayload, label: string) {
  if (visibleFaqs.length < MIN_GEO_FAQS) {
    err(`${label} has fewer than ${MIN_GEO_FAQS} FAQs: ${pathname}`);
  }

  const schemaFaqs = extractFaqSchema(seo.jsonLd);
  if (schemaFaqs.length === 0) {
    err(`${label} missing FAQPage JSON-LD: ${pathname}`);
    return;
  }

  if (schemaFaqs.length !== visibleFaqs.length) {
    err(`${label} FAQ schema (${schemaFaqs.length}) does not match visible FAQs (${visibleFaqs.length}): ${pathname}`);
    return;
  }

  for (let i = 0; i < visibleFaqs.length; i += 1) {
    const visible = visibleFaqs[i];
    const schema = schemaFaqs[i];
    if (visible.q !== schema.q) {
      err(`${label} FAQ question mismatch at index ${i} on ${pathname}`);
    }
    if (visible.a !== schema.a) {
      err(`${label} FAQ answer mismatch at index ${i} on ${pathname}`);
    }
    if (hasForbiddenLocalClaim(visible.a) || hasForbiddenLocalClaim(visible.q)) {
      err(`Forbidden local claim in ${label} FAQ: ${pathname}`);
    }
  }
}

function validateGeoAeoFaqs(pages: PageAudit[]) {
  let stateAreaCount = 0;
  let cityAreaCount = 0;
  let serviceStateCount = 0;
  let serviceCityCount = 0;

  for (const { path: pathname, seo } of pages) {
    const isStateArea = /^\/service-areas\/[^/]+$/.test(pathname);
    const isCityArea = /^\/service-areas\/[^/]+\/[^/]+$/.test(pathname);
    const isServiceState =
      /^\/[^/]+\/[^/]+$/.test(pathname) &&
      !pathname.startsWith("/service-areas/") &&
      !pathname.startsWith("/categories/") &&
      !pathname.startsWith("/services/");
    const isServiceCity =
      /^\/[^/]+\/[^/]+\/[^/]+$/.test(pathname) && !pathname.startsWith("/service-areas/");
    const isCategory = pathname.startsWith("/categories/");
    const isServiceHub = pathname.startsWith("/services/");

    if (isStateArea) {
      stateAreaCount += 1;
      const stateSlug = pathname.split("/")[2];
      const state = states.find((s) => s.slug === stateSlug);
      if (!state) {
        err(`State area page missing state data: ${pathname}`);
        continue;
      }
      validatePageFaqs(pathname, buildStateAreaFaqs(state), seo, "State area page");
      for (const issue of validateAeoSectionCoverage(buildStateAreaAeoSections(state))) {
        err(`State area AEO coverage (${issue}): ${pathname}`);
      }
    }

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
      validatePageFaqs(pathname, buildCityAreaFaqs(city), seo, "City area page");
      for (const issue of validateAeoSectionCoverage(buildCityAreaAeoSections(city))) {
        err(`City area AEO coverage (${issue}): ${pathname}`);
      }
    }

    if (isServiceState) {
      serviceStateCount += 1;
      const [, serviceSlug, stateSlug] = pathname.split("/");
      const service = getService(serviceSlug);
      const state = states.find((s) => s.slug === stateSlug);
      if (!service || !state) {
        err(`Service-state page missing data: ${pathname}`);
        continue;
      }
      validatePageFaqs(pathname, visibleServiceStateFaqs(service, state), seo, "Service-state page");
      for (const issue of validateAeoSectionCoverage(buildServiceStateAeoSections(service, state))) {
        err(`Service-state AEO coverage (${issue}): ${pathname}`);
      }
    }

    if (isServiceCity) {
      serviceCityCount += 1;
      const [, serviceSlug, stateSlug, citySlug] = pathname.split("/");
      const service = getService(serviceSlug);
      const state = states.find((s) => s.slug === stateSlug);
      const city = state ? getCitiesForState(state).find((c) => c.slug === citySlug) : undefined;
      if (!service || !city) {
        err(`Service-city page missing data: ${pathname}`);
        continue;
      }
      validatePageFaqs(pathname, visibleServiceCityFaqs(service, city), seo, "Service-city page");
      for (const issue of validateAeoSectionCoverage(buildServiceCityAeoSections(service, city))) {
        err(`Service-city AEO coverage (${issue}): ${pathname}`);
      }
    }

    if (isCategory) {
      const categorySlug = pathname.split("/")[2];
      const category = categories.find((c) => c.slug === categorySlug);
      if (!category) {
        err(`Category page missing data: ${pathname}`);
        continue;
      }
      validatePageFaqs(pathname, buildCategoryFaqs(category), seo, "Category page");
    }

    if (isServiceHub) {
      const serviceSlug = pathname.split("/")[2];
      const service = getService(serviceSlug);
      if (!service) {
        err(`Service hub page missing data: ${pathname}`);
        continue;
      }
      validatePageFaqs(pathname, service.faqs, seo, "Service hub page");
    }

    if (isStateArea || isCityArea || isServiceState || isServiceCity) {
      if (hasForbiddenLocalClaim(seo.description)) err(`Forbidden local claim in meta description: ${pathname}`);
    }
  }

  console.log(`[seo:validate] State area pages: ${stateAreaCount.toLocaleString()}`);
  console.log(`[seo:validate] City area pages: ${cityAreaCount.toLocaleString()}`);
  console.log(`[seo:validate] Service-state pages: ${serviceStateCount.toLocaleString()}`);
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

  const auditBuildDate = formatIsoDate(new Date());
  const knownDates = getAllKnownContentDates();

  if (isoSet.size === 1) {
    const only = [...isoSet][0];
    if (only === auditBuildDate && !knownDates.has(only)) {
      err(`All sitemap URLs use build date (${only}) as lastModified — not a catalog date`);
    }
  }

  if (!lastmodIsDeterministic(indexablePaths)) {
    err("lastModified values are not deterministic between sequential runs");
  }

  for (const iso of isoSet) {
    if (!knownDates.has(iso)) {
      err(`Sitemap lastModified ${iso} is not from a known catalog or override date`);
    }
    if (iso > auditBuildDate) {
      err(`Sitemap lastModified ${iso} is in the future`);
    }
  }

  const allToday = isoSet.size === 1 && isoSet.has(auditBuildDate);
  if (allToday && !knownDates.has(auditBuildDate)) {
    err(`All sitemap URLs use today's date (${auditBuildDate}) — likely build-time leakage`);
  }

  const report = buildLastmodReport(indexablePaths);
  const reportDir = path.join(process.cwd(), "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "seo-lastmod-report.json"), JSON.stringify(report, null, 2));

  console.log(`[seo:validate] Unique lastModified dates: ${report.uniqueLastModifiedDates}`);
  console.log(`[seo:validate] Page-specific dates: ${report.pageSpecificCount.toLocaleString()}`);
  console.log(`[seo:validate] Fallback catalog dates: ${report.fallbackCount.toLocaleString()}`);
  console.log(`[seo:validate] Known catalog dates: ${report.knownCatalogDates.join(", ")}`);
  console.log(`[seo:validate] Lastmod report → reports/seo-lastmod-report.json`);

  for (const f of report.futureDates) err(`Future lastModified: ${f}`);
  for (const inv of report.invalidDates) err(`Invalid lastModified: ${inv}`);
  for (const iso of report.suspiciousDates) err(`Suspicious lastModified not in catalog: ${iso}`);
  for (const leak of report.buildDateLeakage.slice(0, 5)) {
    err(`Build-date leakage in lastmod: ${leak}`);
  }
  if (report.buildDateLeakage.length > 5) {
    err(`${report.buildDateLeakage.length} URLs use build date without catalog entry`);
  }
  for (const missing of report.missingLastmod) err(`Missing lastModified: ${missing}`);

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
    if (entry.includes("#")) err(`Sitemap URL must not contain hash anchor: ${entry}`);
    if (/\/faq\//i.test(entry)) err(`Sitemap URL looks like fake FAQ page: ${entry}`);
  }
}

const REQUIRED_ROBOTS_AGENTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "CCBot",
];

function validateRobots() {
  const config = robots();
  const agents = new Set(config.rules?.map((r) => r.userAgent).filter(Boolean) as string[]);

  for (const bot of REQUIRED_ROBOTS_AGENTS) {
    if (!agents.has(bot) && !agents.has("*")) {
      err(`robots.ts missing rules for ${bot}`);
    }
  }

  for (const rule of config.rules ?? []) {
    const disallows = Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : [];
    if (disallows.some((d) => d === "/" || d === "/*")) {
      err(`robots.ts blocks entire site for ${rule.userAgent}`);
    }
    if (disallows.some((d) => d.includes("_next/static") || d.includes(".css") || d.includes(".js"))) {
      err(`robots.ts blocks static assets for ${rule.userAgent}`);
    }
  }

  if (!config.sitemap?.startsWith(CANONICAL_HOST)) {
    err(`robots.ts sitemap must use ${CANONICAL_HOST}`);
  }

  console.log(`[seo:validate] robots.ts agents configured: ${agents.size}`);
}

function htmlIncludes(html: string, text: string): boolean {
  const variants = [
    text,
    text.replace(/&/g, "&amp;"),
    text.replace(/'/g, "&#39;"),
    text.replace(/'/g, "&apos;"),
  ];
  return variants.some((v) => v.length > 0 && html.includes(v));
}

function assertHtmlContains(label: string, html: string, text: string) {
  if (!htmlIncludes(html, text)) {
    err(`Sample ${label}: missing rendered text "${text.slice(0, 60)}${text.length > 60 ? "…" : ""}"`);
  }
}

function readBuiltHtml(relativePath: string): string | null {
  const file = path.join(process.cwd(), ".next", "server", "app", relativePath);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

function validateSampleHtml() {
  const ny = states.find((s) => s.slug === "new-york")!;
  const manhattan = getCitiesForState(ny).find((c) => c.slug === "manhattan")!;
  const sampleService = getService("custom-website-development")!;

  const samples: {
    label: string;
    file: string;
    faqs?: GeoFaq[];
    aeo?: GeoFaq[];
    requireAccordion?: boolean;
  }[] = [
    { label: "home", file: "index.html" },
    { label: "contact", file: "contact.html" },
    { label: "service", file: "services/custom-website-development.html", faqs: sampleService.faqs, requireAccordion: true },
    { label: "category", file: "categories/web-development.html", faqs: buildCategoryFaqs(categories[0]), requireAccordion: true },
    {
      label: "state-area",
      file: "service-areas/new-york.html",
      faqs: buildStateAreaFaqs(ny),
      aeo: aeoSectionsToFaqs(buildStateAreaAeoSections(ny)),
      requireAccordion: true,
    },
    {
      label: "city-area",
      file: "service-areas/new-york/manhattan.html",
      faqs: buildCityAreaFaqs(manhattan),
      aeo: aeoSectionsToFaqs(buildCityAreaAeoSections(manhattan)),
      requireAccordion: true,
    },
    {
      label: "service-state",
      file: "custom-website-development/new-york.html",
      faqs: visibleServiceStateFaqs(sampleService, ny),
      aeo: aeoSectionsToFaqs(buildServiceStateAeoSections(sampleService, ny)),
      requireAccordion: true,
    },
    {
      label: "service-city",
      file: "custom-website-development/new-york/manhattan.html",
      faqs: visibleServiceCityFaqs(sampleService, manhattan),
      aeo: aeoSectionsToFaqs(buildServiceCityAeoSections(sampleService, manhattan)),
      requireAccordion: true,
    },
  ];

  for (const { label, file, faqs, aeo, requireAccordion } of samples) {
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

    if (requireAccordion && faqs) {
      if (!html.includes(FAQ_SECTION_HEADING)) {
        err(`Sample ${label}: missing "${FAQ_SECTION_HEADING}" section heading`);
      }
      if (!/<details[\s>]/i.test(html)) {
        err(`Sample ${label}: missing crawlable <details> accordion markup`);
      }

      for (const f of faqs) {
        assertHtmlContains(label, html, f.q);
        assertHtmlContains(label, html, f.a.slice(0, Math.min(48, f.a.length)));
        const faqId = accordionItemId("faq", f.q);
        if (!html.includes(`id="${faqId}"`)) {
          err(`Sample ${label}: missing stable FAQ id "${faqId}"`);
        }
        if (f.a.match(/klikcy\.com\/contact/i) && !/href="\/contact\/?"/i.test(html)) {
          err(`Sample ${label}: FAQ with contact URL missing internal /contact/ link`);
        }
      }

      if (aeo) {
        for (const item of aeo) {
          assertHtmlContains(label, html, item.q);
          assertHtmlContains(label, html, item.a.slice(0, Math.min(48, item.a.length)));
          const aeoId = accordionItemId("aeo", item.q);
          if (!html.includes(`id="${aeoId}"`)) {
            err(`Sample ${label}: missing stable AEO id "${aeoId}"`);
          }
        }
      }

      if (!/"@type":"FAQPage"/i.test(html) && !/"@type": "FAQPage"/i.test(html)) {
        err(`Sample ${label}: FAQPage JSON-LD not found in rendered HTML`);
      }
    }
  }

  const llmsPath = path.join(process.cwd(), "public", "llms.txt");
  if (!fs.existsSync(llmsPath)) {
    err("Missing public/llms.txt AI discovery file");
  } else {
    const llms = fs.readFileSync(llmsPath, "utf8");
    if (!llms.includes("https://www.klikcy.com/sitemap.xml")) err("llms.txt missing sitemap URL");
    if (!llms.includes("https://www.klikcy.com/contact/")) err("llms.txt missing contact URL");
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
  validateRobots();
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
