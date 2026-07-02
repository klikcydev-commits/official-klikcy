# Documentation Changelog

## 2026-07-02 — SEO & infrastructure hardening (full remediation)

- **Phase 1 — Edge redirects:** Removed client-side `LegacyRedirect`; legacy slug rules now compile to Vercel edge 308s via `src/lib/redirects.ts` + `src/lib/redirects.mjs` wired in `next.config.mjs`. Added `npm run verify:redirects`.
- **Phase 2 — Sitemap sharding:** Replaced monolithic/dual sitemap system with Next.js `generateSitemaps()` (one shard per service + static + areas), `/sitemap.xml` index route handler, deleted `public/sitemap*.xml` and legacy `sitemap:build` scripts. Added `npm run verify:sitemaps`.
- **Phase 3 — Content differentiation:** Added deterministic variant engine (`src/lib/content-variants.ts`, `src/lib/service-city-content.ts`), city tiers (`src/lib/city-tiers.ts`), differentiated FAQs, lateral internal links, and `isIndexable()` pruning for tier-3 × low-priority services (noindex + sitemap exclusion).
- **Phase 4 — ISR:** Programmatic service×city pages pre-render ~2,736 high-value URLs at build; long tail uses `dynamicParams` + `revalidate` 30 days. Service-area city pages partially pre-rendered.
- **Phase 5 — Contact API:** Sliding-window rate limits (`src/lib/rate-limit.ts`), honeypot + HMAC time-gate (`CONTACT_FORM_SECRET`), payload caps, SMTP timeouts/retry, 502 on transport failure. Added `npm run verify:redirects` companion env docs.
- **Phase 6 — Internal linking:** Breadcrumb JSON-LD aligned to Home → Service → State → City; lateral blocks on city and service-city pages; footer lists all 8 category hubs + `/service-areas/`.
- **Phase 7 — Hygiene:** Deleted legacy `klikcy-next/` folder; obfuscated contact email via `ObfuscatedContactEmail`; added `src/lib/site-url.ts` (`getSiteUrl()`).

## 2026-07-02
- Change: Created complete website documentation system for Klikcy.
- Files created:
  - `docs/WEBSITE_DOCUMENTATION.md`
  - `docs/ARCHITECTURE.md`
  - `docs/ROUTES_AND_STRUCTURE.md`
  - `docs/SEO_AEO_GEO_STRATEGY.md`
  - `docs/SITEMAP_AND_INDEXING.md`
  - `docs/SCALABILITY_PLAN.md`
  - `docs/TECHNICAL_AUDIT.md`
  - `docs/MAINTENANCE_GUIDE.md`
  - `docs/CONTENT_MODEL.md`
  - `docs/CHANGELOG.md`
- Files updated:
  - `README.md`
- Notes:
  - Documentation is based on the active root Next.js app.
  - `klikcy-next/` was treated as legacy/reference material, not the active app.
  - Sitemap, robots, route architecture, schema, metadata, contact flow, and deployment config were inspected directly from source.
  - Missing route families such as blog and case studies were documented as not currently found.
- Pending next steps:
  - Choose one sitemap source of truth for production.
  - Choose one robots source of truth for production.
  - Review `npm run seo:validate` warnings and decide which metadata templates to tighten first.
  - Prioritize enrichment strategy for high-value service-state and service-city pages.
