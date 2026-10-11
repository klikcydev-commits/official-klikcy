import type { Service } from "@/lib/service-types";

export const seoAeoServices: Service[] = [
  {
    slug: "technical-seo",
    name: "Technical SEO",
    category: "seo-aeo",
    shortDescription: "Crawling, indexing, speed, and site structure fixed so search engines can find and rank your pages.",
    metaTitle: "Technical SEO Services & Audits | Klikcy",
    metaDescription:
      "Technical SEO audits and fixes: crawl errors, indexing, Core Web Vitals, canonicals, redirects, and site structure. Clear priorities, then we do the work.",
    focusKeyword: "technical seo services",
    intro:
      "Before content and links can do their job, search engines need to crawl, render, and index your pages without tripping over anything. That's what technical SEO fixes.",
    overview: [
      "Technical problems are usually invisible to the people running the site. Product pages blocked by a stray robots rule, thousands of filter URLs eating crawl budget, duplicate pages competing with each other, a JavaScript framework that serves search engines an empty page. Rankings stall and nobody can say why.",
      "Our audits combine a full crawl of your site with Search Console's own data on what Google has indexed and why it skipped the rest. Every issue goes on a list with its likely impact and the effort to fix it, so you aren't handed a 200-row spreadsheet with no idea where to start.",
      "Then we fix it. Because we're developers as well as SEOs, we can make the changes in your CMS or codebase directly instead of writing tickets for someone else to interpret.",
    ],
    signs: [
      "Search Console shows lots of pages as 'Crawled, currently not indexed' or 'Duplicate without user-selected canonical'.",
      "Traffic dropped after a redesign, migration, or platform change.",
      "Your site has thousands of URLs from filters, tags, or parameters.",
      "New pages take weeks to appear in Google.",
    ],
    included: [
      "Full site crawl and Search Console index review",
      "Prioritized issue list with impact and effort",
      "Fixes to robots.txt, sitemaps, canonicals, and redirects",
      "Internal linking and site structure improvements",
      "Core Web Vitals review",
      "Structured data validation",
      "Follow-up crawl to confirm fixes",
    ],
    process: [
      { title: "Crawl and collect", detail: "We crawl the site, pull Search Console and log data where available, and benchmark current visibility." },
      { title: "Prioritize", detail: "Issues are grouped and ranked so the fixes that move the most traffic go first." },
      { title: "Fix", detail: "We implement changes directly or work alongside your developers." },
      { title: "Confirm", detail: "We re-crawl, request indexing where useful, and track the affected pages for several weeks." },
    ],
    timeline: "An audit takes 1 to 2 weeks. Fixes usually run 2 to 6 weeks depending on site size and who implements them.",
    costFactors: [
      "Number of URLs and page templates",
      "Platform and how much access we have",
      "Whether we implement fixes or hand them to your team",
      "Server log analysis for very large sites",
    ],
    pitfalls: [
      "Fixing every warning a tool reports instead of the handful that affect indexing.",
      "Adding noindex and canonical tags to the same page, which sends Google mixed signals.",
      "Blocking JavaScript or CSS files in robots.txt so Google can't render the page.",
    ],
    tools: ["Google Search Console", "Screaming Frog", "Sitebulb", "Ahrefs or Semrush", "Server log analysis"],
    related: ["on-page-seo", "schema-markup-seo", "website-speed-optimization", "google-search-console-setup"],
    faqs: [
      {
        q: "What does a technical SEO audit cover?",
        a: "Crawlability, indexing, duplicate content, canonical tags, redirects, internal links, site speed, mobile rendering, structured data, and sitemaps. You get a ranked list of problems with the fix for each.",
      },
      {
        q: "How long before technical fixes improve rankings?",
        a: "Indexing fixes often show up within a few weeks, once Google recrawls the affected pages. Broader improvements take one to three months to settle.",
      },
      {
        q: "Do you just report problems, or fix them too?",
        a: "Both. Most clients have us implement the fixes because we can work directly in WordPress, Shopify, and custom codebases.",
      },
      {
        q: "Do you work with JavaScript sites built on React or Next.js?",
        a: "Yes. Rendering problems on JavaScript sites are a common cause of indexing issues, and we check what Google actually sees, not just what the browser shows.",
      },
      {
        q: "How often should a technical audit happen?",
        a: "Once a year for most sites, and always before and after a redesign or migration.",
      },
    ],
  },
  {
    slug: "on-page-seo",
    name: "On-Page SEO",
    category: "seo-aeo",
    shortDescription: "Titles, headings, content, and internal links tuned so each page clearly matches what people search for.",
    metaTitle: "On-Page SEO Services | Klikcy",
    metaDescription:
      "On-page SEO that matches each page to real search intent: titles, headings, content gaps, internal links, and images. Focused on pages that drive revenue.",
    focusKeyword: "on-page seo services",
    intro:
      "We make sure each important page is clearly about one thing, answers what searchers actually want to know, and is easy for both people and Google to read.",
    overview: [
      "On-page SEO is the part you control page by page: the title tag, the headings, the copy, the images, and the links between your pages. Done well, it tells Google exactly which search each page should rank for and gives visitors a reason to stay.",
      "We start with the pages that matter most to revenue, usually service pages, product categories, and a few high-traffic articles. For each one we look at what's ranking above you and why, what questions searchers have that the page doesn't answer, and whether two of your pages are competing for the same search.",
      "The output is rewritten titles and descriptions, restructured headings, content additions that fill real gaps, and internal links that point authority where it's needed. No stuffing keywords into every paragraph.",
    ],
    signs: [
      "Your pages rank on page two for searches you'd expect to win.",
      "Several of your pages target nearly the same search term.",
      "Pages get impressions in Search Console but very few clicks.",
      "Your service pages are a few short paragraphs.",
    ],
    included: [
      "Keyword and search intent mapping for priority pages",
      "Title tag and meta description rewrites",
      "Heading structure and content gap fixes",
      "Internal linking plan",
      "Image alt text and file optimization",
      "Cannibalization review and consolidation",
    ],
    process: [
      { title: "Pick the pages", detail: "We choose pages by revenue potential and how close they are to ranking well." },
      { title: "Research", detail: "We study the current top results and the questions people ask around each topic." },
      { title: "Rewrite and restructure", detail: "Titles, headings, and copy are updated, with drafts shared for your approval." },
      { title: "Measure", detail: "We track impressions, clicks, and position for each updated page." },
    ],
    timeline: "Most projects cover 10 to 30 pages over 3 to 6 weeks. Results typically show within 4 to 12 weeks of publishing.",
    costFactors: [
      "Number of pages",
      "How much new content each page needs",
      "Technical access to make changes",
      "Industry review requirements, such as legal or medical sign-off",
    ],
    pitfalls: [
      "Writing for a keyword tool instead of for the person searching.",
      "Creating a new page for every keyword variation, which splits rankings.",
      "Changing titles on pages that already rank well without a reason.",
    ],
    tools: ["Google Search Console", "Ahrefs or Semrush", "Screaming Frog", "Surfer or Clearscope for content gaps"],
    related: ["technical-seo", "seo-content-strategy", "schema-markup-seo", "local-seo"],
    faqs: [
      {
        q: "What's the difference between on-page and technical SEO?",
        a: "Technical SEO makes sure search engines can crawl and index your site. On-page SEO makes sure each page is the best answer for the search it targets. Most sites need some of both.",
      },
      {
        q: "Will you rewrite our content?",
        a: "Where it needs it. Some pages only need a better title and a few added sections. Others need a full rewrite. We share drafts before anything goes live.",
      },
      {
        q: "How do you choose keywords?",
        a: "We look at what your customers search for, how competitive those searches are, and whether the intent matches what you sell. A smaller keyword that brings buyers beats a big one that brings browsers.",
      },
      {
        q: "How soon will we see results?",
        a: "Often within a few weeks for pages already ranking on page two. Pages starting from nothing usually take two to three months.",
      },
    ],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    category: "seo-aeo",
    shortDescription: "Rank in the map pack and local results for the towns and neighborhoods you serve.",
    metaTitle: "Local SEO Services for U.S. Businesses | Klikcy",
    metaDescription:
      "Local SEO for service businesses and multi-location brands: Google Business Profile, location pages, citations, and reviews, so nearby customers find you.",
    focusKeyword: "local seo services",
    intro:
      "When someone nearby searches for what you do, you want to appear in the map results and the local listings beneath them. Local SEO is how you get there.",
    overview: [
      "Local rankings depend on three things Google has said openly: relevance (does your business match the search), distance (how close you are to the searcher), and prominence (how well known and well reviewed you are). You can't move your office, but you can do a lot about the other two.",
      "We start with your Google Business Profile because it drives map pack visibility. Then we look at your website's location and service pages, the consistency of your business details across directories, and the volume and recency of your reviews compared with the competitors who outrank you.",
      "For multi-location businesses, each location gets its own properly built page with real local information, not a copy of the same page with the city name swapped. That's the kind of page Google increasingly filters out.",
    ],
    signs: [
      "Competitors show up in the map pack and you don't.",
      "You have several locations and they rank unevenly.",
      "Your business name, address, or phone number differs across directories.",
      "You have fewer reviews than the businesses outranking you.",
    ],
    included: [
      "Google Business Profile audit and optimization",
      "Location and service-area page improvements",
      "Citation audit and cleanup on major directories",
      "Review request process and response templates",
      "Local schema markup",
      "Map pack rank tracking by area",
    ],
    process: [
      { title: "Benchmark", detail: "We check where you rank across your service area and who is ahead of you." },
      { title: "Fix the basics", detail: "Business Profile, citations, and on-site location details made accurate and consistent." },
      { title: "Build prominence", detail: "Review generation, local content, and local links from partners and associations." },
      { title: "Track", detail: "Monthly reporting on map pack positions, calls, direction requests, and site visits." },
    ],
    timeline: "Profile and citation fixes take 2 to 4 weeks. Ranking improvements usually build over 2 to 4 months.",
    costFactors: [
      "Number of locations",
      "How competitive your category and area are",
      "Citation cleanup required",
      "Whether location pages need building or rewriting",
    ],
    pitfalls: [
      "Creating dozens of near-identical city pages for areas you don't actually serve.",
      "Stuffing keywords into your Business Profile name, which risks suspension.",
      "Buying reviews or offering incentives for them, which breaks Google's rules.",
    ],
    tools: ["Google Business Profile", "BrightLocal or Whitespark", "Local Falcon grid tracking", "Google Search Console"],
    related: ["google-business-profile-optimization", "on-page-seo", "seo-content-strategy", "schema-markup-seo"],
    faqs: [
      {
        q: "How long does local SEO take to work?",
        a: "Fixes to your Business Profile can show up in weeks. Building enough reviews and local authority to beat established competitors usually takes a few months.",
      },
      {
        q: "Do I need a physical address to rank locally?",
        a: "Service-area businesses can hide their address and list the areas they serve. You still need a real business location; Google suspends profiles at virtual offices and P.O. boxes.",
      },
      {
        q: "Should I create a page for every city I serve?",
        a: "Only where you have something specific to say about that place, such as local projects, team members, or reviews. Thin pages with the city name swapped tend to get ignored or filtered.",
      },
      {
        q: "Can you help us get more reviews?",
        a: "Yes. We set up a simple process for asking happy customers at the right moment, plus templates for responding. We don't buy or incentivize reviews.",
      },
      {
        q: "Do you handle multiple locations?",
        a: "Yes. Each location gets its own profile work and page, and reporting shows performance location by location.",
      },
    ],
  },
  {
    slug: "programmatic-seo",
    name: "Programmatic SEO",
    category: "seo-aeo",
    shortDescription: "Large sets of pages generated from real data, each one useful enough to deserve indexing.",
    metaTitle: "Programmatic SEO Services | Klikcy",
    metaDescription:
      "Programmatic SEO built on real data: templates, unique content per page, internal linking, and indexing controls so large page sets help instead of hurt.",
    focusKeyword: "programmatic seo services",
    intro:
      "Programmatic SEO creates many pages from structured data, such as integrations, locations, or comparisons. It works when each page has something real to say, and backfires when it doesn't.",
    overview: [
      "Some searches come in thousands of variations: 'X integration with Y', 'flights from A to B', 'best tools for job Z'. A template filled from a database can serve those searches far better than writing each page by hand. Plenty of large sites earn most of their traffic this way.",
      "The failure mode is just as common. Thousands of pages that differ only by a swapped word get crawled, judged as thin, and either ignored or treated as spam under Google's scaled content policy. That can drag down the rest of the site too.",
      "We plan programmatic projects around the data first. If each page can show something genuinely different, like real numbers, specific features, user reviews, or local details, we build it. If it can't, we'll say so and suggest a smaller set of hand-built pages instead.",
    ],
    signs: [
      "You have a dataset (products, integrations, locations, listings) that maps to real search demand.",
      "You've already published template pages and most aren't indexed.",
      "You need hundreds of pages and can't write each one by hand.",
      "Your existing generated pages may be hurting site-wide rankings.",
    ],
    included: [
      "Keyword pattern and demand research",
      "Data audit to confirm each page can be unique",
      "Page template design with unique content blocks",
      "Internal linking and hub page structure",
      "Indexing rules, sitemaps, and canonical strategy",
      "Index coverage monitoring",
    ],
    process: [
      { title: "Validate demand", detail: "We confirm the keyword pattern has real search volume and intent you can serve." },
      { title: "Audit the data", detail: "We check whether the data can make each page meaningfully different and useful." },
      { title: "Build and test", detail: "We launch a sample set first and watch how Google indexes it before scaling." },
      { title: "Scale and prune", detail: "We expand what works and noindex or remove pages that don't earn their place." },
    ],
    timeline: "A pilot set usually launches in 4 to 8 weeks. Scaling follows once indexing and traffic data look healthy.",
    costFactors: [
      "Quality and structure of your data",
      "Number of templates",
      "Custom data collection or enrichment",
      "Platform (Next.js, WordPress, or other)",
    ],
    pitfalls: [
      "Publishing tens of thousands of pages at once instead of testing a sample.",
      "Pages that only differ by a city or product name.",
      "No plan for pages that never get indexed or visited.",
    ],
    tools: ["Next.js", "Headless CMS or database", "Google Search Console", "Screaming Frog", "Custom data pipelines"],
    related: ["nextjs-development", "technical-seo", "schema-markup-seo", "content-marketing"],
    faqs: [
      {
        q: "Is programmatic SEO considered spam?",
        a: "Not in itself. Google's policy targets pages made at scale mainly to rank, with little value to visitors. Pages built on real, useful data are fine. Pages with a name swapped are not.",
      },
      {
        q: "How many pages should we launch?",
        a: "Start with a sample of a few hundred, watch how many get indexed and visited over several weeks, then decide. Launching everything at once makes problems harder to see and fix.",
      },
      {
        q: "What platform do you use?",
        a: "Usually Next.js with a database or headless CMS, because it handles large page sets well. WordPress can work for smaller sets.",
      },
      {
        q: "We already have thousands of thin pages. What should we do?",
        a: "Usually some combination of improving the pages that get traffic, merging similar ones, and noindexing or removing the rest. We look at the data before deciding.",
      },
    ],
  },
  {
    slug: "answer-engine-optimization",
    name: "Answer Engine Optimization (AEO)",
    category: "seo-aeo",
    shortDescription: "Content and markup shaped so Google's AI Overviews, featured snippets, and voice answers can quote you.",
    metaTitle: "Answer Engine Optimization (AEO) Services | Klikcy",
    metaDescription:
      "Answer engine optimization for AI Overviews, featured snippets, and voice search. Clear answers, solid structure, and schema so your content gets quoted.",
    focusKeyword: "answer engine optimization",
    intro:
      "More searches end with an answer on the results page itself: a featured snippet, an AI Overview, or a voice reply. AEO makes your content the source those answers come from.",
    overview: [
      "Answer engines pull short, direct answers from pages they trust. To be chosen, a page needs to state the answer clearly near the top, back it up with detail, and be structured so a machine can tell which part answers which question. Most business content buries the answer under an introduction.",
      "We find the questions your customers ask, check who's currently being quoted for them, and rework your pages so the answer comes first in plain language, followed by the supporting detail. Headings are written as the questions people actually type. Structured data adds context about who wrote the content and what it covers.",
      "AEO overlaps heavily with good SEO; it isn't a separate trick. Nobody can guarantee that Google or an AI assistant will quote a specific page. What we can do is make your content the clearest, best-structured answer available, which is what these systems are looking for.",
    ],
    signs: [
      "Competitors appear in featured snippets and AI Overviews for questions you answer better.",
      "Your traffic for informational searches is falling while impressions hold steady.",
      "Your content is long but takes several paragraphs to get to the point.",
      "Customers ask your sales team the same questions over and over.",
    ],
    included: [
      "Question research across search, forums, and your sales calls",
      "Snapshot of who's currently quoted for your key questions",
      "Page rewrites with answer-first structure",
      "FAQ sections where they fit naturally",
      "Schema markup for articles, FAQs, and organization",
      "Tracking of snippet and AI Overview appearances",
    ],
    process: [
      { title: "Collect questions", detail: "From Search Console, People Also Ask boxes, forums, and your own customer conversations." },
      { title: "Map to pages", detail: "Each question gets a home: an existing page, a new section, or a new article." },
      { title: "Rewrite", detail: "Answers come first, in 40 to 60 words, followed by the detail that proves them." },
      { title: "Monitor", detail: "We track which questions you win and adjust the ones you don't." },
    ],
    timeline: "Initial research and rewrites take 4 to 6 weeks. Snippet wins can happen within weeks of publishing.",
    costFactors: [
      "Number of topics and pages",
      "Whether new content needs writing",
      "Subject-matter review requirements",
      "Ongoing monitoring versus a one-off project",
    ],
    pitfalls: [
      "Adding FAQ sections to every page whether they help or not.",
      "Writing robotic question-and-answer blocks that read badly for people.",
      "Expecting FAQ rich results, which Google now shows mainly for government and health sites.",
    ],
    tools: ["Google Search Console", "AlsoAsked", "Ahrefs or Semrush", "Schema.org markup", "AI Overview tracking"],
    related: ["generative-engine-optimization", "schema-markup-seo", "seo-content-strategy", "technical-seo"],
    faqs: [
      {
        q: "What is answer engine optimization?",
        a: "AEO is the practice of structuring content so search engines and AI assistants can lift a direct answer from it. In practice, that means putting a clear answer near the top of the page, using question-based headings, and adding structured data.",
      },
      {
        q: "Is AEO different from SEO?",
        a: "It's a focus within SEO, not a replacement. The same fundamentals apply: crawlable pages, trustworthy content, good structure. AEO puts extra weight on clear, quotable answers.",
      },
      {
        q: "Can you guarantee we'll appear in AI Overviews?",
        a: "No, and be wary of anyone who does. Google decides what to show. We improve your odds by making your content the clearest, best-supported answer and tracking the results.",
      },
      {
        q: "Does FAQ schema still help?",
        a: "Google limited FAQ rich results to a small set of authoritative government and health sites in 2023, so don't expect the expandable results. The markup can still help machines understand your content, so we use it where the FAQs are genuinely on the page.",
      },
    ],
  },
  {
    slug: "generative-engine-optimization",
    name: "Generative Engine Optimization (GEO)",
    category: "seo-aeo",
    shortDescription: "Helping ChatGPT, Perplexity, Gemini, and Claude find, understand, and mention your brand accurately.",
    metaTitle: "Generative Engine Optimization (GEO) | Klikcy",
    metaDescription:
      "GEO for brands that want accurate mentions in ChatGPT, Perplexity, Gemini, and Claude. Crawler access, clear entity info, and content worth citing.",
    focusKeyword: "generative engine optimization",
    intro:
      "When a customer asks ChatGPT or Perplexity for a recommendation in your space, you want your brand mentioned, and described correctly. GEO works on the signals those tools rely on.",
    overview: [
      "AI assistants answer from two sources: what they learned in training, and what they fetch from the web when they search. You can influence both. Training data favors brands that are described consistently across many credible sites. Live search favors pages that are crawlable, clearly written, and directly relevant.",
      "We start by asking the assistants about your category and recording what they say about you and your competitors. Then we check whether their crawlers can reach your site, whether your brand information is consistent across your site, directories, and profiles, and whether you have the comparison, pricing, and how-it-works content these tools tend to cite.",
      "This is a young field and the platforms change quickly. We'll be honest about what's measurable and what isn't, and we focus on work that also helps traditional search, so nothing is wasted if the landscape shifts.",
    ],
    signs: [
      "AI assistants don't mention you when asked about your category.",
      "They describe your business, pricing, or services incorrectly.",
      "Prospects tell you they found a competitor through ChatGPT.",
      "Your robots.txt or firewall may be blocking AI crawlers by accident.",
    ],
    included: [
      "Baseline of how major assistants describe you and competitors",
      "Crawler access review (robots.txt, firewall, rendering)",
      "Entity consistency across your site and key profiles",
      "Content gaps for comparisons, pricing, and use cases",
      "Organization and product structured data",
      "Quarterly re-check of assistant answers",
    ],
    process: [
      { title: "Baseline", detail: "We run a fixed set of prompts across ChatGPT, Perplexity, Gemini, and Claude and record the answers." },
      { title: "Access and accuracy", detail: "We make sure crawlers can reach your content and your brand facts are consistent everywhere." },
      { title: "Content", detail: "We fill the gaps assistants look for: comparisons, specifics, and clear explanations." },
      { title: "Re-check", detail: "We repeat the same prompts each quarter to track change." },
    ],
    timeline: "Setup takes 3 to 5 weeks. Changes in assistant answers depend on the platform and can take months, especially for training-based answers.",
    costFactors: [
      "Number of products or service lines",
      "How much new content is needed",
      "Number of external profiles to correct",
      "Frequency of monitoring",
    ],
    pitfalls: [
      "Blocking AI crawlers at the firewall without realizing it.",
      "Inconsistent descriptions of your business across your own site and profiles.",
      "Paying for 'guaranteed' AI placement, which nobody can actually deliver.",
    ],
    tools: ["ChatGPT", "Perplexity", "Gemini", "Claude", "robots.txt and server logs", "Schema.org"],
    related: ["answer-engine-optimization", "seo-content-strategy", "schema-markup-seo", "technical-seo"],
    faqs: [
      {
        q: "What's the difference between GEO and AEO?",
        a: "AEO is mainly about answers inside Google: featured snippets and AI Overviews. GEO covers standalone AI assistants like ChatGPT, Perplexity, Gemini, and Claude, which use different crawlers and sources.",
      },
      {
        q: "Should we let AI crawlers access our site?",
        a: "For most businesses that want to be recommended, yes. Search-oriented crawlers such as OAI-SearchBot and PerplexityBot fetch pages to answer live questions. Some companies choose to block training crawlers while allowing search crawlers; we can set it up either way.",
      },
      {
        q: "Can you measure GEO results?",
        a: "Partly. We track how assistants answer a fixed set of prompts over time, and referral traffic from AI tools in your analytics. It's less precise than search rankings, and we'll say so in our reports.",
      },
      {
        q: "How long does it take?",
        a: "Live-search answers can change within weeks of new content being indexed. Answers based on training data only change when the model is updated, which can take many months.",
      },
    ],
  },
  {
    slug: "schema-markup-seo",
    name: "Schema Markup SEO",
    category: "seo-aeo",
    shortDescription: "Structured data that tells search engines exactly what your pages describe.",
    metaTitle: "Schema Markup Services | Structured Data SEO | Klikcy",
    metaDescription:
      "Schema markup done properly: Organization, LocalBusiness, Product, Article, and more in JSON-LD, validated and kept in sync with what's on the page.",
    focusKeyword: "schema markup seo",
    intro:
      "Schema markup is code that labels the facts on your page: this is a product, this is its price, this is the business, these are its hours. It helps search engines show richer results.",
    overview: [
      "Search engines are good at reading pages, but structured data removes the guesswork. Marked-up products can show price, availability, and review stars in results. Organization markup helps Google connect your website with your logo, profiles, and contact details. Article markup clarifies the author and publish date.",
      "We write schema in JSON-LD, Google's preferred format, and generate it from your actual content so it can't drift out of date. A price change in your CMS updates the markup automatically. Everything is validated with Google's Rich Results Test and the Schema.org validator.",
      "We also remove markup that does more harm than good. Plugins often output duplicate or contradictory schema, or mark up things that aren't visible on the page, which Google treats as a guidelines violation.",
    ],
    signs: [
      "Competitors show review stars, prices, or event dates in search results and you don't.",
      "Search Console reports structured data errors or warnings.",
      "Several plugins each output their own schema.",
      "Your knowledge panel shows the wrong logo or details.",
    ],
    included: [
      "Audit of existing structured data",
      "Schema plan by page type",
      "JSON-LD implementation generated from your content",
      "Validation in Rich Results Test and Schema.org validator",
      "Removal of duplicate or misleading markup",
      "Search Console enhancement report monitoring",
    ],
    process: [
      { title: "Audit", detail: "We list every schema type currently on the site and check it for errors and conflicts." },
      { title: "Plan", detail: "We map the right types to each page template, focusing on ones that earn rich results." },
      { title: "Implement", detail: "Markup is built into templates so it updates with your content." },
      { title: "Validate and monitor", detail: "We test every template and watch Search Console reports for new issues." },
    ],
    timeline: "Most schema projects take 1 to 3 weeks.",
    costFactors: [
      "Number of page templates",
      "Platform and how markup can be added",
      "Removing conflicting plugin output",
      "Custom data such as reviews or events",
    ],
    pitfalls: [
      "Marking up content that isn't visible on the page.",
      "Self-serving review stars on your own business, which Google doesn't show.",
      "Hard-coding values like prices that later go stale.",
    ],
    tools: ["JSON-LD", "Google Rich Results Test", "Schema.org validator", "Google Search Console"],
    related: ["technical-seo", "answer-engine-optimization", "on-page-seo", "google-search-console-setup"],
    faqs: [
      {
        q: "Does schema markup improve rankings?",
        a: "Not directly. It helps Google understand your pages and can earn rich results, which often lift click-through rates. That extra traffic is where the value comes from.",
      },
      {
        q: "Which schema types matter most?",
        a: "It depends on your business. Organization and Breadcrumb help almost everyone. Product matters for stores, LocalBusiness for location-based businesses, Article for publishers, and Event for event organizers.",
      },
      {
        q: "Can I show review stars for my business in Google?",
        a: "Not through your own website's markup. Google stopped showing self-serving review stars for businesses marking up reviews about themselves. Product reviews and third-party review platforms are different.",
      },
      {
        q: "Will you fix markup from our SEO plugin?",
        a: "Yes. We either configure the plugin properly or turn off its schema output and replace it with markup built into your templates.",
      },
    ],
  },
  {
    slug: "seo-content-strategy",
    name: "SEO Content Strategy",
    category: "seo-aeo",
    shortDescription: "A plan for what to publish, in what order, and why, based on what your buyers search for.",
    metaTitle: "SEO Content Strategy Services | Klikcy",
    metaDescription:
      "SEO content strategy built on real search data: topic clusters, content briefs, a publishing calendar, and a plan for updating what you already have.",
    focusKeyword: "seo content strategy",
    intro:
      "A content strategy decides what to write before anyone starts writing: which topics bring in buyers, which pages to update, and how everything links together.",
    overview: [
      "Most business blogs are a list of whatever someone thought of that month. Some posts get traffic, most don't, and nobody knows which ones bring in customers. A strategy turns that into a plan.",
      "We map the searches your buyers make at each stage, from early research to comparing providers, and check which ones you can realistically compete for. Topics are grouped into clusters around your core services, with a main page for each and supporting articles that link back to it. That structure helps Google see your expertise and helps readers find the next thing they need.",
      "Often the fastest wins come from what you've already published. We review your existing content to find pages worth updating, pages to merge, and pages to retire, before recommending anything new.",
    ],
    signs: [
      "You publish regularly but traffic isn't growing.",
      "Your blog traffic doesn't turn into leads.",
      "You aren't sure what to write next.",
      "You have hundreds of old posts and no idea which ones matter.",
    ],
    included: [
      "Audience and search demand research",
      "Topic clusters mapped to your services",
      "Existing content audit: update, merge, or retire",
      "Detailed briefs for each new piece",
      "Prioritized publishing calendar",
      "Internal linking plan",
    ],
    process: [
      { title: "Research", detail: "We study your customers, competitors, and the searches that lead to sales." },
      { title: "Audit", detail: "We grade existing content by traffic, conversions, and potential." },
      { title: "Plan", detail: "Clusters, priorities, and a calendar your team or ours can work from." },
      { title: "Brief", detail: "Each piece gets a brief: search intent, angle, outline, sources, and internal links." },
    ],
    timeline: "A content strategy usually takes 3 to 5 weeks to research and deliver.",
    costFactors: [
      "Number of service lines or products covered",
      "Size of your existing content library",
      "Number of briefs included",
      "Whether we also write the content",
    ],
    pitfalls: [
      "Chasing high-volume keywords that don't relate to what you sell.",
      "Publishing new posts while old ones that could rank with an update gather dust.",
      "Writing generic articles that add nothing a reader couldn't find elsewhere.",
    ],
    tools: ["Ahrefs or Semrush", "Google Search Console", "GA4", "Customer interviews and sales call notes"],
    related: ["content-marketing", "on-page-seo", "answer-engine-optimization", "programmatic-seo"],
    faqs: [
      {
        q: "Do you write the content, or just plan it?",
        a: "Both options are available. Some teams take the strategy and briefs and write in-house. Others have us write too, through our Content Marketing service.",
      },
      {
        q: "How do you decide which topics to cover?",
        a: "We weigh search demand, how competitive the topic is, how closely it relates to what you sell, and whether you have real expertise to add. A topic needs all four to make the list.",
      },
      {
        q: "How long before content brings in traffic?",
        a: "New articles typically take three to six months to reach their potential. Updates to existing pages often show results within weeks.",
      },
      {
        q: "Is AI-written content OK for SEO?",
        a: "Google judges content on quality, not on how it was produced. In practice, articles produced quickly without real expertise rarely rank or convert. We use AI tools for research and drafts, but every piece is shaped and checked by people who know the subject.",
      },
    ],
  },
  {
    slug: "google-business-profile-optimization",
    name: "Google Business Profile Optimization",
    category: "seo-aeo",
    shortDescription: "Your Google Business Profile set up and managed so you show up, and get chosen, on Maps.",
    metaTitle: "Google Business Profile Optimization | Klikcy",
    metaDescription:
      "Google Business Profile optimization: categories, services, photos, posts, reviews, and Q&A set up properly so local customers find and choose you on Maps.",
    focusKeyword: "google business profile optimization",
    intro:
      "For local searches, your Google Business Profile often gets more views than your website. We set it up properly and keep it active.",
    overview: [
      "Your Business Profile is what people see in the map pack and on Google Maps: your hours, reviews, photos, and the buttons to call or get directions. Small details make a big difference here. The primary category alone can decide which searches you appear for.",
      "We review every field against Google's guidelines and against the competitors outranking you. That covers categories, services, service areas, business description, attributes, photos, and the booking or quote links. Then we set up a routine: regular posts, fresh photos, answered questions, and replies to every review.",
      "We also handle the frustrating parts: verification problems, suspended profiles, duplicate listings, and edits made by the public that change your details without asking.",
    ],
    signs: [
      "Your profile hasn't been touched since it was created.",
      "You're not sure your primary category is the right one.",
      "Reviews go unanswered for weeks.",
      "Your profile was suspended or has duplicates.",
    ],
    included: [
      "Full profile audit against guidelines and competitors",
      "Category, service, and attribute optimization",
      "Business description and service area setup",
      "Photo guidance and uploads",
      "Review response templates and process",
      "Monthly posts and Q&A management (ongoing plans)",
    ],
    process: [
      { title: "Audit", detail: "We compare your profile, field by field, with Google's guidelines and your top competitors." },
      { title: "Optimize", detail: "We update categories, services, descriptions, and media." },
      { title: "Routine", detail: "We set up a schedule for posts, photos, and review responses." },
      { title: "Report", detail: "We track calls, direction requests, website clicks, and search views each month." },
    ],
    timeline: "The initial optimization takes about 1 to 2 weeks. Ongoing management runs monthly.",
    costFactors: [
      "Number of locations",
      "Verification or suspension issues",
      "Whether you want ongoing posting and review management",
      "Photography needs",
    ],
    pitfalls: [
      "Adding keywords or city names to the business name.",
      "Choosing a broad primary category when a more specific one exists.",
      "Ignoring negative reviews instead of replying calmly and quickly.",
    ],
    tools: ["Google Business Profile Manager", "Local Falcon or BrightLocal", "Review management tools"],
    related: ["local-seo", "on-page-seo", "schema-markup-seo", "seo-content-strategy"],
    faqs: [
      {
        q: "How do I get my business to show in the Google map pack?",
        a: "Choose the most accurate primary category, complete every relevant field, keep your details consistent across the web, earn steady reviews, and make sure your website supports the same services and location. Distance to the searcher also matters, and that part you can't control.",
      },
      {
        q: "Can you fix a suspended profile?",
        a: "Often, yes. Suspensions usually come from guideline issues such as address problems or keyword-stuffed names. We fix the cause and submit a reinstatement request with the right evidence.",
      },
      {
        q: "Do Google Business Profile posts help rankings?",
        a: "There's little evidence that posts directly improve rankings, but they keep your profile current and give searchers a reason to choose you. We treat them as a conversion tool.",
      },
      {
        q: "Should we respond to every review?",
        a: "Yes, briefly and personally. It shows prospective customers you care, and replying to negative reviews calmly often matters more than the review itself.",
      },
    ],
  },
];
