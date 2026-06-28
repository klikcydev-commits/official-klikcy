# Klikcy

Production marketing website for **Klikcy** — a U.S.-focused digital agency (custom websites, web & mobile apps, SaaS, AI automation, e-commerce, branding, growth, and SEO/AEO/GEO). The site combines a premium editorial UI (motion, dark/light theme) with a large **programmatic SEO** surface: ~65 services × 52 states/DC × hundreds of cities, all driven from TypeScript data modules—no CMS.

**Problem it solves:** Presents Klikcy as a full-service technology partner (not an SEO-only shop), converts inbound leads via contact flows, and scales local/commercial discovery through structured metadata, JSON-LD, FAQs, and sitemaps—without maintaining thousands of pages in a CMS.

> **Framework note:** This repository is a **Vite + React 18 + TypeScript** single-page application (SPA). It is **not** a Next.js project. There is no `next.config.js`, App Router, server components, or SSR. All routes are client-rendered; production output is static files in `dist/` plus an optional Node contact API in `server/`.

---

## Tech Stack

| Layer | Package | Version (from `package.json`) | Role |
|--------|---------|-------------------------------|------|
| Build | **Vite** | ^5.4.19 | Dev server, production bundle, `/api` proxy |
| React | **react**, **react-dom** | ^18.3.1 | UI |
| Language | **typescript** | ^5.8.3 | Typing |
| Routing | **react-router-dom** | ^6.30.1 | Client routes (`src/App.tsx`) |
| Document head | **react-helmet-async** | ^3.0.0 | Per-route `<title>`, meta, JSON-LD |
| Styling | **tailwindcss** | ^3.4.17 | Utilities + design tokens |
| | **tailwindcss-animate** | ^1.0.7 | Animations |
| | **@tailwindcss/typography** | ^0.5.16 | Prose styles |
| | **postcss**, **autoprefixer** | ^8.5.6 / ^10.4.21 | CSS pipeline |
| UI primitives | **@radix-ui/react-*** | ^1.1–^2.2 | shadcn-style `src/components/ui/` |
| | **class-variance-authority** | ^0.7.1 | Variant APIs |
| | **clsx**, **tailwind-merge** | ^2.1.1 / ^2.6.1 | Class composition (`cn()`) |
| | **lucide-react** | ^0.462.0 | Icons |
| | **sonner** | ^1.7.4 | Toasts (contact, etc.) |
| Forms / validation | **zod** | ^3.25.76 | Contact form + API |
| | **react-hook-form** | ^7.61.1 | Available in UI kit; contact uses native form + Zod |
| Motion | **gsap**, **@gsap/react** | ^3.15.0 / ^2.1.2 | Timelines, ScrollTrigger |
| | **lenis** | ^1.3.23 | Smooth scroll (`LenisGsapProvider`) |
| | **split-type** | ^0.3.4 | Hero text splits |
| Fonts | **@fontsource-variable/syne**, **@fontsource/dm-sans** | ^5.x | Self-hosted Syne + DM Sans |
| Charts / extras | **recharts**, **embla-carousel-react**, **vaul**, **cmdk**, etc. | various | Mostly shadcn scaffold |
| Contact API | **express**, **cors**, **nodemailer**, **dotenv** | ^4.21 / ^2.8 / ^6.10 / ^16.4 | `server/index.mjs` (not in Vite bundle) |
| Dev | **@vitejs/plugin-react-swc** | ^3.11.0 | Fast refresh |
| | **concurrently** | ^9.1.2 | `dev:all` |
| Test | **vitest**, **jsdom**, **@testing-library/jest-dom** | ^3.2.4 / ^20.0.3 / ^6.6.0 | Unit tests |
| Lint | **eslint** + **typescript-eslint** | ^9.32 / ^8.38 | Flat config (`eslint.config.js`) |

**Next.js vs Vite in this repo**

| | This project |
|---|--------------|
| **Vite** | ✅ Sole build tool. Serves `index.html` + `src/main.tsx`, outputs `dist/`. |
| **Next.js** | ❌ Not used. Copy and service pages may *mention* Next.js as a deliverable; the site itself is a React SPA. |

<!-- TODO: confirm if a separate Next.js app exists in another repo for client projects -->

Detailed dependency audit: [docs/npm-packages-and-tools.md](./docs/npm-packages-and-tools.md).

---

## Project Structure

```
newklikcy/
├── index.html                 # HTML shell, default meta, hero preload
├── vite.config.ts             # Vite: port 8080, @ alias, /api → contact API
├── vitest.config.ts           # Test runner (jsdom, @ alias)
├── tailwind.config.ts         # Tailwind theme extensions
├── postcss.config.js
├── eslint.config.js           # ESLint 9 flat config
├── tsconfig.json              # Project references (app + node)
├── tsconfig.app.json
├── tsconfig.node.json
├── components.json            # shadcn/ui generator config
├── package.json
├── .env.example               # Env template (copy to .env)
├── .gitignore
│
├── public/                    # Copied as-is to dist/ root
│   ├── robots.txt             # Crawler rules + sitemap URL
│   ├── hero-klikcy.webp
│   ├── klikcy-logo.png
│   ├── brand/klikcy-logo.png
│   ├── brand/tech/            # Orbit tech logos (e.g. aws.svg)
│   └── sitemap*.xml           # Pre-built sitemap index + chunks (~18k URLs)
│
├── server/
│   └── index.mjs              # Express contact API (SMTP via nodemailer)
│
├── scripts/
│   ├── generate-sitemaps.mjs  # Build URL list from states + services
│   ├── split-sitemaps.mjs     # Bucket URLs into child sitemaps + index
│   ├── validate-seo.mjs       # SEO sanity checks
│   └── extract-legacy-services.mjs  # One-off legacy migration helper
│
├── src/
│   ├── main.tsx               # React entry, font imports, index.css
│   ├── App.tsx                # Providers + React Router routes
│   ├── App.css
│   ├── index.css              # Tailwind layers + component utilities
│   ├── vite-env.d.ts
│   │
│   ├── pages/                 # Route-level screens
│   │   ├── Index.tsx          # /
│   │   ├── About.tsx          # /about
│   │   ├── Contact.tsx        # /contact
│   │   ├── AllServicesPage.tsx
│   │   ├── ServicePage.tsx    # /services/:slug
│   │   ├── CategoryPage.tsx   # /categories/:slug
│   │   ├── ServiceAreas.tsx   # /service-areas
│   │   ├── StatePage.tsx      # /service-areas/:slug
│   │   ├── CityPage.tsx       # /service-areas/:state/:city
│   │   ├── ServiceStatePage.tsx   # /:service/:state (programmatic)
│   │   ├── ServiceCityPage.tsx    # /:service/:state/:city
│   │   └── NotFound.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx         # Sticky nav, logo strip, mega menus
│   │   ├── Footer.tsx
│   │   ├── SEO.tsx            # react-helmet-async wrapper
│   │   ├── Breadcrumbs.tsx
│   │   ├── layout/            # ThemeRoot, LenisGsapProvider, PageSection, cursor, transitions
│   │   ├── sections/          # HomeHero, HomeStatsRow
│   │   ├── home/              # FAQ, packages, TechnologyOrbit
│   │   ├── service/           # ServiceHero, ServiceStateHubs, ServiceMetroCities
│   │   ├── category/          # CategoryServiceGrid
│   │   ├── motion/            # SplitText, ScrambleText, FadeUp, TiltCard
│   │   ├── animations/        # StaggerReveal, ScrambleLink
│   │   └── ui/                # shadcn/Radix primitives (button, dialog, …)
│   │
│   ├── content/
│   │   ├── home.ts            # Homepage copy (FAQs, process, pillars)
│   │   ├── about.ts
│   │   └── legacy-service-enrichment.json
│   │
│   ├── lib/
│   │   ├── services.ts        # 65 services catalog
│   │   ├── categories.ts      # 8 category hubs
│   │   ├── states.ts          # 52 states + DC, cities per state
│   │   ├── cities.ts          # City slug helpers
│   │   ├── content.ts         # Programmatic page body builders
│   │   ├── schema.ts          # JSON-LD generators
│   │   ├── nav-categories.ts  # Primary + All Services nav trees
│   │   ├── nav-groups.ts
│   │   ├── legacy-service-slugs.ts
│   │   ├── apply-legacy-enrichment.ts
│   │   ├── gsap.ts            # ScrollTrigger registration
│   │   ├── metadata/          # Titles, descriptions, positioning, stableHash
│   │   └── seo/               # getHomeSeo, getServiceSeo, keywords, priority markets
│   │
│   ├── hooks/                 # useReducedMotion, useMediaQuery, useMousePosition, …
│   ├── utils/                 # cn, math, device
│   ├── styles/globals.css     # Design tokens (Signal Mesh), grain, themes
│   └── test/                  # Vitest setup + example.test.ts
│
├── docs/                      # Internal audits, SEO workflows, dependency notes
├── .cursor/rules/             # Agent rules (design system, dependency cleanup)
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (ESLint 9 and Vite 5 require modern Node; no `.nvmrc` in repo—use 20 LTS recommended)
- **npm** (lockfile: `package-lock.json`)
- SMTP credentials for contact form testing (optional for UI-only dev)

### Installation

```bash
git clone https://github.com/klikcydev-commits/klikcy-catalyst.git
cd klikcy-catalyst   # or your local folder name
npm install
cp .env.example .env
# Edit .env with your values
```

### Environment variables

| Variable | Required | Used by | Purpose |
|----------|----------|---------|---------|
| `SITE_URL` | Production API | `server/index.mjs` | Canonical site URL in contact emails |
| `VITE_SITE_URL` | Optional | Vite client (`import.meta.env`) | Client-side canonical/base URL if referenced |
| `CONTACT_API_PORT` | Optional | Vite proxy + server | Contact API port (default **8787**) |
| `SMTP_HOST` | Contact API | `server/index.mjs` | SMTP host (e.g. Hostinger) |
| `SMTP_PORT` | Contact API | server | Usually **465** (TLS) |
| `SMTP_USER` | Contact API | server | SMTP auth user |
| `SMTP_PASS` | Contact API | server | SMTP password (**never** expose to client) |
| `CONTACT_EMAIL` | Contact API | server | Inbox for form submissions |
| `VITE_CONTACT_EMAIL` | Optional | `Contact.tsx` | Email displayed on contact page (default fallback: `build@klikcy.com`) |

Only variables prefixed with `VITE_` are exposed to the browser bundle.

### Development

**Frontend only** (contact POST will fail unless API is running elsewhere):

```bash
npm run dev
```

Opens **http://localhost:8080** (see `vite.config.ts`). Vite proxies `/api/*` to `http://127.0.0.1:${CONTACT_API_PORT}`.

**Frontend + contact API:**

```bash
npm run dev:all
```

Runs `npm run server` and `npm run dev` via `concurrently`.

**Contact API only:**

```bash
npm run server
```

Health check: `http://127.0.0.1:8787/api/health` → `{ "ok": true, "version": 2, ... }`.

### Production build

```bash
npm run build
```

Output: **`dist/`** (static assets + `index.html`).

Development-mode bundle (rarely needed):

```bash
npm run build:dev
```

### Preview production build

```bash
npm run preview
```

Serves `dist/` locally. For contact form, run `npm run server` in another terminal (preview also proxies `/api` per `vite.config.ts`).

---

## Architecture & Key Decisions

### Routing

All routes are declared in `src/App.tsx` with **react-router-dom v6** `BrowserRouter`. Order matters: specific paths (`/service-areas/...`, `/services/:slug`) are registered **before** catch-alls `/:service/:state` and `/:service/:state/:city` so `/about` and `/contact` are not swallowed.

| Pattern | Page component |
|---------|----------------|
| `/` | `Index` |
| `/about`, `/contact`, `/all-services` | `About`, `Contact`, `AllServicesPage` |
| `/services/:slug` | `ServicePage` (+ legacy redirects via `legacy-service-slugs.ts`) |
| `/categories/:slug` | `CategoryPage` |
| `/service-areas`, `/service-areas/:slug`, `.../:city` | `ServiceAreas`, `StatePage`, `CityPage` |
| `/:service/:state`, `/:service/:state/:city` | `ServiceStatePage`, `ServiceCityPage` |
| `*` | `NotFound` |

### State management

- **No global app store** (no Redux/Zustand).
- **React `useState` / `useRef` / `useEffect`** for UI (header scroll, mobile menu, forms).
- **Static data** imported from `src/lib/*` and `src/content/*`.
- **URL as state** for page type and slugs (services, states, cities).

### Data fetching

- **No runtime CMS or GraphQL.** Content is compile-time TypeScript/JSON.
- **Contact form:** `fetch("/api/contact")` from `Contact.tsx` → Express in `server/index.mjs`.
- **@tanstack/react-query** is not installed.

### Providers (`App.tsx`)

```
HelmetProvider → ThemeRoot → TooltipProvider → Sonner → BrowserRouter
  → LenisGsapProvider → CustomCursor → PageTransition + Routes
```

- **`ThemeRoot`**: `data-theme` light/dark on `<html>` (`src/components/layout/ThemeRoot.tsx`).
- **`LenisGsapProvider`**: Lenis smooth scroll + GSAP ticker; disabled when `prefers-reduced-motion` (see `useReducedMotion`).
- **`PageTransition`**: Route-change overlay animation.
- **`SEO`**: Per-page head + JSON-LD via `react-helmet-async`.

### SEO architecture

```
Page → get*Seo() in src/lib/seo/generators.ts
     → build*Metadata() in src/lib/metadata/page-metadata.ts
     → <SEO /> + src/lib/schema.ts (JSON-LD)
```

Programmatic pages use `buildServiceStateContent()` / `buildServiceCityContent()` in `src/lib/content.ts` and deterministic title variants via `stableHash()` in `src/lib/metadata/hash.ts`.

### Important patterns

| Pattern | Location |
|---------|----------|
| Path alias `@/` → `src/` | `vite.config.ts`, `tsconfig` |
| shadcn/ui components | `src/components/ui/`, `components.json` |
| GSAP scoped contexts | `HomeHero`, `HomeStatsRow`, etc. |
| Lenis scroll prevention in nested scroll | `data-lenis-prevent` on nav dropdowns, mobile drawer |
| Skip link + sticky header | `Header.tsx` |
| 20 keywords per page | `buildPageKeywords20()` in `src/lib/seo/keywords.ts` |

### SPA / crawler caveat

Each URL serves the same `index.html`; metadata and body render after JavaScript runs. Crawlers that execute JS see full content; prerender/SSR is **not** implemented. See [Deployment](#deployment) for hosting SPA fallback requirements.

---

## Features

| Feature | Description | Primary files |
|---------|-------------|----------------|
| **Homepage** | Hero (GSAP + SplitType), stats, categories, process, packages, tech orbit, FAQs | `pages/Index.tsx`, `sections/HomeHero.tsx`, `content/home.ts`, `home/*` |
| **About** | Agency story, team positioning | `pages/About.tsx`, `content/about.ts` |
| **Contact** | Zod-validated form, SMTP via API, Sonner toasts | `pages/Contact.tsx`, `server/index.mjs` |
| **Service catalog** | 65 service detail pages | `lib/services.ts`, `pages/ServicePage.tsx`, `service/ServiceHero.tsx` |
| **Category hubs** | 8 practice areas | `lib/categories.ts`, `pages/CategoryPage.tsx`, `category/CategoryServiceGrid.tsx` |
| **All services** | Full catalog overview | `pages/AllServicesPage.tsx`, `lib/nav-categories.ts` |
| **Service areas** | State + city geographic hubs | `lib/states.ts`, `lib/cities.ts`, `ServiceAreas.tsx`, `StatePage.tsx`, `CityPage.tsx` |
| **Programmatic local SEO** | Service × state/city (~18k URLs) | `ServiceStatePage.tsx`, `ServiceCityPage.tsx`, `lib/content.ts`, `lib/metadata/page-metadata.ts` |
| **Legacy URL redirects** | Old slugs → current catalog | `lib/legacy-service-slugs.ts`, `ServicePage.tsx` |
| **Navigation** | Desktop dropdowns, mobile full-screen drawer, collapsible logo strip on scroll | `Header.tsx`, `Footer.tsx` |
| **Dark / light theme** | CSS variables in `globals.css` | `ThemeRoot.tsx`, `ThemeToggle.tsx` |
| **Motion system** | Lenis, GSAP, magnetic CTA, tilt cards, scramble nav text | `LenisGsapProvider.tsx`, `MagneticButton.tsx`, `ScrambleText.tsx`, `CustomCursor.tsx` |
| **SEO head** | Title, description, 20 keywords, canonical, OG/Twitter, robots | `SEO.tsx`, `lib/seo/generators.ts` |
| **Structured data** | Organization, WebSite, Service, FAQPage, BreadcrumbList | `lib/schema.ts` |
| **Sitemaps** | Index + 7 child sitemaps | `public/sitemap*.xml`, `scripts/generate-sitemaps.mjs`, `scripts/split-sitemaps.mjs` |
| **404** | `noindex` SEO + console logging | `NotFound.tsx`, `getNotFoundSeo()` |

---

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Vite dev server on port **8080** |
| `build` | `npm run build` | Production build → `dist/` |
| `build:dev` | `npm run build:dev` | Vite build with `--mode development` |
| `preview` | `npm run preview` | Serve `dist/` locally |
| `lint` | `npm run lint` | ESLint over the repo (`eslint .`) |
| `server` | `npm run server` | Start Express contact API (`server/index.mjs`) |
| `dev:all` | `npm run dev:all` | Contact API + Vite concurrently |
| `sitemap:generate` | `npm run sitemap:generate` | Generate master URL list from code |
| `sitemap:split` | `npm run sitemap:split` | Split into child sitemaps + rebuild index |
| `sitemap:build` | `npm run sitemap:build` | `generate` then `split` |
| `seo:validate` | `npm run seo:validate` | Run `scripts/validate-seo.mjs` checks |
| `test` | `npm run test` | Vitest single run |
| `test:watch` | `npm run test:watch` | Vitest watch mode |

---

## Deployment

### Build artifact

```bash
npm install
npm run build
# Deploy contents of dist/
```

### Hosting requirements

| Requirement | Why |
|-------------|-----|
| **SPA fallback** | All routes must return `index.html` (HTTP 200) |
| **Static files at root** | `robots.txt`, `sitemap.xml`, images from `public/` |
| **HTTPS** | Canonicals assume `https://www.klikcy.com` |
| **`/api` reverse proxy** | Contact form POSTs to `/api/contact` |

### Production (documented): Hostinger + GitHub

Primary workflow (per project docs): push to **`main`** on `klikcydev-commits/klikcy-catalyst`; Hostinger pulls and builds.

| Setting | Value |
|---------|--------|
| Branch | `main` |
| Install | `npm install` |
| Build | `npm run build` |
| Publish directory | `dist` |
| SPA fallback | All routes → `/index.html` |

**Contact API:** `server/index.mjs` is **not** included in `dist/`. Run it as a separate Node process on the host and proxy **`/api`** to it. Set SMTP variables on the server (from `.env.example`).

Post-deploy check:

```bash
curl https://www.klikcy.com/api/health
```

Expect `"version": 2` and `requiredFields` including `"phone"`.

### Alternative: Vercel / Netlify

No `vercel.json` or `netlify.toml` in repo. A `.vercel/` folder may exist locally if the directory was linked to Vercel—it is **not** the documented production path.

To deploy on Vercel/Netlify as a static SPA:

- Build command: `npm run build`
- Output directory: `dist`
- Add SPA rewrite: `/*` → `/index.html`
- Deploy contact API separately or as serverless functions <!-- TODO: confirm if team wants Vercel serverless for /api/contact -->

### Build-time / runtime env (production)

| Variable | Where |
|----------|--------|
| `SITE_URL`, `VITE_SITE_URL` | Set to production URL (e.g. `https://www.klikcy.com`) |
| SMTP + `CONTACT_EMAIL` | Contact API host only |
| `CONTACT_API_PORT` | API process (proxy target) |

Regenerate sitemaps after catalog/geo changes:

```bash
npm run sitemap:build
git add public/sitemap*.xml
```

---

## Contributing

### Tests

```bash
npm run test          # CI-style single run
npm run test:watch    # Watch mode
```

Tests live under `src/**/*.{test,spec}.{ts,tsx}` with setup in `src/test/setup.ts`. Current coverage is minimal (`src/test/example.test.ts`); add tests when changing `lib/` builders or SEO helpers.

### Lint

```bash
npm run lint
```

ESLint 9 flat config: TypeScript recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`. Ignores `dist/`.

### Branch and PR conventions

<!-- TODO: confirm team conventions — not defined in-repo -->

Suggested workflow:

1. Branch from `main` (`feat/...`, `fix/...`).
2. Run `npm run lint`, `npm run build`, `npm run test` before opening a PR.
3. If URLs change, run `npm run sitemap:build` and commit `public/sitemap*.xml`.
4. Do not commit `.env`, `.vercel/`, or Playwright snapshots unless intentional.

### Code style

- **TypeScript** throughout `src/`.
- **Tailwind** utilities + tokens in `src/styles/globals.css` (avoid raw hex in JSX).
- **Path alias:** `@/` for imports from `src/`.
- **shadcn/ui:** add components via `components.json`; do not remove Radix packages without deleting matching UI files (see `.cursor/rules/dependency-cleanup.mdc`).
- **Motion:** wrap GSAP in `gsap.context()` and revert on unmount; respect `prefers-reduced-motion`.
- **Design system:** `.cursor/rules/awwwards-rank1-design.mdc` documents Signal Mesh tokens, Lenis, and component map.

### Dependency hygiene

See [docs/npm-packages-and-tools.md](./docs/npm-packages-and-tools.md) and run before large dependency changes:

```bash
npm run lint && npm run build && npm run test
npm run seo:validate
npm audit
```

---

## Quick reference

| Task | File(s) |
|------|---------|
| Change homepage copy | `src/content/home.ts` |
| Add/edit a service | `src/lib/services.ts` |
| Add state/city | `src/lib/states.ts`, `src/lib/cities.ts` |
| Change meta templates | `src/lib/metadata/page-metadata.ts`, `positioning.ts` |
| Change site URL in schema | `src/lib/schema.ts`, `.env`, `public/robots.txt` |
| Regenerate sitemaps | `npm run sitemap:build` |

**Repository:** `https://github.com/klikcydev-commits/klikcy-catalyst`  
**Package name (npm):** `vite_react_shadcn_ts` (`private: true`)

---

## Related documentation

| Doc | Purpose |
|-----|---------|
| [docs/npm-packages-and-tools.md](./docs/npm-packages-and-tools.md) | Dependency audit |
| [docs/content-map.md](./docs/content-map.md) | Content ownership map |
| [docs/seo/competitor-keyword-research.md](./docs/seo/competitor-keyword-research.md) | SEO research workflow |
| [docs/website-ui-ux-quality-checklist.md](./docs/website-ui-ux-quality-checklist.md) | Pre-launch QA |
