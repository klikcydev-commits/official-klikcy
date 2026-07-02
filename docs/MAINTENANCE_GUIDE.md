# Maintenance Guide

## Local Development

### Prerequisites
- Node.js compatible with the current Next.js 14 toolchain
- npm
- environment variables configured from `.env.example`

### Setup
```bash
npm install
cp .env.example .env.local
```

### Run Locally
Use only commands confirmed in `package.json`:

```bash
npm run dev
```

Open `http://localhost:3000`

## Build
```bash
npm run build
npm run start
```

## Validation Commands
```bash
npm run lint
npm run typecheck
npm run seo:validate
npm run sitemap:generate
npm run sitemap:split
npm run sitemap:build
```

## Deploy
Directly confirmed deployment notes:
- `vercel.json` configures a Next.js deployment
- README documents:

```bash
vercel --prod
```

Post-deploy check documented in README:

```bash
curl https://www.klikcy.com/api/health
```

## Environment Variables
Confirmed in `.env.example`:
- `NEXT_PUBLIC_SITE_URL`
- `SITE_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL`

## How To Add A New Service Page
1. Open `src/lib/services.ts`.
2. Add a new `Service` object with all required fields:
   - `slug`
   - `name`
   - `category`
   - `shortDescription`
   - `metaTitle`
   - `metaDescription`
   - `focusKeyword`
   - `keywords`
   - `whoFor`
   - `included`
   - `technical`
   - `related`
   - `faqs`
   - `intro`
3. Confirm the category slug exists in `src/lib/categories.ts`.
4. Update related services if needed.
5. Run:

```bash
npm run typecheck
npm run seo:validate
```

6. If using static XML sitemap artifacts, rebuild:

```bash
npm run sitemap:build
```

Important:
- Adding one service also creates service-state and service-city routes automatically.

## How To Add A New City Page
1. Open `src/lib/states.ts`.
2. Add the city name to the correct state's `cities` array.
3. `src/lib/cities.ts` will derive the city slug automatically.
4. Run:

```bash
npm run typecheck
npm run seo:validate
```

5. Rebuild static sitemap files if needed:

```bash
npm run sitemap:build
```

Important:
- Adding one city also creates 65 new service-city routes with the current catalog.

## How To Add A New State Page
1. Open `src/lib/states.ts`.
2. Add a new state object with:
   - `slug`
   - `name`
   - `abbr`
   - `region`
   - `priority`
   - `cities`
   - `blurb`
3. Run validation:

```bash
npm run typecheck
npm run seo:validate
```

4. Rebuild static sitemap files if needed:

```bash
npm run sitemap:build
```

Important:
- Adding a new state creates:
  - one state page
  - one city page per listed city
  - one service-state page per service
  - one service-city page per service per listed city

## How To Add A New Blog Post
Not currently supported in the active app. No `/blog` route family was found.

## How To Add Metadata
Metadata is generated through:
- `src/lib/seo/generators.ts`
- `src/lib/metadata/page-metadata.ts`
- `src/lib/seo/metadata.ts`
- `src/lib/seo/next-metadata.ts`

For most changes:
1. update source data or page metadata builder
2. run:

```bash
npm run seo:validate
```

## How To Add Schema
1. Add or update schema builders in `src/lib/schema.ts`.
2. Attach schema blocks in `src/lib/seo/generators.ts`.
3. Confirm routes render JSON-LD through `src/components/JsonLd.tsx`.
4. Run:

```bash
npm run seo:validate
```

## How To Update Sitemap
Current supported commands:

```bash
npm run sitemap:generate
npm run sitemap:split
npm run sitemap:build
```

Important:
- The repo currently contains both a dynamic Next sitemap and static XML sitemap artifacts.
- Verify which one is the live production source before making structural sitemap changes.

## How To Test Robots.txt
1. Review rule sources:
   - `src/app/robots.ts`
   - `public/robots.txt`
2. Confirm intended behavior:
   - public pages allowed
   - `/api/` blocked
   - sitemap referenced
   - AI crawler rules intentionally allowed
3. Check live endpoint after deploy:

```bash
curl https://www.klikcy.com/robots.txt
```

## How To Test Redirects
Current redirect sources:
- `next.config.mjs`
- route-level redirects in service and city route files

Recommended checks:
- `/services/` redirects to `/all-services/`
- legacy service slugs redirect to current slugs
- known city alias redirects to canonical city slug

Example live checks:

```bash
curl -I https://www.klikcy.com/services/
curl -I https://www.klikcy.com/services/web-development/
curl -I https://www.klikcy.com/service-areas/new-york/bronx/
```

## How To Test Canonical Tags
Recommended process:
1. build and run locally or inspect deployed HTML
2. confirm each page uses:
   - `https://www.klikcy.com`
   - trailing slash
   - self-referencing canonical
3. validate with:

```bash
npm run seo:validate
```

## How To Check Google Search Console
Not directly available from the codebase.

Recommended operational checklist:
- confirm sitemap submission
- inspect URL coverage
- inspect duplicate/alternate canonical reports
- inspect excluded-by-noindex reports
- inspect crawl stats for service-city route families

## How To Avoid Breaking SEO
- do not change canonical host casually
- do not remove trailing slash handling without a redirect/canonical plan
- do not add new public routes without metadata and schema
- do not publish redirected or noindex routes into sitemap
- do not change robots rules without confirming AI and search crawler intent
- do not create geo pages that imply fake offices
- always run:

```bash
npm run typecheck
npm run seo:validate
```

## How To Check Page Indexability
For any candidate page:
- canonical must exist
- robots meta must not be noindex
- URL must not redirect
- URL must return `200`
- URL must be included in sitemap if intended to rank
- page must contain a valid H1 and visible main content

## How To Validate Content Before Publishing
Recommended pre-publish checklist:
- title unique and appropriately sized
- meta description unique and concise
- H1 unique
- body content actually useful
- internal links present
- CTA path to `/contact/`
- FAQ/schema consistent with visible page content
- no fake local office claims
- `npm run seo:validate` passes

## Notes For Future Developers
- The active app is the repo root, not `klikcy-next/`.
- `klikcy-next/` is excluded in `tsconfig.json` and treated as legacy reference material.
- The site is code-first today; content changes often require code edits and validation.
