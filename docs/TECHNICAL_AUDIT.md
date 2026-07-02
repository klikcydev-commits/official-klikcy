# Technical Audit

## Scope
This audit documents the current state of the active root app only. It does not modify production behavior.

Inspected areas include:
- route tree
- metadata generation
- schema generation
- sitemap generation
- robots generation
- redirects
- contact form flow
- deployment config
- content/data catalogs
- internal SEO validation script output

## Current Strengths
- Strong code-first metadata architecture with reusable generators
- Deterministic canonical handling and trailing-slash consistency
- Large route catalog generated from structured service/state/city data
- JSON-LD consistently attached to major page families
- FAQ and AEO content patterns already built into geo and service-location routes
- Explicit anti-fake-local-claim safeguards in geo content logic
- Built-in SEO validation script with sitemap, robots, metadata, and HTML checks
- Contact form validation, honeypot, and rate limiting present
- Redirect handling exists for legacy service slugs and known city alias cleanup

## Current SEO Risks
- Large warning volume from `npm run seo:validate` due mostly to long descriptions and some title-length issues
- Programmatic route families are high-volume and template-heavy
- Core ranking quality depends on continuing to enrich route bodies, not just metadata

## Current Sitemap Risks
- Two sitemap systems exist: dynamic metadata route and static XML files
- Operational source of truth is ambiguous without live-host verification
- Search Console reporting could become inconsistent if deployment serves a different sitemap than expected

## Current Canonical Risks
- Canonical generation logic itself is strong, but duplication in sitemap infrastructure increases operational mismatch risk
- Redirect routes must remain out of the sitemap

## Current Robots Risks
- Two robots sources exist: `src/app/robots.ts` and `public/robots.txt`
- Current rules are broadly aligned, but duplicate sources increase drift risk over time

## Current Routing Risks
- Very large `service × state × city` route family can magnify low-value combinations
- Any service or state growth multiplies URL count quickly

## Current Content Duplication Risks
- Service-state and service-city pages reuse shared patterns
- FAQ/AEO variation helps, but page-body uniqueness still needs careful management

## Current Performance Risks
- Large build size and route count may increase build duration and deployment complexity
- Accessibility/performance intent is visible in content and components, but no active performance budgets were found as enforced CI rules

## Current Scalability Risks
- Content operations are developer-dependent because all catalogs live in code
- No CMS or editorial workflow exists
- No route-tiering system currently limits low-value index expansion

## Current Maintainability Risks
- Duplicate infrastructure for sitemap and robots
- Large catalogs in single TypeScript files
- Business content, SEO metadata, and route generation tightly coupled in code

## Current Accessibility Risks
- Site includes skip links and accessibility-aware copy patterns
- No dedicated accessibility test suite or CI accessibility checks were found
- Cannot confirm full WCAG compliance from repo inspection alone

## Current Analytics / Tracking Risks
- GTM is wired in
- `.env.example` includes GA and GTM variables
- no analytics validation or dashboard layer was found
- actual live tag quality cannot be confirmed from code only

## Current Deployment Risks
- Root app is configured for Vercel
- live runtime behavior of duplicated sitemap/robots sources needs verification
- SMTP email delivery depends on environment variables and external mail service availability

## Issue Table

| Issue | Severity | File/Area | Why It Matters | Recommended Fix |
|---|---|---|---|---|
| Duplicate sitemap systems | High | `src/app/sitemap.ts`, `public/sitemap.xml`, `scripts/*sitemap*` | Two sitemap sources can drift and create Search Console ambiguity | Consolidate to one production sitemap source of truth |
| Duplicate robots systems | High | `src/app/robots.ts`, `public/robots.txt` | Diverging crawler rules can create inconsistent indexing behavior | Consolidate to one production robots source of truth |
| Service-city page volume is very large | High | `src/app/[service]/[state]/[city]/page.tsx` and geo/content libs | 17,290 service-city pages create crawl-budget and quality-control pressure | Introduce route-tier prioritization and deeper editorial differentiation |
| Template-heavy geo/service pages | High | `src/lib/content.ts`, `src/lib/geo-aeo-content.ts`, `src/views/*Geo*` | Metadata uniqueness alone does not eliminate doorway/thin-page risk | Add richer route-specific content for highest-value markets first |
| SEO warnings are numerous | Medium | `npm run seo:validate` output | 1,784 warnings suggest many descriptions are too long and some titles need tuning | Review warning clusters and tighten templates |
| Lastmod concentration | Medium | `reports/seo-lastmod-report.json`, `src/lib/seo/content-dates.ts` | 20,996 URLs share `2026-06-28`, which may look overly uniform to search systems | Review date-catalog granularity and use more route-family-specific updates where justified |
| In-memory contact rate limiting | Medium | `src/lib/contact.ts` | Rate limits reset per process instance and do not scale across multiple runtimes | Move to durable/shared rate limiting if traffic grows |
| Code-only content operations | Medium | `src/lib/services.ts`, `src/lib/states.ts`, `src/content/*` | Non-developers cannot easily update content at scale | Add structured CMS/editorial workflow later |
| No middleware or request-layer governance | Low | app root | Not a current bug, but limits centralized request policies if more route types appear | Add middleware only if future auth/preview/routing complexity requires it |
| No confirmed blog/case-study content layer | Low | routing/content architecture | Limits authority-building editorial content beyond service/geo pages | Add only when editorial resources and schema support are ready |

## Severity Notes

### Critical
No critical issue was confirmed from code inspection. The built-in SEO validator currently passes with zero errors.

### High
- Duplicate sitemap source architecture
- Duplicate robots source architecture
- Massive service-city route surface area
- Ongoing risk of template-driven geo duplication

### Medium
- Metadata warning volume
- Lastmod concentration warning
- In-memory rate limiting
- Developer-only content operations

### Low
- No confirmed centralized accessibility or analytics QA layer
- No current editorial content system beyond service/geo architecture

## Audit Evidence
Confirmed commands and outputs used in this audit:
- `npm run seo:validate` passed with 0 errors and 1,784 warnings
- split sitemap counts total 21,000 URLs
- current route scale math aligns with validator output

## Recommended Next Fixes After Documentation
1. Decide whether `src/app/sitemap.ts` or static `public/sitemap.xml` is the canonical live sitemap source.
2. Decide whether `src/app/robots.ts` or `public/robots.txt` is the canonical live robots source.
3. Review meta description and title warning clusters from `npm run seo:validate`.
4. Prioritize content enrichment for highest-value service-state and service-city pages.
5. Define publication standards for future route growth.

## Needs Verification
- Live Search Console status
- Live robots/sitemap endpoint behavior
- Actual build duration and deployment timings in CI/production
- Real user performance metrics
