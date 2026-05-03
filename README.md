# Klikcy Catalyst

**Klikcy Catalyst** is the front-end for [Klikcy](https://klikcy.com): a marketing and **programmatic SEO** site for a U.S.-focused digital agency (websites, SEO/AEO, AI automation, e-commerce, and related services). The app is a single-page application (SPA) built with **Vite**, **React 18**, and **TypeScript**. Almost all “content” lives in typed **TypeScript modules** under `src/lib/`, not in a CMS.

---

## What the site contains

### Brand and positioning

The copy and structure assume **Klikcy** as the organization: national delivery, remote-first client work, and offerings grouped into **eight service categories** (see `src/lib/categories.ts`):

| Category slug | Focus |
|---------------|--------|
| `web-development` | Custom sites, WordPress, Shopify, Next.js, performance, etc. |
| `seo-aeo` | Technical SEO, local/programmatic SEO, schema, “answer engine” positioning |
| `ai-automation` | Agents, chatbots, workflows, integrations |
| `app-software` | Web apps, SaaS, dashboards, APIs |
| `ecommerce` | Shopify/WooCommerce, PDP/checkout, e-com SEO |
| `branding-design` | UI/UX, identity, design systems |
| `marketing-growth` | CRO, analytics, funnel systems |
| `technical-hosting` | Hosting, email, maintenance, security |

### Service catalog

- **`src/lib/services.ts`** defines roughly **65 services** as `Service` objects: `slug`, `name`, `category`, marketing fields (`shortDescription`, `intro`, `metaTitle`, `metaDescription`, `focusKeyword`, `keywords`), structured bullets (`whoFor`, `included`, `technical`), `related` service slugs, and `faqs`.
- Helpers such as **`getService`**, **`getRelatedServices`**, and category filtering power the service and category pages.

### Geographic / “service area” data

- **`src/lib/states.ts`** — All **50 U.S. states** with `slug`, `name`, `abbr`, `region`, `priority` (for highlighting key markets), **`cities`** (string arrays used for internal links and copy), and a short **`blurb`** about the state’s economy (used in generated copy).
- **`src/lib/cities.ts`** — **`citySlug`**, **`getCitiesForState`**, **`getCity`**, **`allCities`**: derive URL-safe city slugs and resolve city + state from route params.

### Generated copy

- **`src/lib/content.ts`** — **`buildServiceStateContent`** and **`stateIntroContent`** assemble long-form sections for **service × state** (and related) landing experiences from `Service` + `State` data so pages stay consistent and scalable.

### Structured data (JSON-LD)

- **`src/lib/schema.ts`** — Site constants (`SITE`), **`orgSchema`**, **`websiteSchema`**, **`breadcrumbSchema`**, **`serviceSchema`**, **`faqSchema`** for injection into pages.
- **`src/components/SEO.tsx`** — Wraps **`react-helmet-async`** (`<Helmet>`): document title, meta description, canonical, Open Graph/Twitter basics, and JSON-LD script tags.

---

## Tech stack

| Layer | Choice |
|--------|--------|
| Build / dev | [Vite 5](https://vitejs.dev/) (`vite.config.ts`), port **8080**, `host: "::"` |
| UI | React 18, [React Router 6](https://reactrouter.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3, custom utilities in `src/index.css` (e.g. `container-x`, `section`, `btn-primary`) |
| Components | [shadcn/ui](https://ui.shadcn.com/)-style primitives under `src/components/ui/` (Radix-based, `class-variance-authority`, `tailwind-merge`) |
| Forms / validation | `react-hook-form`-ready primitives; **Contact** uses **Zod** inline |
| Icons | `lucide-react` |
| Data fetching (app shell) | `@tanstack/react-query` (`QueryClientProvider` in `App.tsx`) — ready for future API use |
| Toasts | `sonner` + shadcn `toaster` |
| Tests | [Vitest](https://vitest.dev/) + Testing Library + jsdom (`vitest.config.ts`, `src/test/`) |

---

## Repository layout

```
├── index.html              # Root HTML, meta, fonts, Klikcy title/description
├── vite.config.ts          # Vite + React (SWC) + `@` → `./src`
├── vitest.config.ts        # Test runner config (alias matches Vite)
├── tailwind.config.ts      # Theme extensions, content paths
├── postcss.config.js
├── eslint.config.js
├── package.json
└── src/
    ├── main.tsx            # React root mount
    ├── App.tsx             # Providers + route table
    ├── index.css           # Tailwind base + global layout/utility classes
    ├── vite-env.d.ts
    ├── components/
    │   ├── Header.tsx      # Site navigation
    │   ├── Footer.tsx
    │   ├── SEO.tsx         # Helmet + JSON-LD
    │   ├── Breadcrumbs.tsx
    │   ├── NavLink.tsx
    │   └── ui/             # shadcn-style building blocks (button, card, dialog, …)
    ├── hooks/              # e.g. use-mobile, use-toast
    ├── lib/                # Domain data & SEO helpers (heart of “content”)
    │   ├── services.ts
    │   ├── categories.ts
    │   ├── states.ts
    │   ├── cities.ts
    │   ├── content.ts
    │   └── schema.ts
    ├── pages/              # Route-level screens
    └── test/               # Vitest setup + example test
```

---

## Routing

Defined in **`src/App.tsx`**. Order matters: **static paths are registered before** the dynamic **`/:service/:...`** patterns.

| Path | Page | Purpose |
|------|------|---------|
| `/` | `Index` | Homepage |
| `/about` | `About` | About Klikcy |
| `/contact` | `Contact` | Lead form (client-side Zod + toast; no backend in repo) |
| `/services/:slug` | `ServicePage` | Single service from `services.ts` |
| `/categories/:slug` | `CategoryPage` | Hub for one category |
| `/service-areas` | `ServiceAreas` | National service areas index |
| `/service-areas/:slug` | `StatePage` | One state (slug = state) |
| `/service-areas/:state/:city` | `CityPage` | One city within a state |
| `/:service/:state` | `ServiceStatePage` | Programmatic **service × state** |
| `/:service/:state/:city` | `ServiceCityPage` | Programmatic **service × city** |
| `*` | `NotFound` | 404 |

**Slugs:** `service` params must match a **`services.ts`** `slug`. `state` / `city` must match **`states.ts`** and derived city slugs from **`cities.ts`**. Invalid combinations redirect to **`/404`** (unmatched path falls through to `NotFound`).

---

## Key pages (behavior)

- **`Index`** — Hero, value props, category grid, featured services, states, CTAs; uses `SITE` / schemas as needed.
- **`ServicePage`** — Full service narrative: intro, who it’s for, included/technical lists, FAQs, related services, links into priority states / cities for internal linking.
- **`CategoryPage`** — Lists services in that category; 404 if category slug unknown.
- **`ServiceAreas` / `StatePage` / `CityPage`** — Browse geography; city URLs use slugified names (e.g. `san-diego`).
- **`ServiceStatePage` / `ServiceCityPage`** — Combine catalog service copy with state/city data and **`buildServiceStateContent`** (or city-level equivalents) for long-tail SEO pages.
- **`Contact`** — Form fields validated with Zod; successful submit sets local state + Sonner toast (**no** API route in this codebase).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (default **http://localhost:8080**) |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Vite build with `development` mode |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm test` | Vitest run once |
| `npm run test:watch` | Vitest watch mode |

---

## How to extend the codebase

1. **New service** — Add a `make({ ... })` entry in **`src/lib/services.ts`** with a unique `slug` and valid `category`. Optionally wire `related` slugs. Service page appears at `/services/<slug>`.
2. **New category** — Extend **`CategorySlug`** and the **`categories`** array in **`src/lib/categories.ts`**, then attach services via `category` field.
3. **New state / city list** — Edit **`src/lib/states.ts`** (cities are plain strings; slugs are derived). City pages follow `/service-areas/<state-slug>/<city-slug>`.
4. **SEO** — Adjust **`SITE`** in **`src/lib/schema.ts`** and/or per-page **`SEO`** props. Add or compose JSON-LD builders in **`schema.ts`** as needed.
5. **Global layout / chrome** — **`Header.tsx`** / **`Footer.tsx`**; shared tokens and utilities in **`tailwind.config.ts`** and **`index.css`**.

---

## Environment and deployment notes

- **Canonical URLs** in schema and many `SEO` usages assume production host **`https://klikcy.com`** (`SITE.url`). For staging, consider environment-based `SITE` or build-time replacement.
- **Contact form** does not post to a server in this repository; connect your own endpoint or form backend before production use.
- **No database** — the site is static data + client-side routing; deploy **`dist/`** to any static host (CDN, S3+CloudFront, Netlify, Vercel static, etc.) configured for SPA fallback to `index.html`.

---

## Tests

- **`src/test/setup.ts`** — Vitest / Testing Library setup.
- **`src/test/example.test.ts`** — Sample test; add `*.test.ts` / `*.spec.tsx` next to features under `src/` per **`vitest.config.ts` `include`**.

---

## License / ownership

Private project (`"private": true` in `package.json`). Rights and deployment are governed by your organization’s policies.
