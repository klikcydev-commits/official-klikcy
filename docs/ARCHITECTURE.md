# Architecture

## High-Level Architecture
Klikcy is a Next.js App Router application that combines static route generation, metadata generation, structured data output, route handlers for contact/health APIs, and large programmatic SEO catalogs derived from TypeScript data files.

## Text Diagram
```text
User
  ↓
Browser / Search Engine / AI Crawler
  ↓
Next.js 14 App Router
  ↓
Root Layout (`src/app/layout.tsx`)
  ↓
Route Page Files (`src/app/**/page.tsx`)
  ↓
View Components (`src/views/*`)
  ↓
Shared UI + Layout Components (`src/components/*`)
  ↓
Data + SEO + Schema Libraries (`src/lib/*`, `src/content/*`)
  ↓
Metadata / JSON-LD / Sitemap / Robots
  ↓
Vercel deployment (`vercel.json`)

Form submission path:
Browser
  ↓
`/contact/`
  ↓
`src/components/ContactForm.tsx`
  ↓
`/api/contact`
  ↓
`src/app/api/contact/route.ts`
  ↓
`src/lib/contact.ts`
  ↓
SMTP / Nodemailer
```

## Top-Level Structure
Current active app structure at repo root:

```text
src/
  app/
    api/
    about/
    all-services/
    categories/[slug]/
    contact/
    service-areas/
    services/
    [service]/[state]/
    [service]/[state]/[city]/
    layout.tsx
    sitemap.ts
    robots.ts
    manifest.ts
    not-found.tsx
  components/
  content/
  lib/
  views/
public/
scripts/
reports/
docs/
next.config.mjs
tailwind.config.ts
tsconfig.json
vercel.json
```

## App Directory Structure
Confirmed route files:
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/all-services/page.tsx`
- `src/app/services/page.tsx`
- `src/app/services/[slug]/page.tsx`
- `src/app/categories/[slug]/page.tsx`
- `src/app/service-areas/page.tsx`
- `src/app/service-areas/[state]/page.tsx`
- `src/app/service-areas/[state]/[city]/page.tsx`
- `src/app/[service]/[state]/page.tsx`
- `src/app/[service]/[state]/[city]/page.tsx`
- `src/app/api/contact/route.ts`
- `src/app/api/health/route.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/manifest.ts`
- `src/app/not-found.tsx`

## Rendering Strategy
Confirmed rendering model:
- Static page exports for core pages like home, about, contact, all-services, and service-areas hub
- `generateStaticParams()` for service, category, state, city, service-state, and service-city routes
- `dynamicParams = false` on dynamic page routes
- Route handlers `/api/contact` and `/api/health` use `dynamic = "force-dynamic"`
- Sitemap is produced via Next.js metadata route generation plus additional static XML sitemap files in `public/`

This means the site is primarily static for public content pages and dynamic for API routes only.

## Shared Layouts
`src/app/layout.tsx` provides:
- Global CSS import
- Google fonts (`Syne`, `DM Sans`)
- global metadata defaults
- Google site verification support
- `ClientProviders`
- Google Tag Manager head/body injection

There are no nested route-group layouts currently found in the active app.

## Component Architecture
Main structural components:
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/Breadcrumbs.tsx`
- `src/components/JsonLd.tsx`
- `src/components/CTA.tsx`
- `src/components/ContactForm.tsx`
- `src/components/FaqAccordion.tsx`

Route pages generally:
1. build SEO payload
2. map SEO payload to Next metadata
3. render JSON-LD
4. render a view component from `src/views/*`

## View Layer
The page presentation layer is implemented in `src/views/`.

Confirmed main views:
- `Index.tsx`
- `About.tsx`
- `Contact.tsx`
- `AllServicesPage.tsx`
- `CategoryPage.tsx`
- `ServicePage.tsx`
- `ServiceAreas.tsx`
- `StatePage.tsx`
- `CityPage.tsx`
- `ServiceStatePage.tsx`
- `ServiceCityPage.tsx`

These views own the user-facing page composition, while route files own metadata and route-param resolution.

## Data Structure
Primary content/data sources:
- `src/lib/services.ts` for the 65-service catalog
- `src/lib/categories.ts` for the 8 category definitions
- `src/lib/states.ts` for 51 state/DC definitions and city lists
- `src/lib/cities.ts` for city slug normalization and lookup helpers
- `src/content/home.ts` for homepage copy
- `src/content/about.ts` for about-page copy
- `src/lib/content.ts` for generated geo content sections
- `src/lib/geo-aeo-content.ts` for geo FAQ/AEO blocks

This is a code-first content architecture with no CMS currently confirmed.

## Utility And Helper Files
Key helpers:
- `src/lib/seo/metadata.ts`
- `src/lib/seo/next-metadata.ts`
- `src/lib/seo/generators.ts`
- `src/lib/seo/lastmod.ts`
- `src/lib/seo/content-dates.ts`
- `src/lib/sitemap-urls.ts`
- `src/lib/schema.ts`
- `src/lib/nav-categories.ts`
- `src/lib/nav-groups.ts`
- `src/lib/legacy-service-slugs.ts`
- `src/lib/contact.ts`

## Config Files
Confirmed config/build files:
- `package.json`
- `next.config.mjs`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `vercel.json`
- `.env.example`

## Metadata Handling
Metadata architecture is centralized and reusable.

Pipeline:
1. Route gets content entity or params.
2. Route calls SEO generator from `src/lib/seo/generators.ts`.
3. Generator returns a `SeoPayload` object with title, description, canonical, keywords, robots, questions, geo terms, and JSON-LD blocks.
4. `seoToMetadata()` in `src/lib/seo/next-metadata.ts` maps payload into Next.js metadata fields.

Confirmed metadata fields:
- title
- description
- keywords
- canonical
- Open Graph
- Twitter card
- robots

## Sitemap Handling
Two sitemap systems currently exist:

1. Next metadata sitemap route
- Source: `src/app/sitemap.ts`
- Backing logic: `src/lib/sitemap-urls.ts`
- Generates bucketed sitemap entries via `generateSitemaps()`

2. Static XML sitemap artifacts in `public/`
- `public/sitemap.xml` currently contains a sitemap index
- child files include:
  - `sitemap-static.xml`
  - `sitemap-services.xml`
  - `sitemap-areas.xml`
  - `sitemap-service-state.xml`
  - `sitemap-service-state-city-1.xml`
  - `sitemap-service-state-city-2.xml`
  - `sitemap-service-state-city-3.xml`
- generated by:
  - `scripts/generate-sitemaps.mjs`
  - `scripts/split-sitemaps.mjs`

## Robots Handling
Robots is also duplicated between a metadata route and a static public file:
- dynamic source: `src/app/robots.ts`
- static file: `public/robots.txt`

Both currently allow site crawling, block `/api/`, and include AI crawler allowances.

## Redirect Handling
Confirmed redirect layers:
- `next.config.mjs` `redirects()`:
  - `/services` → `/all-services/`
  - legacy service slug redirects to current service slugs
  - `/service-areas/new-york/bronx` → `/service-areas/new-york/the-bronx/`
- route-level permanent redirects:
  - `src/app/services/page.tsx`
  - `src/app/services/[slug]/page.tsx`
  - `src/app/service-areas/[state]/[city]/page.tsx`

Legacy service slug mappings are stored in `src/lib/legacy-service-slugs.ts`.

## Header, Footer, And Navigation Architecture
Header:
- Built in `src/components/Header.tsx`
- Desktop and mobile navigation
- Category dropdowns and all-services mega menu
- Main CTA to `/contact`
- Theme toggle

Footer:
- Built in `src/components/Footer.tsx`
- Company links
- Main service category links
- All-services links
- Featured service links
- Priority state hub links

Navigation source files:
- `src/lib/nav-categories.ts`
- `src/lib/nav-groups.ts`

## CTA Architecture
CTAs are implemented in two patterns:
- Reusable CTA component in `src/components/CTA.tsx`
- Inline view-level CTA sections in service, state, city, and service-location views

Primary CTA destination is consistently `/contact/`.

## Contact Form Architecture
Frontend:
- `src/components/ContactForm.tsx`
- client-side Zod validation
- posts JSON to `/api/contact`
- service dropdown with fixed option set
- uses a hidden `website` honeypot field

Backend:
- `src/app/api/contact/route.ts`
- `src/lib/contact.ts`
- Zod validation
- rate limiting in memory
- HTML/text email generation
- SMTP-based email sending via Nodemailer

## Schema / Structured Data Architecture
Schema blocks are defined in `src/lib/schema.ts`.

Confirmed schema types:
- `Organization`
- `WebSite`
- `WebPage`
- `AboutPage`
- `ContactPage`
- `CollectionPage`
- `BreadcrumbList`
- `Service`
- `FAQPage`

Schema is attached through:
- SEO generators creating `jsonLd` arrays
- `src/components/JsonLd.tsx` rendering `<script type="application/ld+json">`

## API Routes
Confirmed API routes:
- `POST /api/contact`
- `GET /api/health`

No other API routes were found in the active app.

## Middleware
No `middleware.ts` file was found in the active app.

## Dynamic Route Generation
Confirmed dynamic route generation:
- categories from `categories`
- services from `services`
- states from `states`
- cities from `getCitiesForState(state)`
- service-state from Cartesian product of `services × states`
- service-city from Cartesian product of `services × states × cities`

Confirmed current scale:
- 65 services
- 8 categories
- 51 states/DC
- 266 cities
- 21,000 sitemap URLs

## Deployment Architecture
Directly confirmed deployment signals:
- `vercel.json` sets framework to `nextjs`
- build command `npm run build`
- install command `npm install`
- README documents production deploy via `vercel --prod`

## Needs Verification
- Whether production currently serves the Next metadata sitemap/robots endpoints or the static `public/` files as the primary indexed source needs live-host verification.
- Whether any reverse proxy/CDN layer other than Vercel is active in production is not fully confirmed in the active app root.
