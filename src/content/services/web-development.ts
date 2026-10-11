import type { Service } from "@/lib/service-types";

export const webDevelopmentServices: Service[] = [
  {
    slug: "custom-website-development",
    name: "Custom Website Development",
    category: "web-development",
    shortDescription: "Business websites designed and coded from scratch, built to load fast and bring in leads.",
    metaTitle: "Custom Website Development Company | Klikcy",
    metaDescription:
      "Custom websites for U.S. businesses, designed and coded around your customers. Fast, accessible, easy to edit, and set up for search from launch day.",
    focusKeyword: "custom website development",
    intro:
      "We design and build websites from a blank page, around the people you sell to and the actions you need them to take. No bought themes, no page-builder bloat.",
    overview: [
      "A custom website makes sense when a template keeps getting in the way: the layout can't show what makes you different, the site is slow because of a theme carrying features you never use, or every small change needs a developer. Building from scratch lets us decide exactly what goes on each page and how it's coded.",
      "We start with your customers, not a design trend. Who lands on the site, what they need to see before they trust you, and what you want them to do next. That shapes the page structure, the copy, and where the calls to action go. Design and development happen in the same team, so what gets approved in design is what ships.",
      "Every site we hand over is yours: the code, the hosting account, the domain, the analytics. You get a content editor your team can actually use, documentation for the parts that aren't obvious, and a site that passes Core Web Vitals on real phones, not only on a fast office connection.",
    ],
    signs: [
      "Your current site looks like a dozen competitors because it runs on the same theme.",
      "Pages take more than three seconds to load on a phone and you can see it in your bounce rate.",
      "You have to call a developer for simple edits like a new staff bio or service page.",
      "You're launching a new business or brand and want the site to match it properly.",
    ],
    included: [
      "Discovery workshop and sitemap",
      "Wireframes for key pages, then full visual design",
      "Responsive front-end build with a content editor",
      "On-page SEO, schema markup, and redirects from your old URLs",
      "Google Analytics 4, Tag Manager, and Search Console set up",
      "Accessibility and speed checks before launch",
      "Training session and written handover notes",
    ],
    process: [
      { title: "Discovery", detail: "We talk through your goals, customers, and competitors, review your current analytics, and agree on a sitemap and scope." },
      { title: "Wireframes and design", detail: "Low-detail wireframes first so we can settle structure quickly, then full designs for desktop and mobile." },
      { title: "Build", detail: "We develop on a staging link you can click through at any time, with weekly check-ins on progress." },
      { title: "Launch and handover", detail: "Content migration, redirects, testing on real devices, go-live, then a training call with your team." },
    ],
    timeline: "Most marketing sites take 4 to 8 weeks from kickoff to launch. Content readiness is usually what decides where in that range you land.",
    costFactors: [
      "Number of unique page layouts (ten pages using three templates costs less than ten one-off pages)",
      "Whether we write the copy or you supply it",
      "Integrations such as booking tools, CRMs, or member logins",
      "How much content needs moving from the old site",
    ],
    pitfalls: [
      "Launching without redirects from old URLs, which throws away years of search rankings overnight.",
      "Designing desktop first and squeezing it onto phones afterwards, when most visitors are on mobile.",
      "Choosing a platform because it's popular instead of because your team can run it.",
    ],
    tools: ["Next.js and React", "WordPress (block editor)", "Headless CMS such as Sanity", "Vercel or managed hosting", "GA4 and Tag Manager"],
    related: ["nextjs-development", "seo-content-strategy", "ui-ux-design", "website-speed-optimization"],
    faqs: [
      {
        q: "How long does a custom website take to build?",
        a: "Most marketing sites launch in 4 to 8 weeks. A five-page site with copy ready to go sits at the short end. A larger site with new copy, a booking integration, and a content migration sits at the long end.",
      },
      {
        q: "Will I be able to update the site myself?",
        a: "Yes. We set up an editor for the things you change often, like pages, blog posts, team members, and service details, and we train your team on it before launch. Layout changes that would break the design stay locked.",
      },
      {
        q: "Do you handle SEO during the build?",
        a: "The technical side is part of every build: clean page structure, title tags and descriptions, schema markup, a sitemap, fast load times, and redirects from your old URLs. Ongoing content and link work is a separate service if you want it.",
      },
      {
        q: "Can you move my site off Wix, Squarespace, or an old WordPress theme?",
        a: "Yes. We move your content, map every old URL to its new home with 301 redirects, and check Search Console after launch so you keep the rankings you've already earned.",
      },
      {
        q: "Who owns the website when it's finished?",
        a: "You do. The code, domain, hosting account, and analytics are set up in your name or transferred to you at launch. We don't lock clients into our hosting.",
      },
    ],
  },
  {
    slug: "wordpress-development",
    name: "WordPress Development",
    category: "web-development",
    shortDescription: "Custom WordPress themes and block setups that are quick to load and easy for editors.",
    metaTitle: "WordPress Development Company | Klikcy",
    metaDescription:
      "Custom WordPress development: lightweight block themes, ACF content models, and solid security. For U.S. businesses that publish often and need speed.",
    focusKeyword: "wordpress development",
    intro:
      "We build WordPress sites the way the platform works best today: lightweight custom block themes, structured content fields, and a short list of well-chosen plugins.",
    overview: [
      "WordPress is still the right choice for a lot of businesses, especially ones that publish regularly or have several people editing the site. Where it goes wrong is the typical setup: a multipurpose theme, a heavy page builder, and thirty plugins that each add their own scripts. The result is slow, fragile, and scary to update.",
      "Our builds go the other way. We write a custom block theme for your design, use Advanced Custom Fields where content needs structure (locations, team members, case studies), and keep plugins to the ones that earn their place. Editors get reusable blocks that always look right instead of a blank canvas they can break.",
      "We also take over existing WordPress sites. That usually starts with an audit of plugins, hosting, and security, followed by a cleanup plan so you aren't afraid of the update button anymore.",
    ],
    signs: [
      "Your marketing team publishes weekly and needs to do it without a developer.",
      "Your current WordPress site is slow, and you suspect the theme or page builder.",
      "Plugin updates regularly break something, so nobody updates anything.",
      "You need structured content like locations, listings, or resources that a basic theme can't handle well.",
    ],
    included: [
      "Custom block theme built for your design",
      "ACF content models for structured content",
      "Custom blocks and patterns for your editors",
      "On-page SEO setup with Yoast or Rank Math",
      "Caching, image optimization, and database cleanup",
      "Security hardening, backups, and update plan",
    ],
    process: [
      { title: "Content modeling", detail: "We map your content types and fields before designing, so the editor matches how your team actually works." },
      { title: "Design", detail: "Page designs plus a library of blocks, so new pages can be assembled later without new design work." },
      { title: "Theme build", detail: "A custom block theme with only the scripts each page needs, tested on staging." },
      { title: "Launch", detail: "Migration, redirects, hosting setup, and a training session for editors." },
    ],
    timeline: "A new WordPress site usually takes 4 to 8 weeks. A cleanup and speed pass on an existing site takes 1 to 3 weeks.",
    costFactors: [
      "Number of custom blocks and page templates",
      "Complexity of the content model (custom post types, filters, relationships)",
      "Plugins that need replacing or custom code to replace them",
      "Migration from another CMS",
    ],
    pitfalls: [
      "Stacking a page builder on top of a multipurpose theme, which is the most common cause of slow WordPress sites.",
      "Installing a plugin for every small feature instead of a few lines of code.",
      "Skipping a staging site, so every update is tested on the live site.",
    ],
    tools: ["WordPress block editor", "ACF Pro", "Yoast or Rank Math", "Cloudflare", "Kinsta, WP Engine, or Cloudways"],
    related: ["technical-seo", "website-maintenance", "local-seo", "business-email-setup"],
    faqs: [
      {
        q: "Do you use page builders like Elementor or Divi?",
        a: "Not for new builds. We use the native block editor with custom blocks, which is faster and gives editors fewer ways to break the layout. If you're committed to a builder on an existing site, we can work with it and tidy it up.",
      },
      {
        q: "Can you take over and fix an existing WordPress site?",
        a: "Yes. We start with an audit of the theme, plugins, hosting, and security, then give you a prioritized list. Some sites need a few days of cleanup; some are better rebuilt. We'll tell you which.",
      },
      {
        q: "Is WordPress secure enough for a business site?",
        a: "It is when it's maintained. Most hacked WordPress sites we see had outdated plugins or weak admin passwords. We keep plugins minimal, enforce two-factor login, put a firewall in front, and keep daily backups off the server.",
      },
      {
        q: "Do you build WooCommerce stores too?",
        a: "Yes. WooCommerce is its own service page because stores bring extra work around payments, shipping, and product data.",
      },
      {
        q: "WordPress or a headless setup like Next.js?",
        a: "WordPress on its own is usually the better choice for content-led marketing sites with non-technical editors. Headless makes sense when you need app-like features, very high traffic, or content shared across several front ends.",
      },
    ],
  },
  {
    slug: "shopify-development",
    name: "Shopify Development",
    category: "web-development",
    shortDescription: "Custom Shopify themes, sections, and app integrations for brands that have outgrown a stock theme.",
    metaTitle: "Shopify Theme & App Development | Klikcy",
    metaDescription:
      "Shopify developers for custom themes, Online Store 2.0 sections, metafields, and app integrations. For U.S. brands that have outgrown their stock theme.",
    focusKeyword: "shopify development",
    intro:
      "Developer work for stores already on Shopify, or about to be: custom themes, editable sections, metafields, and the integrations a stock theme can't handle.",
    overview: [
      "This is the hands-on code side of Shopify. If you need a new store set up from zero, including products, payments, and shipping, see Shopify Store Development. This page is for brands that need a developer: a custom theme, a feature the theme store doesn't offer, or a cleanup of a theme that's been patched by five different freelancers.",
      "We build Online Store 2.0 themes with sections and blocks your team can rearrange without calling us. Product data that doesn't fit Shopify's default fields, like ingredients, size guides, or compatibility charts, goes into metafields and metaobjects, so it's managed in one place and shows up everywhere it should.",
      "Speed matters on Shopify because apps add up. A big part of our work is removing app scripts that load on every page, replacing small apps with a few lines of theme code, and making sure product images aren't slowing down your best-selling pages.",
    ],
    signs: [
      "Your theme has been customized so many times that nobody wants to touch it.",
      "You're paying monthly for apps that do one small thing each.",
      "Your product pages need content Shopify doesn't support out of the box.",
      "You're on Shopify Plus and need checkout extensions or B2B features built.",
    ],
    included: [
      "Custom Online Store 2.0 theme or rebuild of your existing one",
      "Editable sections and blocks for your marketing team",
      "Metafield and metaobject setup for richer product data",
      "App audit, with replacements in theme code where it makes sense",
      "Speed work on product and collection pages",
      "Product, collection, and breadcrumb schema",
    ],
    process: [
      { title: "Store audit", detail: "We review your theme code, installed apps, and speed reports to see what's worth keeping." },
      { title: "Plan and design", detail: "We agree on the sections and templates you need and design the ones that change." },
      { title: "Development", detail: "Theme work happens on an unpublished copy, so your live store keeps selling." },
      { title: "Publish", detail: "We test checkout, apps, and tracking, then publish and monitor sales and errors for the first days." },
    ],
    timeline: "Theme customizations take 1 to 4 weeks. A full custom theme usually takes 6 to 10 weeks.",
    costFactors: [
      "Full custom theme versus changes to your current one",
      "Number of unique templates (product, collection, landing pages)",
      "Custom app or checkout extension work",
      "Data migration from another platform",
    ],
    pitfalls: [
      "Editing the live theme directly instead of a duplicate.",
      "Installing an app for every feature until the store loads a dozen third-party scripts.",
      "Hard-coding content into theme files so the marketing team can't change it.",
    ],
    tools: ["Shopify Liquid", "Online Store 2.0", "Metafields and metaobjects", "Shopify CLI", "Hydrogen for headless builds"],
    related: ["shopify-store-development", "ecommerce-seo", "product-page-optimization", "checkout-optimization"],
    faqs: [
      {
        q: "What's the difference between this and Shopify Store Development?",
        a: "Store Development covers launching a store end to end: setup, products, payments, shipping, and design. Shopify Development is the developer work: custom themes, sections, metafields, and integrations, usually for stores that already exist.",
      },
      {
        q: "Can you work on our current theme instead of replacing it?",
        a: "Often, yes. If the theme is reasonably clean we extend it. If it's been patched so many times that every change risks breaking something, we'll recommend a rebuild and explain why.",
      },
      {
        q: "Do you build custom Shopify apps?",
        a: "We build private apps and integrations when a store needs something specific, like syncing with an ERP or a custom pricing rule. For common needs, a well-supported public app is often the better deal.",
      },
      {
        q: "Do you work with Shopify Plus?",
        a: "Yes, including checkout extensibility, Shopify Functions for discounts and shipping rules, and B2B catalogs.",
      },
      {
        q: "Will the redesign affect our SEO?",
        a: "Shopify keeps product and collection URLs stable, which helps. We keep your existing title tags and descriptions, add structured data, and set up redirects for any pages that move.",
      },
    ],
  },
  {
    slug: "nextjs-development",
    name: "Next.js Development",
    category: "web-development",
    shortDescription: "Next.js and React sites and web apps for teams that need speed and room to grow.",
    metaTitle: "Next.js Development Company | Klikcy",
    metaDescription:
      "Next.js development for marketing sites, headless commerce, and web apps. Server rendering, strong Core Web Vitals, and clean TypeScript code you own.",
    focusKeyword: "nextjs development",
    intro:
      "We build with Next.js when a site needs to behave like an app, serve a lot of pages quickly, or pull content from several systems at once.",
    overview: [
      "Next.js is a React framework that renders pages on the server or at build time, so visitors and search engines get real HTML quickly instead of waiting for JavaScript to assemble the page. It's what we use for sites with thousands of pages, headless stores, and products that mix marketing pages with logged-in features.",
      "It isn't the right tool for everyone. A small business that wants to edit its own pages is usually better served by WordPress. We recommend Next.js when there's a real reason: performance targets, a custom data source, a product team that already works in React, or a plan to grow into app features later.",
      "Our Next.js projects use TypeScript, the App Router, and a headless CMS where editors need one. You get a repository your own developers can pick up, with a README that explains how it's built and deployed.",
    ],
    signs: [
      "You need hundreds or thousands of pages generated from data, such as locations, products, or listings.",
      "Your marketing site and your product should share a design system and codebase.",
      "You want to pair a headless CMS or Shopify with a fast custom front end.",
      "Your current React app ranks poorly because search engines see an empty page.",
    ],
    included: [
      "Architecture plan covering rendering, data, and hosting",
      "Next.js App Router build in TypeScript",
      "Headless CMS integration where editors need it",
      "Metadata, sitemaps, and structured data generated from your content",
      "Image and font optimization",
      "CI/CD deployment with preview links for every change",
    ],
    process: [
      { title: "Architecture", detail: "We decide which pages are static, which are server-rendered, and where data comes from." },
      { title: "Design system", detail: "Shared components built once and reused across pages and features." },
      { title: "Build", detail: "Feature work in short cycles, with preview deployments you can review in the browser." },
      { title: "Launch", detail: "Performance checks, redirects, monitoring, and handover documentation." },
    ],
    timeline: "Marketing sites typically take 6 to 10 weeks. Sites with app features or large data sets take longer and are scoped in phases.",
    costFactors: [
      "Number of data sources and integrations",
      "Whether a headless CMS is needed and which one",
      "Logged-in or app-like features",
      "Hosting requirements such as self-hosting instead of Vercel",
    ],
    pitfalls: [
      "Rendering everything in the browser, which defeats most of the reason to use Next.js.",
      "Choosing a headless CMS the content team finds harder than what they had.",
      "Generating thousands of near-identical pages that search engines treat as thin content.",
    ],
    tools: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Sanity, Contentful, or Payload", "Vercel or self-hosted Node"],
    related: ["programmatic-seo", "website-speed-optimization", "api-development", "database-architecture"],
    faqs: [
      {
        q: "Why choose Next.js over WordPress?",
        a: "Next.js is faster and more flexible for custom features and large data-driven sites. WordPress is easier for non-technical teams who mainly edit pages and posts. We'll recommend whichever fits how your team works.",
      },
      {
        q: "Can our marketing team still edit content?",
        a: "Yes. We connect a headless CMS such as Sanity, Contentful, or Payload, and set up live previews so editors can see changes before publishing.",
      },
      {
        q: "Where do you host Next.js sites?",
        a: "Vercel by default because it's built for Next.js. We also deploy to AWS or a plain Node server when there's a cost, compliance, or infrastructure reason.",
      },
      {
        q: "Is Next.js good for SEO?",
        a: "It's one of the best options, as long as pages are rendered on the server or at build time. We also generate metadata, canonical tags, sitemaps, and structured data from your content so nothing is forgotten as the site grows.",
      },
      {
        q: "Can you migrate an existing React or WordPress site to Next.js?",
        a: "Yes. We map every URL, carry content across, and set up redirects so rankings and backlinks carry over.",
      },
    ],
  },
  {
    slug: "landing-page-design",
    name: "Landing Page Design",
    category: "web-development",
    shortDescription: "Single-purpose pages for ads, launches, and offers, designed around one action.",
    metaTitle: "Landing Page Design & Development | Klikcy",
    metaDescription:
      "Landing pages built for one goal: a call, a signup, or a sale. Copy direction, design, fast build, and tracking set up for your ads and campaigns.",
    focusKeyword: "landing page design",
    intro:
      "A landing page has one job. We design and build pages around a single action, matched to the ad or email that sends people there, with tracking you can trust.",
    overview: [
      "Most paid traffic is sent to a homepage or a general service page, then judged on cost per lead. A focused landing page usually does better because it repeats the promise from the ad, answers the obvious questions, and gives one clear next step instead of a full navigation menu.",
      "We start with the offer and the audience. What did the ad say? What does someone need to believe before they fill in the form? From there we write or shape the copy, design the page, and build it to load quickly on a phone, because that's where most ad clicks happen.",
      "This service is for new pages. If you already have landing pages and want to improve their conversion rate through testing, see Landing Page Optimization.",
    ],
    signs: [
      "You're sending paid traffic to your homepage.",
      "You're launching a product, event, or offer with its own campaign.",
      "Your ad click-through rate is fine but leads cost too much.",
      "You need a page live quickly without waiting on a full site project.",
    ],
    included: [
      "Offer and audience brief",
      "Copy direction or full copywriting",
      "Mobile-first design",
      "Fast build on your site or a standalone page",
      "Form or booking integration with your CRM",
      "Conversion tracking for Google Ads, Meta, and GA4",
    ],
    process: [
      { title: "Brief", detail: "We look at the ad, the audience, and the offer, and agree on the one action that counts." },
      { title: "Copy and wireframe", detail: "Headline, proof, objections, and call to action laid out before any visual design." },
      { title: "Design and build", detail: "A fast page with tracking wired to your ad platforms." },
      { title: "Launch check", detail: "Test submissions, tracking checks, and a review after the first week of traffic." },
    ],
    timeline: "Most landing pages take 1 to 3 weeks, depending on how much copy needs writing and how many integrations are involved.",
    costFactors: [
      "Whether we write the copy",
      "Number of variants for A/B testing",
      "CRM, booking, or payment integrations",
      "Custom illustrations or photography",
    ],
    pitfalls: [
      "A headline that doesn't match the ad, so visitors feel they've landed in the wrong place.",
      "Asking for too much information in the first form.",
      "Launching without testing that conversions actually reach the ad platform.",
    ],
    tools: ["Next.js or your existing CMS", "HubSpot, Salesforce, or Pipedrive forms", "Calendly or Cal.com", "GA4, Google Ads, and Meta pixels"],
    related: ["landing-page-optimization", "conversion-rate-optimization", "ui-ux-design", "google-tag-manager-setup"],
    faqs: [
      {
        q: "How long does a landing page take?",
        a: "Usually 1 to 3 weeks. If the copy and offer are settled, we can often move faster.",
      },
      {
        q: "Do you write the copy?",
        a: "We can. Some clients send a draft and we shape it; others give us the brief and we write it. Either way, the copy is settled before design starts.",
      },
      {
        q: "Can the page live on our existing website?",
        a: "Usually, yes. We build inside your CMS when it can load quickly. If your site is slow or hard to edit, a standalone page on a subdomain can be the better choice.",
      },
      {
        q: "Will you set up A/B tests?",
        a: "We can build variants from the start. For ongoing testing and iteration, Landing Page Optimization is the better fit.",
      },
      {
        q: "Does the form connect to our CRM?",
        a: "Yes. We connect forms to HubSpot, Salesforce, Pipedrive, Zoho, and most other CRMs, and test that every lead arrives with its source.",
      },
    ],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    category: "web-development",
    shortDescription: "A new design and structure for your site without losing the search traffic you've built.",
    metaTitle: "Website Redesign Services | Klikcy",
    metaDescription:
      "Website redesigns that keep your search traffic. We audit what works, rebuild what doesn't, map every redirect, and track rankings before and after launch.",
    focusKeyword: "website redesign services",
    intro:
      "We redesign websites without throwing away what already works. That means checking which pages bring in traffic and leads before anything gets moved or deleted.",
    overview: [
      "Redesigns go wrong in a predictable way: the new site looks better, launches, and organic traffic drops by a third because URLs changed, pages were merged, and nobody set up redirects. We've cleaned up enough of these to plan for it from day one.",
      "Before design starts we pull data from Search Console and Analytics to see which pages earn traffic, links, and conversions. Those pages keep their URLs or get a one-to-one redirect. Pages that earn nothing are candidates for merging or removal. Then we redesign around what visitors are actually trying to do.",
      "A redesign is also a chance to fix the foundations: slow hosting, an outdated CMS, poor accessibility. We'll tell you which of those are worth doing now and which can wait.",
    ],
    signs: [
      "Your site looks dated next to competitors and you're losing deals to them.",
      "You've rebranded and the website no longer matches.",
      "Organic traffic or leads have been sliding for months.",
      "The site is hard to update, so it's out of date.",
    ],
    included: [
      "Analytics and Search Console review",
      "Content inventory and URL redirect map",
      "New information architecture and design",
      "Rebuild on your current platform or a better-suited one",
      "Pre- and post-launch SEO checks",
      "Post-launch checks on rankings, crawl errors, and forms",
    ],
    process: [
      { title: "Audit", detail: "We inventory every page and its traffic, links, and conversions, and decide what stays, merges, or goes." },
      { title: "Structure and design", detail: "A new sitemap and page designs, built around the questions visitors arrive with." },
      { title: "Build and migrate", detail: "Development on staging with content moved and every redirect tested." },
      { title: "Launch and monitor", detail: "We check rankings, crawl errors, and leads after go-live and fix anything that slips." },
    ],
    timeline: "Most redesigns take 6 to 12 weeks. Large sites with hundreds of pages are usually phased.",
    costFactors: [
      "Size of the current site and how much content changes",
      "Staying on the same platform or moving",
      "New copywriting versus reusing existing copy",
      "Integrations that need rebuilding",
    ],
    pitfalls: [
      "Changing URLs without a redirect map.",
      "Deleting old blog posts that still bring in steady traffic.",
      "Redesigning on opinions alone without looking at what visitors do on the current site.",
    ],
    tools: ["Google Search Console", "GA4", "Screaming Frog", "Ahrefs or Semrush", "Your chosen CMS"],
    related: ["website-migration", "ui-ux-design", "technical-seo", "conversion-rate-optimization"],
    faqs: [
      {
        q: "Will we lose Google rankings after a redesign?",
        a: "Some movement in the first couple of weeks is normal. Lasting drops usually come from missing redirects, deleted content, or blocked pages. We plan for all three and watch Search Console closely after launch.",
      },
      {
        q: "Can we keep our current CMS?",
        a: "Yes, if it's serving you well. If it's the reason the site is hard to update or slow, we'll explain the alternatives and what a move would involve.",
      },
      {
        q: "How long does a redesign take?",
        a: "Usually 6 to 12 weeks. The biggest variable is content: how much is being rewritten and how quickly it's approved.",
      },
      {
        q: "Do you rewrite the content too?",
        a: "We can. Most redesigns include rewriting the key pages (home, services, about) and tidying the rest.",
      },
      {
        q: "What happens if something breaks after launch?",
        a: "We check redirects, forms, and tracking right after launch and fix anything related to the project. For ongoing monitoring after that, a maintenance plan covers it month to month.",
      },
    ],
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    category: "web-development",
    shortDescription: "Monthly updates, backups, monitoring, and small fixes, handled by people who know your site.",
    metaTitle: "Website Maintenance Services | Klikcy",
    metaDescription:
      "Website maintenance plans for WordPress, Shopify, and custom sites: updates tested on staging, off-site backups, uptime monitoring, and monthly small fixes.",
    focusKeyword: "website maintenance services",
    intro:
      "A monthly plan that keeps your site updated, backed up, and watched, plus a block of time for the small changes that always come up.",
    overview: [
      "Websites don't stay finished. Plugins and frameworks release security updates, hosting changes, forms stop sending, and someone always needs a new page or a price change. Without a plan, these pile up until something breaks.",
      "Our maintenance plans cover the routine work: updates tested on a staging copy before they touch the live site, daily backups stored away from your server, uptime and error monitoring, and a short monthly report in plain English. Each plan includes time for small content and development tasks, so you have someone to email when you need a change.",
      "We maintain sites we built and sites we didn't. For sites new to us, we start with a short audit so we know what we're looking after.",
    ],
    signs: [
      "Nobody on your team owns website updates.",
      "Your site has gone down before and you heard about it from a customer.",
      "You have a backlog of small changes waiting for someone to make them.",
      "Your previous developer has moved on.",
    ],
    included: [
      "Core, theme, and plugin updates tested on staging",
      "Daily off-site backups with tested restores",
      "Uptime and error monitoring",
      "Security scanning and firewall management",
      "Monthly time for small content and development tasks",
      "Plain-English monthly report",
    ],
    process: [
      { title: "Onboarding audit", detail: "We review your site, hosting, and access, and fix anything urgent first." },
      { title: "Monitoring setup", detail: "Uptime checks, error tracking, and backup schedules configured and tested." },
      { title: "Monthly cycle", detail: "Updates, checks, and requested tasks, with a short report at the end of the month." },
      { title: "Quarterly review", detail: "A look at speed, security, and anything worth planning for the next quarter." },
    ],
    timeline: "Onboarding takes about a week. After that, plans run month to month.",
    costFactors: [
      "Platform and how many plugins or apps need managing",
      "Number of sites",
      "Hours of development time included each month",
      "Response time you need",
    ],
    pitfalls: [
      "Auto-updating everything on the live site with no staging copy.",
      "Keeping backups on the same server as the site.",
      "Never testing whether backups actually restore.",
    ],
    tools: ["Staging environments", "Cloudflare", "Better Stack uptime monitoring", "Sentry", "Off-site cloud backups"],
    related: ["website-security", "website-backup-setup", "performance-monitoring", "hosting-setup"],
    faqs: [
      {
        q: "What's included in a maintenance plan?",
        a: "Updates, backups, uptime monitoring, security checks, a monthly report, and a set number of hours for small changes. Larger projects are quoted separately so the monthly fee stays predictable.",
      },
      {
        q: "Do you maintain sites you didn't build?",
        a: "Yes. We start with a short audit so we understand the setup and can flag anything risky before we take responsibility for it.",
      },
      {
        q: "What happens if the site goes down?",
        a: "Our monitoring alerts us, and we respond within your plan's response time. Most outages come from hosting, expired domains, or a failed update, and we work through those in that order.",
      },
      {
        q: "Which platforms do you support?",
        a: "WordPress, WooCommerce, Shopify, and custom Next.js or React sites.",
      },
      {
        q: "Is there a long contract?",
        a: "No. Plans are month to month after onboarding.",
      },
    ],
  },
  {
    slug: "website-speed-optimization",
    name: "Website Speed Optimization",
    category: "web-development",
    shortDescription: "Core Web Vitals fixes that make your site load faster on real phones.",
    metaTitle: "Website Speed Optimization Services | Klikcy",
    metaDescription:
      "Core Web Vitals and speed fixes for WordPress, Shopify, and React sites. We find what slows real visitors down and fix it, with before-and-after data.",
    focusKeyword: "website speed optimization",
    intro:
      "We find out what's actually slowing your site down for real visitors, fix it at the source, and show you the before-and-after numbers.",
    overview: [
      "Google's Core Web Vitals measure three things: how quickly the main content appears (LCP, ideally under 2.5 seconds), how quickly the page responds to a tap or click (INP, under 200 milliseconds), and how much the layout jumps around while loading (CLS, under 0.1). They feed into rankings, and they line up closely with whether visitors stay or leave.",
      "A Lighthouse score from your laptop isn't the whole picture. We look at field data from real visitors in Search Console and the Chrome UX Report, then trace each problem to its cause: an oversized hero image, a font that blocks rendering, a chat widget loading on every page, slow hosting, or JavaScript that freezes the page on older phones.",
      "Fixes are made in order of impact. Some take an hour, like compressing images or deferring a script. Others take longer, like replacing a heavy theme or moving hosts. You'll know which is which before we start.",
    ],
    signs: [
      "Search Console flags pages as 'Poor' or 'Needs improvement' for Core Web Vitals.",
      "Your site feels slow on your own phone.",
      "Paid traffic bounces before the page finishes loading.",
      "You've installed speed plugins and nothing changed.",
    ],
    included: [
      "Core Web Vitals audit using field and lab data",
      "Prioritized list of fixes with expected impact",
      "Image, font, and script optimization",
      "Caching and CDN configuration",
      "Third-party script audit",
      "Before-and-after report",
    ],
    process: [
      { title: "Measure", detail: "We collect field data and lab tests for your most important page templates." },
      { title: "Diagnose", detail: "Each slow metric is traced to a specific cause, ranked by how much it costs you." },
      { title: "Fix", detail: "Changes are made on staging where possible and tested on mid-range phones." },
      { title: "Verify", detail: "We compare before and after, and keep watching field data as it updates over the following weeks." },
    ],
    timeline: "Most speed projects take 1 to 3 weeks. Field data in Search Console takes about 28 days to fully reflect the changes.",
    costFactors: [
      "Platform and how much control we have over the code",
      "Number of page templates involved",
      "Third-party scripts that need replacing rather than deferring",
      "Whether hosting needs to change",
    ],
    pitfalls: [
      "Chasing a perfect Lighthouse score while real-visitor data stays poor.",
      "Stacking several caching and optimization plugins that conflict with each other.",
      "Lazy-loading the hero image, which makes the most important metric worse.",
    ],
    tools: ["PageSpeed Insights", "Chrome UX Report", "WebPageTest", "Cloudflare", "Real-user monitoring"],
    related: ["technical-seo", "hosting-setup", "performance-monitoring", "nextjs-development"],
    faqs: [
      {
        q: "How fast can my site get?",
        a: "Most sites can pass all three Core Web Vitals after a focused project. How far you can go depends on the platform: a custom site has more headroom than a theme that loads a page builder on every page.",
      },
      {
        q: "Does site speed affect Google rankings?",
        a: "Core Web Vitals are part of Google's page experience signals. They won't outrank better content on their own, but between two similar pages the faster one has an edge, and faster pages convert better.",
      },
      {
        q: "Why is my PageSpeed score different every time?",
        a: "Lab tests vary with network and server conditions. That's why we weight the field data from real visitors, which is what Google uses for ranking.",
      },
      {
        q: "Do you work on Shopify and WordPress?",
        a: "Yes, along with Next.js, React, and most other stacks. The fixes differ by platform, but the method is the same.",
      },
      {
        q: "How soon will we see results?",
        a: "Lab scores change immediately. Field data in Search Console is a rolling 28-day average, so it catches up over about a month.",
      },
    ],
  },
];
