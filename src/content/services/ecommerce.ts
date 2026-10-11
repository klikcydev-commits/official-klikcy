import type { Service } from "@/lib/service-types";

export const ecommerceServices: Service[] = [
  {
    slug: "shopify-store-development",
    name: "Shopify Store Development",
    category: "ecommerce",
    shortDescription: "A new Shopify store set up end to end: design, products, payments, shipping, and launch.",
    metaTitle: "Shopify Store Development & Setup | Klikcy",
    metaDescription:
      "Launch a Shopify store the right way: design, product setup, payments, shipping, taxes, apps, and SEO, handled end to end for U.S. brands.",
    focusKeyword: "shopify store development",
    intro:
      "We launch Shopify stores end to end: design, product catalog, payments, shipping, taxes, and the handful of apps you actually need, ready to take orders on day one.",
    overview: [
      "Opening a Shopify store looks easy until you're deep in the settings: shipping zones, tax collection by state, product variants, return policies, payment methods, email templates, and which of the thousands of apps to trust. Small mistakes here cause real problems, like undercharged shipping or tax collected in the wrong states.",
      "We set the store up properly from the start. That includes a design that fits your brand (built on a solid theme or customized where it matters), a clean product structure with collections that make sense to shoppers, shipping rates that cover your costs, and the order, shipping, and abandoned-cart emails customers will see.",
      "If you're moving from another platform such as WooCommerce, Squarespace, BigCommerce, or Magento, we migrate products, customers, and order history, and redirect old URLs so your search traffic follows you.",
    ],
    signs: [
      "You're launching a new product line or brand online.",
      "You're moving to Shopify from another platform.",
      "You started a store yourself and it's not converting or is hard to manage.",
      "You sell in person and want to add online sales with shared inventory.",
    ],
    included: [
      "Store design on a well-built theme, customized to your brand",
      "Product, variant, and collection setup",
      "Payments, shipping rates, and tax settings",
      "Customer email and notification templates",
      "Essential app selection and setup",
      "Migration and redirects from your old platform",
      "Launch checklist and staff training",
    ],
    process: [
      { title: "Plan", detail: "We map your catalog, shipping, tax, and fulfillment needs before touching settings." },
      { title: "Design", detail: "Homepage, collection, and product page designs approved before build." },
      { title: "Build and configure", detail: "Theme work, products, apps, and settings, with test orders throughout." },
      { title: "Launch", detail: "Final checks on payments, shipping, tracking, and emails, then go live." },
    ],
    timeline: "Most new Shopify stores take 6 to 10 weeks. Migrations with large catalogs take longer.",
    costFactors: [
      "Catalog size and variant complexity",
      "Theme customization versus a full custom theme",
      "Migration from another platform",
      "Integrations with inventory, ERP, or fulfillment services",
    ],
    pitfalls: [
      "Flat-rate shipping that doesn't cover heavy or oversized items.",
      "Installing a dozen apps at launch that slow the store down.",
      "Forgetting redirects when migrating, which loses product page rankings.",
    ],
    tools: ["Shopify and Shopify Plus", "Shopify Payments", "Shopify Markets", "Klaviyo", "ShipStation or Shopify Shipping"],
    related: ["shopify-development", "ecommerce-seo", "product-page-optimization", "checkout-optimization"],
    faqs: [
      {
        q: "How long does it take to build a Shopify store?",
        a: "Most stores launch in 6 to 10 weeks. Catalog size, product photography, and migration work are the biggest variables.",
      },
      {
        q: "Can you migrate our store to Shopify?",
        a: "Yes. We move products, customers, and order history from WooCommerce, BigCommerce, Squarespace, Magento, and others, and redirect old URLs to their new Shopify equivalents.",
      },
      {
        q: "Do you set up sales tax?",
        a: "We configure Shopify's tax settings based on where you've told us you're registered to collect. Which states you need to register in is a question for your accountant, and we'll flag it early.",
      },
      {
        q: "Which apps do we need?",
        a: "Fewer than you'd think. Usually email marketing, reviews, and sometimes subscriptions or a shipping tool. Every app adds cost and some slow the store, so we choose carefully.",
      },
      {
        q: "Will we be able to manage the store ourselves?",
        a: "Yes. We train your team on products, orders, discounts, and content before launch, and leave written notes for the less common tasks.",
      },
    ],
  },
  {
    slug: "woocommerce-development",
    name: "WooCommerce Development",
    category: "ecommerce",
    shortDescription: "WooCommerce stores built and tuned for speed, with the flexibility of WordPress behind them.",
    metaTitle: "WooCommerce Development Company | Klikcy",
    metaDescription:
      "WooCommerce development for stores that need WordPress flexibility: custom builds, speed fixes, payment and shipping setup, and plugin cleanup.",
    focusKeyword: "woocommerce development",
    intro:
      "We build and fix WooCommerce stores, which make sense when you want full control, deep content, or custom product logic that hosted platforms make difficult.",
    overview: [
      "WooCommerce runs on WordPress, so you own everything and can customize almost anything. That flexibility is the reason to choose it, and also the reason many WooCommerce stores end up slow and fragile: too many plugins, a heavy theme, and hosting that can't handle the database load of a store.",
      "For new stores, we build lean: a custom or lightweight theme, a short list of reliable extensions, and hosting sized for e-commerce traffic. For existing stores, we audit plugins, database size, and checkout speed, then fix the bottlenecks.",
      "We'll also tell you honestly if Shopify would suit you better. For many small and mid-size stores without unusual requirements, it's less maintenance. WooCommerce wins when you need custom pricing rules, complex product configurations, or tight integration with a content-heavy WordPress site.",
    ],
    signs: [
      "Your WooCommerce store is slow, especially at checkout.",
      "You need product logic Shopify can't handle without awkward workarounds.",
      "Content and commerce need to live closely together on one site.",
      "Plugin conflicts keep breaking things.",
    ],
    included: [
      "New store build or audit of your existing store",
      "Lightweight theme and product page templates",
      "Payment gateway and shipping configuration",
      "Plugin audit and cleanup",
      "Database and caching optimization",
      "Security hardening and backups",
    ],
    process: [
      { title: "Audit or plan", detail: "For existing stores, a technical review. For new ones, a catalog and requirements plan." },
      { title: "Design", detail: "Shop, product, and checkout designs focused on clarity and speed." },
      { title: "Build", detail: "Development on a staging copy with test orders through every payment method." },
      { title: "Launch", detail: "Go-live, monitoring, and a short period of close support." },
    ],
    timeline: "New stores usually take 6 to 10 weeks. Fixes and speed work on existing stores take 1 to 4 weeks.",
    costFactors: [
      "Custom product logic or pricing rules",
      "Number of extensions and integrations",
      "Catalog size",
      "Hosting changes",
    ],
    pitfalls: [
      "Running a store on cheap shared hosting.",
      "Caching cart and checkout pages, which breaks them.",
      "Adding a plugin for every small feature.",
    ],
    tools: ["WooCommerce", "WordPress block themes", "Stripe and PayPal", "ShipStation", "Kinsta or WP Engine hosting"],
    related: ["wordpress-development", "ecommerce-seo", "checkout-optimization", "payment-integration"],
    faqs: [
      {
        q: "WooCommerce or Shopify?",
        a: "Shopify is less work to run and suits most stores. WooCommerce is better for unusual product logic, full code control, or stores that are tightly linked with a large WordPress content site.",
      },
      {
        q: "Why is my WooCommerce store slow?",
        a: "The usual causes are underpowered hosting, too many plugins, a heavy theme, and a bloated database. We measure before guessing.",
      },
      {
        q: "Can you migrate WooCommerce to Shopify?",
        a: "Yes, with products, customers, orders, and redirects. We also move stores the other way when there's a good reason.",
      },
      {
        q: "Do you maintain WooCommerce stores?",
        a: "Yes. Stores need regular updates tested on staging, because a broken plugin on a store means lost sales.",
      },
    ],
  },
  {
    slug: "ecommerce-seo",
    name: "E-Commerce SEO",
    category: "ecommerce",
    shortDescription: "Search visibility for category and product pages, so shoppers find you before they find a marketplace.",
    metaTitle: "E-Commerce SEO Services | Klikcy",
    metaDescription:
      "E-commerce SEO for Shopify, WooCommerce, and custom stores: category pages, product content, faceted navigation, schema, and site structure that ranks.",
    focusKeyword: "ecommerce seo",
    intro:
      "Online stores have SEO problems other sites don't: thousands of near-duplicate pages, filters that create endless URLs, and thin manufacturer descriptions. We fix those and build pages that rank.",
    overview: [
      "For most stores, category pages are the biggest SEO opportunity. Someone searching 'women's waterproof hiking boots' wants a range of options, which is exactly what a well-built category page offers. Yet many stores leave category pages as a grid of products with no text, no clear title, and no reason for Google to prefer them over Amazon.",
      "We work through the structure first: which categories should exist based on how people search, how filters and sorting are handled so they don't create thousands of duplicate URLs, and how products link to categories and to each other. Then we improve the content: category introductions that help shoppers choose, product descriptions that answer real questions, and structured data for price, availability, and reviews.",
      "Product schema can show price and stock directly in search results and qualify products for Google's free shopping listings via Merchant Center. Those are often quick wins.",
    ],
    signs: [
      "Your category pages don't rank for the obvious searches.",
      "Product descriptions are copied from the manufacturer.",
      "Filters create thousands of URLs in Google's index.",
      "You rely on paid ads and marketplaces for most sales.",
    ],
    included: [
      "Technical audit for indexing, duplication, and faceted navigation",
      "Category structure and keyword mapping",
      "Category page content and optimization",
      "Product description templates and priority rewrites",
      "Product and breadcrumb structured data",
      "Merchant Center free listings setup",
    ],
    process: [
      { title: "Audit", detail: "We crawl the store and check what Google indexes, duplicates, or ignores." },
      { title: "Structure", detail: "We plan categories around search demand and fix filter and pagination handling." },
      { title: "Content", detail: "Category intros and product content, starting with your best sellers." },
      { title: "Track", detail: "We monitor rankings, organic revenue, and index coverage monthly." },
    ],
    timeline: "Technical fixes take 2 to 4 weeks. Content work and ranking gains build over 3 to 6 months.",
    costFactors: [
      "Catalog size",
      "Platform and technical access",
      "Number of categories needing content",
      "Product description rewriting volume",
    ],
    pitfalls: [
      "Letting every filter combination be indexed.",
      "Deleting out-of-stock product pages that have links and traffic.",
      "Thin category pages with nothing but a product grid.",
    ],
    tools: ["Google Search Console", "Google Merchant Center", "Screaming Frog", "Ahrefs or Semrush", "Shopify and WooCommerce SEO settings"],
    related: ["technical-seo", "product-page-optimization", "schema-markup-seo", "seo-content-strategy"],
    faqs: [
      {
        q: "What's the most important page type for e-commerce SEO?",
        a: "Category pages for most stores, because they match broad shopping searches. Product pages matter more for searches that include a specific brand or model.",
      },
      {
        q: "What should we do with out-of-stock products?",
        a: "If they're coming back, keep the page live and show when. If they're gone for good, redirect to the closest alternative or the category, especially if the page has links or traffic.",
      },
      {
        q: "Are free Google Shopping listings worth it?",
        a: "Yes, for most stores. Products can appear in the Shopping tab without ad spend once your Merchant Center feed and structured data are in order.",
      },
      {
        q: "Do you write product descriptions?",
        a: "We write templates and rewrite priority products ourselves. For large catalogs, we combine templates with your product data so descriptions are accurate and specific.",
      },
    ],
  },
  {
    slug: "product-page-optimization",
    name: "Product Page Optimization",
    category: "ecommerce",
    shortDescription: "Product pages redesigned around the questions shoppers have before they add to cart.",
    metaTitle: "Product Page Optimization Services | Klikcy",
    metaDescription:
      "Product page optimization that lifts add-to-cart rates: clearer images, sizing, shipping and returns info, reviews, and mobile layouts tested on real shoppers.",
    focusKeyword: "product page optimization",
    intro:
      "Most shoppers who leave a product page do so because a question went unanswered. We find those questions and redesign the page to answer them.",
    overview: [
      "A product page has to replace everything a shopper would do in a store: look closely, check the size, feel the material, ask about returns. When the page doesn't answer something, people either leave or open a new tab to search, and many don't come back.",
      "We start with evidence: analytics showing where shoppers drop off, session recordings, customer service questions, reviews, and returns reasons. Those tell us what's missing. Common fixes include better photos and video, a clearer size guide, shipping costs and delivery dates shown upfront, returns information near the add-to-cart button, and reviews that are easy to scan.",
      "Mobile gets the most attention because that's where most shopping happens and where pages most often fail: buttons below the fold, images that don't zoom, and options that are hard to select with a thumb.",
    ],
    signs: [
      "Plenty of product page views but a low add-to-cart rate.",
      "Customer service answers the same product questions every day.",
      "High return rates for fit or 'not as described'.",
      "Mobile conversion rate far below desktop.",
    ],
    included: [
      "Analytics, recording, and customer feedback review",
      "Product page audit on mobile and desktop",
      "Redesigned page template",
      "Photo and video guidelines",
      "Size, shipping, and returns information improvements",
      "Before-and-after conversion tracking or A/B test",
    ],
    process: [
      { title: "Research", detail: "We gather data on what shoppers do and what they ask." },
      { title: "Prioritize", detail: "We rank fixes by expected impact and effort." },
      { title: "Redesign", detail: "A new template, designed mobile first, with your team's input." },
      { title: "Test", detail: "We measure results with an A/B test where traffic allows, or before-and-after comparison." },
    ],
    timeline: "Most product page projects take 3 to 6 weeks, plus testing time.",
    costFactors: [
      "Number of product templates",
      "Platform and theme",
      "Photography or video needs",
      "Testing tools and traffic volume",
    ],
    pitfalls: [
      "Copying a big brand's product page without knowing what your shoppers need.",
      "Hiding shipping costs until checkout.",
      "Cramming every possible badge and widget above the add-to-cart button.",
    ],
    tools: ["GA4", "Microsoft Clarity or Hotjar", "Shopify and WooCommerce", "Review platforms such as Judge.me or Okendo", "A/B testing tools"],
    related: ["ecommerce-seo", "checkout-optimization", "conversion-rate-optimization", "ui-ux-design"],
    faqs: [
      {
        q: "What makes a product page convert?",
        a: "Clear photos, an honest description, visible price and shipping, easy option selection, reviews, and returns information near the buy button. The exact priorities depend on what your shoppers ask.",
      },
      {
        q: "Do we need A/B testing?",
        a: "It's the most reliable way to measure impact, but it needs enough traffic. For smaller stores, we compare before-and-after periods carefully instead.",
      },
      {
        q: "Will changes affect our SEO?",
        a: "Done properly, they help: richer content and better engagement both support rankings. We keep URLs, titles, and structured data intact.",
      },
      {
        q: "Can you work within our current Shopify theme?",
        a: "Usually, yes. Most improvements are template and section changes rather than a new theme.",
      },
    ],
  },
  {
    slug: "checkout-optimization",
    name: "Checkout Optimization",
    category: "ecommerce",
    shortDescription: "Fewer abandoned carts through a simpler, faster, more trustworthy checkout.",
    metaTitle: "Checkout Optimization & Cart Abandonment | Klikcy",
    metaDescription:
      "Checkout optimization that reduces cart abandonment: fewer steps, express payments, upfront costs, guest checkout, and fixes for mobile friction.",
    focusKeyword: "checkout optimization",
    intro:
      "Shoppers who reach checkout already want to buy. We remove the friction and surprises that make them leave anyway.",
    overview: [
      "Cart abandonment is normal, but a lot of it is avoidable. The usual reasons are well documented: unexpected shipping costs or taxes, being forced to create an account, a long or confusing form, lack of trust in the payment step, and slow or broken pages on mobile.",
      "We walk through your checkout on several devices, review your funnel data step by step, and test with the payment methods your customers use. Common improvements include express wallets like Apple Pay, Google Pay, and Shop Pay; guest checkout; address autocomplete; shipping costs shown earlier; and clearer error messages.",
      "On Shopify, checkout customization is limited by design, which keeps it fast and secure. We work within what each platform allows and focus on the steps before checkout too: the cart page, shipping estimates, and discount codes.",
    ],
    signs: [
      "Analytics show a large drop between cart and completed order.",
      "Customers email about checkout errors or failed payments.",
      "You don't offer express payment options.",
      "Shipping costs only appear on the last step.",
    ],
    included: [
      "Funnel analysis from cart to purchase",
      "Checkout testing on multiple devices and payment methods",
      "Express payment setup",
      "Cart page and shipping estimate improvements",
      "Form and error message fixes",
      "Abandoned cart email review",
    ],
    process: [
      { title: "Measure", detail: "We find where in the cart and checkout shoppers drop off." },
      { title: "Test it ourselves", detail: "We complete purchases on different devices and note every point of friction." },
      { title: "Fix", detail: "Changes are made in order of impact, within your platform's limits." },
      { title: "Monitor", detail: "We compare checkout completion rates before and after." },
    ],
    timeline: "Most checkout projects take 2 to 4 weeks.",
    costFactors: [
      "Platform and plan (for example Shopify Plus allows more customization)",
      "Payment and shipping integrations involved",
      "Custom checkout logic",
      "Testing scope",
    ],
    pitfalls: [
      "Forcing account creation before purchase.",
      "Revealing shipping costs only at the final step.",
      "Adding upsells that interrupt the payment flow.",
    ],
    tools: ["Shopify checkout extensibility", "WooCommerce checkout blocks", "Stripe", "Apple Pay, Google Pay, and Shop Pay", "GA4 funnel reports"],
    related: ["product-page-optimization", "payment-integration", "shipping-integration", "conversion-rate-optimization"],
    faqs: [
      {
        q: "What's a normal cart abandonment rate?",
        a: "Industry studies commonly put average cart abandonment around 70%. Your own trend matters more than the benchmark; we focus on the causes you can actually fix.",
      },
      {
        q: "Should we offer guest checkout?",
        a: "Yes, almost always. You can still invite customers to create an account after they've paid.",
      },
      {
        q: "Do express payments really help?",
        a: "They usually do, especially on mobile, because they skip most of the form. They're quick to enable on most platforms.",
      },
      {
        q: "Can you customize Shopify's checkout?",
        a: "Within limits. Shopify Plus allows checkout extensions; other plans allow branding and some settings. We also improve the cart and pre-checkout steps, which every plan can change.",
      },
    ],
  },
  {
    slug: "payment-integration",
    name: "Payment Integration",
    category: "ecommerce",
    shortDescription: "Card payments, subscriptions, and invoices connected securely to your site, app, or store.",
    metaTitle: "Payment Gateway Integration Services | Klikcy",
    metaDescription:
      "Payment integration with Stripe, PayPal, Square, and more: one-time payments, subscriptions, invoicing, and webhooks, built securely for sites and apps.",
    focusKeyword: "payment integration",
    intro:
      "We connect payment providers to your website, app, or platform: one-time charges, subscriptions, deposits, invoices, and payouts, with the edge cases handled.",
    overview: [
      "Taking a card payment is easy to demo and surprisingly easy to get wrong in production. Failed payments, refunds, disputes, subscription upgrades halfway through a month, duplicate charges from a double click, and webhooks arriving out of order all need handling.",
      "We use hosted payment components from providers like Stripe, so card details never touch your servers. That keeps your PCI compliance burden minimal. Then we build the logic around it: what happens in your system when a payment succeeds, fails, is refunded, or is disputed.",
      "For platforms and marketplaces, we set up split payments and payouts using tools like Stripe Connect, including seller onboarding and identity checks.",
    ],
    signs: [
      "You need to take payments in a custom app or booking system.",
      "You're adding subscriptions or memberships.",
      "Your current setup misses failed payments or double-charges customers.",
      "You run a platform that needs to pay out to sellers or providers.",
    ],
    included: [
      "Provider selection and account setup",
      "Hosted, PCI-friendly payment forms",
      "Subscriptions, trials, and plan changes",
      "Webhook handling for payment events",
      "Refunds, disputes, and failed payment flows",
      "Receipts and invoice emails",
    ],
    process: [
      { title: "Plan", detail: "We map every payment scenario, including the unhappy paths." },
      { title: "Integrate", detail: "Payment components and server logic built in test mode." },
      { title: "Test", detail: "Every scenario tested with test cards: success, decline, refund, dispute." },
      { title: "Go live", detail: "Switch to live mode with monitoring on payment errors." },
    ],
    timeline: "Simple payment integrations take 1 to 2 weeks. Subscriptions and marketplaces take 3 to 6 weeks.",
    costFactors: [
      "One-time payments versus subscriptions",
      "Marketplace payouts",
      "Number of currencies and payment methods",
      "Integration with accounting or invoicing tools",
    ],
    pitfalls: [
      "Handling raw card numbers on your own server.",
      "Trusting the browser's redirect instead of webhooks to confirm payment.",
      "No plan for failed subscription renewals.",
    ],
    tools: ["Stripe and Stripe Connect", "PayPal", "Square", "Apple Pay and Google Pay", "QuickBooks and Xero sync"],
    related: ["checkout-optimization", "saas-development", "marketplace-development", "api-development"],
    faqs: [
      {
        q: "Which payment provider should we use?",
        a: "Stripe for most custom sites and apps, because of its documentation and features. PayPal as an additional option many shoppers expect. Square if you also sell in person.",
      },
      {
        q: "Do we need to be PCI compliant?",
        a: "Every business taking cards has some PCI responsibility, but using hosted payment fields keeps it to the simplest level, because card data goes straight to the provider.",
      },
      {
        q: "Can you set up subscriptions and recurring billing?",
        a: "Yes, including trials, upgrades and downgrades, proration, and automatic retries for failed renewals.",
      },
      {
        q: "Can you integrate payments with our accounting software?",
        a: "Yes. We sync payments and refunds with QuickBooks, Xero, and similar tools.",
      },
    ],
  },
  {
    slug: "shipping-integration",
    name: "Shipping Integration",
    category: "ecommerce",
    shortDescription: "Live shipping rates, label printing, and tracking connected to your store and warehouse.",
    metaTitle: "E-Commerce Shipping Integration Services | Klikcy",
    metaDescription:
      "Shipping integration for online stores: live carrier rates, label printing, tracking updates, and 3PL connections with UPS, FedEx, USPS, and ShipStation.",
    focusKeyword: "shipping integration",
    intro:
      "We connect your store to carriers, shipping software, and fulfillment partners, so customers see accurate rates and orders move without manual copying.",
    overview: [
      "Shipping is where a lot of store profit leaks out. Flat rates that don't reflect package weight, labels created by hand, tracking numbers pasted into emails, and inventory that doesn't match the warehouse all cost time and money.",
      "We set up live carrier rates at checkout where they make sense, or calculated rate tables when they don't. Orders flow automatically to shipping software or your 3PL, labels are generated in batches, and tracking updates reach customers without anyone touching them.",
      "For brands using third-party fulfillment, we connect the store and the warehouse system so inventory and order status stay in sync, and we set up alerts for orders that get stuck.",
    ],
    signs: [
      "You lose money on shipping for heavy or oversized orders.",
      "Staff copy orders into shipping software by hand.",
      "Customers ask 'where's my order?' because tracking emails don't go out.",
      "You're moving to a 3PL or adding a second warehouse.",
    ],
    included: [
      "Shipping rate strategy review",
      "Carrier and shipping software integration",
      "Live or table-based rates at checkout",
      "Automated label creation and tracking emails",
      "3PL and warehouse connections",
      "Stuck order alerts",
    ],
    process: [
      { title: "Review", detail: "We look at your order mix, package sizes, carriers, and current shipping costs." },
      { title: "Design rates", detail: "We set rates that customers accept and that cover your costs." },
      { title: "Integrate", detail: "Store, shipping software, carriers, and warehouse connected and tested." },
      { title: "Monitor", detail: "We check order flow and tracking in the first weeks." },
    ],
    timeline: "Most shipping integrations take 1 to 4 weeks.",
    costFactors: [
      "Number of carriers and warehouses",
      "3PL integration complexity",
      "International shipping requirements",
      "Custom rate rules",
    ],
    pitfalls: [
      "Flat rates without checking what heavy orders actually cost to ship.",
      "Live rates without dimensions on products, which produces wrong quotes.",
      "No alert when an order fails to reach the warehouse.",
    ],
    tools: ["ShipStation", "Shippo", "EasyPost", "UPS, FedEx, and USPS APIs", "ShipBob and other 3PL platforms"],
    related: ["checkout-optimization", "payment-integration", "shopify-store-development", "workflow-automation"],
    faqs: [
      {
        q: "Should we offer free shipping?",
        a: "Often it's worth it above a minimum order value that protects your margin. We help you work out the threshold from your actual order and shipping data.",
      },
      {
        q: "Live carrier rates or flat rates?",
        a: "Live rates are accurate but can look expensive. Flat or tiered rates are simpler for customers. Many stores use tiers based on order value with live rates for expedited options.",
      },
      {
        q: "Can you connect our store to our 3PL?",
        a: "Yes, with most major 3PLs and warehouse systems, including inventory and tracking sync.",
      },
      {
        q: "Do you handle international shipping?",
        a: "Yes, including duties and tax collection options, customs data on products, and carrier selection by region.",
      },
    ],
  },
  {
    slug: "marketplace-development",
    name: "Marketplace Development",
    category: "ecommerce",
    shortDescription: "Two-sided marketplaces where buyers and sellers meet, with payments, payouts, and trust built in.",
    metaTitle: "Marketplace Development Company | Klikcy",
    metaDescription:
      "Online marketplace development: seller onboarding, listings, search, split payments and payouts, reviews, and admin tools. Built to launch and grow.",
    focusKeyword: "marketplace development",
    intro:
      "We build two-sided marketplaces: platforms where sellers or service providers list what they offer and buyers find, book, and pay, with your platform taking its share.",
    overview: [
      "A marketplace is really two products: one for sellers and one for buyers, plus an admin side for you. Sellers need onboarding, listing tools, and payouts. Buyers need search, trust signals, and a smooth checkout. You need moderation, dispute handling, and reporting on transaction volume and fees.",
      "The hardest part of a marketplace usually isn't the software; it's getting both sides to show up. So we keep the first version tight: the core listing, search, and transaction flow, done well, with manual processes behind the scenes where automation can wait.",
      "Payments use tools like Stripe Connect to handle split payments, seller identity checks, and payouts, which keeps you out of the business of holding other people's money directly.",
    ],
    signs: [
      "You want to connect buyers and sellers in a niche the big platforms serve poorly.",
      "You're turning a directory or service business into a transactional platform.",
      "You need bookings and payments between customers and independent providers.",
      "Your current marketplace was built on a plugin and has outgrown it.",
    ],
    included: [
      "Marketplace model and first-release scope",
      "Seller onboarding and listing management",
      "Search, filters, and listing pages",
      "Split payments and payouts with Stripe Connect",
      "Reviews, messaging, and dispute tools",
      "Admin dashboard for moderation and reporting",
    ],
    process: [
      { title: "Model", detail: "We define who the sellers and buyers are, how money flows, and what the first release must do." },
      { title: "Design", detail: "Separate flows for buyers, sellers, and admins, tested as prototypes." },
      { title: "Build", detail: "Core transaction flow first, then supporting features in cycles." },
      { title: "Launch", detail: "A soft launch with a small group of sellers before opening up." },
    ],
    timeline: "Most marketplace first releases take 12 to 20 weeks.",
    costFactors: [
      "Product versus service marketplace (bookings add complexity)",
      "Payment and payout model",
      "Search and matching sophistication",
      "Mobile apps in addition to the web platform",
    ],
    pitfalls: [
      "Building every feature before proving buyers and sellers will use the platform.",
      "Handling payouts manually or holding funds without the right setup.",
      "Weak seller vetting, which damages trust early.",
    ],
    tools: ["Next.js and TypeScript", "PostgreSQL", "Stripe Connect", "Algolia or Typesense search", "Supabase or custom backend"],
    related: ["saas-development", "web-app-development", "payment-integration", "api-development"],
    faqs: [
      {
        q: "How do marketplace payments work?",
        a: "The buyer pays through the platform, the payment provider splits it, your fee goes to you, and the seller's share is paid out on a schedule. Stripe Connect handles identity checks and payouts.",
      },
      {
        q: "Should we use a marketplace platform like Sharetribe instead?",
        a: "For validating an idea quickly, a platform like Sharetribe can be a smart start. Custom development makes sense when you need workflows those platforms can't support or you're ready to scale.",
      },
      {
        q: "How long does it take to build a marketplace?",
        a: "A focused first release typically takes 12 to 20 weeks, depending on whether it handles products, services, or bookings.",
      },
      {
        q: "Can you build mobile apps for the marketplace too?",
        a: "Yes. We often launch on the web first, then add apps once the model is proven.",
      },
    ],
  },
];
