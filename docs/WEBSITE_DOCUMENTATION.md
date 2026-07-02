# Klikcy Website Documentation

## Identity
- Website name: `Klikcy`
- Domain: [https://www.klikcy.com](https://www.klikcy.com)
- Repository app root: repo root `official-klikcy/`
- Active app type: Next.js marketing and programmatic SEO website for a remote-first U.S. digital agency

## Business Overview
Klikcy is positioned in code and content as a remote-first digital agency and software partner serving businesses across the United States. The website presents Klikcy as a single partner for websites, apps, software, AI automation, e-commerce, branding, search visibility, technical hosting, and growth systems.

The site functions as both a brand authority platform and a large-scale service discovery engine. It combines brand pages, service catalog pages, category hubs, state hubs, city hubs, and service-location landing pages designed to capture nationwide commercial-intent demand.

## Business Purpose
- Generate inbound leads for web, app, software, SEO/AEO, AI, e-commerce, branding, and technical services
- Establish Klikcy as a nationwide digital agency and technology partner
- Scale organic visibility through structured service and geographic landing pages
- Support both traditional SEO and AI/answer-engine discoverability

## Target Market
- U.S.-based businesses across all 50 states and Washington DC
- Small businesses, startups, SaaS teams, e-commerce brands, service companies, enterprise marketing teams, and growth-stage operators
- Buyers seeking a single vendor for design, engineering, SEO, and automation

## Core Services
The codebase currently models 8 service categories and 65 individual services.

Primary category-level service groups:
- Web Development
- SEO & AEO
- AI Automation
- App & Software
- E-Commerce
- Branding & Design
- Marketing & Growth
- Technical & Hosting

Representative services confirmed in the catalog include:
- Custom website development
- WordPress development
- Shopify development
- Next.js development
- Technical SEO
- Local SEO
- AI automation services
- AI chatbot development
- Mobile app development
- SaaS development
- Branding and design services
- Hosting, email, SMTP, and maintenance services

## Main Audience
- Business owners
- Marketing leaders
- Founders
- E-commerce operators
- Product teams
- Local and multi-location service businesses
- Organizations needing digital modernization without building an internal full-stack team

## Primary Conversion Goals
- Drive users to `/contact/`
- Encourage “Get Free Quote”, “Start your project”, and “Talk with Klikcy” CTA clicks
- Convert service/category/location visitors into contact form submissions
- Reinforce Klikcy as a credible shortlist option for agency and software engagements

## Contact And Lead Generation Flow
Current confirmed flow:
1. User lands on a hub, service, state, city, or service-location page.
2. Page exposes multiple CTA links to `/contact/`.
3. User submits `src/components/ContactForm.tsx`.
4. Frontend POSTs JSON to `/api/contact`.
5. `src/app/api/contact/route.ts` validates payload with Zod, applies a honeypot field, rate limits by IP, and sends email via Nodemailer/SMTP.
6. Success returns `{ ok: true }`; failure returns JSON error.

Required submitted fields:
- `name`
- `email`
- `phone`
- `service`
- `message`

Optional:
- `company`
- `website` honeypot

## Website Goals
The codebase and content support these strategic goals:
- SEO visibility
- AEO visibility
- GEO visibility
- Lead generation
- Service authority
- Nationwide U.S. ranking
- Scalable location and service-location pages

## Technical Stack
This section documents only what is confirmed in the active root codebase.

| Area | Current confirmed implementation |
|---|---|
| Framework | `Next.js` |
| Next.js version | `14.2.35` |
| React version | `18.3.1` |
| TypeScript | Yes |
| Router | App Router |
| Styling | Tailwind CSS 3 + global CSS in `src/app/globals.css` |
| UI/component system | Radix UI + shadcn-style component structure |
| Motion | GSAP, Lenis, SplitType |
| Form validation | Zod |
| Email delivery | Nodemailer + SMTP |
| Data source approach | Code-first TypeScript data files |
| CMS | Not confirmed in codebase; no active CMS found |
| Rendering | Static generation for public pages, dynamic route handlers for APIs |
| Deployment platform | Vercel confirmed by `vercel.json` and README |
| Hosting setup | Vercel is confirmed; other live infrastructure is not fully confirmed in active app code |
| Analytics tools | Google Tag Manager confirmed; GA ID env var present |
| SEO libraries/tools | Next Metadata API, custom SEO generators, JSON-LD helpers, custom validation script |
| Sitemap generation | Next metadata sitemap route plus static XML generation scripts |
| Robots generation | Next metadata robots route plus static `public/robots.txt` |

### Environment Variables Used
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

### Not Confirmed In Codebase
- active CMS integration
- analytics dashboard implementation
- non-Vercel production proxy/CDN setup

## What The Website Does
- Explains Klikcy's services and positioning
- Organizes offerings by category and by individual service
- Creates nationwide geographic discovery pages by state and city
- Creates programmatic service-location pages for service + state and service + state + city combinations
- Publishes structured metadata, canonical URLs, JSON-LD, sitemap output, robots rules, and AI-discovery text

## What Users Can Do
- Browse category hubs at `/categories/[slug]/`
- Browse the full service catalog at `/all-services/`
- Open individual service pages at `/services/[slug]/`
- Browse state coverage at `/service-areas/[state]/`
- Browse city coverage at `/service-areas/[state]/[city]/`
- Browse service-specific state and city landing pages at `/{service}/{state}/` and `/{service}/{state}/{city}/`
- Submit a project inquiry via `/contact/`

## What Search Engines Should Understand
- Klikcy is a U.S. digital agency serving businesses nationwide
- The site has a clear commercial service catalog
- Service pages, category pages, and geo pages are canonical, indexable, and internally linked
- State and city pages do not claim fake local offices
- The site intentionally supports nationwide visibility rather than pretending to have physical branches everywhere

## What AI Engines Should Understand
- Klikcy is a remote-first U.S. digital agency and software partner
- The agency offers websites, apps, software, AI automation, e-commerce, branding, hosting, and SEO/AEO
- Geographic pages represent service coverage, not local office presence
- Structured data, FAQ content, and AI-readable blocks are intentionally included
- AI crawlers are intentionally allowed in current robots rules, while `/api/` is blocked

## How The Site Should Scale Over Time
Current scale in code:
- 65 service pages
- 8 category pages
- 51 state/DC pages
- 266 city pages
- 3,315 service-state pages
- 17,290 service-state-city pages
- 21,000 indexable URLs in the current sitemap system

Expected scaling path:
- Add more services through the service catalog
- Expand featured city/state strategies where content quality justifies it
- Keep metadata, FAQ blocks, schema, and internal links templated but unique enough to avoid thin and duplicate-page risk
- Potentially move from code-only content catalogs to a CMS or database-backed editorial workflow once volume or collaboration needs increase

## Website Role As A Digital Agency And Software Partner Platform
Klikcy is not implemented as a simple brochure site. It behaves as:
- A digital agency marketing site
- A structured service discovery system
- A programmatic local SEO/AEO/GEO platform
- A lead-generation engine
- A reusable data-driven content platform for nationwide service coverage

That makes the website both a brand property and a scalable acquisition system.

## Confirmed Facts
- Framework and UI stack are documented in code as Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS.
- Canonical domain defaults to `https://www.klikcy.com`.
- The site uses trailing slashes.
- The current app root excludes `klikcy-next/`, which is explicitly excluded in `tsconfig.json`.
- The README states the root app is the active app and the nested `klikcy-next/` folder is legacy reference code.

## Needs Verification
- Actual business ownership/legal entity details are not confirmed in the codebase.
- Pricing model is not confirmed in codebase.
- CRM destination beyond email delivery is not confirmed in codebase.
- Google Search Console account state is not visible in the repo.
- Live hosting beyond Vercel configuration files is partially documented in repo history, but root production deployment authority is only directly confirmed by `vercel.json` and README deployment notes.
