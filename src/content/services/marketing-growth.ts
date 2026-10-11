import type { Service } from "@/lib/service-types";

export const marketingGrowthServices: Service[] = [
  {
    slug: "digital-marketing-strategy",
    name: "Digital Marketing Strategy",
    category: "marketing-growth",
    shortDescription: "A clear plan for which channels to use, what to say, and how to measure whether it's working.",
    metaTitle: "Digital Marketing Strategy Services | Klikcy",
    metaDescription:
      "Digital marketing strategy for U.S. businesses: audience, positioning, channel mix, budget, and measurement, turned into a 90-day plan your team can run.",
    focusKeyword: "digital marketing strategy",
    intro:
      "We help you decide where to spend marketing time and money, what to say, and how to tell whether it's working, then turn it into a plan your team can actually run.",
    overview: [
      "Most small and mid-size businesses market by accumulation: a bit of social, some ads, an occasional newsletter, a blog that stalled. Each channel gets a little attention and none gets enough to work. A strategy picks the few channels that fit your customers and budget, and commits to them.",
      "We start with your customers and economics: who buys, how they find providers like you, what a customer is worth, and what you can afford to spend to win one. Then we look at your current channels and competitors to see where the realistic opportunities are.",
      "The result is a short, practical document, not a 60-page deck: positioning and key messages, chosen channels with reasons, a 90-day plan with owners, a budget, and the handful of numbers to watch.",
    ],
    signs: [
      "You're spending on marketing but can't say what's working.",
      "You do a bit of everything and nothing well.",
      "You're entering a new market or launching a new offer.",
      "You're about to hire a marketer or agency and want a plan first.",
    ],
    included: [
      "Customer and competitor research",
      "Positioning and key messages",
      "Channel recommendations with reasoning",
      "Budget allocation",
      "90-day action plan with owners",
      "Measurement plan and KPIs",
    ],
    process: [
      { title: "Research", detail: "Interviews with your team and customers, plus a review of your data and competitors." },
      { title: "Choose", detail: "We agree on the audience, message, and channels to focus on." },
      { title: "Plan", detail: "A 90-day plan with tasks, owners, budget, and targets." },
      { title: "Review", detail: "A check-in after the first month to adjust based on early results." },
    ],
    timeline: "Most strategy projects take 3 to 5 weeks.",
    costFactors: [
      "Number of products or audiences",
      "Customer research depth",
      "Data and analytics review",
      "Ongoing advisory after the plan",
    ],
    pitfalls: [
      "Copying a competitor's channel mix without their budget or audience.",
      "Setting goals with no way to measure them.",
      "A plan so big nobody has time to execute it.",
    ],
    tools: ["GA4", "Google Search Console", "Ahrefs or Semrush", "Ad platform data", "Customer interviews"],
    related: ["seo-content-strategy", "conversion-rate-optimization", "google-analytics-setup", "content-marketing"],
    faqs: [
      {
        q: "What does a digital marketing strategy include?",
        a: "Who you're targeting, what you'll say to them, which channels you'll use and why, how much to spend, what to do in the next 90 days, and how you'll measure results.",
      },
      {
        q: "Do you also run the marketing?",
        a: "We implement parts of it, such as SEO, content, email setup, analytics, and conversion work. For paid ad management, we can recommend specialists or work alongside your team.",
      },
      {
        q: "How do you choose channels?",
        a: "Based on where your customers look for providers, what your competitors already dominate, your budget, and how quickly you need results.",
      },
      {
        q: "Is this useful for a small business?",
        a: "Especially so. Small budgets can't afford to be spread thin, and a focused plan makes each dollar count.",
      },
    ],
  },
  {
    slug: "conversion-rate-optimization",
    name: "Conversion Rate Optimization",
    category: "marketing-growth",
    shortDescription: "Research and testing that turn more of your existing visitors into leads and customers.",
    metaTitle: "Conversion Rate Optimization (CRO) Services | Klikcy",
    metaDescription:
      "Conversion rate optimization based on research, not guesses: analytics, session recordings, user testing, and A/B tests that turn more visitors into customers.",
    focusKeyword: "conversion rate optimization",
    intro:
      "More traffic is expensive. Converting more of the visitors you already have is often cheaper. CRO finds out why visitors don't act and tests changes that help them.",
    overview: [
      "CRO starts with research, not button colors. We look at where visitors drop off in your analytics, watch session recordings, survey visitors and customers, and run usability tests. Patterns emerge quickly: confusing pricing, a form that asks too much, a key question never answered, a mobile layout that hides the call to action.",
      "Each finding becomes a hypothesis: if we change this, we expect that, because of this evidence. Where you have enough traffic, we test changes with A/B tests to measure the real effect. Where traffic is lower, we make research-backed changes and compare results carefully over time.",
      "We report results honestly, including tests that didn't win. A losing test still teaches you something about your customers.",
    ],
    signs: [
      "You have steady traffic but leads or sales have plateaued.",
      "Your ad costs keep rising and you need each visitor to count.",
      "You see big drop-offs at a particular step in your funnel.",
      "You've redesigned before and couldn't tell whether it helped.",
    ],
    included: [
      "Analytics and funnel audit",
      "Session recording and heatmap review",
      "Visitor surveys and usability testing",
      "Prioritized hypothesis backlog",
      "A/B test design, build, and analysis",
      "Monthly results reporting",
    ],
    process: [
      { title: "Research", detail: "Quantitative and qualitative data to find where and why visitors drop off." },
      { title: "Prioritize", detail: "Hypotheses ranked by expected impact, confidence, and effort." },
      { title: "Test", detail: "Changes built and run as A/B tests long enough to reach a reliable result." },
      { title: "Learn and repeat", detail: "Winning changes are kept, and every result feeds the next round." },
    ],
    timeline: "Initial research takes 2 to 4 weeks. Testing then runs in monthly cycles.",
    costFactors: [
      "Traffic volume (which affects how many tests are possible)",
      "Number of pages and funnels",
      "Research methods used",
      "Development effort per test",
    ],
    pitfalls: [
      "Stopping tests early because one version looks ahead.",
      "Testing tiny changes on low-traffic pages where results can't be trusted.",
      "Copying 'best practices' instead of researching your own visitors.",
    ],
    tools: ["GA4", "Microsoft Clarity or Hotjar", "VWO or Convert", "Lyssna or Maze", "Survey tools"],
    related: ["landing-page-optimization", "conversion-focused-website-design", "google-analytics-setup", "product-page-optimization"],
    faqs: [
      {
        q: "How much traffic do we need for A/B testing?",
        a: "Generally, a few hundred conversions per variation over a test period is needed for reliable results. With less traffic, we focus on research-led changes and before-and-after comparisons.",
      },
      {
        q: "How long does a test run?",
        a: "Usually at least two full weeks, to cover weekday and weekend behavior, and until enough data is collected to trust the result.",
      },
      {
        q: "What's a good conversion rate?",
        a: "It varies widely by industry, traffic source, and what counts as a conversion. Your own baseline is the number to beat.",
      },
      {
        q: "What happened to Google Optimize?",
        a: "Google shut down Optimize in September 2023. We use tools such as VWO or Convert, or build tests directly into the site.",
      },
    ],
  },
  {
    slug: "google-analytics-setup",
    name: "Google Analytics Setup",
    category: "marketing-growth",
    shortDescription: "GA4 configured to track the actions that matter to your business, with reports you'll actually read.",
    metaTitle: "Google Analytics 4 (GA4) Setup & Audit | Klikcy",
    metaDescription:
      "GA4 setup and audits: key events, conversions, ecommerce tracking, consent settings, and clean reports, so your analytics data can be trusted for decisions.",
    focusKeyword: "google analytics setup",
    intro:
      "We set up Google Analytics 4 so it tracks the things that matter to your business, like leads, sales, and sign-ups, accurately, and so you can find answers without a manual.",
    overview: [
      "GA4 replaced Universal Analytics in 2023, and many accounts were migrated in a hurry. Common problems we find: conversions counted twice, form submissions not tracked at all, internal traffic inflating the numbers, data retention left at the two-month default, and referral spam from payment providers splitting sessions.",
      "We audit what's there, then configure GA4 properly: key events for the actions that matter, e-commerce tracking for stores, cross-domain tracking if your checkout or booking tool lives elsewhere, internal traffic filters, and correct retention and consent settings.",
      "Finally, we build a few simple reports and explorations around the questions you actually ask, because GA4's default reports aren't intuitive.",
    ],
    signs: [
      "You don't trust the numbers in your Analytics.",
      "Leads or sales in GA4 don't match your CRM or store.",
      "You haven't touched Analytics since the move to GA4.",
      "You can't answer basic questions like which channel brings the most leads.",
    ],
    included: [
      "GA4 audit or new property setup",
      "Key event and conversion configuration",
      "E-commerce tracking for online stores",
      "Cross-domain and internal traffic settings",
      "Data retention and consent configuration",
      "Custom reports and a walkthrough",
    ],
    process: [
      { title: "Audit", detail: "We check what's tracked, what's broken, and what's missing." },
      { title: "Plan", detail: "We agree which actions count as conversions and how to name events." },
      { title: "Implement", detail: "Tracking configured, usually through Google Tag Manager." },
      { title: "Verify", detail: "We test every event and compare numbers with your CRM or store." },
    ],
    timeline: "Most GA4 setups and audits take 1 to 2 weeks.",
    costFactors: [
      "Number of conversion actions",
      "E-commerce tracking",
      "Cross-domain or app tracking",
      "Integration with ads and CRM platforms",
    ],
    pitfalls: [
      "Counting the same conversion twice from two different tags.",
      "Leaving data retention at the two-month default.",
      "Tracking dozens of events with no plan for using them.",
    ],
    tools: ["Google Analytics 4", "Google Tag Manager", "BigQuery export", "Looker Studio"],
    related: ["google-tag-manager-setup", "google-search-console-setup", "reporting-automation", "conversion-rate-optimization"],
    faqs: [
      {
        q: "Why don't GA4 numbers match our CRM?",
        a: "Some difference is normal because of ad blockers, consent choices, and how each tool counts. Large gaps usually point to tracking problems like missing events or duplicate tags, which we fix.",
      },
      {
        q: "Do we need Google Tag Manager for GA4?",
        a: "It isn't required, but we recommend it. GTM makes it easier to add and change tracking without editing site code.",
      },
      {
        q: "Should we change the data retention setting?",
        a: "Yes, usually to the maximum available (14 months on standard GA4). It affects how far back you can analyze in explorations.",
      },
      {
        q: "Do we need a cookie consent banner?",
        a: "It depends on where your visitors are and which state laws apply to you. Several U.S. states now have privacy laws, and EU visitors bring stricter rules. We'll configure consent settings based on what you and your legal advisor decide.",
      },
    ],
  },
  {
    slug: "google-tag-manager-setup",
    name: "Google Tag Manager Setup",
    category: "marketing-growth",
    shortDescription: "A clean Tag Manager container for analytics and ad tracking that your team can manage safely.",
    metaTitle: "Google Tag Manager Setup & Cleanup | Klikcy",
    metaDescription:
      "Google Tag Manager setup and cleanup: organized tags, triggers, and variables for GA4, Google Ads, Meta, and LinkedIn, with a data layer and consent mode.",
    focusKeyword: "google tag manager setup",
    intro:
      "We set up or clean up Google Tag Manager so your analytics and advertising tags fire correctly, are easy to understand, and don't slow your site down.",
    overview: [
      "Tag Manager containers tend to get messy. Several people add tags over the years, nobody removes the old ones, naming is inconsistent, and eventually nobody knows which tags still matter. Duplicate tracking and slow pages follow.",
      "We audit the container, remove what's unused, and rebuild it with a clear naming system and folders. Where your site can provide it, we set up a data layer so tags get reliable information, such as order values or form types, instead of scraping it from the page.",
      "We configure conversion tags for your ad platforms, including enhanced conversions where appropriate, and set up consent mode so tags respect visitor choices.",
    ],
    signs: [
      "Your GTM container has tags nobody can explain.",
      "Ad platforms report different conversion numbers than GA4.",
      "Adding new tracking requires a developer every time.",
      "Your site loads many third-party scripts you didn't know about.",
    ],
    included: [
      "Container audit and cleanup",
      "Naming convention and folder structure",
      "Data layer specification and implementation",
      "GA4 and ad platform conversion tags",
      "Consent mode configuration",
      "Testing and documentation",
    ],
    process: [
      { title: "Audit", detail: "We list every tag, trigger, and variable, and test what actually fires." },
      { title: "Plan", detail: "A tracking plan and data layer specification agreed with your team." },
      { title: "Build", detail: "Tags configured in a workspace and tested in preview mode." },
      { title: "Publish", detail: "A documented, versioned release with a rollback point." },
    ],
    timeline: "Most GTM projects take 1 to 2 weeks.",
    costFactors: [
      "Container size and condition",
      "Number of ad platforms",
      "Data layer development work",
      "Server-side tagging if required",
    ],
    pitfalls: [
      "Publishing changes without testing in preview mode.",
      "Hard-coding tags in the site and in GTM at the same time.",
      "Giving publish access to everyone.",
    ],
    tools: ["Google Tag Manager", "GA4", "Google Ads", "Meta Pixel and Conversions API", "LinkedIn Insight Tag"],
    related: ["google-analytics-setup", "google-search-console-setup", "conversion-rate-optimization", "reporting-automation"],
    faqs: [
      {
        q: "What is Google Tag Manager?",
        a: "A free tool that lets you add and manage tracking codes on your website from one place, without editing the site's code for every change.",
      },
      {
        q: "Will Tag Manager slow down our site?",
        a: "GTM itself is light, but the tags inside it can add weight. Cleaning up unused tags often improves page speed.",
      },
      {
        q: "What is a data layer?",
        a: "A structured way for your website to pass information such as order totals or form names to Tag Manager, so tracking is accurate and doesn't break when the page design changes.",
      },
      {
        q: "Do we need server-side tagging?",
        a: "Not usually for small and mid-size sites. It can help with data accuracy and control for larger advertisers, but it adds hosting cost and complexity.",
      },
    ],
  },
  {
    slug: "google-search-console-setup",
    name: "Google Search Console Setup",
    category: "marketing-growth",
    shortDescription: "Search Console verified, configured, and explained, so you can see how Google sees your site.",
    metaTitle: "Google Search Console Setup & Training | Klikcy",
    metaDescription:
      "Google Search Console setup: verification, sitemaps, indexing review, Core Web Vitals, and a walkthrough of the reports that matter for your business.",
    focusKeyword: "google search console setup",
    intro:
      "Search Console is Google's free tool for showing you how your site performs in search and what problems Google finds. We set it up properly and show you which reports matter.",
    overview: [
      "Search Console tells you which searches bring people to your site, which pages are indexed and which aren't, whether your pages pass Core Web Vitals, and whether Google has found any security or manual action issues. It's the most direct line you have to how Google sees your site.",
      "We verify the right property type (a domain property covers every version of your site), submit your sitemap, connect it to Google Analytics, and give the right people access. Then we review the indexing and experience reports and flag anything that needs attention.",
      "The walkthrough is the part clients value most: a short session on the four or five reports worth checking monthly and how to read them.",
    ],
    signs: [
      "You've never set up Search Console, or aren't sure who has access.",
      "You don't know whether all your pages are indexed.",
      "You've just launched or migrated a site.",
      "You want to see which searches bring visitors to your site.",
    ],
    included: [
      "Domain property verification via DNS",
      "Sitemap submission",
      "User access setup",
      "GA4 connection",
      "Indexing and Core Web Vitals review",
      "Training walkthrough",
    ],
    process: [
      { title: "Verify", detail: "We verify a domain property through DNS so every version of your site is covered." },
      { title: "Configure", detail: "Sitemaps submitted, users added, and Analytics linked." },
      { title: "Review", detail: "We check indexing, experience, and security reports for issues." },
      { title: "Train", detail: "A session covering the reports worth watching and what to do when something changes." },
    ],
    timeline: "Setup and review usually take a few days. Some reports need several days of data to populate.",
    costFactors: [
      "Number of sites or domains",
      "Depth of the initial review",
      "Whether issues found need fixing",
      "Training for multiple team members",
    ],
    pitfalls: [
      "Verifying only one version of the site, such as http or non-www.",
      "Leaving former employees or agencies with full access.",
      "Ignoring the Pages report until traffic drops.",
    ],
    tools: ["Google Search Console", "Your DNS provider", "GA4", "Looker Studio"],
    related: ["technical-seo", "google-analytics-setup", "schema-markup-seo", "reporting-automation"],
    faqs: [
      {
        q: "What is Google Search Console used for?",
        a: "Seeing which searches show your site, how often people click, which pages are indexed, and any problems Google finds with your site's crawling, speed, or security.",
      },
      {
        q: "What's the difference between Search Console and Google Analytics?",
        a: "Search Console shows what happens in Google search before someone clicks. Analytics shows what visitors do after they arrive on your site. They work best connected.",
      },
      {
        q: "Why aren't all my pages indexed?",
        a: "Google doesn't index every page it finds. Common reasons are duplicate or thin content, technical blocks, or pages Google considers low value. The Pages report shows the reasons for each.",
      },
      {
        q: "How often should we check Search Console?",
        a: "Monthly for most businesses, and right after any site launch, redesign, or migration.",
      },
    ],
  },
  {
    slug: "landing-page-optimization",
    name: "Landing Page Optimization",
    category: "marketing-growth",
    shortDescription: "Improving existing landing pages through testing so your ad spend brings in more leads.",
    metaTitle: "Landing Page Optimization Services | Klikcy",
    metaDescription:
      "Landing page optimization for paid campaigns: message match, form and offer testing, speed fixes, and A/B tests that lower your cost per lead over time.",
    focusKeyword: "landing page optimization",
    intro:
      "If you're paying for clicks, every improvement to your landing page lowers what each lead costs. We test and improve existing landing pages, one change at a time.",
    overview: [
      "Landing pages are the easiest place on a website to measure and improve, because the traffic source and the goal are both clear. Small changes to a headline, offer, or form can have a big effect on cost per lead.",
      "We start by checking the basics: does the page match the ad that sends people there, load quickly on a phone, and make the next step obvious? Then we look at analytics and recordings to see where visitors hesitate, and plan a sequence of tests: headline and offer first, then proof, form length, and layout.",
      "This service improves pages you already have. If you need new landing pages designed and built, see Landing Page Design.",
    ],
    signs: [
      "Your cost per lead from ads is rising.",
      "Your landing pages haven't changed since they launched.",
      "Many visitors click the ad but few fill in the form.",
      "You run several campaigns sending traffic to one generic page.",
    ],
    included: [
      "Landing page and campaign audit",
      "Message match review against your ads",
      "Speed and mobile fixes",
      "Test plan for headline, offer, form, and layout",
      "A/B test build and analysis",
      "Monthly cost-per-lead reporting",
    ],
    process: [
      { title: "Audit", detail: "We review each page against its ads, speed, and conversion data." },
      { title: "Quick fixes", detail: "Obvious problems such as slow loading or broken forms get fixed first." },
      { title: "Test", detail: "We run tests in order of expected impact." },
      { title: "Report", detail: "Monthly results in terms of conversion rate and cost per lead." },
    ],
    timeline: "The audit and quick fixes take 1 to 2 weeks. Testing then runs monthly.",
    costFactors: [
      "Number of landing pages and campaigns",
      "Traffic volume",
      "Development needed per test",
      "Testing tool costs",
    ],
    pitfalls: [
      "Testing too many things at once, so you can't tell what worked.",
      "Ending tests before reaching enough conversions.",
      "Optimizing for form fills when lead quality is dropping.",
    ],
    tools: ["GA4", "Google Ads and Meta Ads", "VWO or Convert", "Microsoft Clarity", "Unbounce or your CMS"],
    related: ["landing-page-design", "conversion-rate-optimization", "google-tag-manager-setup", "ui-ux-design"],
    faqs: [
      {
        q: "What's the first thing to test on a landing page?",
        a: "Usually the headline and offer, because they affect every visitor. Small design tweaks rarely move results as much as a clearer promise.",
      },
      {
        q: "Should each ad campaign have its own landing page?",
        a: "Where campaigns target different audiences or offers, yes. Matching the page to the ad usually improves conversion rates.",
      },
      {
        q: "How do you measure lead quality, not just quantity?",
        a: "We connect form submissions to your CRM so we can see which leads become customers, and judge tests on that where volume allows.",
      },
      {
        q: "Do you manage our ad campaigns too?",
        a: "We focus on the landing page side and work alongside whoever manages your ads, sharing data so both sides improve.",
      },
    ],
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    category: "marketing-growth",
    shortDescription: "Articles, guides, and case studies written by people who understand your subject and your buyers.",
    metaTitle: "Content Marketing Services | Klikcy",
    metaDescription:
      "Content marketing that earns search traffic and trust: researched articles, guides, and case studies written with your experts and built to bring in leads.",
    focusKeyword: "content marketing",
    intro:
      "We write the content your buyers look for while they're researching: guides, comparisons, how-to articles, and case studies, based on real expertise from your team.",
    overview: [
      "The internet doesn't need another generic '10 tips' article. What earns rankings, links, and trust is content with something real in it: your team's experience, specific examples, original data, honest comparisons, and clear answers to the questions buyers ask before they're ready to talk to sales.",
      "Our process gets that expertise out of your team without taking much of their time. A short interview with a subject expert gives us the specifics. We handle research, writing, editing, and on-page SEO. Every piece goes back to the expert for a quick accuracy check before publishing.",
      "We plan content around your sales process, so articles naturally lead readers toward your services, and we track which pieces bring in leads, not just traffic.",
    ],
    signs: [
      "Your blog is quiet or full of generic posts that don't rank.",
      "Your team has deep expertise that isn't reflected online.",
      "Sales keeps answering the same questions that content could handle.",
      "Competitors rank for the topics you know best.",
    ],
    included: [
      "Topic plan based on search and sales questions",
      "Expert interviews",
      "Researched, edited articles and guides",
      "Case studies written with your clients",
      "On-page SEO and internal linking",
      "Performance reporting on traffic and leads",
    ],
    process: [
      { title: "Plan", detail: "Topics chosen from search demand and the questions your buyers ask." },
      { title: "Interview", detail: "A short call with your expert for the details only they know." },
      { title: "Write and edit", detail: "Drafts with sources, examples, and clear structure." },
      { title: "Review and publish", detail: "Expert accuracy check, final edits, publishing, and promotion." },
    ],
    timeline: "Content usually runs monthly. Most articles take 2 to 3 weeks from interview to publish.",
    costFactors: [
      "Number and length of pieces per month",
      "Technical depth of the subject",
      "Original research or data",
      "Design for downloadable guides",
    ],
    pitfalls: [
      "Publishing frequently at the expense of quality.",
      "Writing about topics only loosely related to what you sell.",
      "Content with no examples, data, or opinions of its own.",
    ],
    tools: ["Google Search Console", "Ahrefs or Semrush", "Google Docs", "Your CMS", "GA4"],
    related: ["seo-content-strategy", "answer-engine-optimization", "on-page-seo", "email-marketing-setup"],
    faqs: [
      {
        q: "Who writes the content?",
        a: "Our writers, working from interviews with your subject experts. Your experts review every piece for accuracy before it's published.",
      },
      {
        q: "Do you use AI to write?",
        a: "We use AI tools for research and organizing notes, but the writing, examples, and judgment come from people. Content that's mostly AI-generated rarely ranks or convinces readers in competitive topics.",
      },
      {
        q: "How long until content brings results?",
        a: "New articles typically take three to six months to rank well. Case studies and sales-support content can help close deals right away.",
      },
      {
        q: "How many articles should we publish per month?",
        a: "Fewer, better articles beat many mediocre ones. For most businesses, two to four well-researched pieces a month is plenty.",
      },
    ],
  },
  {
    slug: "email-marketing-setup",
    name: "Email Marketing Setup",
    category: "marketing-growth",
    shortDescription: "Email platform, automations, and templates set up so your emails land in inboxes and get read.",
    metaTitle: "Email Marketing Setup & Automation | Klikcy",
    metaDescription:
      "Email marketing setup: platform selection, domain authentication, welcome and nurture automations, templates, and list hygiene, done properly from day one.",
    focusKeyword: "email marketing setup",
    intro:
      "We set up your email marketing properly: the platform, the authentication that keeps you out of spam, automated sequences, and templates your team can reuse.",
    overview: [
      "Email still delivers some of the best returns in marketing, but only if your messages arrive. Since 2024, Gmail and Yahoo require bulk senders to authenticate their domains with SPF, DKIM, and DMARC and to offer one-click unsubscribe. Many businesses found their emails going to spam without knowing why.",
      "We start with the foundations: choosing the right platform for your needs and budget, authenticating your sending domain, and importing your list cleanly with consent records intact. Then we build the automations that run in the background: a welcome sequence, lead nurture, abandoned cart for stores, and re-engagement for inactive subscribers.",
      "Templates are designed to look good in every major email client and on phones, and built so your team can create campaigns without breaking the layout.",
    ],
    signs: [
      "Your emails land in spam or promotions folders.",
      "You collect email addresses but don't send anything automatically.",
      "You're moving to a new email platform.",
      "Your list hasn't been cleaned in years.",
    ],
    included: [
      "Platform recommendation and setup",
      "SPF, DKIM, and DMARC authentication",
      "List import, segmentation, and cleanup",
      "Welcome, nurture, and other key automations",
      "Branded, mobile-friendly templates",
      "Signup forms and CRM connection",
    ],
    process: [
      { title: "Plan", detail: "We choose the platform and map the automations you need." },
      { title: "Authenticate", detail: "DNS records set up and tested so your domain is trusted." },
      { title: "Build", detail: "Templates, forms, segments, and automations configured." },
      { title: "Test and launch", detail: "Tests across email clients and a check on deliverability." },
    ],
    timeline: "Most email setups take 2 to 4 weeks.",
    costFactors: [
      "Platform migration",
      "Number of automations",
      "Template design complexity",
      "List size and cleanup needed",
    ],
    pitfalls: [
      "Sending marketing email without domain authentication.",
      "Importing purchased or old lists, which damages your sender reputation.",
      "Sending marketing and transactional email from the same setup.",
    ],
    tools: ["Klaviyo", "Mailchimp", "HubSpot", "ActiveCampaign", "Kit (formerly ConvertKit)"],
    related: ["smtp-setup", "business-email-setup", "crm-automation", "content-marketing"],
    faqs: [
      {
        q: "Which email marketing platform should we use?",
        a: "Klaviyo for most online stores, HubSpot if you already use its CRM, ActiveCampaign or Mailchimp for service businesses, and Kit for creators. We recommend based on your needs, not commissions.",
      },
      {
        q: "Why are our emails going to spam?",
        a: "Common causes are missing domain authentication, sending to old or purchased lists, and high complaint rates. We check each of these.",
      },
      {
        q: "What are the Gmail and Yahoo sender requirements?",
        a: "Bulk senders need SPF, DKIM, and DMARC authentication, a one-click unsubscribe link, and low spam complaint rates. Even smaller senders benefit from meeting them.",
      },
      {
        q: "Do you write the emails?",
        a: "We write the automated sequences as part of setup. Ongoing campaign writing can be added.",
      },
    ],
  },
];
