# Competitor Keyword Research — Klikcy

Klikcy is a **full digital agency** (web, apps, software, AI automation, e-commerce, branding, growth). SEO/AEO/GEO supports that positioning — it does not define the whole brand.

## Workflow

1. Pick a **priority market** (state or city) from `src/lib/seo/priorityMarkets.ts`.
2. Run the query groups in `docs/seo/priority-market-keywords.md` in Google (manual) or export from Ahrefs/Semrush.
3. Log each competitor in `docs/seo/competitor-research-template.csv`.
4. Fill the **keyword gap** and **page opportunity** tables below.
5. Translate gaps into metadata via `src/lib/seo/generators.ts` and `src/lib/metadata/page-metadata.ts` — never copy competitor copy.

## Query groups

| Group | Example pattern |
|-------|-----------------|
| Web development | `web development agency {city}` |
| App / software | `app development company {city}` |
| AI automation | `AI automation agency {city}` |
| SEO / AEO / GEO | `SEO agency {city}`, `AEO agency {city}` |

## Competitor extraction checklist

For each ranking URL document:

- Competitor name and URL
- Ranking query and market
- Title tag, meta description, H1, H2 outline
- Service + location keywords used
- FAQ questions and schema types (`Service`, `FAQPage`, `LocalBusiness`, etc.)
- Internal links and CTA wording
- Strengths, weaknesses, **gap for Klikcy**

## Keyword gap table

| Query | Market | Competitor | Their Title | Their Main Keywords | Missing Opportunity for Klikcy | Recommended Klikcy Keyword |
|-------|--------|------------|-------------|---------------------|--------------------------------|----------------------------|
| web development agency Manhattan | Manhattan, NY | _paste URL_ | _paste title_ | _paste_ | _e.g. AI-ready websites, software + web bundle_ | web development agency in Manhattan |

## Page opportunity table

| Priority Page | Primary Keyword | Secondary Keywords | Competitor Gap | Recommended Metadata Angle |
|---------------|-----------------|-------------------|----------------|---------------------------|
| `/custom-website-development/new-york/manhattan` | web development agency in Manhattan | React websites, Shopify Manhattan | Competitors SEO-only | Full-stack digital agency: web + apps + AI |

## Rules

- Do **not** scrape Google in violation of Terms of Service.
- Do **not** plagiarize titles, descriptions, or body copy.
- Do **not** claim guaranteed #1 rankings — use professional language (compete, structured, discoverability).
- Refresh research every **60–90 days**.

## Code integration

- Priority markets: `src/lib/seo/priorityMarkets.ts`
- Keyword boosts: `src/lib/seo/keywords.ts`
- Page SEO payloads: `src/lib/seo/generators.ts`
