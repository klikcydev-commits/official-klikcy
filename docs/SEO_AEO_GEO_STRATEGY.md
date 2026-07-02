# SEO, AEO, And GEO Strategy

## Current SEO System

### Metadata Architecture
Confirmed metadata pipeline:
- data/content entity resolved in route file
- SEO payload generated in `src/lib/seo/generators.ts`
- payload mapped to Next metadata by `src/lib/seo/next-metadata.ts`
- route outputs JSON-LD through `src/components/JsonLd.tsx`

Confirmed metadata fields in active use:
- title
- meta description
- keywords
- canonical (`alternates.canonical`)
- Open Graph
- Twitter card
- robots

### Titles
Titles are generated from:
- hardcoded hub page metadata builders
- category metadata templates
- service metadata fields in `src/lib/services.ts`
- geo metadata templates in `src/lib/metadata/page-metadata.ts`

Observed risk:
- `npm run seo:validate` passes with 0 errors but reports many title-length warnings, including some short service titles and at least one long category title.

### Meta Descriptions
Descriptions are generated from:
- hub-page metadata builders
- category descriptions
- service metadata fields and fallback logic
- state/city/service-location template logic

Observed risk:
- the built-in SEO audit reports 1,784 warnings, dominated by long meta descriptions, especially hub/category/geo template pages.

### Canonical Tags
Canonical logic is centralized in:
- `src/lib/seo/metadata.ts`
- `src/lib/seo/generators.ts`
- `src/lib/sitemap-urls.ts`

Confirmed canonical rules:
- use `https://www.klikcy.com`
- use trailing slash except homepage root style
- align to route structure
- legacy service and city aliases redirect to canonical slugs

### Open Graph Tags
Generated through `seoToMetadata()`:
- `og:title`
- `og:description`
- `og:url`
- `og:type`
- `og:siteName`
- `og:locale`
- `og:image` when provided

Default OG image source:
- `https://www.klikcy.com/icon-512.png`

### Twitter Cards
Generated through `seoToMetadata()`:
- `summary_large_image`
- title
- description
- image

### Robots Meta
`SeoPayload` supports custom robots. Current confirmed use:
- most public pages index/follow
- `404` route uses noindex/follow

### Sitemap Strategy
Current sitemap architecture is documented more fully in `docs/SITEMAP_AND_INDEXING.md`, but SEO-wise it currently:
- includes all indexable public content families
- excludes `/api/`
- uses a bucketed split approach for large URL volume
- attempts canonical-host alignment

### Internal Linking Strategy
Confirmed internal linking is a major SEO mechanism:
- category hubs to services
- services to related services
- services to priority states and metro cities
- state hubs to cities and service-state pages
- city hubs to service-city pages and nearby city/state pages
- service-state pages to service-city pages
- service-city pages to related service-city pages
- global CTA links to contact

### Breadcrumb Strategy
Confirmed implementation:
- visible breadcrumbs via `src/components/Breadcrumbs.tsx`
- breadcrumb JSON-LD via `breadcrumbSchema()` in `src/lib/schema.ts`

### URL Naming Strategy
Current URL strategy:
- short lowercase slugs
- hyphen-separated
- trailing slash canonicalization
- service hub route: `/services/[slug]/`
- state hub route: `/service-areas/[state]/`
- city hub route: `/service-areas/[state]/[city]/`
- service-location route: `/{service}/{state}/` and `/{service}/{state}/{city}/`

### Heading Structure
Current implementation pattern:
- each page renders a single visible H1
- sub-sections commonly use H2/H3
- `npm run seo:validate` checks sample built HTML for missing or multiple H1s

### Image Alt Text Strategy
Confirmed examples:
- homepage hero image in `src/content/home.ts` includes descriptive `alt`
- logo images use `alt="Klikcy"`

Not confirmed in codebase:
- a centralized image-alt policy or lint rule

## Structured Data

### Current Confirmed Schema Types
- Organization
- WebSite
- WebPage
- AboutPage
- ContactPage
- CollectionPage
- BreadcrumbList
- Service
- FAQPage

### Current Usage By Page Type
- Home: organization, website, webpage, FAQ
- About: about page, organization, breadcrumb, webpage
- Contact: contact page, organization, breadcrumb, webpage
- All services: collection page, breadcrumb, webpage
- Category: collection page, FAQ, breadcrumb, webpage
- Service: service, FAQ, breadcrumb, webpage
- State: FAQ, breadcrumb, webpage, organization
- City: FAQ, breadcrumb, webpage, organization
- Service-state: service, FAQ, breadcrumb, webpage
- Service-city: service, FAQ, breadcrumb, webpage

### Schema Recommendations
Current schema base is good, but the repo does not currently show:
- LocalBusiness schema
- explicit Service + Offer schema
- article/blog schema
- case study schema
- review/rating schema

Recommended later additions:
- Organization enhancements: social profiles, contact points if verified
- optional Service/Offer pricing descriptors only when accurate
- article schema if blog is added
- case-study/project schema if portfolio content is added

## Duplicate Content Risks
High-risk areas:
- 3,315 service-state pages
- 17,290 service-state-city pages
- state and city pages using shared template structures

Current mitigations already in code:
- state and city templates reference actual geo data
- FAQ and AEO blocks vary by route context
- metadata titles/descriptions are programmatically varied
- validation explicitly checks for forbidden fake-local claims
- canonical tags are generated per route

Remaining risk:
- page bodies are still template-driven enough that uniqueness quality must be monitored as volume grows

## Thin Content Risks
Highest risk route families:
- `/service-areas/[state]/[city]/`
- `/{service}/{state}/`
- `/{service}/{state}/{city}/`

Why:
- very high route count
- many pages reuse structural patterns
- only a subset of routes have deeply bespoke content

## Programmatic SEO Risks
- large URL count can outpace editorial quality
- metadata uniqueness does not guarantee body-content uniqueness
- service-city pages can become doorway-like if they do not add enough utility
- internal linking can overemphasize template expansion over authority concentration

## Crawl Budget Risks
- 21,000 indexable URLs for a marketing site is significant
- 17,290 of those are service-city pages
- if many of those remain low-demand or low-utility, crawl spend may be diluted

## Indexing Risks
- duplicate sitemap systems can create ambiguity about the source of truth
- split static sitemap files and Next metadata sitemap need alignment
- long descriptions and template-heavy pages may reduce quality signals

## Doorway-Page Prevention
Confirmed current good pattern:
- geo FAQ logic explicitly avoids fake local-office language
- content mentions remote-first delivery
- pages attempt to explain actual service scope and process

Recommended ongoing safeguards:
- require city/state/service pages to include real location context
- include local industry cues only when sourced from actual state data
- keep pages navigable from hubs, not orphaned
- avoid publishing routes that add no user value beyond keyword swaps

## How To Make Service, State, And City Pages Unique
Use the current structure as a baseline, but strengthen later with:
- state-specific industry and economic context
- city-specific market traits
- service-specific implementation differences
- different examples, FAQs, proof points, and internal-link sets
- selective prioritization rather than expanding every possible route equally

## Ranking Strategy By Service Theme

### Web Development Services
Current support:
- dedicated category
- multiple individual services
- nationwide state/city/service-location pages
- schema, FAQs, and canonical metadata

To rank well:
- keep service pages as authority hubs
- use state/city routes to support discovery, not replace main service authority
- reinforce internal links from category and geo hubs into strongest core service pages

### App Development Services
Current support:
- app/software category
- mobile app and SaaS services
- geo/service-location expansion

To rank well:
- keep app pages technically credible
- include platform and architecture terminology where truly offered
- use geo pages for commercial modifiers, not generic filler

### Software Development
Current support:
- app/software category and related services

To rank well:
- ensure service copy clearly distinguishes software/platform/SaaS/API work from brochure-site work

### AI Automation / AI Chatbots / Business Automation
Current support:
- AI automation category
- AI-related services in service catalog
- AEO/GEO framing in content and FAQs

To rank well:
- keep pages precise about workflows, integrations, guardrails, and business outcomes
- avoid buzzword-heavy content without implementation specifics

### E-Commerce Development
Current support:
- e-commerce category
- Shopify and WooCommerce-related services

To rank well:
- preserve clear platform segmentation
- connect store-development pages with SEO, CRO, checkout, and integration support

### Shopify / WooCommerce / WordPress
Current support:
- dedicated service pages confirmed in catalog

To rank well:
- make platform pages distinct by buyer intent and technical stack

### SEO / AEO / GEO Services
Current support:
- SEO & AEO category
- technical and local SEO services
- AEO-aware FAQ patterns
- AI crawler allowances

To rank well:
- keep the site itself as evidence of technical SEO hygiene
- continue validating metadata, sitemaps, and structured data with the existing `seo:validate` workflow

### Digital Agency Services
Current support:
- homepage, about page, category hubs, and service-area pages all reinforce the digital-agency entity

To rank well:
- keep entity consistency: `Klikcy`, remote-first U.S. digital agency, nationwide coverage, no fake local offices

### State And City Service Pages
Current support:
- broad geo coverage
- FAQ and AEO blocks
- breadcrumb and schema support

To rank well:
- prioritize quality over total volume
- strengthen highest-value states/cities first
- ensure internal links and metadata reinforce hierarchy back to service hubs and geo hubs

## AEO Strategy

### What AEO Means Here
Answer Engine Optimization for Klikcy means structuring pages so answer engines such as Google AI Overviews, ChatGPT search/browsing, Perplexity, Claude, and similar systems can quickly understand:
- what Klikcy is
- what service is being discussed
- who it is for
- what problem it solves
- what Klikcy provides
- how to contact Klikcy

### Current AEO Strengths In Code
- FAQ blocks on service, category, state, city, and service-location pages
- dedicated AEO accordion sections in `src/lib/geo-aeo-content.ts`
- JSON-LD FAQ schema
- clear service/entity naming
- repeated contact/quote call paths
- validation of AEO section coverage in `scripts/validate-seo.ts`

### Recommended AEO Content Pattern For Major Service Pages
Every major service page should answer:
1. What is the service?
2. Who is it for?
3. What problems does it solve?
4. What does Klikcy provide?
5. Why choose Klikcy?
6. What is the process?
7. What technologies are used?
8. What locations are served?
9. How can users contact Klikcy?

Current service-page structure already covers much of this through:
- intro
- whoFor
- included
- technical
- FAQs
- CTAs

### Recommended AEO Blocks
- clear question-answer sections
- concise service definitions
- “Who this is for”
- “What’s included”
- “Technical foundation”
- “Problems we solve”
- “How it works”
- “Why choose Klikcy”
- “How to get started”

### AI-Readable Content Patterns
- short factual paragraphs before long copy
- explicit entities and service names
- no ambiguous pronouns in key definitions
- FAQ blocks that mirror visible content
- strong heading hierarchy

## GEO Strategy

### What GEO Means Here
Generative Engine Optimization here means making Klikcy understandable and reusable by generative AI systems as a stable entity with consistent services, coverage, and trust signals.

### Current GEO Strengths
- consistent brand name `Klikcy`
- remote-first nationwide positioning
- explicit U.S. service coverage
- structured metadata and FAQ schema
- AI crawler allowances in robots
- AI-discovery file at `public/llms.txt`
- anti-fake-local-claim validation in `src/lib/geo-aeo-content.ts`

### Entity Consistency
Confirmed current entity pattern:
- Brand: Klikcy
- Site: `https://www.klikcy.com`
- Description: remote-first U.S. digital agency
- Offer set: web, apps, software, AI automation, e-commerce, branding, search growth, technical hosting

### Expertise, Authority, And Trust Signals
Current signals:
- broad service taxonomy
- detailed service definitions
- FAQ and schema coverage
- contact endpoint and conversion path
- technical SEO validation script
- consistent nationwide/non-fake-local positioning

### Robots.txt AI Crawler Strategy
Current code intentionally allows AI crawlers and blocks `/api/`.

AI bots that should stay allowed:
- `OAI-SearchBot`
- `GPTBot`
- `ChatGPT-User`
- `PerplexityBot`
- `ClaudeBot`
- `CCBot`

Current static `public/robots.txt` also includes:
- `Claude-SearchBot`
- `Claude-User`

Current desired documentation stance:
- public content should remain crawlable by AI systems
- `/api/` should remain blocked
- do not remove AI crawler access

## Page Readiness Checklist Before Sitemap Inclusion
- unique title
- unique meta description
- unique H1
- real helpful content
- canonical URL
- internal links
- no duplicate URL
- no noindex
- `200` status
- not redirected
- included in sitemap
- schema valid where appropriate

## Needs Verification
- live Search Console coverage/indexation patterns are not visible in codebase
- real SERP performance by query cluster is not visible in codebase
- actual AI citation frequency is not visible in codebase
