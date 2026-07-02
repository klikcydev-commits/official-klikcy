# Scalability Plan

## Current Structure
The current website already scales through code-defined catalogs instead of a CMS.

Current source-of-truth files:
- `src/lib/services.ts`
- `src/lib/categories.ts`
- `src/lib/states.ts`
- `src/lib/cities.ts`
- `src/lib/content.ts`
- `src/lib/geo-aeo-content.ts`
- `src/lib/seo/generators.ts`
- `src/lib/schema.ts`
- `src/lib/sitemap-urls.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

Current confirmed scale:
- 65 services
- 8 categories
- 51 state/DC pages
- 266 city pages
- 3,315 service-state pages
- 17,290 service-city pages
- 21,000 sitemap URLs

## Current Strengths For Scalability
- catalog-driven service model
- static generation via `generateStaticParams()`
- deterministic metadata generation
- deterministic sitemap generation
- shared FAQ/AEO templates
- internal-linking architecture already supports route expansion
- deterministic `lastmod` system with content dates

## Current Scalability Risks
- high route volume relative to editorial depth
- content uniqueness pressure on state/city/service-location pages
- two sitemap systems create operational complexity
- no CMS/editorial workflow for non-developers
- service catalog, geo content, metadata, and schema all live in code, increasing dev burden for content ops

## How To Add New Services
Current process:
1. Add a service object to `src/lib/services.ts`.
2. Assign it to a valid category slug.
3. Fill required SEO and content fields.
4. Confirm related services.
5. Let route generation create:
   - `/services/[slug]/`
   - `/{service}/{state}/`
   - `/{service}/{state}/{city}/`
6. Regenerate or validate sitemap/SEO outputs.

Impact of adding one service today:
- +1 service page
- +51 service-state pages
- +266 service-city pages
- total +318 new public URLs

## How To Add New Categories
Current process:
1. Add a category object in `src/lib/categories.ts`.
2. Optionally add it to navigation in `src/lib/nav-categories.ts` and `src/lib/nav-groups.ts`.
3. Assign one or more services to that category.

Impact:
- +1 category page
- service grouping/navigation changes
- potential menu and footer changes

## How To Add New States
Current process:
1. Add a state object in `src/lib/states.ts`.
2. Include slug, name, abbreviation, region, priority flag, city list, and blurb.

Impact per new state:
- +1 state page
- +N city pages based on listed cities
- +65 service-state pages
- +65 × cityCount service-city pages

This is a large multiplier, so state additions should be intentional.

## How To Add New Cities
Current process:
1. Add city names to the state's `cities` array in `src/lib/states.ts`.
2. `src/lib/cities.ts` derives normalized city slugs automatically.

Impact per new city:
- +1 city page
- +65 service-city pages

## How To Add Service-Location Pages
Current implementation generates service-location pages automatically from the service and geo catalogs. There is no separate `serviceLocations.ts` data file today.

Recommended future pattern if editorial depth grows:
- create an explicit high-priority service-location allowlist instead of auto-expanding every possible combination

## How To Add Blog Posts
Not currently implemented.

Recommended future structure:
- `src/content/blog/` or CMS-backed blog content
- route family `/blog/` and `/blog/[slug]/`
- article schema
- dedicated blog sitemap

## How To Add Case Studies
Not currently implemented.

Recommended future structure:
- `src/content/case-studies/` or CMS-backed collection
- route family `/case-studies/` and `/case-studies/[slug]/`
- project/case-study schema
- dedicated sitemap bucket

## How To Add Schema
Current schema layer is centralized in `src/lib/schema.ts`.

Recommended practice:
- add reusable schema factory functions there
- wire them into `src/lib/seo/generators.ts`
- validate against route context, not ad hoc view usage

## How To Add Internal Links
Current internal-link architecture is partly automatic via:
- navigation files
- footer structure
- related service references
- service/state/city cross-linking in views

Recommended future improvements:
- centralize related-link rules by route family
- add guardrails so every indexable page has minimum inbound and outbound internal links

## How To Update Sitemap
Current commands:
- `npm run sitemap:generate`
- `npm run sitemap:split`
- `npm run sitemap:build`

Current architectural recommendation:
- eventually consolidate on one production sitemap system

## Avoiding Duplicate Content
Required safeguards:
- unique metadata
- route-specific FAQ and AEO blocks
- state/city-specific market context
- selective route publishing if quality cannot be maintained
- no fake local office claims

## Avoiding Thin Pages
Recommended policy:
- do not create additional route families unless they add real user value
- enrich top-priority pages first
- set minimum content standards per route type
- allow lower-value combinations to remain unpublished if needed in the future

## Keeping Metadata Unique
Current system already generates unique metadata at scale.

Still recommended:
- review short/long title warnings from `npm run seo:validate`
- review long description warnings
- maintain per-service/per-state/per-city override support as important routes get more bespoke copy

## Managing Thousands Of URLs
Current strategy:
- static generation
- split sitemaps
- deterministic content-driven metadata and lastmod

Future best practice:
- define route tiers:
  - Tier 1: money pages with editorial depth
  - Tier 2: secondary geo/service pages with moderate depth
  - Tier 3: long-tail pages that may be indexable later only if demand justifies them

## Crawl Budget Strategy
Recommended:
- keep sitemap clean and canonical
- avoid introducing low-value routes
- strengthen internal linking to highest-value pages
- ensure non-indexable routes stay excluded
- monitor coverage/indexation before expanding route volume further

## Sitemap Splitting Strategy
Current split is already present.

Recommended next-stage split if volume grows further:
- static + key hubs
- service hubs
- category hubs
- state hubs
- city hubs
- service-state pages
- service-city pages split into additional numbered chunks if needed

## Data File Organization
### Current Actual Structure
- `src/lib/services.ts`
- `src/lib/categories.ts`
- `src/lib/states.ts`
- `src/lib/cities.ts`
- `src/content/home.ts`
- `src/content/about.ts`

### Recommended Future Structure
If the team wants more editorial scalability, a clearer content module structure would help:
- `src/data/services.ts`
- `src/data/categories.ts`
- `src/data/states.ts`
- `src/data/cities.ts`
- `src/data/blog.ts`
- `src/data/caseStudies.ts`
- `src/lib/seo.ts`
- `src/lib/schema.ts`

This is a recommendation only; it is not the current structure.

## Future CMS Migration Plan
Not currently present.

Recommended criteria for migration:
- non-developers need to edit service or geo content
- blog/case-study publishing is added
- approval workflow becomes necessary
- metadata and schema editing needs structured forms

Recommended migration target capabilities:
- service catalog entries
- state/city editorial overrides
- FAQ editing
- metadata preview
- publish status
- sitemap eligibility flag

## Future Database Plan
Not currently needed for the current code-first site.

Potential future need:
- if service/location performance data, editorial states, approvals, or content ownership need persistence beyond code

## Future Analytics / Dashboard Plan
Current repo confirms GTM/GA environment variables, but no internal dashboard is present.

Recommended later dashboard views:
- page-level indexation status
- sitemap inclusion status
- canonical mismatch checks
- title/description warning counts
- route-family performance
- lead conversion by landing page family

## Future Content Approval Workflow
Not currently found.

Recommended later workflow:
1. Draft
2. SEO review
3. GEO/AEO review
4. Technical validation
5. Approval
6. Publish
7. Post-publish indexation check

## Recommended Scalable Structure
### Current Actual
- `src/lib/services.ts`
- `src/lib/categories.ts`
- `src/lib/states.ts`
- `src/lib/cities.ts`
- `src/lib/content.ts`
- `src/lib/geo-aeo-content.ts`
- `src/lib/schema.ts`
- `src/lib/sitemap-urls.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

### Recommended Later
- `data/services.ts`
- `data/categories.ts`
- `data/states.ts`
- `data/cities.ts`
- `data/blog.ts`
- `data/caseStudies.ts`
- `lib/seo.ts`
- `lib/schema.ts`
- `app/sitemap.ts`
- `app/robots.ts`

## Scaling Recommendation
The current architecture can scale further, but the main limit is not rendering capacity. It is content quality governance. The safest growth path is:
- keep core service hubs authoritative
- improve highest-value geo pages first
- consolidate sitemap/robots authority
- add editorial controls before adding entirely new route families
