import type { Service } from "@/lib/service-types";

export const appSoftwareServices: Service[] = [
  {
    slug: "web-app-development",
    name: "Web App Development",
    category: "app-software",
    shortDescription: "Browser-based applications for customers or staff, from first version to production.",
    metaTitle: "Web App Development Company | Klikcy",
    metaDescription:
      "Custom web application development for U.S. businesses: customer portals, booking systems, internal tools, and platforms. Scoped in phases, built to last.",
    focusKeyword: "web app development",
    intro:
      "We build web applications: portals, booking systems, marketplaces, and internal tools that people log into and use every day. Scoped in phases so you see working software early.",
    overview: [
      "A website mostly shows information. A web app lets people do things: book, order, manage an account, track a job, approve a request. That means accounts and permissions, a database, business rules, and a lot more testing.",
      "We start by narrowing the first version to the features that prove the idea or remove the biggest pain. Everything else goes on a list for later. This gets real users into the product sooner and stops budget being spent on features nobody ends up using.",
      "We work in two-week cycles with a demo at the end of each, so you're never waiting months to see progress. The code is yours, lives in your repository, and follows conventions any competent developer can pick up.",
    ],
    signs: [
      "Your team runs a core process on spreadsheets and email threads.",
      "Customers ask for a portal to check status, documents, or orders.",
      "You have a product idea and need a working version to test with users.",
      "An off-the-shelf tool covers 70% of what you need and the rest is painful workarounds.",
    ],
    included: [
      "Discovery and scope for the first release",
      "User flows and interface design",
      "Front end, back end, and database",
      "Authentication, roles, and permissions",
      "Automated tests and staging environment",
      "Deployment, monitoring, and handover documentation",
    ],
    process: [
      { title: "Discovery", detail: "We map users, workflows, and rules, then agree on the smallest useful first release." },
      { title: "Design", detail: "Clickable prototypes so you can test the flows before code is written." },
      { title: "Build in cycles", detail: "Two-week cycles with a working demo at the end of each." },
      { title: "Launch and support", detail: "Production deployment, monitoring, and a support period for fixes and adjustments." },
    ],
    timeline: "Most first releases take 8 to 16 weeks. Later phases are scoped one at a time.",
    costFactors: [
      "Number of user roles and screens",
      "Integrations with payment, CRM, or legacy systems",
      "Compliance requirements such as HIPAA or SOC 2 readiness",
      "Real-time features, file processing, or heavy reporting",
    ],
    pitfalls: [
      "Trying to build every feature in version one.",
      "Skipping automated tests to save time, then losing much more time later.",
      "Building on a developer's personal accounts instead of company-owned ones.",
    ],
    tools: ["React and Next.js", "Node.js and TypeScript", "PostgreSQL", "Supabase or custom APIs", "Vercel, AWS, or Render"],
    related: ["saas-development", "admin-dashboard-development", "api-development", "database-architecture"],
    faqs: [
      {
        q: "How much does a web app cost?",
        a: "It depends on the number of user roles, screens, and integrations. We price the first release as a fixed scope after discovery, so you know the cost before development starts.",
      },
      {
        q: "How long does it take to build a web app?",
        a: "A focused first release usually takes 8 to 16 weeks. We'd rather launch something smaller sooner and build on real feedback.",
      },
      {
        q: "Will we own the code?",
        a: "Yes. The code lives in your repository and accounts from day one.",
      },
      {
        q: "Can you work with our in-house developers?",
        a: "Yes. We can lead the build, work alongside your team, or hand over to them with documentation and pairing sessions.",
      },
      {
        q: "What happens after launch?",
        a: "There's a support period for fixes. After that, most clients keep us on a monthly plan for improvements, or take it in-house.",
      },
    ],
  },
  {
    slug: "saas-development",
    name: "SaaS Development",
    category: "app-software",
    shortDescription: "Subscription software products with accounts, billing, and multi-tenant data done right.",
    metaTitle: "SaaS Development Company | Klikcy",
    metaDescription:
      "SaaS product development: multi-tenant architecture, subscriptions and billing, onboarding, and analytics. From MVP to a product customers pay for monthly.",
    focusKeyword: "saas development",
    intro:
      "We build software-as-a-service products: the core features, plus the parts every SaaS needs and founders underestimate, like team accounts, billing, and onboarding.",
    overview: [
      "A SaaS product is more than its main feature. It needs sign-up and onboarding, organizations with multiple users and roles, subscription plans and billing, usage limits, emails, an admin area for your team, and data kept strictly separate between customers. These pieces take as long as the feature itself if you build them from scratch.",
      "We use proven building blocks for the standard parts, such as Stripe for billing and established auth providers, so the budget goes into what makes your product different. Multi-tenant data separation is designed in from the start, because retrofitting it is painful and risky.",
      "For first versions, we focus on the shortest path to paying customers. Analytics are in place from launch so you can see which features people use and where they drop off during onboarding.",
    ],
    signs: [
      "You've validated an idea and need a product people can pay for.",
      "You're turning an internal tool or service into a subscription product.",
      "Your MVP was built quickly and is struggling as customers grow.",
      "You need billing, teams, and permissions added to an existing app.",
    ],
    included: [
      "Product scope and pricing model input",
      "Multi-tenant architecture",
      "Sign-up, onboarding, teams, and roles",
      "Subscription billing with Stripe",
      "Admin panel for your team",
      "Product analytics and error monitoring",
    ],
    process: [
      { title: "Shape the MVP", detail: "We define the smallest product someone would pay for and the plans you'll sell." },
      { title: "Foundation", detail: "Auth, tenancy, billing, and deployment set up first, so features build on solid ground." },
      { title: "Core features", detail: "Built in two-week cycles with demos and early user testing." },
      { title: "Launch", detail: "Production release, monitoring, and a roadmap for the next phase." },
    ],
    timeline: "Most SaaS MVPs take 10 to 16 weeks.",
    costFactors: [
      "Complexity of the core feature",
      "Billing model (seats, usage, tiers)",
      "Integrations customers expect",
      "Security and compliance requirements",
    ],
    pitfalls: [
      "Building custom billing instead of using Stripe.",
      "Adding multi-tenancy after launch.",
      "Launching without analytics, so you can't see why users don't convert.",
    ],
    tools: ["Next.js and TypeScript", "PostgreSQL", "Stripe Billing", "Clerk, Auth.js, or Supabase Auth", "PostHog analytics"],
    related: ["web-app-development", "admin-dashboard-development", "api-development", "database-architecture"],
    faqs: [
      {
        q: "How long does it take to build a SaaS MVP?",
        a: "Usually 10 to 16 weeks, depending on the core feature. Using proven tools for auth and billing keeps that number down.",
      },
      {
        q: "Do you help with pricing and plans?",
        a: "We'll share what we've seen work and make sure the billing setup supports your model, whether that's per seat, usage-based, or tiered. Pricing decisions are yours.",
      },
      {
        q: "Can you take over an existing SaaS codebase?",
        a: "Yes. We start with a code review to understand its condition, then recommend whether to improve it in place or rebuild parts of it.",
      },
      {
        q: "How do you keep customer data separate?",
        a: "Every record is tied to an organization, and access rules are enforced at the database level, not only in the interface. We test these rules specifically.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    category: "app-software",
    shortDescription: "iOS and Android apps built with React Native or Flutter, from design to App Store approval.",
    metaTitle: "Mobile App Development Company | Klikcy",
    metaDescription:
      "iOS and Android app development with React Native and Flutter: design, build, push notifications, payments, and App Store and Google Play submission.",
    focusKeyword: "mobile app development",
    intro:
      "We design and build iOS and Android apps from a single codebase, and take them all the way through App Store and Google Play review.",
    overview: [
      "For most business apps, cross-platform frameworks like React Native and Flutter are the sensible choice. One codebase runs on both iOS and Android, which roughly halves development and maintenance compared with two native apps, and the result feels native to users.",
      "Before building, we check that an app is really what you need. If the goal can be met with a fast mobile website or a progressive web app, that's often cheaper and avoids app store friction. When an app is right, usually because you need push notifications, offline use, device features, or a presence in the stores, we build it.",
      "Store submission has its own rules. We handle developer accounts, privacy disclosures, screenshots, and the review process, and plan for Apple's review times in the launch schedule.",
    ],
    signs: [
      "Customers use your service repeatedly and would benefit from push notifications.",
      "Your staff need a tool that works in the field, sometimes offline.",
      "You need camera, location, or other device features.",
      "Your current app has poor reviews or is hard to update.",
    ],
    included: [
      "App strategy and feature scope",
      "UX and interface design for iOS and Android",
      "Cross-platform build in React Native or Flutter",
      "Backend, API, and push notifications",
      "In-app payments or subscriptions where needed",
      "App Store and Google Play submission",
    ],
    process: [
      { title: "Scope", detail: "We confirm an app is the right answer and define the first version." },
      { title: "Design", detail: "Interactive prototypes tested on real phones." },
      { title: "Build", detail: "Two-week cycles with test builds on your phone through TestFlight and Google Play testing." },
      { title: "Launch", detail: "Store submission, review handling, and post-launch monitoring." },
    ],
    timeline: "Most first versions take 10 to 16 weeks, plus time for app store review.",
    costFactors: [
      "Number of screens and features",
      "Backend complexity",
      "Device features and offline support",
      "In-app purchases and subscriptions",
    ],
    pitfalls: [
      "Building an app when a mobile website would do the job.",
      "Underestimating app store review requirements and timelines.",
      "No plan for updates as iOS and Android change every year.",
    ],
    tools: ["React Native with Expo", "Flutter", "Firebase or Supabase", "RevenueCat for subscriptions", "TestFlight"],
    related: ["progressive-web-app-development", "ui-ux-design", "api-development", "saas-development"],
    faqs: [
      {
        q: "Native or cross-platform?",
        a: "Cross-platform for most business apps, because one codebase serves both platforms. Native makes sense for apps that push device hardware hard, like advanced camera or AR features.",
      },
      {
        q: "Do you handle App Store submission?",
        a: "Yes, including developer accounts, privacy labels, store listings, and responding to review feedback.",
      },
      {
        q: "How long does App Store review take?",
        a: "Apple's reviews are often quick, but rejections and resubmissions can add days. We build buffer time into the launch plan.",
      },
      {
        q: "Who maintains the app after launch?",
        a: "We offer ongoing maintenance for OS updates, fixes, and new features. Apps need at least a yearly update to stay compatible with new iOS and Android versions.",
      },
    ],
  },
  {
    slug: "progressive-web-app-development",
    name: "Progressive Web App Development",
    category: "app-software",
    shortDescription: "App-like experiences that install from the browser, work offline, and skip the app stores.",
    metaTitle: "Progressive Web App (PWA) Development | Klikcy",
    metaDescription:
      "Progressive web app development: installable, fast, offline-capable apps that run in the browser on any device. One codebase, no app store approval needed.",
    focusKeyword: "pwa development",
    intro:
      "A progressive web app runs in the browser but can be installed on a phone's home screen, work offline, and send notifications. It's often the quickest route to an app-like product.",
    overview: [
      "PWAs sit between a website and a native app. They're built with web technology, so one codebase runs everywhere and updates instantly without app store review. Users can add them to their home screen, and they can work with a poor or missing connection by caching what they need.",
      "They're a strong fit for internal tools, field service apps, ordering systems, and customer portals where people return regularly but don't need deep device integration. iOS has supported web push notifications for installed web apps since iOS 16.4, which closed one of the biggest gaps.",
      "We'll be upfront about the limits. If you need a listing in the App Store for discovery, or device features browsers don't expose, a native or cross-platform app is the better choice.",
    ],
    signs: [
      "You want an app-like tool without app store approval and fees.",
      "Users have unreliable connections, such as staff in the field or in warehouses.",
      "You need one product for desktop, tablet, and phone.",
      "Your mobile site is slow and you want it to feel like an app.",
    ],
    included: [
      "Installable web app with manifest and icons",
      "Service worker caching and offline support",
      "Push notifications where supported",
      "Responsive interface for every screen size",
      "Background sync for offline actions",
      "Performance tuning for mid-range phones",
    ],
    process: [
      { title: "Scope", detail: "We confirm a PWA can meet your needs and decide what must work offline." },
      { title: "Design", detail: "Mobile-first interface designed for touch and small screens." },
      { title: "Build", detail: "App shell, caching strategy, and sync logic, tested on real devices." },
      { title: "Launch", detail: "Deployment, install prompts, and monitoring." },
    ],
    timeline: "Most PWAs take 6 to 12 weeks.",
    costFactors: [
      "How much needs to work offline",
      "Push notification requirements",
      "Data sync complexity",
      "Backend and integrations",
    ],
    pitfalls: [
      "Caching too aggressively so users see stale data.",
      "Assuming every iOS feature works the same as on Android.",
      "Treating it as a website and skipping offline testing.",
    ],
    tools: ["Next.js or React", "Workbox", "IndexedDB", "Web Push", "Supabase or custom API"],
    related: ["web-app-development", "mobile-app-development", "website-speed-optimization", "ui-ux-design"],
    faqs: [
      {
        q: "What's the difference between a PWA and a native app?",
        a: "A PWA runs in the browser and installs without an app store. A native app is downloaded from the App Store or Google Play and has deeper access to the device. PWAs are cheaper to build and update; native apps are more discoverable in the stores.",
      },
      {
        q: "Do PWAs work on iPhones?",
        a: "Yes. iPhones support installing web apps to the home screen, and web push notifications have worked for installed web apps since iOS 16.4.",
      },
      {
        q: "Can a PWA work offline?",
        a: "Yes, for the content and actions we design for it. Actions taken offline can be queued and synced when the connection returns.",
      },
      {
        q: "Can a PWA be listed in app stores?",
        a: "Google Play accepts PWAs packaged as Trusted Web Activities. The Apple App Store generally doesn't accept apps that are only a wrapped website.",
      },
    ],
  },
  {
    slug: "admin-dashboard-development",
    name: "Admin Dashboard Development",
    category: "app-software",
    shortDescription: "Internal dashboards and admin panels that let your team manage data and operations in one place.",
    metaTitle: "Admin Dashboard & Internal Tool Development | Klikcy",
    metaDescription:
      "Custom admin dashboards and internal tools: manage orders, customers, content, and operations in one place, with roles, audit logs, and the reports you need.",
    focusKeyword: "admin dashboard development",
    intro:
      "We build the screens your team works in all day: admin panels, operations dashboards, and internal tools designed around their actual tasks.",
    overview: [
      "Internal tools rarely get design attention, yet your team may spend hours a day in them. A clumsy admin panel means slow work, mistakes, and people falling back to spreadsheets. A good one makes the common tasks one or two clicks.",
      "We watch how your team works before designing anything. Which records do they look up most? What do they change? What do they need to see at a glance each morning? The dashboard is built around those answers, with search, filters, bulk actions, and clear status indicators.",
      "Roles and audit logs are standard. Different people see and edit different things, and every change is recorded with who made it and when.",
    ],
    signs: [
      "Your team works across several tools to complete one task.",
      "Staff edit data directly in a database or spreadsheet.",
      "Your product's admin area was an afterthought and slows everyone down.",
      "Managers can't see operational status without asking around.",
    ],
    included: [
      "Workflow observation and requirements",
      "Dashboard and admin interface design",
      "Role-based access control",
      "Search, filters, and bulk actions",
      "Audit log of changes",
      "Charts and operational reports",
    ],
    process: [
      { title: "Observe", detail: "We watch the people who'll use the tool and note the tasks that take longest." },
      { title: "Prototype", detail: "Clickable screens tested with the team before any code." },
      { title: "Build", detail: "Connected to your data, with permissions and audit logging from the start." },
      { title: "Refine", detail: "We collect feedback after the first weeks of use and adjust." },
    ],
    timeline: "Most admin dashboards take 4 to 10 weeks.",
    costFactors: [
      "Number of data types and screens",
      "Data sources and integrations",
      "Permission complexity",
      "Reporting requirements",
    ],
    pitfalls: [
      "Designing for managers' reports and forgetting the people doing data entry.",
      "Giving everyone full admin access.",
      "No audit trail when something changes unexpectedly.",
    ],
    tools: ["React and Next.js", "shadcn/ui and TanStack Table", "PostgreSQL", "Retool for quick internal tools", "Recharts"],
    related: ["web-app-development", "saas-development", "reporting-automation", "database-architecture"],
    faqs: [
      {
        q: "Should we use a tool like Retool or build custom?",
        a: "Retool and similar tools are great for quick internal tools with a small number of users. Custom makes sense for complex workflows, many users, or dashboards that are part of a product you sell.",
      },
      {
        q: "Can the dashboard connect to our existing database?",
        a: "Yes. We can build on your current database and APIs, or design a new data layer if the existing one is part of the problem.",
      },
      {
        q: "Can different staff see different things?",
        a: "Yes. Role-based permissions control what each person can view and edit, down to individual fields if needed.",
      },
      {
        q: "Will it work on tablets and phones?",
        a: "We design for the devices your team actually uses. Warehouse and field teams often need tablet-friendly layouts; office teams usually work on desktop.",
      },
    ],
  },
  {
    slug: "api-development",
    name: "API Development",
    category: "app-software",
    shortDescription: "Well-documented APIs and integrations that connect your systems and partners reliably.",
    metaTitle: "API Development & Integration Services | Klikcy",
    metaDescription:
      "Custom API development and system integration: REST and GraphQL APIs, webhooks, and third-party connections that are secure, versioned, and documented.",
    focusKeyword: "api development services",
    intro:
      "We design and build APIs, the connections that let your software talk to other software, plus the integrations between the tools you already use.",
    overview: [
      "APIs are behind most modern business software. Your website talks to your CRM, your app talks to your database, your partners pull your product catalog. When APIs are poorly designed, every new integration becomes a custom project and every change risks breaking something downstream.",
      "We build APIs that are predictable: consistent naming, clear errors, versioning so changes don't break existing users, authentication appropriate to who's calling, and rate limits that protect your systems. Documentation is generated from the code, so it stays accurate.",
      "We also integrate third-party APIs, like payment providers, shipping carriers, CRMs, accounting systems, and AI models, handling the unglamorous parts like retries, webhook verification, and what happens when the other side is down.",
    ],
    signs: [
      "Your systems need to share data and currently do it through exports.",
      "Partners or customers want programmatic access to your data.",
      "You're building a mobile app or front end that needs a backend.",
      "An existing integration breaks regularly.",
    ],
    included: [
      "API design and specification (OpenAPI)",
      "REST or GraphQL implementation",
      "Authentication, authorization, and rate limiting",
      "Webhooks and third-party integrations",
      "Automated tests",
      "Generated documentation",
    ],
    process: [
      { title: "Design", detail: "We agree on resources, endpoints, and data formats before writing code." },
      { title: "Build", detail: "Implementation with tests for each endpoint and integration." },
      { title: "Secure", detail: "Auth, permissions, input validation, and rate limits checked." },
      { title: "Document and deploy", detail: "Documentation, monitoring, and deployment to your infrastructure." },
    ],
    timeline: "A focused API or integration typically takes 2 to 8 weeks.",
    costFactors: [
      "Number of endpoints and integrations",
      "Third-party API quality and documentation",
      "Security requirements",
      "Performance and volume needs",
    ],
    pitfalls: [
      "No versioning, so every change breaks someone.",
      "Trusting webhook payloads without verifying the signature.",
      "Ignoring rate limits and failure handling for third-party APIs.",
    ],
    tools: ["Node.js and TypeScript", "Python with FastAPI", "OpenAPI", "GraphQL", "PostgreSQL"],
    related: ["web-app-development", "database-architecture", "mcp-integrations", "workflow-automation"],
    faqs: [
      {
        q: "REST or GraphQL?",
        a: "REST for most public and partner APIs because it's simple and widely understood. GraphQL when front ends need flexible queries across a lot of related data.",
      },
      {
        q: "Can you integrate with a system that has poor documentation?",
        a: "Usually. It takes longer and involves more testing, and we'll warn you upfront if an integration looks unreliable.",
      },
      {
        q: "How do you secure an API?",
        a: "Appropriate authentication (API keys, OAuth, or tokens), permission checks on every request, input validation, rate limits, and logging. We also review what data each endpoint exposes.",
      },
      {
        q: "Do you provide documentation?",
        a: "Yes. Documentation is generated from an OpenAPI specification, so it matches the actual API.",
      },
    ],
  },
  {
    slug: "database-architecture",
    name: "Database Architecture",
    category: "app-software",
    shortDescription: "Database design, performance tuning, and migrations that keep your application fast as it grows.",
    metaTitle: "Database Architecture & Optimization | Klikcy",
    metaDescription:
      "Database architecture, schema design, query tuning, and safe migrations for PostgreSQL and MySQL, for applications that need to stay fast as they grow.",
    focusKeyword: "database architecture",
    intro:
      "Most slow applications are really slow databases. We design schemas that fit how your data is used, tune the queries that hurt, and move data safely when things need to change.",
    overview: [
      "Early database decisions are made quickly, and they're fine until the data grows. Then pages that loaded instantly take seconds, reports time out, and every new feature needs awkward workarounds because the structure doesn't fit.",
      "For new projects, we design the schema around how the data will be read and written, not just what it contains. For existing systems, we profile real queries, find the expensive ones, and fix them with indexes, query rewrites, or targeted restructuring.",
      "When a bigger change is needed, like splitting a table, moving to a new database, or adding multi-tenancy, we plan the migration so it can run without downtime and be rolled back if needed.",
    ],
    signs: [
      "Pages or reports get slower as your data grows.",
      "Your database bill keeps going up.",
      "Developers avoid certain changes because the schema makes them hard.",
      "You need to move databases or providers.",
    ],
    included: [
      "Schema review or design",
      "Query profiling and index tuning",
      "Data model documentation",
      "Migration planning and execution",
      "Backup and recovery review",
      "Connection pooling and scaling recommendations",
    ],
    process: [
      { title: "Profile", detail: "We measure real query performance and resource usage." },
      { title: "Diagnose", detail: "We find the root causes: missing indexes, poor queries, or structural problems." },
      { title: "Fix", detail: "Changes are tested on a copy of production data before release." },
      { title: "Verify", detail: "We compare performance before and after and set up ongoing monitoring." },
    ],
    timeline: "A performance review takes 1 to 2 weeks. Larger redesigns and migrations are scoped individually.",
    costFactors: [
      "Database size and traffic",
      "Number of applications using the database",
      "Downtime tolerance",
      "Platform and hosting",
    ],
    pitfalls: [
      "Adding indexes everywhere, which slows down writes.",
      "Running migrations on production without testing on a copy first.",
      "Assuming backups work without ever restoring one.",
    ],
    tools: ["PostgreSQL", "MySQL", "Supabase", "Prisma or Drizzle", "pg_stat_statements and EXPLAIN"],
    related: ["web-app-development", "saas-development", "api-development", "performance-monitoring"],
    faqs: [
      {
        q: "Which database do you recommend?",
        a: "PostgreSQL for most applications. It's reliable, well supported, and handles everything from simple apps to complex data. We work with MySQL and others when they're already in place.",
      },
      {
        q: "Can you speed up our database without a rewrite?",
        a: "Usually, yes. Most performance problems come from a small number of queries, and fixing those often makes a dramatic difference.",
      },
      {
        q: "Can migrations happen without downtime?",
        a: "Most can, with careful planning: running old and new structures in parallel, backfilling data, then switching over.",
      },
      {
        q: "Do you work with managed databases?",
        a: "Yes, including Supabase, AWS RDS, Google Cloud SQL, Neon, and PlanetScale.",
      },
    ],
  },
  {
    slug: "custom-business-software",
    name: "Custom Business Software",
    category: "app-software",
    shortDescription: "Software built around how your business works, to replace spreadsheets and patched-together tools.",
    metaTitle: "Custom Business Software Development | Klikcy",
    metaDescription:
      "Custom business software for operations, scheduling, quoting, inventory, and job tracking. Built around your processes to replace spreadsheets and workarounds.",
    focusKeyword: "custom business software",
    intro:
      "When off-the-shelf software doesn't fit how you work, your team ends up working around it. We build software that fits the process instead of forcing the process to fit the software.",
    overview: [
      "Plenty of businesses run on a mix of spreadsheets, shared inboxes, and three or four subscriptions that each do part of the job. It works until it doesn't: a missed handoff, a double booking, a quote with last year's prices. Custom software brings those pieces together.",
      "Typical projects include quoting and estimating tools, job scheduling and dispatch, inventory tracking, client onboarding, and operations dashboards. They're often industry-specific, which is exactly why generic tools don't fit.",
      "Custom isn't always the answer. If a well-supported product covers your needs, we'll say so; it's usually cheaper. We recommend building when your process is a real competitive advantage or the workarounds are costing more than the software would.",
    ],
    signs: [
      "Critical work lives in spreadsheets that only one person understands.",
      "You pay for several tools that overlap and still don't cover everything.",
      "Errors come from retyping information between systems.",
      "Your way of working is part of what makes you better than competitors.",
    ],
    included: [
      "Process mapping and requirements",
      "Build-versus-buy recommendation",
      "Interface design for each role",
      "Development, integrations, and data migration",
      "Training and documentation",
      "Ongoing support options",
    ],
    process: [
      { title: "Understand", detail: "We map your current process, including the workarounds, with the people who do it." },
      { title: "Decide", detail: "We compare building custom with existing products and give you an honest recommendation." },
      { title: "Build in phases", detail: "The most painful part of the process gets solved first, then we expand." },
      { title: "Roll out", detail: "Data migration, training, and support while the team switches over." },
    ],
    timeline: "A first phase usually takes 8 to 14 weeks.",
    costFactors: [
      "Scope of the process covered",
      "Integrations with existing systems",
      "Data migration from spreadsheets or old software",
      "Number of user roles",
    ],
    pitfalls: [
      "Copying a broken spreadsheet process into software without improving it.",
      "Building everything at once instead of the most painful part first.",
      "Not involving the people who'll use it every day.",
    ],
    tools: ["Next.js and TypeScript", "PostgreSQL", "Integrations with QuickBooks, Google Workspace, and Microsoft 365", "Mobile-friendly web apps"],
    related: ["admin-dashboard-development", "web-app-development", "workflow-automation", "api-development"],
    faqs: [
      {
        q: "Is custom software worth it compared with off-the-shelf tools?",
        a: "Sometimes. If an existing product fits 90% of your needs, use it. Custom software pays off when your process is unusual, gives you an edge, or when subscription costs and workarounds add up to more than a build.",
      },
      {
        q: "Can you move our data out of spreadsheets?",
        a: "Yes. We clean and import your existing data as part of the rollout, and check it with your team before switching over.",
      },
      {
        q: "Will it connect with QuickBooks, Google Workspace, or Microsoft 365?",
        a: "Yes, these are common integrations. We confirm each one during discovery.",
      },
      {
        q: "What if our process changes later?",
        a: "It will, and that's an advantage of custom software: it can change with you. We build it so adding or adjusting features later is straightforward.",
      },
    ],
  },
];
