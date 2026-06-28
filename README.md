# Klikcy — Official Website

Production marketing website for **[Klikcy](https://www.klikcy.com)** — a U.S.-focused digital agency (websites, apps, SaaS, AI automation, e-commerce, branding, SEO/AEO/GEO).

Built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. ~21,000 pages are statically generated at build time for programmatic local SEO.

**Repository:** [github.com/klikcydev-commits/official-klikcy](https://github.com/klikcydev-commits/official-klikcy)

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | **Next.js 14** (App Router, SSG, Route Handlers) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS 3** + single global stylesheet (`src/app/globals.css`) |
| UI | **Radix UI** / shadcn-style components |
| Validation | **Zod** (contact form + API) |
| Email | **Nodemailer** (SMTP via Route Handlers) |
| Motion | **GSAP**, **Lenis**, **SplitType** (lazy-loaded on desktop only) |
| Fonts | **next/font/google** (Syne + DM Sans) |

---

## Quick start

```bash
git clone https://github.com/klikcydev-commits/official-klikcy.git
cd official-klikcy
npm install
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build (~21k static pages + API routes) |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | TypeScript check |
| `npm run sitemap:build` | Regenerate legacy split XML sitemaps in `public/` |

---

## Project structure

```
src/
  app/                    # Next.js App Router
    layout.tsx            # Root layout + fonts + providers
    page.tsx              # Homepage
    globals.css           # Single global stylesheet (tokens + components)
    sitemap.ts            # Dynamic sitemap (~21k URLs)
    robots.ts             # Crawler rules
    not-found.tsx         # 404
    about/, contact/, all-services/
    services/[slug]/
    categories/[slug]/
    service-areas/[state]/[city]/
    [service]/[state]/[city]/   # Programmatic SEO
    api/health/route.ts
    api/contact/route.ts
  components/             # Header, Footer, ContactForm, CTA, ServiceCard, …
  views/                    # Page presentation components
  content/                  # Marketing copy (home.ts, about.ts)
  lib/                      # services, states, cities, SEO, schema, contact
```

The legacy `klikcy-next/` folder is kept for reference but is **not** the active app.

---

## Environment variables

Copy `.env.example` to `.env.local` for local development.

| Variable | Browser | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL (`https://www.klikcy.com`) |
| `SITE_URL` | No | Server-side canonical + email copy |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Email shown on contact page |
| `SMTP_*`, `CONTACT_EMAIL` | No | Contact API (never expose to client) |

---

## Routes

All URLs use trailing slashes (`trailingSlash: true`).

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about/`, `/contact/`, `/all-services/` | Static pages |
| `/services/{slug}/` | Service detail (~65 services) |
| `/categories/{slug}/` | Category hubs (8) |
| `/service-areas/`, `/service-areas/{state}/`, `…/{city}/` | Geographic hubs |
| `/{service}/{state}/`, `/{service}/{state}/{city}/` | Programmatic local SEO |
| `/api/health`, `/api/contact` | Contact API Route Handlers |

Legacy service slug redirects are handled client-side via `LegacyRedirect`.

---

## SEO

- **Metadata:** Next.js Metadata API + `generateMetadata()` per route
- **JSON-LD:** `<JsonLd />` / `SEOJsonLd` component on each page
- **Sitemap:** `src/app/sitemap.ts` (build-time generation)
- **Robots:** `src/app/robots.ts`
- **Static XML sitemaps** in `public/` (optional legacy split files via `npm run sitemap:build`)

---

## Deployment (Vercel)

```bash
vercel --prod
```

Set environment variables: `SITE_URL`, `NEXT_PUBLIC_SITE_URL`, `SMTP_*`, `CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_EMAIL`.

Or run `scripts/push-vercel-env.ps1` (Windows, requires Vercel CLI login).

Post-deploy:

```bash
curl https://www.klikcy.com/api/health
```

---

## Related docs

- [docs/npm-packages-and-tools.md](./docs/npm-packages-and-tools.md)
- [docs/seo/competitor-keyword-research.md](./docs/seo/competitor-keyword-research.md)
