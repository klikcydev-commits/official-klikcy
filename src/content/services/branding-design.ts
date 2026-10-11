import type { Service } from "@/lib/service-types";

export const brandingDesignServices: Service[] = [
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    category: "branding-design",
    shortDescription: "Interface design for websites and apps, grounded in research and tested with real users.",
    metaTitle: "UI/UX Design Agency for Websites & Apps | Klikcy",
    metaDescription:
      "UI/UX design for websites, web apps, and mobile apps: user research, flows, wireframes, prototypes, and interface design tested with real users before build.",
    focusKeyword: "ui ux design agency",
    intro:
      "We design how websites and apps work and how they look, testing with real people before development so expensive mistakes get caught while they're still cheap.",
    overview: [
      "UX is the structure: what goes on each screen, in what order, and how someone gets from wanting something to having done it. UI is the visual layer: type, color, spacing, and components. Good design needs both, and the UX decisions matter more, because a beautiful screen with the wrong flow still fails.",
      "We start by learning how your users think about the task. That might be interviews, a review of support tickets, analytics, or watching people use the current product. From there we map flows, sketch wireframes, and build clickable prototypes to test with a handful of real users. Five people will usually reveal most of the big problems.",
      "Design files are handed over organized and ready for development, with components, states, and responsive behavior documented. Because we also build, our designs are realistic about what's practical to code.",
    ],
    signs: [
      "Users get stuck or drop off at the same points in your product.",
      "You're starting a new product and want to test ideas before building.",
      "Your interface grew feature by feature and now feels inconsistent.",
      "Support spends time explaining things the interface should make obvious.",
    ],
    included: [
      "User research and interviews",
      "User flows and information architecture",
      "Wireframes and clickable prototypes",
      "Usability testing with real users",
      "High-fidelity interface design",
      "Developer-ready Figma files with documented components",
    ],
    process: [
      { title: "Research", detail: "We learn who your users are, what they're trying to do, and where they struggle today." },
      { title: "Structure", detail: "Flows and wireframes that settle what goes where, before visual design." },
      { title: "Prototype and test", detail: "Clickable prototypes tested with real users, then revised." },
      { title: "Visual design and handoff", detail: "Final screens and components, documented for development." },
    ],
    timeline: "Most UI/UX projects take 4 to 10 weeks depending on the number of flows and screens.",
    costFactors: [
      "Number of user flows and screens",
      "Amount of user research and testing",
      "Platforms covered (web, iOS, Android)",
      "Whether a design system is included",
    ],
    pitfalls: [
      "Jumping to visual design before the flow works.",
      "Testing only with colleagues who already know the product.",
      "Handing developers screens with no empty, loading, or error states.",
    ],
    tools: ["Figma", "Maze or Lyssna for testing", "FigJam", "Hotjar or Microsoft Clarity", "Video interviews"],
    related: ["design-systems", "conversion-focused-website-design", "brand-identity", "web-app-development"],
    faqs: [
      {
        q: "What's the difference between UI and UX design?",
        a: "UX design covers structure and flow: what happens, in what order, and why. UI design covers the visual interface: layout, typography, color, and components. We do both, starting with UX.",
      },
      {
        q: "Do we really need user research?",
        a: "Even a small amount pays off. A few interviews and a usability test with five people usually reveal problems that would cost far more to fix after development.",
      },
      {
        q: "Do you build what you design?",
        a: "We can. Many clients have us design and develop, which avoids handoff gaps. We also hand off to in-house or other development teams.",
      },
      {
        q: "What do we receive at the end?",
        a: "Organized Figma files with all screens, components, and states, plus prototype links and notes from user testing.",
      },
    ],
  },
  {
    slug: "brand-identity",
    name: "Brand Identity",
    category: "branding-design",
    shortDescription: "A complete visual identity: logo, color, type, and guidelines that hold together everywhere.",
    metaTitle: "Brand Identity Design Services | Klikcy",
    metaDescription:
      "Brand identity design for growing U.S. businesses: positioning, logo, color, typography, and brand guidelines that work consistently online and in print.",
    focusKeyword: "brand identity design",
    intro:
      "A brand identity is the full visual system your business uses: logo, colors, typography, imagery, and the rules that keep them consistent. We design it so it works everywhere you show up.",
    overview: [
      "A logo alone isn't a brand identity. The identity is everything that makes your materials recognizably yours, from the website and proposals to vehicle wraps and social posts. When it's missing or inconsistent, every new piece gets designed from scratch and nothing quite matches.",
      "We start with positioning: who you serve, what you want to be known for, and how you differ from competitors. That gives the design a brief to answer instead of personal taste. Then we develop a couple of distinct directions, refine the one you choose, and test it across real applications like your website header, a business card, a social post, and signage.",
      "You receive the full set of logo files, a color and type system, and brand guidelines written clearly enough for any designer, printer, or employee to follow.",
    ],
    signs: [
      "Your business has grown but the brand still looks like the startup version.",
      "Every piece of marketing looks a little different.",
      "You're launching a new company, product, or division.",
      "You're merging businesses or repositioning for a new market.",
    ],
    included: [
      "Positioning and competitor review",
      "Two or three initial identity directions",
      "Logo suite (primary, secondary, icon)",
      "Color palette and typography system",
      "Applications such as stationery, social, and web mockups",
      "Brand guidelines document",
    ],
    process: [
      { title: "Discover", detail: "Interviews, competitor review, and agreement on positioning." },
      { title: "Explore", detail: "Distinct directions presented with real-world mockups." },
      { title: "Refine", detail: "We develop the chosen direction into a full system." },
      { title: "Deliver", detail: "Final files, guidelines, and a walkthrough with your team." },
    ],
    timeline: "Most brand identity projects take 6 to 10 weeks.",
    costFactors: [
      "Depth of research and positioning work",
      "Number of directions and rounds of revisions",
      "Range of applications designed",
      "Naming or messaging work if needed",
    ],
    pitfalls: [
      "Designing by committee without an agreed brief.",
      "Judging a logo in isolation instead of in real use.",
      "Skipping guidelines, so the identity drifts within a year.",
    ],
    tools: ["Figma", "Adobe Illustrator", "Brand guideline templates", "Mockup and print proofing"],
    related: ["logo-design", "design-systems", "graphic-design", "ui-ux-design"],
    faqs: [
      {
        q: "What's included in a brand identity?",
        a: "Usually a logo suite, color palette, typography, image and icon style, and guidelines showing how to use them. Larger projects add messaging, templates, and more applications.",
      },
      {
        q: "How long does branding take?",
        a: "Most projects take 6 to 10 weeks, including research, exploration, refinement, and guidelines.",
      },
      {
        q: "Can you refresh our brand instead of starting over?",
        a: "Yes. If your brand has recognition worth keeping, a refresh modernizes it while keeping what people already know.",
      },
      {
        q: "Do we own the final brand files?",
        a: "Yes. You receive all source files and full ownership once the project is complete.",
      },
    ],
  },
  {
    slug: "logo-design",
    name: "Logo Design",
    category: "branding-design",
    shortDescription: "A distinctive logo designed to work at every size, from a favicon to a storefront sign.",
    metaTitle: "Professional Logo Design Services | Klikcy",
    metaDescription:
      "Custom logo design that works at every size and in every format: original concepts, refinement, and a complete file package for web, print, and signage.",
    focusKeyword: "logo design services",
    intro:
      "We design original logos that are simple enough to recognize at a glance and flexible enough to work as a tiny app icon, a website header, or a sign on a building.",
    overview: [
      "A good logo is distinctive, readable, and works in one color. That last point rules out a lot of trendy designs, which fall apart as soon as they're embroidered on a shirt or shrunk to a browser tab icon. We test every concept at small sizes and in black and white before presenting it.",
      "We begin with a short brief on your business, audience, and competitors, then explore several concepts with different ideas behind them, not variations of one idea. After you pick a direction, we refine the shapes, spacing, and lettering until it holds up at every size.",
      "If you need more than a logo, like colors, typography, and guidelines, our Brand Identity service covers the whole system.",
    ],
    signs: [
      "You're starting a business and need a professional mark.",
      "Your current logo looks dated or was made quickly with a template.",
      "Your logo doesn't work small, in one color, or on dark backgrounds.",
      "You need a mark for a new product or sub-brand.",
    ],
    included: [
      "Short brand brief",
      "Three or more original concepts",
      "Refinement rounds on the chosen concept",
      "Horizontal, stacked, and icon versions",
      "Color, black, and white variations",
      "Files for web, print, and social (SVG, PNG, PDF, EPS)",
    ],
    process: [
      { title: "Brief", detail: "We learn about your business, audience, competitors, and what the logo needs to do." },
      { title: "Concepts", detail: "Several distinct ideas, shown in realistic contexts." },
      { title: "Refine", detail: "We perfect the chosen concept: proportions, lettering, and small-size versions." },
      { title: "Deliver", detail: "A complete, organized file package with usage notes." },
    ],
    timeline: "Most logo projects take 2 to 4 weeks.",
    costFactors: [
      "Number of initial concepts",
      "Rounds of revisions",
      "Custom lettering",
      "Additional versions or sub-brand marks",
    ],
    pitfalls: [
      "Fine details that disappear at small sizes.",
      "Relying on color or gradients to make the logo work.",
      "Choosing a design because it's trendy this year.",
    ],
    tools: ["Adobe Illustrator", "Figma", "Custom lettering"],
    related: ["brand-identity", "graphic-design", "social-media-design", "design-systems"],
    faqs: [
      {
        q: "How many logo concepts will we see?",
        a: "Usually three or more distinct concepts, each based on a different idea, shown in realistic mockups.",
      },
      {
        q: "What file formats do we get?",
        a: "Vector files (SVG, EPS, PDF) for print and signage, and PNGs for web and social, in color, black, and white versions.",
      },
      {
        q: "Do you use AI to generate logos?",
        a: "No. Our logos are drawn and refined by designers, which matters for originality and for trademark registration.",
      },
      {
        q: "Can we trademark the logo?",
        a: "The designs are original and you own them outright, which supports trademark registration. A trademark attorney should run the search and filing.",
      },
    ],
  },
  {
    slug: "design-systems",
    name: "Design Systems",
    category: "branding-design",
    shortDescription: "Reusable components and rules that keep your product consistent as it grows.",
    metaTitle: "Design System Design & Development | Klikcy",
    metaDescription:
      "Design systems for growing products: design tokens, Figma component libraries, and matching coded components, so design and development stay in sync.",
    focusKeyword: "design systems",
    intro:
      "A design system is a shared library of components and rules, in Figma and in code, so your team builds faster and your product stays consistent.",
    overview: [
      "As products grow, small inconsistencies multiply: five shades of gray, three button styles, forms that behave differently on every page. Each new feature takes longer because designers and developers redo decisions that should have been made once.",
      "We start by auditing what you have, collecting every button, input, color, and spacing value in use, then consolidate them into a deliberate set. Design tokens define the basics like color, type, spacing, and radius. Components are built on those tokens in Figma and in code, with every state documented: hover, focus, disabled, error, loading.",
      "We keep the system as small as it can be. A design system is only useful if people actually use it, and a library of 200 components nobody understands helps no one.",
    ],
    signs: [
      "Your product looks slightly different on every screen.",
      "Designers and developers disagree about what the 'right' component is.",
      "New features take longer than they should because everything is custom.",
      "You're scaling the team and need a shared foundation.",
    ],
    included: [
      "Audit of existing UI patterns",
      "Design tokens for color, type, spacing, and radius",
      "Figma component library with variants",
      "Coded component library (React)",
      "Accessibility checks for every component",
      "Usage documentation",
    ],
    process: [
      { title: "Audit", detail: "We inventory every UI pattern currently in your product." },
      { title: "Foundations", detail: "Tokens for color, type, and spacing agreed with design and engineering." },
      { title: "Components", detail: "The most-used components first, in Figma and code together." },
      { title: "Adopt", detail: "Documentation, migration help, and a process for adding new components." },
    ],
    timeline: "A foundational design system usually takes 6 to 12 weeks.",
    costFactors: [
      "Number of components",
      "Figma only, or Figma and code",
      "Theming needs such as dark mode or multiple brands",
      "Migration of existing screens",
    ],
    pitfalls: [
      "Building a huge library before the basics are agreed.",
      "Figma and code drifting apart.",
      "No owner, so the system stops being maintained.",
    ],
    tools: ["Figma variables and components", "React and TypeScript", "Tailwind CSS", "Storybook", "Radix UI"],
    related: ["ui-ux-design", "brand-identity", "web-app-development", "conversion-focused-website-design"],
    faqs: [
      {
        q: "Do we need a design system?",
        a: "If you have more than a couple of designers or developers working on the same product, or the product has many screens, a design system usually saves time quickly.",
      },
      {
        q: "Do you build the coded components too?",
        a: "Yes. We build React components that match the Figma library, which is where most of the time savings come from.",
      },
      {
        q: "Can you build on shadcn/ui or Material UI?",
        a: "Yes. Starting from an established library and customizing it to your brand is often faster than building every component from scratch.",
      },
      {
        q: "How do we keep the system up to date?",
        a: "We set up a simple process: who can propose new components, how they're reviewed, and how changes are released.",
      },
    ],
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    category: "branding-design",
    shortDescription: "Sales decks, brochures, ads, and marketing materials designed to match your brand.",
    metaTitle: "Graphic Design Services for Business | Klikcy",
    metaDescription:
      "Business graphic design: sales decks, brochures, one-pagers, ads, trade show materials, and templates, consistent with your brand and ready to print.",
    focusKeyword: "graphic design services",
    intro:
      "We design the materials your sales and marketing teams use every day: decks, brochures, one-pagers, ads, and the templates that let your team make more without starting from scratch.",
    overview: [
      "Most graphic design requests come with a deadline: the trade show is in three weeks, the investor meeting is Thursday, the new campaign launches next month. We work to those timelines while keeping everything consistent with your brand.",
      "We care about the content as much as the look. A sales deck that's beautiful but hard to follow doesn't help close deals. We'll suggest structure, tighten wording, and make sure the key message lands in the first few seconds.",
      "Where your team will produce similar pieces again, we build editable templates in tools they already use, like PowerPoint, Google Slides, Canva, or Figma, so the brand holds up after we hand off.",
    ],
    signs: [
      "Your sales deck looks dated or inconsistent with your website.",
      "You have an event, launch, or campaign coming up.",
      "Your team keeps making materials that drift from the brand.",
      "You need print materials prepared correctly for a printer.",
    ],
    included: [
      "Sales and pitch decks",
      "Brochures, one-pagers, and case study sheets",
      "Digital ads and display banners",
      "Trade show and event graphics",
      "Editable templates for your team",
      "Print-ready files with correct bleeds and color",
    ],
    process: [
      { title: "Brief", detail: "Purpose, audience, content, deadline, and where the piece will be used." },
      { title: "Draft", detail: "A first design with structure and key pages for feedback." },
      { title: "Refine", detail: "Revisions on layout and content until it's right." },
      { title: "Deliver", detail: "Final files for print or digital, plus editable templates where useful." },
    ],
    timeline: "Single pieces usually take 1 to 2 weeks. Larger sets are scheduled around your deadlines.",
    costFactors: [
      "Number and size of pieces",
      "Copywriting and content structuring",
      "Custom illustration or photography",
      "Template building",
    ],
    pitfalls: [
      "Too much text on every slide or page.",
      "Files that aren't set up correctly for professional printing.",
      "Templates so rigid that your team works around them.",
    ],
    tools: ["Adobe InDesign and Illustrator", "Figma", "PowerPoint and Google Slides", "Canva for team templates"],
    related: ["brand-identity", "social-media-design", "logo-design", "content-marketing"],
    faqs: [
      {
        q: "Can you work with our existing brand guidelines?",
        a: "Yes. Most of our graphic design work is for clients with established brands. If guidelines are missing, we'll document the essentials as we go.",
      },
      {
        q: "Do you handle printing?",
        a: "We prepare print-ready files and can coordinate with your printer. We don't print in-house.",
      },
      {
        q: "Can our team edit the files later?",
        a: "Yes. We build templates in the tool your team uses, such as PowerPoint, Google Slides, Canva, or Figma.",
      },
      {
        q: "Do you write the content for decks?",
        a: "We can structure and tighten your content, or write it from a brief.",
      },
    ],
  },
  {
    slug: "social-media-design",
    name: "Social Media Design",
    category: "branding-design",
    shortDescription: "Templates and graphics that keep your social channels consistent and easy to post to.",
    metaTitle: "Social Media Design & Templates | Klikcy",
    metaDescription:
      "Branded social media templates, profile graphics, and ad creative for Instagram, LinkedIn, Facebook, and TikTok, built so your team can reuse them.",
    focusKeyword: "social media design",
    intro:
      "We design social media templates and graphics that look like your brand and are easy for your team to reuse, so posting regularly doesn't mean designing from scratch every time.",
    overview: [
      "Consistency matters more on social than almost anywhere else, because people scroll past in a second. A recognizable style, with consistent colors, type, and layouts, helps your posts register even before anyone reads them.",
      "We design a set of templates around the types of content you actually post: announcements, tips, quotes, testimonials, event promos, job posts, and carousels. Each is built in Canva or Figma so your team can drop in new content and keep everything on brand.",
      "We size everything correctly for each platform and design for small screens first: big readable text, strong contrast, and one idea per post.",
    ],
    signs: [
      "Your social posts all look different.",
      "Making each post takes longer than it should.",
      "Your profiles use outdated logos or cover images.",
      "You're running social ads and need creative that converts.",
    ],
    included: [
      "Template set for your main post types",
      "Story and carousel templates",
      "Profile images and cover graphics for each platform",
      "Ad creative variations for testing",
      "Editable files in Canva or Figma",
      "Short guide for your team",
    ],
    process: [
      { title: "Review", detail: "We look at your current channels, content types, and what performs." },
      { title: "Design", detail: "A template set built around the posts you make most." },
      { title: "Refine", detail: "We test templates with real content and adjust." },
      { title: "Hand off", detail: "Editable templates and a guide so your team can work independently." },
    ],
    timeline: "Most social template projects take 2 to 3 weeks.",
    costFactors: [
      "Number of platforms and templates",
      "Ad creative variations",
      "Motion or video templates",
      "Ongoing monthly design support",
    ],
    pitfalls: [
      "Text too small to read on a phone.",
      "Templates that only work with one specific photo.",
      "Ignoring each platform's safe zones, so text is covered by buttons.",
    ],
    tools: ["Canva", "Figma", "Adobe Creative Cloud", "Meta and LinkedIn ad specs"],
    related: ["graphic-design", "brand-identity", "content-marketing", "logo-design"],
    faqs: [
      {
        q: "Which platforms do you design for?",
        a: "Instagram, LinkedIn, Facebook, TikTok, X, Pinterest, and YouTube, each sized correctly.",
      },
      {
        q: "Do you manage our social media accounts?",
        a: "No, we focus on design. We create the templates and creative; your team or social media manager handles posting and community.",
      },
      {
        q: "Can templates be edited in Canva?",
        a: "Yes. Canva is often the best choice for teams without a dedicated designer.",
      },
      {
        q: "Do you design ad creative?",
        a: "Yes, including multiple variations so you can test what performs best.",
      },
    ],
  },
  {
    slug: "conversion-focused-website-design",
    name: "Conversion-Focused Website Design",
    category: "branding-design",
    shortDescription: "Website design built around what makes visitors call, book, or buy.",
    metaTitle: "Conversion-Focused Web Design | Klikcy",
    metaDescription:
      "Website design built to turn visitors into leads and customers: clear messaging, trust signals, and calls to action placed where visitors are ready to act.",
    focusKeyword: "conversion focused web design",
    intro:
      "We design websites around one question: what does a visitor need to see before they're ready to get in touch or buy? Then we put it in the right order.",
    overview: [
      "Many websites look polished but don't produce leads. The message is vague, the proof is buried, and the call to action is the same 'Contact us' button repeated everywhere. Visitors leave without understanding what you do or why they should choose you.",
      "We start with your customers' decision process: what problem brings them, what they compare, what makes them hesitate. The page is designed to answer those in order: a clear headline that says what you do and for whom, proof like reviews, results, and recognizable clients, an explanation of how it works, an answer to the common objections, and a call to action that matches how ready they are.",
      "This is design work, with copy direction. For testing and improving an existing site through experiments, see Conversion Rate Optimization.",
    ],
    signs: [
      "Your site gets traffic but few inquiries.",
      "Visitors can't tell what you do within a few seconds.",
      "Your reviews and results are hidden on separate pages.",
      "Every page ends with the same generic contact button.",
    ],
    included: [
      "Customer decision and objection mapping",
      "Messaging hierarchy and copy direction",
      "Page structure and wireframes",
      "Visual design focused on clarity",
      "Call-to-action and form design",
      "Conversion tracking plan",
    ],
    process: [
      { title: "Understand buyers", detail: "We map what your customers need to know and what makes them hesitate." },
      { title: "Message", detail: "We agree on the core message and the order of information on key pages." },
      { title: "Design", detail: "Wireframes, then visual design, reviewed against the conversion goal." },
      { title: "Measure", detail: "Tracking set up so you can see what changed after launch." },
    ],
    timeline: "Most conversion-focused design projects take 4 to 8 weeks.",
    costFactors: [
      "Number of key pages designed",
      "Copywriting involvement",
      "Research depth, such as customer interviews",
      "Development included or design only",
    ],
    pitfalls: [
      "Clever headlines that don't say what you do.",
      "Asking for a sale before the visitor understands the offer.",
      "Hiding pricing or process information people are looking for.",
    ],
    tools: ["Figma", "GA4", "Microsoft Clarity or Hotjar", "Customer interview notes"],
    related: ["conversion-rate-optimization", "ui-ux-design", "landing-page-design", "landing-page-optimization"],
    faqs: [
      {
        q: "What makes a website design 'conversion-focused'?",
        a: "Every design decision is made to help the visitor take the next step: clear messaging, proof placed where doubts appear, simple navigation, and calls to action that match the visitor's readiness.",
      },
      {
        q: "How is this different from CRO?",
        a: "This service designs pages around conversion from the start. Conversion Rate Optimization improves an existing site through research and testing over time.",
      },
      {
        q: "Do you write the copy?",
        a: "We provide copy direction for every page and can write the full copy if needed. Messaging is the biggest factor in conversion.",
      },
      {
        q: "Can you redesign only our key pages?",
        a: "Yes. Often the homepage and main service pages make the biggest difference.",
      },
    ],
  },
];
