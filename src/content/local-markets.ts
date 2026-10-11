/**
 * Hand-written pages for priority markets. These are the ONLY city pages that get
 * indexed (see getCityAreaSeo + isIndexable). Each one must say something genuinely
 * specific about the place. Never claim a local office, local clients, or local results
 * unless they're real. Facts were checked in October 2026; re-check yearly.
 */

export interface LocalNeed {
  title: string;
  body: string;
  services: string[];
}

export interface LocalMarket {
  state: string;
  city: string;
  /** Under 60 characters including "| Klikcy". */
  metaTitle: string;
  /** About 140–160 characters. */
  metaDescription: string;
  h1: string;
  intro: string;
  landscape: string[];
  needs: LocalNeed[];
  search: string;
  rules?: string;
  areas: string[];
  faqs: { q: string; a: string }[];
}

export const localMarkets: LocalMarket[] = [
  {
    state: "new-york",
    city: "new-york-city",
    metaTitle: "Web Design, SEO & Automation in New York City | Klikcy",
    metaDescription:
      "Websites, SEO, and AI automation for New York City businesses across all five boroughs. A remote team with fixed quotes, weekly updates, and code you own.",
    h1: "Web design, SEO, and automation for New York City businesses",
    intro:
      "New York City is the most competitive search market in the country. We build fast websites, fix the search foundations, and automate the busywork for businesses in all five boroughs, working remotely on Eastern Time.",
    landscape: [
      "With more than 8 million residents and hundreds of thousands of businesses, almost every search for a service in New York returns dozens of credible competitors. Ranking here rarely comes down to one trick. It comes down to a site that loads fast on a phone in a subway station, pages that answer real questions better than the next result, and a reputation other sites vouch for.",
      "The five boroughs behave like five different markets. A Manhattan law firm, a Brooklyn restaurant group, a Queens home-care agency, a Bronx distributor, and a Staten Island contractor all need different things from their website, so we plan each project around who the customers are and how they search, not around a template.",
    ],
    needs: [
      {
        title: "Pages that survive NYC-level competition",
        body: "Service pages with real depth, structured data, and internal links that point authority where it matters, instead of thin pages for every neighborhood.",
        services: ["on-page-seo", "technical-seo", "seo-content-strategy"],
      },
      {
        title: "Accessibility built in",
        body: "New York consistently leads the country in ADA lawsuits over inaccessible websites. Accessible markup, contrast, and keyboard support are part of every build we do.",
        services: ["custom-website-development", "ui-ux-design", "website-redesign"],
      },
      {
        title: "Fast replies to every lead",
        body: "NYC customers contact several businesses at once. Automated routing, instant notifications, and CRM follow-ups help the first reply come from you.",
        services: ["crm-automation", "ai-chatbot-development", "workflow-automation"],
      },
    ],
    search:
      "Google often shows map results and AI Overviews above regular listings for NYC service searches, and results shift block by block. A consistent business name, address, and phone across directories, reviews that mention the borough or neighborhood you serve, and pages that clearly state your service area all help.",
    rules:
      "If you use AI or automated tools to screen job candidates, New York City's Local Law 144 requires a yearly bias audit and notice to candidates. New York State's SHIELD Act also requires reasonable safeguards for the personal data your website collects. This is general information, not legal advice.",
    areas: ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"],
    faqs: [
      {
        q: "Do you work with businesses in all five boroughs?",
        a: "Yes. We work remotely with businesses in Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Calls are scheduled on Eastern Time, and the process is the same wherever you are.",
      },
      {
        q: "Do you have a New York office?",
        a: "No. Klikcy is a remote-first team, and we'd rather say so than list a virtual address. You get the same people from the first call to launch, without paying for office overhead.",
      },
      {
        q: "How long does it take to rank in New York City?",
        a: "It depends heavily on the service and neighborhood. Technical fixes can show results in weeks, but competitive NYC searches usually take several months of content and reputation work. We set expectations with real data before we start.",
      },
    ],
  },
  {
    state: "new-york",
    city: "manhattan",
    metaTitle: "Web Design & SEO in Manhattan, NY | Klikcy",
    metaDescription:
      "Websites, SEO, and automation for Manhattan firms, from Midtown professional services to Flatiron startups. Remote team, fixed quotes, code you own.",
    h1: "Web design and SEO for Manhattan businesses",
    intro:
      "Manhattan businesses compete with national brands for the same searches. We build websites that look the part, load fast, and are structured to rank, for firms from the Financial District to Harlem.",
    landscape: [
      "Manhattan concentrates finance in the Financial District and Midtown, law and consulting firms in Midtown, media and tech around Flatiron and Chelsea, and medical practices on the Upper East Side. Buyers here expect a polished site and judge credibility in seconds, often on a phone between meetings.",
      "Because so many national companies are headquartered here, local searches like 'employment lawyer Midtown' or 'dermatologist Upper East Side' compete with well-funded sites. The businesses that win usually have specific, expert pages rather than one general services page.",
    ],
    needs: [
      {
        title: "Credibility in the first five seconds",
        body: "Clear positioning, real team and credentials, and proof placed where doubts appear. Professional-services buyers in Manhattan shortlist quickly.",
        services: ["conversion-focused-website-design", "brand-identity", "custom-website-development"],
      },
      {
        title: "Practice-area and service depth",
        body: "One strong page per service, written around the questions clients actually ask, beats a long list of thin pages.",
        services: ["seo-content-strategy", "on-page-seo", "answer-engine-optimization"],
      },
      {
        title: "Secure intake",
        body: "Law, finance, and medical practices collect sensitive details through forms. We set up secure intake, sensible data retention, and clean handoffs to your CRM.",
        services: ["website-security", "crm-automation", "api-development"],
      },
    ],
    search:
      "In Manhattan, Google weighs proximity heavily, so map rankings for the same search can change within a few avenues. Neighborhood mentions in reviews and on your pages, accurate Business Profile details if you have a staffed office, and strong organic pages for each service give you more than one way to show up.",
    rules:
      "New York leads the country in website accessibility lawsuits, and the SHIELD Act requires safeguards for the personal data you collect. If you use AI tools in hiring, NYC Local Law 144 applies. This is general information, not legal advice.",
    areas: ["Financial District", "Midtown", "Flatiron and Chelsea", "SoHo and Tribeca", "Upper East Side", "Upper West Side", "Harlem"],
    faqs: [
      {
        q: "Can you work with our in-house marketing team in Manhattan?",
        a: "Yes. Many Manhattan companies have marketing staff but no developers. We work alongside them on video calls and shared staging links, and they keep control of the content.",
      },
      {
        q: "Do you meet in person?",
        a: "Our projects run remotely, over video calls and shared links. If an in-person meeting matters to you, mention it when you get in touch.",
      },
      {
        q: "What does a website for a Manhattan professional firm usually include?",
        a: "A clear homepage, one page per practice area or service, team bios with credentials, case examples where you're allowed to share them, and an intake form connected to your CRM. Technical SEO and accessibility are built in.",
      },
    ],
  },
  {
    state: "new-york",
    city: "brooklyn",
    metaTitle: "Web Design & SEO in Brooklyn, NY | Klikcy",
    metaDescription:
      "Websites, online stores, and local SEO for Brooklyn businesses, from DUMBO studios to Navy Yard makers. Remote team, fixed quotes, everything in your name.",
    h1: "Web design and SEO for Brooklyn businesses",
    intro:
      "Brooklyn is full of independent brands, restaurants, studios, and makers that compete on personality as much as price. We build websites and online stores that show that personality and still rank and convert.",
    landscape: [
      "Brooklyn's economy mixes creative studios and tech companies in DUMBO and Downtown Brooklyn, manufacturers and makers at the Brooklyn Navy Yard, independent retail and food along its commercial corridors, and a dense network of neighborhood service businesses.",
      "Many Brooklyn brands sell both in person and online. That makes shared inventory, a fast storefront, and a site that reflects the brand's identity more important than a generic template.",
    ],
    needs: [
      {
        title: "A brand that looks like you",
        body: "Identity and design work that captures what makes the business distinct, built into a site your team can update.",
        services: ["brand-identity", "ui-ux-design", "custom-website-development"],
      },
      {
        title: "Selling online and in person",
        body: "Shopify stores with point-of-sale and inventory in sync, local delivery or pickup options, and product pages built to convert.",
        services: ["shopify-store-development", "product-page-optimization", "shipping-integration"],
      },
      {
        title: "Neighborhood visibility",
        body: "Local SEO and profile work so people searching in Williamsburg, Park Slope, or Bay Ridge find you, not a business across the borough.",
        services: ["local-seo", "google-business-profile-optimization", "seo-content-strategy"],
      },
    ],
    search:
      "Brooklyn searches are often neighborhood-specific, such as 'coffee Williamsburg' or 'plumber Bay Ridge'. Neighborhood names in your page copy and reviews, accurate opening hours, and photos that show the actual place help both map and organic results.",
    rules:
      "New York's SHIELD Act applies to the customer data your store or booking system collects, and accessible websites matter in a state with frequent ADA website lawsuits. This is general information, not legal advice.",
    areas: ["DUMBO and Downtown Brooklyn", "Williamsburg and Greenpoint", "Park Slope", "Bushwick", "Bay Ridge", "Brooklyn Navy Yard"],
    faqs: [
      {
        q: "Do you build Shopify stores for Brooklyn brands?",
        a: "Yes. We build and improve Shopify stores, including point-of-sale integration for brands that also have a physical shop.",
      },
      {
        q: "Can you help a restaurant or café with its website?",
        a: "Yes. Restaurants mostly need a fast mobile site with the menu, hours, location, and reservation or ordering links, plus a well-maintained Google Business Profile.",
      },
      {
        q: "Do you work only with large companies?",
        a: "No. Many of the businesses we're built for are small and independent. Projects are scoped to fit, and quotes are fixed before work starts.",
      },
    ],
  },
  {
    state: "new-york",
    city: "queens",
    metaTitle: "Web Design & SEO in Queens, NY | Klikcy",
    metaDescription:
      "Websites, multilingual SEO, and automation for Queens businesses in Long Island City, Flushing, Jamaica, and Astoria. Remote team, fixed quotes.",
    h1: "Web design and SEO for Queens businesses",
    intro:
      "Queens is one of the most linguistically diverse places in the world, and its businesses often serve customers in more than one language. We build websites that work for every audience you serve, and help them get found.",
    landscape: [
      "Queens combines a growing office and residential hub in Long Island City, busy commercial centers in Flushing and Jamaica, neighborhood businesses in Astoria and Jackson Heights, and two major airports that support logistics and hospitality.",
      "For many Queens businesses, the main growth opportunity is reaching customers who search in languages other than English. A properly built multilingual site can open up searches competitors aren't even targeting.",
    ],
    needs: [
      {
        title: "Websites in more than one language",
        body: "Properly translated pages with the right technical setup (hreflang and separate URLs), so Google shows each customer the right language.",
        services: ["custom-website-development", "technical-seo", "seo-content-strategy"],
      },
      {
        title: "Local and map visibility",
        body: "Business Profile and local SEO work so neighborhood searches lead to you, including searches made in other languages.",
        services: ["local-seo", "google-business-profile-optimization", "on-page-seo"],
      },
      {
        title: "Less time on admin",
        body: "Booking, intake, and follow-up automations for home care, clinics, and service businesses with small teams.",
        services: ["workflow-automation", "ai-chatbot-development", "crm-automation"],
      },
    ],
    search:
      "Searches in Queens are often made in Spanish, Chinese, Korean, Bengali, and many other languages. Machine-translated pages rarely rank or convert, so we recommend professional translation for your most important pages and a correct hreflang setup.",
    rules:
      "New York's SHIELD Act covers the personal data your forms collect, and accessibility matters in a state with frequent ADA website lawsuits. This is general information, not legal advice.",
    areas: ["Long Island City", "Astoria", "Flushing", "Jackson Heights", "Jamaica", "Forest Hills"],
    faqs: [
      {
        q: "Can you build a website in English and another language?",
        a: "Yes. We build multilingual sites with separate pages per language and the technical tags Google needs. We recommend professional translation for key pages.",
      },
      {
        q: "Will a multilingual site help SEO?",
        a: "Often, yes, because it lets you rank for searches in other languages where there may be less competition. It has to be set up correctly to avoid duplicate-content problems.",
      },
      {
        q: "Do you work remotely with Queens businesses?",
        a: "Yes. Every project runs over video calls and shared links, scheduled on Eastern Time.",
      },
    ],
  },
  {
    state: "new-york",
    city: "the-bronx",
    metaTitle: "Web Design & SEO in the Bronx, NY | Klikcy",
    metaDescription:
      "Websites, local SEO, and automation for Bronx businesses, from Hunts Point distributors to Fordham Road retailers. Remote team with fixed quotes.",
    h1: "Web design and SEO for Bronx businesses",
    intro:
      "Bronx businesses often run lean and need technology that pays for itself quickly. We build practical websites, improve local visibility, and automate repetitive work, with fixed quotes so there are no surprises.",
    landscape: [
      "The Bronx is home to the Hunts Point Food Distribution Center, one of the largest food distribution hubs in the world, along with major hospitals, universities, busy retail corridors like Fordham Road, and thousands of family-run service businesses.",
      "Distribution, healthcare, and local services all depend on fast, reliable communication. For many Bronx businesses, the biggest gains come from a clear website, a strong Google Business Profile, and automating the order, intake, and follow-up work that eats staff time.",
    ],
    needs: [
      {
        title: "Ordering and operations tools",
        body: "Wholesale ordering, customer portals, and data extraction from invoices and order forms for distributors and suppliers.",
        services: ["custom-business-software", "data-extraction-automation", "web-app-development"],
      },
      {
        title: "Being found nearby",
        body: "Local SEO and a well-kept Business Profile so neighborhood customers find you before a chain does.",
        services: ["local-seo", "google-business-profile-optimization", "custom-website-development"],
      },
      {
        title: "Websites that work on every phone",
        body: "Fast, lightweight pages that load on older phones and slower connections, with clear calls to action.",
        services: ["website-speed-optimization", "custom-website-development", "landing-page-design"],
      },
    ],
    search:
      "Local searches in the Bronx often include the neighborhood or a landmark. Reviews that mention where you are, accurate hours, and pages written in the languages your customers speak, often English and Spanish, make a measurable difference.",
    rules:
      "New York's SHIELD Act covers personal data collected by your website or ordering tools, and accessibility matters given how often ADA website lawsuits are filed in New York. This is general information, not legal advice.",
    areas: ["Hunts Point", "Fordham", "Mott Haven", "Riverdale", "Parkchester", "Pelham Bay"],
    faqs: [
      {
        q: "Can you build an ordering system for a food distributor?",
        a: "Yes. We build wholesale ordering portals and connect them to your inventory or accounting software, and can automate reading orders that arrive by email or PDF.",
      },
      {
        q: "Do you build bilingual websites?",
        a: "Yes, with properly translated pages and the technical setup Google needs to show each visitor the right language.",
      },
      {
        q: "How do you keep costs predictable?",
        a: "We scope the work first and give you a fixed, written quote. Monthly plans, if you want one, run month to month.",
      },
    ],
  },
  {
    state: "new-york",
    city: "staten-island",
    metaTitle: "Web Design & SEO in Staten Island, NY | Klikcy",
    metaDescription:
      "Websites, local SEO, and lead follow-up for Staten Island contractors, practices, and shops. A remote team with fixed quotes and weekly updates.",
    h1: "Web design and SEO for Staten Island businesses",
    intro:
      "Staten Island runs on local service businesses: contractors, medical and dental practices, restaurants, and shops that customers find by searching nearby. We help them show up and turn those searches into calls.",
    landscape: [
      "Staten Island is more suburban and car-oriented than the other boroughs, with commercial centers around St. George, the Hylan Boulevard and Richmond Avenue corridors, and the Staten Island Mall area. Many customers drive to a business or have a contractor come to them.",
      "That makes local visibility and fast lead follow-up especially valuable. A homeowner looking for a roofer or a family looking for a pediatric dentist usually calls the first two or three credible businesses they find.",
    ],
    needs: [
      {
        title: "Map pack visibility",
        body: "Business Profile optimization, reviews, and local pages so you appear when Staten Islanders search for what you do.",
        services: ["google-business-profile-optimization", "local-seo", "on-page-seo"],
      },
      {
        title: "Quote requests that don't go cold",
        body: "Simple quote forms, instant notifications, and automatic follow-ups so leads hear back while they're still deciding.",
        services: ["landing-page-design", "crm-automation", "workflow-automation"],
      },
      {
        title: "A site that matches your reputation",
        body: "A clean, fast website with real photos of your work, your service area, and reviews, built so you can update it yourself.",
        services: ["custom-website-development", "wordpress-development", "website-maintenance"],
      },
    ],
    search:
      "Many Staten Island service businesses also serve nearby parts of New Jersey and Brooklyn. Listing your actual service areas clearly, without creating a thin page for every town, is the safer way to show up for searches across them.",
    rules:
      "New York's SHIELD Act applies to customer details your forms collect, and accessible websites matter in a state with frequent ADA website lawsuits. This is general information, not legal advice.",
    areas: ["St. George", "New Dorp", "Great Kills", "Tottenville", "Port Richmond", "Westerleigh"],
    faqs: [
      {
        q: "Do you work with contractors and home service businesses?",
        a: "Yes. We build websites with clear service-area information, quote forms connected to your phone or CRM, and Business Profile setup.",
      },
      {
        q: "Should I create pages for every neighborhood I serve?",
        a: "Usually not. Thin pages with only the neighborhood name changed tend to get ignored by Google. One strong page per service with a clear service-area section works better, plus local pages only where you have something specific to say.",
      },
      {
        q: "Can you look after the site after launch?",
        a: "Yes. Monthly care plans cover updates, backups, monitoring, and small changes, and they run month to month.",
      },
    ],
  },
  {
    state: "new-jersey",
    city: "jersey-city",
    metaTitle: "Web Design & SEO in Jersey City, NJ | Klikcy",
    metaDescription:
      "Websites, SEO, and automation for Jersey City firms, from Exchange Place finance to Journal Square shops. Remote team, fixed quotes, code you own.",
    h1: "Web design and SEO for Jersey City businesses",
    intro:
      "Jersey City businesses compete across the Hudson with Manhattan for customers, talent, and search results. We build websites and search programs that hold up in that market, with clear, fixed pricing.",
    landscape: [
      "Jersey City's waterfront around Exchange Place and Newport is home to major financial services operations, while Journal Square, the Heights, and Downtown are full of restaurants, retail, and professional practices. It's also one of the most diverse cities in the country.",
      "Because many residents work in or near Manhattan, Jersey City customers often compare local businesses with options across the river. A fast, credible website and strong local presence help keep that business on the New Jersey side.",
    ],
    needs: [
      {
        title: "Professional, compliant websites",
        body: "Clean sites for financial, legal, and healthcare practices, with secure forms and privacy settings that match New Jersey's privacy law.",
        services: ["custom-website-development", "website-security", "google-tag-manager-setup"],
      },
      {
        title: "Standing out from Manhattan competitors",
        body: "Local SEO and content that make it clear you serve Jersey City and Hudson County, without thin doorway pages.",
        services: ["local-seo", "seo-content-strategy", "on-page-seo"],
      },
      {
        title: "Multilingual reach",
        body: "Properly built multilingual pages for businesses serving Jersey City's many language communities.",
        services: ["technical-seo", "custom-website-development", "conversion-focused-website-design"],
      },
    ],
    search:
      "Search results in Jersey City often mix New Jersey and Manhattan businesses. Make your New Jersey location and service area explicit on your site and profiles, and earn links and mentions from Hudson County organizations.",
    rules:
      "The New Jersey Data Privacy Act took effect in January 2025. If it applies to your business, your site needs an accurate privacy notice and a way for residents to opt out of targeted advertising and the sale of their data. This is general information, not legal advice.",
    areas: ["Downtown and Exchange Place", "Newport", "Journal Square", "The Heights", "Bergen-Lafayette", "Greenville"],
    faqs: [
      {
        q: "Do you work with financial services firms in Jersey City?",
        a: "Yes. We build secure, accessible websites and handle the technical details, while your compliance team keeps final say on disclosures and wording.",
      },
      {
        q: "Does New Jersey's privacy law affect my website?",
        a: "It might. The New Jersey Data Privacy Act applies above certain thresholds. If it covers you, cookie consent, analytics, and forms need to match your privacy notice. Your attorney can confirm whether it applies.",
      },
      {
        q: "Do you work remotely with New Jersey businesses?",
        a: "Yes. Projects run over video calls and shared links on Eastern Time, with a progress update every week.",
      },
    ],
  },
  {
    state: "new-jersey",
    city: "newark",
    metaTitle: "Web Design & SEO in Newark, NJ | Klikcy",
    metaDescription:
      "Websites, SEO, and operations automation for Newark businesses in logistics, healthcare, and professional services. Remote team with fixed quotes.",
    h1: "Web design and SEO for Newark businesses",
    intro:
      "Newark is New Jersey's largest city and a major transport and logistics hub. We build websites, customer portals, and automations for Newark businesses that need technology to keep pace with operations.",
    landscape: [
      "Newark is home to Newark Liberty International Airport and Port Newark, part of the Port of New York and New Jersey, the busiest port on the East Coast. It's also a center for insurance and financial services, hospitals, and universities, alongside the small businesses of the Ironbound and Downtown.",
      "Logistics and service companies here often juggle quotes, tracking requests, and paperwork by email and spreadsheet. Customer portals and automation tend to deliver faster returns than a redesign alone.",
    ],
    needs: [
      {
        title: "Portals and tracking for logistics",
        body: "Quote requests, shipment status, and document access in a customer portal, so your team answers fewer 'where's my order' emails.",
        services: ["web-app-development", "custom-business-software", "api-development"],
      },
      {
        title: "Paperwork automation",
        body: "Extracting data from bills of lading, invoices, and forms, and sending it to the systems that need it.",
        services: ["data-extraction-automation", "workflow-automation", "reporting-automation"],
      },
      {
        title: "Local presence for neighborhood businesses",
        body: "Fast websites and local SEO for Ironbound restaurants, Downtown practices, and service businesses across Essex County.",
        services: ["local-seo", "custom-website-development", "google-business-profile-optimization"],
      },
    ],
    search:
      "B2B buyers searching for logistics, freight, and industrial services in the Newark area compare several providers before calling. Clear capability pages, service areas, certifications, and fast quote forms do most of the selling.",
    rules:
      "The New Jersey Data Privacy Act, in effect since January 2025, may apply to the customer data your website and portals collect. This is general information, not legal advice.",
    areas: ["Downtown", "Ironbound", "University Heights", "North Ward", "Port Newark area", "Airport area"],
    faqs: [
      {
        q: "Can you build a customer portal for a logistics company?",
        a: "Yes. We build portals for quotes, shipment status, and documents, connected to your existing systems through their APIs where possible.",
      },
      {
        q: "Can AI read our shipping documents and invoices?",
        a: "Often, yes. We build extraction pipelines that read the documents, check the results, and send uncertain ones to a person for review. We measure accuracy on your real documents before launch.",
      },
      {
        q: "Do you work with smaller Newark businesses too?",
        a: "Yes. Restaurants, practices, and service businesses usually start with a fast website and a well-set-up Google Business Profile.",
      },
    ],
  },
  {
    state: "new-jersey",
    city: "hoboken",
    metaTitle: "Web Design & SEO in Hoboken, NJ | Klikcy",
    metaDescription:
      "Websites and local SEO for Hoboken restaurants, fitness studios, and professional practices. A remote team with fixed quotes and weekly updates.",
    h1: "Web design and SEO for Hoboken businesses",
    intro:
      "Hoboken packs a lot of businesses into one square mile, and most of their customers find them on a phone. We build fast, good-looking websites and local search setups that win those searches.",
    landscape: [
      "Hoboken is one of the densest cities in the country, with Washington Street lined with restaurants, bars, fitness studios, and shops, and a large population of young professionals who commute to Manhattan by PATH and ferry.",
      "With so many similar businesses within a few blocks, small advantages matter: a site that loads instantly, booking that takes two taps, and a Business Profile with recent photos and reviews.",
    ],
    needs: [
      {
        title: "Booking and ordering in two taps",
        body: "Mobile-first sites with online booking, class schedules, or ordering linked straight from search results.",
        services: ["custom-website-development", "landing-page-design", "website-speed-optimization"],
      },
      {
        title: "Winning the map pack",
        body: "Business Profile optimization, review routines, and local pages for a market where competitors are a block away.",
        services: ["google-business-profile-optimization", "local-seo", "on-page-seo"],
      },
      {
        title: "Keeping customers coming back",
        body: "Email and text follow-ups for memberships, appointments, and repeat orders.",
        services: ["email-marketing-setup", "crm-automation", "workflow-automation"],
      },
    ],
    search:
      "In a dense city like Hoboken, Google's map results depend heavily on exactly where the searcher is standing. Keep your profile complete and active, earn steady reviews, and make sure your site clearly covers each service you want to be found for.",
    rules:
      "If you send marketing texts or emails, consent and opt-out rules apply, and the New Jersey Data Privacy Act may apply to the customer data you collect. This is general information, not legal advice.",
    areas: ["Washington Street", "Uptown", "Downtown near the PATH", "Southwest Hoboken", "Waterfront"],
    faqs: [
      {
        q: "Do you work with fitness studios and restaurants?",
        a: "Yes. These businesses usually need a fast mobile site, booking or ordering integrations, and an active Google Business Profile.",
      },
      {
        q: "Can you connect our booking system to the website?",
        a: "Yes. We integrate common booking and ordering platforms so customers can book without leaving your site or after one tap from Google.",
      },
      {
        q: "How quickly can a small business site launch?",
        a: "A focused site for a single-location business often launches in a few weeks once content is ready. You'll get a fixed timeline with your quote.",
      },
    ],
  },
  {
    state: "florida",
    city: "miami",
    metaTitle: "Web Design & SEO in Miami, FL | Klikcy",
    metaDescription:
      "Bilingual websites, SEO, and e-commerce for Miami businesses in real estate, hospitality, trade, and retail. Remote team, fixed quotes, code you own.",
    h1: "Web design and SEO for Miami businesses",
    intro:
      "Miami businesses sell to customers in English, Spanish, and often Portuguese, across the U.S. and Latin America. We build websites and search programs that work in every language you sell in.",
    landscape: [
      "Miami is a gateway for trade and finance with Latin America, a major real estate and hospitality market, and a growing hub for tech and startups. A majority of Miami-Dade residents are Hispanic, and Spanish is part of everyday business.",
      "For many Miami companies, a properly built bilingual site is the single biggest opportunity. Separate, professionally translated pages let you rank in Spanish-language searches that English-only competitors never appear in.",
    ],
    needs: [
      {
        title: "Bilingual sites done properly",
        body: "Separate English and Spanish pages (and Portuguese where it fits), correct hreflang tags, and translated metadata, not a translate button.",
        services: ["custom-website-development", "technical-seo", "seo-content-strategy"],
      },
      {
        title: "Real estate and hospitality",
        body: "Property and listing pages, booking integrations, and local SEO for a market where buyers and guests often search from abroad.",
        services: ["custom-website-development", "local-seo", "google-business-profile-optimization"],
      },
      {
        title: "Selling across borders",
        body: "Online stores with multiple currencies and languages, shipping rules, and payments that work for international customers.",
        services: ["shopify-store-development", "payment-integration", "shipping-integration"],
      },
    ],
    search:
      "Spanish-language searches in Miami are a separate market with different keywords and often less competition. They need their own pages and research. Translated keywords alone usually miss how people actually search.",
    rules:
      "Florida's telemarketing law restricts automated calls and texts without prior written consent, which affects lead forms and SMS follow-up. Florida's Digital Bill of Rights applies mainly to very large companies. This is general information, not legal advice.",
    areas: ["Downtown and Brickell", "Wynwood", "Little Havana", "Coral Gables", "Doral", "Miami Beach"],
    faqs: [
      {
        q: "Can you build a website in English and Spanish?",
        a: "Yes. We build bilingual sites with separate pages per language and the technical setup Google needs, and recommend professional translation for your key pages.",
      },
      {
        q: "Does Florida law affect how we follow up with leads?",
        a: "It can. Florida's telemarketing law limits automated calls and texts without prior written consent, so we build consent checkboxes and opt-out handling into lead forms. Check details with your attorney.",
      },
      {
        q: "Do you work with Miami businesses remotely?",
        a: "Yes. Projects run over video calls on Eastern Time, with weekly updates and a staging link you can check anytime.",
      },
    ],
  },
  {
    state: "florida",
    city: "orlando",
    metaTitle: "Web Design & SEO in Orlando, FL | Klikcy",
    metaDescription:
      "Websites, booking, and SEO for Orlando tourism, hospitality, and tech businesses. A remote team with fixed quotes, weekly updates, and code you own.",
    h1: "Web design and SEO for Orlando businesses",
    intro:
      "Orlando's economy runs on visitors, events, and a fast-growing tech sector. We build websites, booking flows, and search programs for businesses that need to reach people before they arrive and after they leave.",
    landscape: [
      "Orlando is one of the most visited destinations in the world, with theme parks, a huge convention industry, and the hotels, restaurants, and attractions that serve them. It's also home to a large simulation and training technology cluster and a growing healthcare sector.",
      "Tourism businesses here compete for visitors who are planning from other states and countries, often on their phones. Speed, clear booking, and visibility in maps and travel searches decide who gets the reservation.",
    ],
    needs: [
      {
        title: "Direct bookings",
        body: "Fast booking flows and integrations that reduce dependence on third-party booking sites and their commissions.",
        services: ["custom-website-development", "conversion-rate-optimization", "payment-integration"],
      },
      {
        title: "Visible to visitors before they arrive",
        body: "Local SEO and Business Profile work tuned for travelers searching from out of town.",
        services: ["local-seo", "google-business-profile-optimization", "answer-engine-optimization"],
      },
      {
        title: "Software for the tech sector",
        body: "Web apps, dashboards, and APIs for Orlando's simulation, training, and healthcare technology companies.",
        services: ["web-app-development", "saas-development", "admin-dashboard-development"],
      },
    ],
    search:
      "Many Orlando searches come from people who aren't in Orlando yet, so proximity matters less and relevance and reviews matter more. AI travel summaries increasingly answer 'best things to do near' questions, so clear, factual pages about what you offer help you get mentioned.",
    rules:
      "Florida's telemarketing law limits automated calls and texts without prior written consent, which affects booking reminders and SMS marketing. This is general information, not legal advice.",
    areas: ["International Drive", "Lake Buena Vista", "Downtown Orlando", "Winter Park", "Lake Nona", "Research Park area"],
    faqs: [
      {
        q: "Can you help us get more direct bookings?",
        a: "Yes. We improve booking flows, page speed, and search visibility so more visitors book with you directly.",
      },
      {
        q: "Do you build software for tech companies, not just websites?",
        a: "Yes. We build web apps, SaaS products, dashboards, and APIs, scoped in phases with demos every two weeks.",
      },
      {
        q: "What time zone do you work in for Orlando clients?",
        a: "Eastern Time. We schedule calls inside your business hours.",
      },
    ],
  },
  {
    state: "florida",
    city: "tampa",
    metaTitle: "Web Design & SEO in Tampa, FL | Klikcy",
    metaDescription:
      "Websites, SEO, and automation for Tampa businesses in finance, healthcare, defense, and logistics. Remote team with fixed quotes and weekly updates.",
    h1: "Web design and SEO for Tampa businesses",
    intro:
      "Tampa Bay has become a magnet for financial services, healthcare, and companies relocating from the Northeast. We build credible websites, apps, and search programs for businesses growing in that market.",
    landscape: [
      "Tampa's economy includes large financial services and back-office operations, major hospital systems, Port Tampa Bay, and MacDill Air Force Base, home to U.S. Central Command and U.S. Special Operations Command, which supports a large defense contracting community.",
      "Many companies here sell to other businesses or to government, where buyers research carefully and expect precise, accessible, secure websites.",
    ],
    needs: [
      {
        title: "Credible B2B and government-facing sites",
        body: "Capability pages, accessible design that meets Section 508 expectations, and secure hosting for contractors and professional firms.",
        services: ["custom-website-development", "website-security", "ui-ux-design"],
      },
      {
        title: "Healthcare and practice growth",
        body: "Fast, accessible practice websites with online booking and local search visibility across Hillsborough and Pinellas counties.",
        services: ["local-seo", "custom-website-development", "ai-chatbot-development"],
      },
      {
        title: "Operations that scale",
        body: "Workflow and CRM automation for growing finance and services firms that are adding staff and clients quickly.",
        services: ["crm-automation", "workflow-automation", "reporting-automation"],
      },
    ],
    search:
      "Tampa Bay searches often span Tampa, St. Petersburg, and Clearwater. Be clear about which parts of the bay area you serve, and build depth on your core service pages rather than creating thin pages for each city.",
    rules:
      "Florida's telemarketing law restricts automated calls and texts without prior written consent. Government contractors should also expect accessibility (Section 508) and security questions during procurement. This is general information, not legal advice.",
    areas: ["Downtown and Channelside", "Westshore", "Ybor City", "South Tampa", "St. Petersburg", "Clearwater"],
    faqs: [
      {
        q: "Do you build websites for defense contractors?",
        a: "Yes. We build accessible, secure capability sites. We don't handle classified information or systems that require security clearances.",
      },
      {
        q: "Can you help a medical practice in Tampa get more patients?",
        a: "Yes. Usually through a fast, accessible site, online booking, and local SEO and Business Profile work.",
      },
      {
        q: "Do you work with companies relocating to Tampa?",
        a: "Yes. We often help with a refreshed website, new local presence, and moving domains, email, and hosting without downtime.",
      },
    ],
  },
  {
    state: "massachusetts",
    city: "boston",
    metaTitle: "Web Design & SEO in Boston, MA | Klikcy",
    metaDescription:
      "Websites, SEO, and software for Boston businesses in healthcare, biotech, education, and finance. A remote team with fixed quotes and code you own.",
    h1: "Web design and SEO for Boston businesses",
    intro:
      "Boston's economy is built on expertise: hospitals, life sciences, universities, and finance. We build websites and software that communicate that expertise clearly, and search programs that help the right people find it.",
    landscape: [
      "Boston is home to world-renowned hospitals in the Longwood Medical Area, a major financial services industry, dozens of colleges and universities, and a fast-growing innovation district in the Seaport. Life sciences companies cluster here and across the river in Cambridge.",
      "Audiences in these fields are sophisticated. They want accurate, well-sourced information and judge credibility quickly, which makes content quality and site performance more important than flashy design.",
    ],
    needs: [
      {
        title: "Expert content that ranks",
        body: "Content strategy and writing built on interviews with your experts, for audiences that can spot generic copy instantly.",
        services: ["seo-content-strategy", "content-marketing", "answer-engine-optimization"],
      },
      {
        title: "Websites for regulated industries",
        body: "Accessible, secure sites with careful content review for healthcare, life sciences, and financial firms.",
        services: ["custom-website-development", "website-security", "design-systems"],
      },
      {
        title: "Software and data tools",
        body: "Web apps, dashboards, and APIs for research groups, startups, and operations teams.",
        services: ["web-app-development", "saas-development", "database-architecture"],
      },
    ],
    search:
      "Boston searches in healthcare, education, and finance are dominated by large institutions with strong domains. Smaller firms compete best on specific, expert topics and clear local relevance, not broad terms.",
    rules:
      "Massachusetts regulation 201 CMR 17.00 requires businesses that hold Massachusetts residents' personal information to maintain a written information security program, which covers how your website stores form submissions and customer data. This is general information, not legal advice.",
    areas: ["Back Bay", "Financial District", "Seaport", "Longwood Medical Area", "South End", "Charlestown"],
    faqs: [
      {
        q: "Do you work with healthcare and life sciences companies?",
        a: "Yes. We build accessible, secure websites and handle the technical side, while your medical, legal, or regulatory reviewers approve the content.",
      },
      {
        q: "Does Massachusetts have special data security rules?",
        a: "Yes. 201 CMR 17.00 requires a written information security program if you hold Massachusetts residents' personal information. We set up forms, storage, and access controls with that in mind. Your attorney can confirm what applies.",
      },
      {
        q: "Do you work remotely with Boston companies?",
        a: "Yes. Projects run over video calls on Eastern Time, with weekly progress updates.",
      },
    ],
  },
  {
    state: "massachusetts",
    city: "cambridge",
    metaTitle: "Web Design & Software in Cambridge, MA | Klikcy",
    metaDescription:
      "Websites, SaaS, and data tools for Cambridge biotech, tech startups, and research groups around Kendall Square. Remote team with fixed quotes.",
    h1: "Websites and software for Cambridge companies",
    intro:
      "Cambridge, and Kendall Square in particular, has one of the highest concentrations of biotech and tech companies in the world. We build websites that explain complex science clearly, and software for teams moving fast.",
    landscape: [
      "Around MIT and Harvard, Cambridge hosts biotech and pharmaceutical companies, research institutes, and tech startups, many at an early stage and raising funding. Their websites need to persuade investors, partners, and recruits, often all at once.",
      "Startups here also need product engineering help: MVPs, internal tools for lab or research data, and SaaS products that can grow from a pilot to paying customers.",
    ],
    needs: [
      {
        title: "Explaining complex work clearly",
        body: "Sites that make the science or technology understandable to investors and recruits, without overstating claims.",
        services: ["custom-website-development", "brand-identity", "ui-ux-design"],
      },
      {
        title: "MVPs and SaaS products",
        body: "First releases scoped tightly, with demos every two weeks and code your future engineering team can take over.",
        services: ["saas-development", "web-app-development", "api-development"],
      },
      {
        title: "Data and internal tools",
        body: "Dashboards, databases, and automation for research and operations data.",
        services: ["admin-dashboard-development", "database-architecture", "data-extraction-automation"],
      },
    ],
    search:
      "Most Cambridge companies aren't trying to rank for local searches. They want to be found by investors, partners, and candidates searching for their technology or team. That makes clear entity information, news and publication pages, and strong technical SEO more useful than local pages.",
    rules:
      "Massachusetts regulation 201 CMR 17.00 applies if you hold personal information about Massachusetts residents, including job applicants who apply through your site. This is general information, not legal advice.",
    areas: ["Kendall Square", "Central Square", "Harvard Square", "Alewife", "East Cambridge"],
    faqs: [
      {
        q: "Do you build websites for biotech companies?",
        a: "Yes. We focus on clarity and accuracy, and your scientific and legal reviewers approve every claim before launch.",
      },
      {
        q: "Can you build an MVP for an early-stage startup?",
        a: "Yes. We scope the smallest product that proves the idea, build it in two-week cycles, and keep everything in your accounts.",
      },
      {
        q: "Do you work with research groups and labs?",
        a: "Yes. We build data tools, dashboards, and internal applications, and can work with your institution's IT and security requirements.",
      },
    ],
  },
];

const marketByKey = new Map(localMarkets.map((m) => [`${m.state}/${m.city}`, m]));

export function getLocalMarket(stateSlug: string, citySlug: string): LocalMarket | undefined {
  return marketByKey.get(`${stateSlug}/${citySlug}`);
}

export function getLocalMarketsForState(stateSlug: string): LocalMarket[] {
  return localMarkets.filter((m) => m.state === stateSlug);
}

export function localMarketParams(): { state: string; city: string }[] {
  return localMarkets.map((m) => ({ state: m.state, city: m.city }));
}
