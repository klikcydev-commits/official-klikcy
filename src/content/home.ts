/** Homepage copy — separated from components for CMS scalability. */

export interface CredibilityItem {
  title: string;
  body: string;
}

export interface PillarItem {
  title: string;
  body: string;
}

export interface ProcessStep {
  n: string;
  label: string;
  copy: string;
}

export interface ImpactCard {
  title: string;
  body: string;
  iconKey: string;
}

export interface ExperienceTile {
  title: string;
  body: string;
  iconKey: string;
}

export interface TechnologyCapability {
  title: string;
  body: string;
}

export interface TechnologyOrbitNode {
  label: string;
  iconKey: string;
  ring: "inner" | "outer";
}

export interface PackagePlan {
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  popular?: boolean;
}

export interface HomeFaqItem {
  q: string;
  a: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const homeHero = {
  eyebrow: "Digital agency · United States",
  headlineBefore: "We engineer",
  headlineAccent: "signal",
  headlineAfter: "not noise.",
  sub:
    "Klikcy ships websites, SEO & AEO, AI automation, commerce, and hosting as one accountable system — built for U.S. teams who need speed, clarity, and measurable lift.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View capabilities", href: "/categories/web-development" },
  heroImage: {
    src: "/hero-klikcy.webp",
    width: 550,
    height: 368,
    alt: "Cool-toned pier photograph used as atmospheric hero art for the Klikcy homepage.",
  },
  stats: [
    { label: "Coverage", value: "50 states + DC" },
    { label: "Disciplines", value: "Eight practices" },
    { label: "Delivery", value: "Remote-first" },
  ] as const,
};

export const credibilityStrip: CredibilityItem[] = [
  { title: "Strategy-first websites", body: "Information architecture and UX that align to revenue, not vanity pages." },
  { title: "SEO/AEO-ready builds", body: "Semantic structure, schema, and performance budgets baked in from day one." },
  { title: "Automation-driven systems", body: "Agents, workflows, and integrations that remove manual bottlenecks." },
  { title: "Performance-focused development", body: "Lean React (Vite) stacks, tuned assets, and measurable Core Web Vitals." },
  { title: "Conversion-focused design", body: "Visual hierarchy, CTAs, and trust paths tested for clarity on every breakpoint." },
];

export const whyPillars: PillarItem[] = [
  {
    title: "Growth systems, not one-off pages",
    body: "We connect brand, UX, engineering, search, and automation so your digital footprint compounds instead of fragmenting.",
  },
  {
    title: "Design + SEO + automation together",
    body: "No silos: the same team ships UI that converts, copy that ranks, and workflows that keep operations lean.",
  },
  {
    title: "Built for visibility and conversion",
    body: "Answer-engine readiness, structured data, and CRO-minded layouts — engineered for humans and machines.",
  },
  {
    title: "Technical depth with business fluency",
    body: "From hosting and security to analytics and APIs — we speak both boardroom outcomes and implementation detail.",
  },
];

export const processSteps: ProcessStep[] = [
  { n: "01", label: "Discover", copy: "Goals, audience, constraints, and growth levers — mapped in one strategic frame." },
  { n: "02", label: "Design", copy: "Experience architecture, UI systems, and narrative flow that earn attention." },
  { n: "03", label: "Build", copy: "Accessible, fast frontends and reliable integrations — React, Vite, WordPress, Shopify." },
  { n: "04", label: "Optimize", copy: "Technical SEO, AEO, schema, CWV tuning, and analytics you can trust." },
  { n: "05", label: "Launch", copy: "Hardened hosting, DNS, email, monitoring, and rollback-safe releases." },
  { n: "06", label: "Grow", copy: "Automation, content systems, and iterative experiments that scale what works." },
];

export const impactCards: ImpactCard[] = [
  { title: "Faster websites", body: "Lean builds and disciplined assets so every interaction feels instant and intentional.", iconKey: "zap" },
  { title: "Better search visibility", body: "Structured entities, internal linking, and technical hygiene that search engines reward.", iconKey: "search" },
  { title: "Cleaner user journeys", body: "Clarified paths from first touch to conversion — fewer dead ends, more momentum.", iconKey: "activity" },
  { title: "Stronger conversion paths", body: "CTA systems, proof placement, and narrative rhythm tuned for decisions.", iconKey: "trending" },
  { title: "Scalable digital systems", body: "Components, data layers, and automation that keep working as you add markets.", iconKey: "cpu" },
];

export const experienceTiles: ExperienceTile[] = [
  { title: "UI/UX design", body: "Product-grade interfaces, design systems, and brand-led storytelling.", iconKey: "palette" },
  { title: "Development", body: "Modern React (Vite), WordPress, Shopify, APIs, and integrations.", iconKey: "code" },
  { title: "SEO & AEO", body: "Technical + on-page SEO with answer-engine optimization for AI citations.", iconKey: "search" },
  { title: "Automation", body: "AI workflows, agents, CRM automation, and operational tooling.", iconKey: "workflow" },
  { title: "Analytics", body: "Measurement plans, event quality, and dashboards leadership actually uses.", iconKey: "chart" },
  { title: "Hosting & maintenance", body: "Security, backups, email, DNS, uptime, and proactive performance care.", iconKey: "server" },
];

export const technologyCapabilities: TechnologyCapability[] = [
  {
    title: "Frontend systems",
    body: "React, Vite, CMS and commerce stacks selected for speed, maintainability, and SEO-aware rendering.",
  },
  {
    title: "Design workflows",
    body: "UI systems, prototypes, and brand execution that keep design and engineering moving in the same direction.",
  },
  {
    title: "Infrastructure layer",
    body: "Hosting, monitoring, email, security, backups, and performance tuning built into the operational plan.",
  },
];

export const technologyOrbitNodes: TechnologyOrbitNode[] = [
  { label: "React", iconKey: "code", ring: "outer" },
  { label: "SEO", iconKey: "search", ring: "outer" },
  { label: "AI flows", iconKey: "workflow", ring: "inner" },
  { label: "Commerce", iconKey: "cart", ring: "outer" },
  { label: "Analytics", iconKey: "chart", ring: "inner" },
  { label: "Hosting", iconKey: "server", ring: "outer" },
  { label: "Security", iconKey: "shield", ring: "inner" },
  { label: "Brand", iconKey: "palette", ring: "outer" },
];

export const packagePlans: PackagePlan[] = [
  {
    title: "Starter",
    description: "For small businesses or startups launching online.",
    features: [
      "1 responsive website (up to 4 pages)",
      "Hosting & maintenance",
      "SSL certificate & uptime monitoring",
    ],
    ctaLabel: "Get started",
  },
  {
    title: "Growth",
    description: "For businesses ready to scale visibility and lead flow.",
    features: [
      "Everything in Starter",
      "Up to 7 website pages",
      "SEO-optimized monthly content",
      "Priority support",
    ],
    ctaLabel: "Most popular",
    popular: true,
  },
  {
    title: "Pro",
    description: "For teams that want aggressive growth and smarter automation.",
    features: [
      "Everything in Growth",
      "Advanced SEO targeting",
      "AI chatbot or workflow integration",
      "Dedicated account manager",
    ],
    ctaLabel: "Go pro",
  },
  {
    title: "Enterprise",
    description: "For multi-site brands, franchises, or complex digital ecosystems.",
    features: [
      "Everything in Pro",
      "Multi-site management",
      "Custom AI automations or internal tools",
      "24/7 support & maintenance",
    ],
    ctaLabel: "Contact us",
  },
];

export const homeStats: StatItem[] = [
  { value: 147, suffix: "+", label: "Shipped launches since 2019" },
  { value: 38, suffix: "%", label: "Avg. LCP improvement on rebuilds" },
  { value: 12, suffix: "", label: "Week cadence for exec-ready demos" },
];

export const homeFaqs: HomeFaqItem[] = [
  { q: "Where is Klikcy based?", a: "Klikcy is a remote-first digital agency serving clients across the United States — all 50 states and Washington DC." },
  { q: "What services does Klikcy offer?", a: "Web development, SEO and AEO, AI automation, app and software development, e-commerce, branding and UI/UX, marketing and growth, plus technical hosting, maintenance, email, security, and performance." },
  { q: "Do you work with small businesses and enterprise?", a: "Yes — from local services and DTC brands to SaaS startups and enterprise marketing teams." },
  { q: "How long does a typical project take?", a: "Marketing sites in 4–8 weeks, e-commerce in 6–10 weeks, web apps in 8–16 weeks. We provide a fixed timeline after discovery." },
  { q: "Do you provide SEO and AEO together?", a: "Yes — our SEO programs are built for both Google rankings and AI engine citations (ChatGPT, Gemini, Perplexity, AI Overviews)." },
  {
    q: "What is AEO (answer engine optimization)?",
    a: "AEO structures your content, schema, and entities so AI assistants and AI Overviews can accurately cite your brand — alongside classic technical and on-page SEO for Google.",
  },
  {
    q: "Can Klikcy host, secure, and maintain what you build?",
    a: "Yes — we offer technical hosting, DNS and email setup, backups, monitoring, security hardening, and ongoing performance tuning so launches stay fast and stable.",
  },
  {
    q: "Do you integrate AI automation with existing tools?",
    a: "We connect CRMs, support stacks, data warehouses, and custom APIs — designing automations that reduce manual work without creating fragile one-off scripts.",
  },
];
