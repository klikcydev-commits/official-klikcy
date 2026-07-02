# Content Model

## Overview
Klikcy currently uses a code-first content model. Most structured content lives in TypeScript files under `src/lib/` and `src/content/`, not in a CMS.

## Services Model
- File location: `src/lib/services.ts`
- Model name: `Service`

### Fields
- `slug: string`
- `name: string`
- `category: CategorySlug`
- `shortDescription: string`
- `metaTitle: string`
- `metaDescription: string`
- `focusKeyword: string`
- `keywords: string[]`
- `whoFor: string[]`
- `included: string[]`
- `technical: string[]`
- `related: string[]`
- `faqs: { q: string; a: string }[]`
- `intro: string`

### Required Fields
All listed fields are required by the TypeScript interface.

### Optional Fields
None currently defined.

### Example Object
```ts
{
  slug: "custom-website-development",
  name: "Custom Website Development",
  category: "web-development",
  shortDescription: "Bespoke, fast websites engineered for SEO and conversion.",
  metaTitle: "Custom Website Development Company | Klikcy",
  metaDescription: "Custom website development built for speed, SEO and conversion. Klikcy builds scalable business websites for U.S. companies.",
  focusKeyword: "custom website development",
  keywords: ["custom website development", "website development company"],
  whoFor: ["Local businesses", "Startups & SaaS teams"],
  included: ["Discovery, IA and content strategy", "On-page SEO and schema"],
  technical: ["Modern stack (Next.js, React or WordPress)", "Sitemap, robots, canonical strategy"],
  related: ["nextjs-development", "seo-content-strategy"],
  faqs: [{ q: "How long does a custom website take to build?", a: "Most marketing sites launch in 4–8 weeks depending on scope." }],
  intro: "Klikcy designs and develops custom websites that are fast, accessible and built to rank."
}
```

### SEO Fields
- `metaTitle`
- `metaDescription`
- `focusKeyword`
- `keywords`
- `slug`

### Schema Fields
- `name`
- `shortDescription`
- `slug`
- FAQ content

### Sitemap Fields
- `slug`

### Internal Linking Fields
- `category`
- `related`

## Categories Model
- File location: `src/lib/categories.ts`
- Model name: `Category`

### Fields
- `slug`
- `name`
- `short`
- `tagline`
- `description`
- `icon`

### Required Fields
All fields are required.

### Optional Fields
None currently defined.

### Example Object
```ts
{
  slug: "seo-aeo",
  name: "SEO & AEO",
  short: "Search Growth",
  tagline: "Rank in Google and answer engines like ChatGPT and Gemini.",
  description: "Technical SEO, on-page SEO, local SEO, programmatic SEO, schema, and answer-engine optimization that compounds traffic and pipeline.",
  icon: "Search"
}
```

### SEO Fields
- `slug`
- `name`
- `tagline`
- `description`

### Schema Fields
- used indirectly by category SEO/schema generation

### Sitemap Fields
- `slug`

### Internal Linking Fields
- `slug`

## States Model
- File location: `src/lib/states.ts`
- Model name: `State`

### Fields
- `slug`
- `name`
- `abbr`
- `region`
- `priority`
- `cities`
- `blurb`

### Required Fields
All fields are required.

### Optional Fields
None currently defined.

### Example Object
```ts
{
  slug: "new-york",
  name: "New York",
  abbr: "NY",
  region: "Northeast",
  priority: true,
  cities: ["New York City", "Manhattan", "Brooklyn"],
  blurb: "finance, media, fashion, real estate and SaaS"
}
```

### SEO Fields
- `slug`
- `name`
- `abbr`
- `blurb`
- `priority`

### Schema Fields
- `name`
- `abbr`

### Sitemap Fields
- `slug`
- `cities`

### Internal Linking Fields
- `priority`
- `cities`

## Cities Model
- File location: `src/lib/cities.ts`
- Model name: `CityRef`

### Fields
- `name`
- `slug`
- `state`

### Required Fields
All fields are required in derived `CityRef`.

### Optional Fields
None currently defined.

### Example Object
```ts
{
  name: "Manhattan",
  slug: "manhattan",
  state: { slug: "new-york", name: "New York", abbr: "NY", region: "Northeast", priority: true, cities: [], blurb: "finance..." }
}
```

### SEO Fields
- `name`
- `slug`
- `state`

### Schema Fields
- `name`
- `state.name`

### Sitemap Fields
- `slug`
- `state.slug`

### Internal Linking Fields
- `slug`
- `state.slug`

## Locations Model
Not currently found as a separate model.

Current equivalent:
- state and city data in `src/lib/states.ts` and `src/lib/cities.ts`

Recommended future model:
- explicit `locations.ts` only if additional non-state/city location entities are needed

## Blog Model
Not currently found.

Recommended future model:
- `slug`
- `title`
- `description`
- `publishedAt`
- `updatedAt`
- `author`
- `body`
- `tags`
- `featuredImage`
- `canonical`
- `schemaType`
- `indexable`

## Case Study Model
Not currently found.

Recommended future model:
- `slug`
- `title`
- `client`
- `industry`
- `services`
- `challenge`
- `solution`
- `results`
- `publishedAt`
- `updatedAt`
- `featuredImage`
- `canonical`
- `indexable`

## FAQ Model
Current FAQ shapes exist in multiple places.

### Confirmed FAQ Shapes
- `src/lib/schema.ts`: `FaqItem` with `q`, `a`
- `src/lib/geo-aeo-content.ts`: `GeoFaq` with `q`, `a`, optional `list`
- service objects in `src/lib/services.ts`: `faqs: { q, a }[]`
- homepage FAQs in `src/content/home.ts`
- about FAQs in `src/content/about.ts`

### Fields
- `q`
- `a`
- optional `list`

## Schema Model
- File location: `src/lib/schema.ts`

Current schema is function-based, not stored as content objects.

### Confirmed schema builders
- `orgSchema`
- `websiteSchema`
- `webPageSchema`
- `aboutPageSchema`
- `contactPageSchema`
- `collectionPageSchema`
- `breadcrumbSchema`
- `serviceSchema`
- `serviceSchemaWithArea`
- `faqSchema`

## Metadata Model
Two metadata model layers are used.

### `PageMetadata`
- File location: `src/lib/metadata/page-metadata.ts`
- Fields:
  - `title`
  - `description`
  - `keywords`
  - `primaryKeyword`

### `SeoPayload`
- File location: `src/lib/seo/metadata.ts`
- Fields:
  - `title`
  - `description`
  - `canonical`
  - `keywords`
  - `primaryKeyword`
  - `secondaryKeywords`
  - `aeoQuestions?`
  - `geoTerms?`
  - `ogImage?`
  - `robots?`
  - `jsonLd?`

## Navigation Model
- File locations:
  - `src/lib/nav-categories.ts`
  - `src/lib/nav-groups.ts`

### Confirmed shapes
- primary nav category slug arrays
- all-services nav category slug arrays
- grouped all-services navigation tree

### Fields in nav groups
- `id`
- `label`
- `tagline`
- `categorySlugs`

## Footer Model
Not implemented as a separate data file.

Current footer data is embedded in `src/components/Footer.tsx` and derived from:
- `getPrimaryNavCategories()`
- `getAllServicesNavCategories()`
- `priorityStates`
- `services`

Recommended future model:
- separate footer config file if marketing wants non-dev editing

## CTA Model
Current CTA component:
- File location: `src/components/CTA.tsx`

### Fields
- `title`
- `description?`
- `primaryHref?`
- `primaryLabel?`
- `secondaryHref?`
- `secondaryLabel?`
- `className?`

CTA copy is also embedded directly in many view files.

## Contact Form Model

### Frontend Form Shape
- File location: `src/components/ContactForm.tsx`

Fields:
- `name`
- `email`
- `phone`
- `company`
- `service`
- `message`
- `website` honeypot

### Backend Validation Shape
- File location: `src/lib/contact.ts`
- Model name: `contactSchema`

Required:
- `name`
- `email`
- `phone`
- `service`
- `message`

Optional:
- `company`
- `website` honeypot

### SEO Fields
Not applicable directly, but contact page metadata exists separately.

### Internal Linking Fields
Not applicable

## Homepage Content Model
- File location: `src/content/home.ts`

Confirmed content structures:
- `homeHero`
- `credibilityStrip`
- `whyPillars`
- `processSteps`
- `impactCards`
- `experienceTiles`
- `technologyCapabilities`
- `technologyOrbitNodes`
- `packagePlans`
- `homeStats`
- `homeFaqs`

This is a real content model even though it is not CMS-backed.

## About Content Model
- File location: `src/content/about.ts`

Confirmed structures:
- `aboutSeo`
- `aboutHero`
- `aboutWhoWeAre`
- `aboutDifferentiators`
- `aboutServiceCards`
- `aboutProcessSteps`
- `aboutTechStacks`
- `aboutLocations`
- `aboutIndustries`
- `aboutSeoPhilosophy`
- `aboutTrust`
- `aboutFaqs`
- `aboutCta`

## Sitemap Model
- File locations:
  - `src/lib/sitemap-urls.ts`
  - `src/lib/seo/lastmod.ts`

Current sitemap entry fields:
- `url`
- `lastModified`
- `changeFrequency`
- `priority`

## Missing Models Worth Introducing Later
- blog
- case studies
- testimonials/reviews
- authors
- explicit footer config
- explicit editorial CTA config
- publish workflow/status metadata
- sitemap eligibility flags by entry
