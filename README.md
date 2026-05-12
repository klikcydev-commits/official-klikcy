# Klikcy

Klikcy is a premium Vite + React + TypeScript marketing site for a U.S.-focused digital agency. The site presents Klikcy as a strategic partner across websites, SEO/AEO, AI automation, apps, e-commerce, branding, growth, and technical hosting. It combines editorial landing-page design, programmatic service-area routing, structured SEO metadata, and a motion-heavy front end built for modern browsers.

This repository is a client-rendered single-page app. It is not a Next.js app, does not use server components, and is intended to build to a static `dist/` output that can be deployed behind SPA rewrite rules.

## What this project is

- A branded agency website for `https://klikcy.com`
- A service catalog with category, service, state, and city landing pages
- A programmatic SEO / AEO codebase driven by typed content modules
- A premium front end using Tailwind, custom CSS tokens, GSAP, Lenis, and reusable React components
- A private codebase intended for internal/client delivery use

## Core goals

- Present Klikcy as a premium, modern, technical, trustworthy digital agency
- Support service discovery across multiple categories and local-intent routes
- Keep marketing content strongly structured for SEO, AEO, and schema usage
- Maintain a reusable component system instead of one-off page code
- Ship as a static front end with a clean Vite build

## Tech stack

- Build tool: `Vite 5`
- Framework: `React 18`
- Language: `TypeScript`
- Routing: `react-router-dom`
- Head management / SEO: `react-helmet-async`
- Styling: `Tailwind CSS` plus global tokens/utilities in `src/index.css` and `src/styles/globals.css`
- UI primitives: Radix/shadcn-style components in `src/components/ui`
- Motion: `gsap`, `split-type`, `lenis`
- State / app shell data layer: `@tanstack/react-query`
- Icons: `lucide-react`
- Notifications: `sonner` and shadcn toaster
- Testing: `Vitest`, `Testing Library`, `jsdom`

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

By default the app runs on:

```text
http://localhost:8080
```

Create a production build:

```bash
npm run build
```

Preview the built app locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

## NPM scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - create the production build in `dist/`
- `npm run build:dev` - build using Vite development mode
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint
- `npm test` - run Vitest once
- `npm run test:watch` - run Vitest in watch mode
- `npm run sitemap:split` - regenerate split sitemap files in `public/`

## App shell and providers

The app bootstraps from `src/main.tsx`, which mounts `App.tsx`.

`src/App.tsx` wires together the main runtime providers:

- `HelmetProvider` for document metadata and JSON-LD
- `QueryClientProvider` for future async/data needs
- `ThemeRoot` for theme state and data attributes
- `TooltipProvider` for shared tooltip behavior
- `BrowserRouter` for client-side routes
- `LenisGsapProvider` for smooth scroll integration with GSAP
- `CustomCursor` and `PageTransition` for premium UI polish

## Route map

Routes are defined in `src/App.tsx`.

- `/` - homepage
- `/about` - brand/about page
- `/contact` - contact form page
- `/all-services` - all-services overview
- `/services/:slug` - individual service detail page
- `/categories/:slug` - service-category landing page
- `/service-areas` - nationwide service-area index
- `/service-areas/:slug` - state page
- `/service-areas/:state/:city` - city page
- `/:service/:state` - service-by-state programmatic page
- `/:service/:state/:city` - service-by-city programmatic page
- `*` - not found page

Static routes are declared before the dynamic service/state patterns so URL resolution stays predictable.

## Homepage architecture

The homepage lives in `src/pages/Index.tsx` and is assembled from reusable sections instead of one large template blob.

Current homepage building blocks include:

- `HomeHero`
- credibility / proof strip
- `HomeStatsRow`
- category capability grid
- "Why Klikcy" section
- process section
- impact model section
- experience tiles
- nationwide states section
- `HomeTechnologySection`
- `HomePackagesSection`
- `HomeFaqSection`
- final CTA band

Content for the homepage is centralized in `src/content/home.ts`, which makes it easier to change messaging without rewriting component logic.

## Content architecture

This project stores marketing content in typed TypeScript modules rather than a CMS.

### `src/content/home.ts`

Homepage-specific structured content such as:

- hero copy
- credibility strip items
- process steps
- impact cards
- experience tiles
- technology capability content
- technology orbit labels
- package plan cards
- homepage FAQs
- homepage stat values

### `src/lib/categories.ts`

Defines the top-level service categories used across navigation, category pages, and service classification.

### `src/lib/services.ts`

The central service catalog. Each service object powers service landing pages and related linking. This is where to update:

- service slugs
- names
- introductions
- metadata
- FAQs
- included work
- technical foundations
- related services

### `src/lib/states.ts`

Defines U.S. state data used for local-intent content and route generation. It also carries priority-market information used in homepage and local pages.

### `src/lib/cities.ts`

Provides helpers for city slugging, city lookup, and mapping city routes back to state data.

### `src/lib/content.ts`

Builds generated long-form copy for service/state and service/city combinations so the site can scale programmatic pages consistently.

## SEO and schema

SEO is built directly into the React layer.

### `src/components/SEO.tsx`

This component manages:

- page titles
- meta descriptions
- canonicals
- social metadata
- JSON-LD script output

### `src/lib/schema.ts`

Contains reusable schema builders for:

- organization schema
- website schema
- breadcrumb schema
- service schema
- FAQ schema

The canonical production URL is currently hardcoded as:

```text
https://klikcy.com
```

If you deploy this code to a staging domain, update schema/canonical behavior accordingly.

## Design system and styling

The design layer is a mix of Tailwind utilities and project-level tokens.

### Important styling files

- `src/index.css` - Tailwind layers plus custom component classes, motion helpers, orbit styles, button styles, package card styles, and other site-level utilities
- `src/styles/globals.css` - design tokens such as spacing, radii, typography scales, theme variables, and gradients
- `tailwind.config.ts` - extended colors, fonts, shadows, animations, and background utilities

### Design characteristics

- clamp-based responsive typography
- premium spacing and large editorial layout rhythm
- dark/light aware token system
- branded gradients and glow accents
- reusable section wrappers via `PageSection`
- reusable intro headers via `SectionIntro`

## Motion system

Motion is an important part of the site and is handled in a layered way.

### `src/components/layout/LenisGsapProvider.tsx`

Connects Lenis smooth scrolling with GSAP's ticker so scroll-linked motion stays smooth.

### `src/components/motion/*`

Reusable motion components currently include:

- `FadeUp`
- `SplitText`
- `MagneticButton`
- `TiltCard`
- `ParallaxLayer`
- `ScrambleText`
- `CountUp`

### `src/components/layout/*`

The layout layer also contributes motion and polish:

- `PageTransition`
- `CustomCursor`
- `ThemeRoot`
- `ThemeToggle`

Reduced-motion support is built into the app and should be preserved whenever new animations are added.

## Navigation and information architecture

The main navigation is powered by:

- `src/components/Header.tsx`
- `src/lib/nav-categories.ts`
- `src/lib/nav-groups.ts`

The nav organizes services into grouped discovery paths rather than a flat long list. This is important for both UX clarity and crawlable internal linking.

The footer mirrors that structure and acts as another internal-linking surface for core pages, services, and service areas.

## Service and local landing pages

The site is built to scale far beyond a simple brochure homepage.

### Service pages

`src/pages/ServicePage.tsx` renders a detailed service page using:

- `ServiceHero`
- breadcrumb navigation
- overview messaging
- "who this is for"
- "what's included"
- technical foundation list
- FAQ accordion
- related services
- internal links into state and metro pages

### Category pages

`src/pages/CategoryPage.tsx` groups services by category and acts as a mid-funnel discovery page.

### Local pages

`StatePage`, `CityPage`, `ServiceStatePage`, and `ServiceCityPage` combine service and geography data to create scalable local landing pages for search intent.

## Sitemap generation

This repository includes split sitemap generation for large URL sets.

### Script

`scripts/split-sitemaps.mjs`

### What it does

- reads `public/sitemap.xml`
- rebuilds from child sitemap files if the source is already an index
- classifies URLs into buckets
- creates multiple sitemap files inside `public/`
- rewrites `public/sitemap.xml` as the sitemap index

Generated sitemap files currently include:

- `public/sitemap-static.xml`
- `public/sitemap-services.xml`
- `public/sitemap-areas.xml`
- `public/sitemap-service-state.xml`
- `public/sitemap-service-state-city-1.xml`
- `public/sitemap-service-state-city-2.xml`
- `public/sitemap-service-state-city-3.xml`

## Public assets

The `public/` directory includes brand and SEO-facing assets such as:

- logo files
- hero imagery
- sitemap files

Keep this folder stable because URLs from `public/` are referenced directly by the app and by crawlers.

## Project structure

```text
.
├── public/
├── scripts/
├── src/
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── motion/
│   │   ├── service/
│   │   ├── sections/
│   │   └── ui/
│   ├── content/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## Key folders explained

- `src/components/home` - homepage-specific reusable sections
- `src/components/layout` - app shell, theme, cursor, page transitions, shared layout wrappers
- `src/components/motion` - reusable motion primitives
- `src/components/service` - service-page-specific UI
- `src/components/sections` - larger editorial sections like the homepage hero
- `src/components/ui` - lower-level reusable UI primitives
- `src/content` - typed content for the homepage
- `src/lib` - business data, schema helpers, route content helpers, categories, states, services
- `src/pages` - route-level components
- `src/hooks` - environment, device, and accessibility hooks
- `src/utils` - small utility helpers

## How to update the project

### Change homepage copy

Edit `src/content/home.ts`.

### Change a service

Edit `src/lib/services.ts`.

### Change category labels or grouping

Edit:

- `src/lib/categories.ts`
- `src/lib/nav-categories.ts`
- `src/lib/nav-groups.ts`

### Change state/city coverage

Edit:

- `src/lib/states.ts`
- `src/lib/cities.ts`

### Change shared design tokens

Edit:

- `src/styles/globals.css`
- `src/index.css`
- `tailwind.config.ts`

### Change SEO schema or site constants

Edit `src/lib/schema.ts`.

## Deployment notes

- This app builds to static files in `dist/`
- Deploy it to a host that supports SPA fallback to `index.html`
- Canonicals and schema currently assume `https://klikcy.com`
- The contact page is front-end only unless you wire it to a real backend/form endpoint
- There is no database dependency in this repository

## Testing and quality

This codebase already includes:

- `Vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `jsdom`

Tests should be added where they meaningfully protect logic, route behavior, or content rendering. For design changes, build verification and focused interaction checks are often more useful than shallow snapshot coverage.

## Development conventions

- Keep the stack Vite + React + TypeScript
- Avoid introducing Next.js-specific patterns or APIs
- Prefer reusable sections/components over route-level duplication
- Keep heading structure semantic and SEO-friendly
- Preserve reduced-motion behavior when adding animation
- Favor typed content modules over hardcoded scattered copy

## Ownership

This repository is marked `"private": true` in `package.json`.

Usage, deployment, and content ownership are governed by the owning team or client agreement.
