# Klikcy — Official Website

Production marketing website for **[Klikcy](https://www.klikcy.com)** — a U.S.-focused digital agency (websites, apps, SaaS, AI automation, e-commerce, branding, SEO/AEO/GEO).

Built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. ~21,000 indexable URLs; high-value programmatic pages are pre-rendered at build time with ISR for the long tail.

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
| `npm run seo:validate` | SEO audit (metadata + sitemap alignment) |
| `npm run verify:redirects` | Smoke-test legacy 308 redirects |
| `npm run verify:sitemaps` | Validate sitemap index + shards (requires `npm run start`) |

---

## Project structure

```
src/
  app/                    # Next.js App Router
    layout.tsx            # Root layout + fonts + providers
    page.tsx              # Homepage
    globals.css           # Single global stylesheet (tokens + components)
    sitemap.ts            # Sharded sitemaps via generateSitemaps()
    sitemap.xml/route.ts  # Sitemap index
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
  lib/                      # services, states, cities, SEO, schema, contact, redirects
```

---

## Environment variables

Copy `.env.example` to `.env.local` for local development.

| Variable | Browser | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL (`https://www.klikcy.com`) |
| `SITE_URL` | No | Server-side canonical + email copy |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Email shown on contact page |
| `CONTACT_FORM_SECRET` | No | HMAC secret for contact form time-gate |
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

Legacy service slug redirects are edge 308s configured in `next.config.mjs` (`src/lib/redirects.mjs`).

---

## SEO

- **Metadata:** Next.js Metadata API + `generateMetadata()` per route
- **JSON-LD:** `<JsonLd />` / `SEOJsonLd` component on each page
- **Sitemap:** Sharded `src/app/sitemap.ts` + index at `/sitemap.xml`
- **Robots:** `src/app/robots.ts` → `https://www.klikcy.com/sitemap.xml`

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

## Documentation

Full project documentation is available in:

- `/docs/WEBSITE_DOCUMENTATION.md`
- `/docs/ARCHITECTURE.md`
- `/docs/ROUTES_AND_STRUCTURE.md`
- `/docs/SEO_AEO_GEO_STRATEGY.md`
- `/docs/SITEMAP_AND_INDEXING.md`
- `/docs/SCALABILITY_PLAN.md`
- `/docs/TECHNICAL_AUDIT.md`
- `/docs/MAINTENANCE_GUIDE.md`
- `/docs/CONTENT_MODEL.md`
- `/docs/CHANGELOG.md`

## Related docs

- [docs/WEBSITE_DOCUMENTATION.md](./docs/WEBSITE_DOCUMENTATION.md)
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [docs/ROUTES_AND_STRUCTURE.md](./docs/ROUTES_AND_STRUCTURE.md)
- [docs/SEO_AEO_GEO_STRATEGY.md](./docs/SEO_AEO_GEO_STRATEGY.md)
- [docs/SITEMAP_AND_INDEXING.md](./docs/SITEMAP_AND_INDEXING.md)
- [docs/SCALABILITY_PLAN.md](./docs/SCALABILITY_PLAN.md)
- [docs/TECHNICAL_AUDIT.md](./docs/TECHNICAL_AUDIT.md)
- [docs/MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md)
- [docs/CONTENT_MODEL.md](./docs/CONTENT_MODEL.md)
- [docs/CHANGELOG.md](./docs/CHANGELOG.md)
- [docs/npm-packages-and-tools.md](./docs/npm-packages-and-tools.md)
- [docs/seo/competitor-keyword-research.md](./docs/seo/competitor-keyword-research.md)
