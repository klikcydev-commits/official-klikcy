export type CategorySlug =
  | "web-development"
  | "seo-aeo"
  | "ai-automation"
  | "app-software"
  | "ecommerce"
  | "branding-design"
  | "marketing-growth"
  | "technical-hosting";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  tagline: string;
  description: string;
  icon: string; // lucide name
}

export const categories: Category[] = [
  {
    slug: "web-development",
    name: "Web Development",
    short: "Websites",
    tagline: "Fast, scalable, SEO-ready sites built to convert.",
    description:
      "Custom websites built on modern stacks — from marketing sites and landing pages to WordPress, Shopify, and high-performance React (Vite) experiences engineered for speed, SEO and growth.",
    icon: "Code2",
  },
  {
    slug: "seo-aeo",
    name: "SEO & AEO",
    short: "Search Growth",
    tagline: "Rank in Google and answer engines like ChatGPT and Gemini.",
    description:
      "Technical SEO, on-page SEO, local SEO, programmatic SEO, schema, and answer-engine optimization that compounds traffic and pipeline.",
    icon: "Search",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    short: "AI Workflows",
    tagline: "Automate operations with AI agents, chatbots and workflows.",
    description:
      "AI agents, chatbots, CRM and workflow automation, MCP integrations, and AI reporting that reduce manual work and unlock scale.",
    icon: "Bot",
  },
  {
    slug: "app-software",
    name: "App & Software",
    short: "Apps",
    tagline: "Web apps, SaaS, mobile and admin dashboards.",
    description:
      "Production-grade web apps, SaaS products, PWAs, mobile apps, dashboards, APIs and database architecture.",
    icon: "Layers",
  },
  {
    slug: "ecommerce",
    name: "E-Commerce",
    short: "Stores",
    tagline: "Shopify, WooCommerce and headless stores that scale.",
    description:
      "Shopify and WooCommerce builds, e-commerce SEO, product page and checkout optimization, payment and shipping integrations.",
    icon: "ShoppingBag",
  },
  {
    slug: "branding-design",
    name: "Branding & Design",
    short: "Design",
    tagline: "UI/UX, brand identity and conversion-led design systems.",
    description:
      "Brand identity, logo, design systems, UI/UX and conversion-focused web design that makes products feel premium.",
    icon: "Palette",
  },
  {
    slug: "marketing-growth",
    name: "Marketing & Growth",
    short: "Growth",
    tagline: "CRO, analytics and full-funnel marketing systems.",
    description:
      "Digital strategy, conversion rate optimization, analytics and tag manager setup, content and email marketing.",
    icon: "TrendingUp",
  },
  {
    slug: "technical-hosting",
    name: "Technical & Hosting",
    short: "Infrastructure",
    tagline: "Domains, DNS, email, hosting, security, monitoring.",
    description:
      "Domain and DNS, business email, SMTP, migrations, security hardening, backups, hosting setup and uptime monitoring.",
    icon: "Server",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
