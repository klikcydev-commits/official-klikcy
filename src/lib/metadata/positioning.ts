import type { CategorySlug } from "../categories";

/** How each category is positioned in copy and metadata (not SEO-only). */
export type ServiceVertical =
  | "web"
  | "app"
  | "ai"
  | "ecommerce"
  | "seo"
  | "branding"
  | "marketing"
  | "hosting";

export const CATEGORY_VERTICAL: Record<CategorySlug, ServiceVertical> = {
  "web-development": "web",
  "app-software": "app",
  "ai-automation": "ai",
  "ecommerce": "ecommerce",
  "seo-aeo": "seo",
  "branding-design": "branding",
  "marketing-growth": "marketing",
  "technical-hosting": "hosting",
};

export interface VerticalProfile {
  vertical: ServiceVertical;
  /** e.g. web development agency */
  agencyLabel: string;
  /** e.g. digital agency */
  partnerLabel: string;
  outcomePhrase: string;
  commercialKeywordStems: string[];
  semanticKeywordStems: string[];
  aeoQuestionStems: string[];
}

export const VERTICAL_PROFILES: Record<ServiceVertical, VerticalProfile> = {
  web: {
    vertical: "web",
    agencyLabel: "web development agency",
    partnerLabel: "digital agency",
    outcomePhrase: "conversion-focused websites built for speed, UX, and discoverability",
    commercialKeywordStems: [
      "custom website development",
      "business website design",
      "responsive website development",
      "high-performance business websites",
    ],
    semanticKeywordStems: [
      "responsive web design",
      "conversion-focused websites",
      "UI UX website design",
      "website performance optimization",
      "technical SEO for websites",
    ],
    aeoQuestionStems: [
      "Who builds custom websites for businesses in {geo}?",
      "What is the best web development agency in {geo}?",
      "How can a better website help a business get more leads?",
      "What should a business website include in 2026?",
      "How can a website be optimized for Google and AI search?",
    ],
  },
  app: {
    vertical: "app",
    agencyLabel: "app development company",
    partnerLabel: "software development partner",
    outcomePhrase: "scalable web apps, SaaS platforms, and mobile products",
    commercialKeywordStems: [
      "custom software development",
      "web app development",
      "SaaS development company",
      "mobile app developers",
    ],
    semanticKeywordStems: [
      "dashboards and portals",
      "API development",
      "database-driven applications",
      "scalable web apps",
      "custom business software",
    ],
    aeoQuestionStems: [
      "Who builds custom apps for businesses in {geo}?",
      "How much does custom app development cost in {geo}?",
      "What is the difference between a web app and a mobile app?",
      "Can Klikcy build dashboards, portals, and SaaS platforms?",
      "How can AI be added to a business app?",
    ],
  },
  ai: {
    vertical: "ai",
    agencyLabel: "AI automation agency",
    partnerLabel: "AI automation partner",
    outcomePhrase: "AI agents, chatbots, and workflow automation that remove manual work",
    commercialKeywordStems: [
      "AI business automation",
      "AI chatbot development",
      "workflow automation services",
      "CRM automation with AI",
    ],
    semanticKeywordStems: [
      "AI agents for business",
      "lead handling automation",
      "customer support automation",
      "business process automation",
      "AI tools for companies",
    ],
    aeoQuestionStems: [
      "How can AI automation help small businesses?",
      "Who builds AI agents for companies in {geo}?",
      "Can AI chatbots handle leads and customer support?",
      "How can workflows be automated with AI?",
      "What business tasks can be automated with AI?",
    ],
  },
  ecommerce: {
    vertical: "ecommerce",
    agencyLabel: "e-commerce development agency",
    partnerLabel: "e-commerce technology partner",
    outcomePhrase: "Shopify, WooCommerce, and headless stores built to convert",
    commercialKeywordStems: [
      "e-commerce development",
      "Shopify store development",
      "WooCommerce development",
      "online store development",
    ],
    semanticKeywordStems: [
      "checkout optimization",
      "product page optimization",
      "headless commerce",
      "payment integration",
      "e-commerce conversion",
    ],
    aeoQuestionStems: [
      "Who builds Shopify stores for businesses in {geo}?",
      "How do you migrate to Shopify or WooCommerce?",
      "What makes an e-commerce store convert better?",
      "Can Klikcy optimize checkout and product pages?",
      "How is e-commerce structured for Google and AI search?",
    ],
  },
  seo: {
    vertical: "seo",
    agencyLabel: "SEO and AEO agency",
    partnerLabel: "search visibility partner",
    outcomePhrase: "search visibility structured for Google and answer engines",
    commercialKeywordStems: [
      "technical SEO services",
      "local SEO company",
      "answer engine optimization",
      "SEO content strategy",
    ],
    semanticKeywordStems: [
      "schema markup SEO",
      "crawlability optimization",
      "Core Web Vitals SEO",
      "generative engine optimization",
      "search visibility systems",
    ],
    aeoQuestionStems: [
      "How does answer engine optimization work?",
      "What is the difference between SEO and AEO?",
      "Who provides technical SEO in {geo}?",
      "How can a site be optimized for AI search results?",
      "What should be in a technical SEO audit?",
    ],
  },
  branding: {
    vertical: "branding",
    agencyLabel: "UI/UX and branding studio",
    partnerLabel: "design partner",
    outcomePhrase: "brand identity and product design that feels premium and converts",
    commercialKeywordStems: [
      "UI UX design agency",
      "brand identity design",
      "design systems agency",
      "conversion-focused web design",
    ],
    semanticKeywordStems: [
      "product design",
      "design systems",
      "logo and brand design",
      "Figma design agency",
      "accessible UI design",
    ],
    aeoQuestionStems: [
      "Who does UI UX design for startups in {geo}?",
      "What is included in a brand identity project?",
      "How does design support conversion?",
      "Can Klikcy design and build the product?",
      "How should design systems scale with growth?",
    ],
  },
  marketing: {
    vertical: "marketing",
    agencyLabel: "digital growth agency",
    partnerLabel: "growth and technology partner",
    outcomePhrase: "CRO, analytics, and full-funnel growth systems",
    commercialKeywordStems: [
      "conversion rate optimization",
      "digital marketing strategy",
      "marketing analytics setup",
      "landing page optimization",
    ],
    semanticKeywordStems: [
      "Google Analytics setup",
      "Google Tag Manager setup",
      "content marketing strategy",
      "growth experiments",
      "pipeline attribution",
    ],
    aeoQuestionStems: [
      "How does CRO improve revenue per visitor?",
      "Who sets up GA4 and GTM for businesses in {geo}?",
      "What is a digital marketing strategy roadmap?",
      "How do you measure marketing ROI?",
      "When should a business invest in CRO?",
    ],
  },
  hosting: {
    vertical: "hosting",
    agencyLabel: "technical infrastructure partner",
    partnerLabel: "hosting and reliability partner",
    outcomePhrase: "domains, DNS, email, migrations, and secure hosting",
    commercialKeywordStems: [
      "website hosting setup",
      "DNS configuration services",
      "business email setup",
      "website migration services",
    ],
    semanticKeywordStems: [
      "website security hardening",
      "website backup setup",
      "SMTP configuration",
      "performance monitoring",
      "uptime monitoring",
    ],
    aeoQuestionStems: [
      "Who handles website migrations in {geo}?",
      "How do you set up business email on a custom domain?",
      "What is included in website security hardening?",
      "How should DNS be configured for reliability?",
      "When should a site move to managed hosting?",
    ],
  },
};

export function getVerticalProfile(category: CategorySlug): VerticalProfile {
  return VERTICAL_PROFILES[CATEGORY_VERTICAL[category]];
}
