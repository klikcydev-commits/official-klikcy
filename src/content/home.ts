/** Homepage copy. Keep it specific: every claim here should be something we can back up. */

export const homeHero = {
  title: "Websites, search, and automation from one team.",
  lede:
    "Klikcy is a remote-first agency for U.S. businesses. We build fast websites, get them found on Google and in AI search, and automate the repetitive work behind them. One team, start to finish, and everything stays in your name.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "See what we do", href: "/all-services" },
};

/** The hero's "project sheet": what a typical website project actually looks like. */
export const projectSheet = {
  title: "A typical website project",
  subtitle: "Marketing site, 8 to 12 pages",
  rows: [
    { when: "Week 1", what: "Discovery call, goals, sitemap, and a fixed quote", span: [0, 1] },
    { when: "Weeks 2–3", what: "Wireframes, then full designs for desktop and mobile", span: [1, 3] },
    { when: "Weeks 4–6", what: "Build on a staging link you can click through anytime", span: [3, 6] },
    { when: "Weeks 7–8", what: "Content, redirects, testing on real phones, launch", span: [6, 8] },
  ],
  footnote: "You keep the code, the domain, the hosting account, and the analytics.",
};

export const whyPoints = [
  {
    title: "You own everything",
    body: "Code, domain, hosting, and analytics are set up in your company's name from day one. If you ever move on, nothing breaks and nothing is held back.",
  },
  {
    title: "Fixed quotes, after a real conversation",
    body: "We scope the work with you first, then give you a price for it. Not a vague hourly estimate that grows every month.",
  },
  {
    title: "One team instead of four vendors",
    body: "The same people handle design, development, search, and automation, so there's nobody to point at when something falls between the cracks.",
  },
  {
    title: "Plain-English updates",
    body: "Weekly progress during projects and monthly reports during ongoing work: what we did, what changed, and what's next.",
  },
  {
    title: "Honest advice, even when it costs us work",
    body: "If an off-the-shelf tool will do the job for a few dollars a month, we'll tell you. We'd rather earn the next project.",
  },
  {
    title: "Ready for search on launch day",
    body: "Fast on real phones, accessible, and structured so Google and AI assistants can understand every page from the moment it goes live.",
  },
];

export const processSteps = [
  { label: "Talk", copy: "You tell us what's going on. We ask questions, look at what you have, and tell you honestly whether we're the right fit." },
  { label: "Scope and quote", copy: "We write down exactly what we'll deliver, the timeline, and a fixed price. Nothing starts until you're happy with it." },
  { label: "Design", copy: "Wireframes first to settle the structure, then full designs. You review everything on real devices." },
  { label: "Build", copy: "We build on a staging link you can check anytime, with a short update every week." },
  { label: "Launch", copy: "Testing, redirects, analytics, and go-live, timed so your customers don't notice anything except the improvement." },
  { label: "Look after it", copy: "Optional monthly care for updates, backups, small changes, and ongoing search work." },
];

export interface PackagePlan {
  title: string;
  description: string;
  features: string[];
}

export const packagePlans: PackagePlan[] = [
  {
    title: "Starter",
    description: "For small businesses and startups getting a proper site online.",
    features: ["Responsive website, up to 4 pages", "Hosting and maintenance", "SSL certificate and uptime monitoring"],
  },
  {
    title: "Growth",
    description: "For businesses ready to grow search visibility and lead flow.",
    features: ["Everything in Starter", "Up to 7 website pages", "SEO-focused content each month", "Priority support"],
  },
  {
    title: "Pro",
    description: "For teams that want faster growth and some automation.",
    features: ["Everything in Growth", "Advanced SEO targeting", "An AI chatbot or workflow automation", "Dedicated account manager"],
  },
  {
    title: "Enterprise",
    description: "For multi-site brands, franchises, and complex setups.",
    features: ["Everything in Pro", "Multi-site management", "Custom AI automations or internal tools", "24/7 support and maintenance"],
  },
];

export interface HomeFaqItem {
  q: string;
  a: string;
}

export const homeFaqs: HomeFaqItem[] = [
  {
    q: "Where is Klikcy based?",
    a: "We're a remote-first team and work with businesses across the United States, in all 50 states and Washington DC. Meetings happen over video, scheduled inside your business hours.",
  },
  {
    q: "What does Klikcy do?",
    a: "We build websites and online stores, improve search visibility on Google and in AI tools, automate repetitive work with AI and integrations, and develop custom apps and software. We also handle the technical side: hosting, email, security, and maintenance.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on the number of unique page layouts, whether we write the copy, and what needs to connect to the site. After a short discovery call we give you a fixed quote, so you know the full cost before any work starts.",
  },
  {
    q: "How long does a project take?",
    a: "Most marketing websites take 4 to 8 weeks. Online stores usually take 6 to 10 weeks, and web apps 8 to 16 weeks for a first release.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. Many of our clients are small and mid-size businesses. We also work with larger marketing teams and startups building products.",
  },
  {
    q: "Will we own the website and accounts?",
    a: "Yes, always. The code, domain, hosting, and analytics are in your name. We don't hold sites hostage or lock clients into our hosting.",
  },
  {
    q: "Can you work on a site someone else built?",
    a: "Yes. We start with a short audit so we understand how it's set up, then tell you whether it's worth improving or better to rebuild.",
  },
  {
    q: "What is AEO, and do we need it?",
    a: "Answer engine optimization means structuring your content so Google's AI Overviews and assistants like ChatGPT can quote it accurately. It builds on good SEO rather than replacing it, and we include the basics in every site we build.",
  },
];
