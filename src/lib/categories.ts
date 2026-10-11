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
  /** Short label for menus. */
  short: string;
  /** One sentence for cards and menus. */
  tagline: string;
  /** Hero paragraph on the category page. */
  description: string;
  metaTitle: string;
  metaDescription: string;
  /** Longer explanation shown on the category page. */
  overview: string[];
  /** How we approach work in this practice. */
  principles: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const categories: Category[] = [
  {
    slug: "web-development",
    name: "Web Development",
    short: "Websites",
    tagline: "Business websites that load fast, rank, and bring in leads.",
    description:
      "Custom websites on Next.js, WordPress, and Shopify, from a single landing page to a full redesign, plus the maintenance and speed work that keeps them healthy.",
    metaTitle: "Web Development Services | Custom Websites | Klikcy",
    metaDescription:
      "Web development for U.S. businesses: custom sites, WordPress, Shopify, Next.js, landing pages, redesigns, speed fixes, and maintenance. Fast, editable, yours.",
    overview: [
      "Your website does a lot of quiet work. It's where people check you out after a referral, where ads send traffic, and where search engines decide whether you're worth showing. When it's slow, dated, or hard to update, that work suffers, usually without anyone noticing until leads dry up.",
      "We build websites with the platform that fits your team. WordPress when non-technical editors publish often. Shopify when you sell products. Next.js when you need speed at scale, custom features, or thousands of pages from data. Every build ships with the technical SEO basics done, analytics working, and a handover your team can actually use.",
    ],
    principles: [
      { title: "You own everything", body: "Code, domain, hosting, and analytics live in your accounts from day one. No lock-in." },
      { title: "Speed is a requirement", body: "We test on mid-range phones, not just fast laptops, and every site passes Core Web Vitals before launch." },
      { title: "Editors come first", body: "We design the content editor as carefully as the pages, so updates don't need a developer." },
      { title: "Rankings survive launch", body: "Old URLs are mapped and redirected, and we watch Search Console after go-live." },
    ],
    faqs: [
      {
        q: "Which platform should my website use?",
        a: "WordPress for content-heavy sites with non-technical editors, Shopify for online stores, and Next.js for high-performance or data-driven sites. We recommend based on how your team works, not on what's trendy.",
      },
      {
        q: "How long does a new website take?",
        a: "Most marketing sites take 4 to 8 weeks. Landing pages take 1 to 3 weeks, and larger redesigns 6 to 12 weeks.",
      },
      {
        q: "Do you look after websites after launch?",
        a: "Yes. Maintenance plans cover updates, backups, monitoring, and small changes each month.",
      },
    ],
  },
  {
    slug: "seo-aeo",
    name: "SEO & AEO",
    short: "Search",
    tagline: "Get found in Google, AI Overviews, and AI assistants.",
    description:
      "Technical SEO, on-page work, local SEO, content strategy, and answer engine optimization, so customers find you when they search and AI tools describe you accurately.",
    metaTitle: "SEO & AEO Services | Google and AI Search | Klikcy",
    metaDescription:
      "SEO and answer engine optimization for U.S. businesses: technical fixes, on-page and local SEO, schema, content strategy, and visibility in AI search tools.",
    overview: [
      "Search has changed more in the last two years than in the ten before. Google now answers many questions with AI Overviews, and a growing number of people ask ChatGPT, Perplexity, or Gemini for recommendations. The fundamentals still decide who wins: pages search engines can crawl, content that genuinely answers the question, and a reputation other sites vouch for.",
      "Our search work starts with what's broken, because technical problems quietly cap everything else. Then we focus on the pages closest to revenue, like service and category pages, before expanding into content. We don't promise rankings or AI placements nobody can guarantee. We do show you exactly what we changed and what happened as a result.",
    ],
    principles: [
      { title: "Fix the foundation first", body: "Crawling, indexing, and duplicate content problems get solved before anything else." },
      { title: "Revenue pages before blog posts", body: "We start where traffic turns into leads and sales." },
      { title: "No tricks", body: "No link schemes, doorway pages, or keyword stuffing. They work until they don't, and recovery is slow." },
      { title: "Honest reporting", body: "Rankings, traffic, and leads, including what didn't move and why." },
    ],
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Technical fixes can show results within weeks. Content and authority usually take three to six months to build meaningful traffic, longer in competitive markets.",
      },
      {
        q: "What's the difference between SEO, AEO, and GEO?",
        a: "SEO is ranking in search results. AEO is being the source of direct answers, like featured snippets and AI Overviews. GEO is being mentioned accurately by AI assistants such as ChatGPT and Perplexity. They share the same foundation.",
      },
      {
        q: "Can you guarantee first-page rankings?",
        a: "No one can honestly guarantee rankings, because Google controls the results. We can guarantee the work: clear priorities, real fixes, and transparent reporting.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    short: "AI & Automation",
    tagline: "Hand repetitive work to software that does it reliably.",
    description:
      "AI chatbots, agents, workflow and CRM automation, document extraction, reporting, and MCP integrations, built around real processes with people kept in the loop.",
    metaTitle: "AI Automation Services for Business | Klikcy",
    metaDescription:
      "AI automation for U.S. businesses: chatbots, AI agents, workflow and CRM automation, document extraction, and reporting, built with logging and human review.",
    overview: [
      "There's a lot of noise around AI. Underneath it is something genuinely useful: software can now read emails, documents, and conversations well enough to handle a lot of routine work, and act on it in your other systems. For many businesses, that frees up hours a week per person.",
      "We start with your processes, not the technology. Where does your team copy data between systems, answer the same question again, or wait on a report? We automate those steps with whatever fits best, which is often a plain integration rather than AI, and we measure the time saved so you can judge the result.",
    ],
    principles: [
      { title: "Process before tools", body: "We map how work moves today before deciding what to automate." },
      { title: "AI only where it helps", body: "Simple rules handle simple steps. AI handles judgment and messy text." },
      { title: "People stay in the loop", body: "Consequential actions get human approval until the automation has earned trust." },
      { title: "Everything is logged", body: "You can see what ran, what it did, and what failed." },
    ],
    faqs: [
      {
        q: "Where should a business start with AI automation?",
        a: "With a repetitive task that takes real time each week and has clear inputs and outputs, like sorting inbound requests, extracting data from documents, or drafting routine replies.",
      },
      {
        q: "Is our data used to train AI models?",
        a: "Not with the business API tiers we use, which don't train on customer data by default. We also keep sensitive information out of prompts where we can.",
      },
      {
        q: "What does AI automation cost to run?",
        a: "Running costs come from platform subscriptions and AI usage. For most small and mid-size businesses they're modest, and we estimate them before building.",
      },
    ],
  },
  {
    slug: "app-software",
    name: "App & Software",
    short: "Apps",
    tagline: "Web apps, SaaS products, mobile apps, and internal tools.",
    description:
      "Custom web applications, SaaS products, iOS and Android apps, dashboards, APIs, and business software, scoped in phases so you see working software early.",
    metaTitle: "Custom App & Software Development | Klikcy",
    metaDescription:
      "Custom software development for U.S. businesses: web apps, SaaS, mobile apps, PWAs, dashboards, APIs, and databases. Phased delivery and code you own.",
    overview: [
      "Software projects fail in familiar ways: too much scope, too little contact with real users, and months of building before anyone sees anything. We work the opposite way. The first release is deliberately small, focused on the feature that proves the idea or removes the biggest pain, and we demo working software every two weeks.",
      "We build with mainstream, well-supported technology, mostly TypeScript, React, Next.js, Node, and PostgreSQL, so any competent developer can pick up the code later. It lives in your repository and accounts from the first commit.",
    ],
    principles: [
      { title: "Small first release", body: "We launch the smallest useful version, then build on real feedback." },
      { title: "Demos every two weeks", body: "You see working software throughout, not just at the end." },
      { title: "Boring technology", body: "Proven, popular tools that are easy to hire for and maintain." },
      { title: "Your code, your accounts", body: "Everything is in your name from day one." },
    ],
    faqs: [
      {
        q: "How much does custom software cost?",
        a: "It depends on users, screens, and integrations. We price each phase as a fixed scope after discovery, so the cost is known before development starts.",
      },
      {
        q: "Should we build custom or use an existing product?",
        a: "Use an existing product if it covers most of your needs. Build when your process is unusual, gives you an edge, or when workarounds cost more than building.",
      },
      {
        q: "Can you work with our in-house team?",
        a: "Yes. We can lead the project, work alongside your developers, or hand over with documentation and pairing.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-Commerce",
    short: "E-Commerce",
    tagline: "Online stores that sell more and cost less to run.",
    description:
      "Shopify and WooCommerce stores, e-commerce SEO, product page and checkout optimization, payments, shipping, and marketplaces, for brands selling online in the U.S.",
    metaTitle: "E-Commerce Development | Shopify & WooCommerce | Klikcy",
    metaDescription:
      "E-commerce development for U.S. brands: Shopify and WooCommerce stores, product page and checkout optimization, payments, shipping, SEO, and marketplaces.",
    overview: [
      "Running an online store means juggling a lot: product data, photos, shipping rates, taxes, payment methods, apps, email flows, and search visibility. Small problems in any of them cost sales quietly, such as a shipping rate that's too high, a checkout step that confuses mobile shoppers, or a category page that never ranks.",
      "We build and improve stores with that whole picture in mind. For most brands we recommend Shopify, because it's reliable and low-maintenance. WooCommerce makes sense when you need custom product logic or tight integration with WordPress content. Either way, we keep the app list short, the store fast, and the checkout simple.",
    ],
    principles: [
      { title: "Fewer apps", body: "Every app adds cost and often slows the store. We use them only where they earn it." },
      { title: "Mobile shoppers first", body: "Most store traffic is on phones, so that's where we design and test." },
      { title: "Costs shown upfront", body: "Shipping and delivery surprises are the top reason carts get abandoned." },
      { title: "Measured by revenue", body: "We track conversion rate and order value, not just traffic." },
    ],
    faqs: [
      {
        q: "Shopify or WooCommerce?",
        a: "Shopify for most stores, because it's easier to run. WooCommerce for unusual product logic, full code control, or stores built into a large WordPress site.",
      },
      {
        q: "How long does it take to launch an online store?",
        a: "Most new stores launch in 6 to 10 weeks. Large catalogs and migrations take longer.",
      },
      {
        q: "Can you improve the store we already have?",
        a: "Yes. Product page, checkout, speed, and SEO work on existing stores often brings faster returns than a rebuild.",
      },
    ],
  },
  {
    slug: "branding-design",
    name: "Branding & Design",
    short: "Design",
    tagline: "Brand identities and interfaces people trust and understand.",
    description:
      "Brand identity, logo design, UI/UX for websites and apps, design systems, graphic design, and social templates, designed by people who also understand how it gets built.",
    metaTitle: "Branding & UI/UX Design Services | Klikcy",
    metaDescription:
      "Branding and design for growing U.S. businesses: brand identity, logos, UI/UX for sites and apps, design systems, graphic design, and social media templates.",
    overview: [
      "Design is how people decide, in a few seconds, whether you look trustworthy, whether they understand what you do, and whether your product is easy to use. Good design isn't decoration; it's clarity.",
      "Our design team works alongside our developers, which keeps designs realistic and avoids the handoff gaps where good ideas get lost. For brands, we start with positioning so the visual identity answers a clear brief. For interfaces, we test with real users before anything is built.",
    ],
    principles: [
      { title: "Clarity over decoration", body: "Every element has a job. If it doesn't help someone understand or act, it goes." },
      { title: "Test with real people", body: "Prototypes are tested with users before development starts." },
      { title: "Designed to be built", body: "Our designers work with our developers, so designs are practical to ship." },
      { title: "Systems, not one-offs", body: "Guidelines and templates keep things consistent after we hand off." },
    ],
    faqs: [
      {
        q: "Do you design and build, or just design?",
        a: "Both. Many clients have us do the whole project, but we also hand off clean, documented design files to other developers.",
      },
      {
        q: "How long does a brand identity take?",
        a: "Most brand identity projects take 6 to 10 weeks. A logo on its own usually takes 2 to 4 weeks.",
      },
      {
        q: "Do you use AI to generate designs?",
        a: "We use AI tools for research and quick exploration, but final logos, identities, and interfaces are designed and refined by people.",
      },
    ],
  },
  {
    slug: "marketing-growth",
    name: "Marketing & Growth",
    short: "Marketing",
    tagline: "Measure what works and turn more visitors into customers.",
    description:
      "Marketing strategy, conversion rate optimization, GA4 and Tag Manager setup, Search Console, landing page testing, content marketing, and email marketing.",
    metaTitle: "Digital Marketing & Growth Services | Klikcy",
    metaDescription:
      "Digital marketing and growth for U.S. businesses: strategy, conversion optimization, GA4 and Tag Manager, landing page testing, content, and email marketing.",
    overview: [
      "Most businesses don't need more marketing activity; they need to know which activity works. That starts with measurement you can trust, and continues with a focused plan and steady improvement of the pages and emails that turn interest into revenue.",
      "We set up analytics properly, help you choose the few channels worth committing to, and improve conversion rates through research and testing. Where content and email fit your customers, we build those programs too.",
    ],
    principles: [
      { title: "Measurement first", body: "If the numbers can't be trusted, nothing else can be judged." },
      { title: "Focus beats volume", body: "A few channels done well outperform many done halfway." },
      { title: "Research before testing", body: "Tests come from evidence about your visitors, not generic best practices." },
      { title: "Lead quality counts", body: "We judge results by customers won, not just form fills." },
    ],
    faqs: [
      {
        q: "Where should we start?",
        a: "Usually with analytics. Once you can see where leads and sales actually come from, the right next step becomes much clearer.",
      },
      {
        q: "Do you manage paid ads?",
        a: "We focus on strategy, analytics, landing pages, content, and email, and work alongside your ads team or a specialist we recommend.",
      },
      {
        q: "How do you report results?",
        a: "Monthly, in plain English, covering leads, sales, conversion rates, and what we're changing next.",
      },
    ],
  },
  {
    slug: "technical-hosting",
    name: "Technical & Hosting",
    short: "Hosting & IT",
    tagline: "Domains, email, hosting, security, and backups, handled properly.",
    description:
      "Domains, DNS, business email, transactional email, hosting, migrations, security, backups, and monitoring: the infrastructure your website and email depend on.",
    metaTitle: "Web Hosting, Email & Website Security Services | Klikcy",
    metaDescription:
      "Technical services for business websites: domains, DNS, Google Workspace and Microsoft 365 email, hosting, migrations, security, backups, and monitoring.",
    overview: [
      "Behind every website and inbox sits a layer of infrastructure most people never think about: domain registrations, DNS records, hosting, email authentication, SSL certificates, and backups. When it's set up carelessly, the failures are painful, like a domain that expires, email that lands in spam, or a hacked site with no working backup.",
      "We set this layer up properly and document it, so you know what you have, where it lives, and who can access it. Everything is in your company's name.",
    ],
    principles: [
      { title: "Your accounts, your name", body: "Domains, hosting, and email belong to your business, not a contractor." },
      { title: "Documented", body: "You get a clear record of what's set up where." },
      { title: "Tested recovery", body: "Backups are restored in testing before you ever need them." },
      { title: "No-downtime changes", body: "Moves and migrations are planned so customers don't notice." },
    ],
    faqs: [
      {
        q: "Why do our emails go to spam?",
        a: "The most common cause is missing or incorrect SPF, DKIM, and DMARC records. We check and fix all three.",
      },
      {
        q: "Who should own our domain and hosting accounts?",
        a: "Your business, with at least two people having access. We move accounts out of personal or contractor ownership as part of setup.",
      },
      {
        q: "Can you help if our site has been hacked?",
        a: "Yes. We clean the site, close the security hole that let the attacker in, and request removal from Google's warning lists.",
      },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
