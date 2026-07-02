# Routes And Structure

## Route Inventory Summary
Current confirmed public route families in the active app:
- `/`
- `/about/`
- `/contact/`
- `/all-services/`
- `/services/` redirect
- `/services/[slug]/`
- `/categories/[slug]/`
- `/service-areas/`
- `/service-areas/[state]/`
- `/service-areas/[state]/[city]/`
- `/{service}/{state}/`
- `/{service}/{state}/{city}/`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/api/contact`
- `/api/health`

Current scale:
- 21,001 audited routes including the `404` page
- 21,000 sitemap URLs
- 65 service pages
- 8 category pages
- 51 state pages
- 266 city pages
- 3,315 service-state pages
- 17,290 service-state-city pages

## Current Route Inventory Table

| Route | File | Dynamic? | Indexable? | In Sitemap? | Canonical? | Notes |
|---|---|---:|---:|---:|---:|---|
| `/` | `src/app/page.tsx` | No | Yes | Yes | Yes | Homepage |
| `/about/` | `src/app/about/page.tsx` | No | Yes | Yes | Yes | About page |
| `/contact/` | `src/app/contact/page.tsx` | No | Yes | Yes | Yes | Lead-gen page |
| `/all-services/` | `src/app/all-services/page.tsx` | No | Yes | Yes | Yes | Full service catalog |
| `/services/` | `src/app/services/page.tsx` | No | No | No | Redirects | Permanent redirect to `/all-services/` |
| `/services/[slug]/` | `src/app/services/[slug]/page.tsx` | Yes | Yes | Yes | Yes | 65 pages; legacy slug redirect support |
| `/categories/[slug]/` | `src/app/categories/[slug]/page.tsx` | Yes | Yes | Yes | Yes | 8 pages |
| `/service-areas/` | `src/app/service-areas/page.tsx` | No | Yes | Yes | Yes | Nationwide area hub |
| `/service-areas/[state]/` | `src/app/service-areas/[state]/page.tsx` | Yes | Yes | Yes | Yes | 51 state/DC hubs |
| `/service-areas/[state]/[city]/` | `src/app/service-areas/[state]/[city]/page.tsx` | Yes | Yes | Yes | Yes | 266 city hubs; city alias redirect support |
| `/{service}/{state}/` | `src/app/[service]/[state]/page.tsx` | Yes | Yes | Yes | Yes | 3,315 service-state pages |
| `/{service}/{state}/{city}/` | `src/app/[service]/[state]/[city]/page.tsx` | Yes | Yes | Yes | Yes | 17,290 service-city pages |
| `/robots.txt` | `src/app/robots.ts` and `public/robots.txt` | No | N/A | No | N/A | Crawling control endpoint |
| `/sitemap.xml` | `src/app/sitemap.ts` and `public/sitemap.xml` | No | N/A | N/A | N/A | Current duplication; see sitemap docs |
| `/manifest.webmanifest` | `src/app/manifest.ts` | No | N/A | No | N/A | Web manifest |
| `/api/contact` | `src/app/api/contact/route.ts` | No | No | No | No | POST endpoint only |
| `/api/health` | `src/app/api/health/route.ts` | No | No | No | No | Health JSON endpoint |
| `/404` | `src/app/not-found.tsx` | No | No | No | Yes | Explicit noindex metadata |

## Route Types

### `/`
- Purpose: Primary brand and services overview
- URL pattern: `/`
- Source file: `src/app/page.tsx`
- Data source: `src/content/home.ts`
- Metadata source: `getHomeSeo()` in `src/lib/seo/generators.ts`
- Canonical behavior: canonical to `https://www.klikcy.com/`
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: header, footer, category links, CTA links, service-area discovery
- Content requirements: strong positioning, service overview, FAQ, CTA, trust messaging
- SEO risk level: Medium
- Scalability notes: stable hub route; should remain concise and authoritative

### `/about/`
- Purpose: company positioning and trust-building
- URL pattern: `/about/`
- Source file: `src/app/about/page.tsx`
- Data source: `src/content/about.ts`
- Metadata source: `getAboutSeo()`
- Canonical behavior: canonical trailing-slash URL
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: home, contact, category/service references
- Content requirements: company story, capabilities, trust signals, FAQs
- SEO risk level: Low
- Scalability notes: mostly editorial

### `/contact/`
- Purpose: lead capture
- URL pattern: `/contact/`
- Source file: `src/app/contact/page.tsx`
- Data source: view content + `src/components/ContactForm.tsx`
- Metadata source: `getContactSeo()`
- Canonical behavior: canonical trailing-slash URL
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: repeated CTA destination from all major pages
- Content requirements: clear form, trust, response expectations, service selection
- SEO risk level: Low
- Scalability notes: should stay simple and conversion-oriented

### `/all-services/`
- Purpose: full service catalog hub
- URL pattern: `/all-services/`
- Source file: `src/app/all-services/page.tsx`
- Data source: `src/lib/categories.ts`, `src/lib/services.ts`
- Metadata source: `getAllServicesSeo()`
- Canonical behavior: canonical trailing-slash URL
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: category and service links
- Content requirements: category grouping, service discoverability, CTA
- SEO risk level: Medium
- Scalability notes: important aggregation hub as services grow

### `/services/`
- Purpose: legacy convenience entry point
- URL pattern: `/services/`
- Source file: `src/app/services/page.tsx`
- Data source: none
- Metadata source: none
- Canonical behavior: redirects to `/all-services/`
- Sitemap inclusion: No
- Should be indexed: No
- Internal linking: should not be linked as canonical destination
- Content requirements: none
- SEO risk level: Low
- Scalability notes: keep as redirect-only for continuity

### `/services/[slug]/`
- Purpose: individual service details
- URL pattern: `/services/[slug]/`
- Source file: `src/app/services/[slug]/page.tsx`
- Data source: `src/lib/services.ts`
- Metadata source: `getServiceSeo()`
- Canonical behavior: canonical service slug; legacy slug requests redirect
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: category links, related services, state hubs, city hubs, contact CTAs
- Content requirements: intro, who for, included, technical foundation, FAQs, related links
- SEO risk level: Medium
- Scalability notes: current count 65; maintain uniqueness and related-link quality

### `/categories/[slug]/`
- Purpose: category hub pages
- URL pattern: `/categories/[slug]/`
- Source file: `src/app/categories/[slug]/page.tsx`
- Data source: `src/lib/categories.ts`, service lookups
- Metadata source: `getCategorySeo()`
- Canonical behavior: canonical category slug
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: category-to-service links
- Content requirements: category description, service grouping, FAQs
- SEO risk level: Medium
- Scalability notes: should remain authoritative overview hubs

### `/service-areas/`
- Purpose: nationwide geo hub
- URL pattern: `/service-areas/`
- Source file: `src/app/service-areas/page.tsx`
- Data source: view logic + state data references
- Metadata source: `getServiceAreasSeo()`
- Canonical behavior: canonical trailing-slash URL
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: state links and priority-market pathways
- Content requirements: nationwide positioning without fake-local claims
- SEO risk level: Medium
- Scalability notes: should stay a clean top-level geographic hub

### `/service-areas/[state]/`
- Purpose: state-level geo hub
- URL pattern: `/service-areas/[state]/`
- Source file: `src/app/service-areas/[state]/page.tsx`
- Data source: `src/lib/states.ts`, `src/lib/content.ts`, `src/lib/geo-aeo-content.ts`
- Metadata source: `getStateAreaSeo()`
- Canonical behavior: canonical trailing-slash state URL
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: category links, featured service-state links, city links
- Content requirements: state-specific positioning, FAQs, AEO blocks, city links, service links
- SEO risk level: High
- Scalability notes: programmatic geo route; quality control is essential

### `/service-areas/[state]/[city]/`
- Purpose: city-level geo hub
- URL pattern: `/service-areas/[state]/[city]/`
- Source file: `src/app/service-areas/[state]/[city]/page.tsx`
- Data source: `src/lib/cities.ts`, `src/lib/geo-aeo-content.ts`
- Metadata source: `getCityAreaSeo()`
- Canonical behavior: canonical trailing-slash city URL; some legacy city slugs redirect
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: featured service-city links, state hub links, nearby city links
- Content requirements: city intro, FAQs, AEO blocks, service links, no fake-office claims
- SEO risk level: High
- Scalability notes: thin-content and duplicate-content risk if not enriched over time

### `/{service}/{state}/`
- Purpose: service + state landing pages
- URL pattern: `/{service}/{state}/`
- Source file: `src/app/[service]/[state]/page.tsx`
- Data source: `src/lib/services.ts`, `src/lib/states.ts`, `src/lib/content.ts`, `src/lib/geo-aeo-content.ts`
- Metadata source: `getServiceStateSeo()`
- Canonical behavior: canonical trailing-slash URL
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: service hub, contact page, state hub, all city pages for that state
- Content requirements: geo-adapted copy, AEO blocks, FAQs, city list, CTA
- SEO risk level: High
- Scalability notes: 3,315 URLs; uniqueness safeguards matter

### `/{service}/{state}/{city}/`
- Purpose: service + city landing pages
- URL pattern: `/{service}/{state}/{city}/`
- Source file: `src/app/[service]/[state]/[city]/page.tsx`
- Data source: `src/lib/services.ts`, `src/lib/cities.ts`, `src/lib/geo-aeo-content.ts`
- Metadata source: `getServiceCitySeo()`
- Canonical behavior: canonical trailing-slash URL
- Sitemap inclusion: Yes
- Should be indexed: Yes
- Internal linking: service page, service-state page, nearby city pages, related service-city pages, contact CTA
- Content requirements: unique geo-service messaging, FAQs, AEO blocks, related links, no fake-office claims
- SEO risk level: High
- Scalability notes: 17,290 URLs; highest crawl-budget and duplicate-content sensitivity

### `/robots.txt`
- Purpose: crawler rules
- URL pattern: `/robots.txt`
- Source file: `src/app/robots.ts` and `public/robots.txt`
- Data source: rules declared in code/static file
- Metadata source: N/A
- Canonical behavior: N/A
- Sitemap inclusion: No
- Should be indexed: N/A
- Internal linking: referenced by bots, not users
- Content requirements: allow public content, block `/api/`, advertise sitemap
- SEO risk level: High because duplication exists
- Scalability notes: keep crawler allowances intentional and synchronized

### `/sitemap.xml`
- Purpose: sitemap discovery
- URL pattern: `/sitemap.xml`
- Source file: `src/app/sitemap.ts` and `public/sitemap.xml`
- Data source: `src/lib/sitemap-urls.ts` and generated static XML files
- Metadata source: N/A
- Canonical behavior: N/A
- Sitemap inclusion: N/A
- Should be indexed: N/A
- Internal linking: referenced from robots and external tools
- Content requirements: valid XML, canonical URLs, 200 responses only
- SEO risk level: High because two generation systems exist
- Scalability notes: already split for high URL volume

### `/api/contact`
- Purpose: contact form submission endpoint
- URL pattern: `/api/contact`
- Source file: `src/app/api/contact/route.ts`
- Data source: request JSON and environment variables
- Metadata source: none
- Canonical behavior: not applicable
- Sitemap inclusion: No
- Should be indexed: No
- Internal linking: frontend form post target only
- Content requirements: validation, rate limiting, email delivery
- SEO risk level: Low if blocked from indexing
- Scalability notes: current rate limiting is in-memory only

### `/api/health`
- Purpose: service health endpoint
- URL pattern: `/api/health`
- Source file: `src/app/api/health/route.ts`
- Data source: `src/lib/contact.ts`
- Metadata source: none
- Canonical behavior: not applicable
- Sitemap inclusion: No
- Should be indexed: No
- Internal linking: deployment/ops checks only
- Content requirements: JSON status
- SEO risk level: Low if blocked from indexing
- Scalability notes: useful for monitoring only

## Route Types Not Currently Found
The following route families requested in the brief were not found in the active app:
- `/blog`
- `/blog/[slug]`
- `/case-studies`
- `/case-studies/[slug]`
- `/locations/[slug]`
- `/city-pages/[state]/[city]`
- `/service-location/[service]/[state]`

Interpretation:
- comparable behavior exists for geo pages under `/service-areas/[state]/[city]/`
- comparable behavior exists for service-location pages under `/{service}/{state}/` and `/{service}/{state}/{city}/`
- no separate blog or case study system is currently implemented

## Internal Linking Strategy
Confirmed internal-link architecture:
- Header links to top-level pages and category/service menus
- Footer links to company pages, categories, services, and priority states
- Category pages link to service pages
- Service pages link to related services plus state hubs and city hubs
- State pages link to city pages and selected service-state pages
- City pages link to selected service-city pages and state pages
- Service-state pages link to service-city pages
- Service-city pages link to related services in same city and nearby city pages
- Global CTA links point to `/contact/`

## Structure Notes
- All user-facing public URLs follow trailing-slash canonicalization.
- `dynamicParams = false` is used to lock public dynamic routes to known catalog entities.
- There is no confirmed blog/CMS-driven editorial route layer in the active app.
- Service and geo growth currently depend on TypeScript data files rather than database rows or CMS entries.
