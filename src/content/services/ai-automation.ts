import type { Service } from "@/lib/service-types";

export const aiAutomationServices: Service[] = [
  {
    slug: "ai-business-automation",
    name: "AI Business Automation",
    category: "ai-automation",
    shortDescription: "Find the repetitive work eating your team's week and hand it to software that does it reliably.",
    metaTitle: "AI Business Automation Services | Klikcy",
    metaDescription:
      "AI business automation for U.S. companies. We find the repetitive tasks costing you hours, automate them with AI and integrations, and measure the time saved.",
    focusKeyword: "ai business automation",
    intro:
      "We look at how work actually moves through your business, find the repetitive steps, and automate them with a mix of AI and plain integrations, whichever does the job best.",
    overview: [
      "Most automation projects start with a tool: 'we should use AI for something'. Ours start with a process. Where does your team copy data between systems? Which emails get the same reply every time? What report takes someone half of every Monday? Those are the places where automation pays for itself.",
      "Not every step needs AI. Moving a form submission into your CRM is a simple integration. Reading a messy PDF invoice and pulling out the line items is where a language model earns its keep. We use AI where judgment or unstructured text is involved, and plain rules everywhere else, because rules are cheaper, faster, and easier to trust.",
      "Every automation we build has a person in the loop where mistakes would be costly, logging so you can see what happened, and a clear owner on your team. We measure hours saved before and after, so you know whether it was worth it.",
    ],
    signs: [
      "Staff spend hours each week copying information between tools.",
      "The same customer questions or internal requests come in every day.",
      "Work stalls because one person is the only one who knows the process.",
      "You've tried Zapier recipes, but they break and nobody maintains them.",
    ],
    included: [
      "Process mapping workshop with your team",
      "Automation opportunity list ranked by hours saved",
      "Build of the first two or three automations",
      "Human review steps for high-stakes actions",
      "Logging, alerts, and error handling",
      "Documentation and team training",
    ],
    process: [
      { title: "Map the work", detail: "We sit with the people who do the work and document each step, tool, and handoff." },
      { title: "Pick the targets", detail: "We rank opportunities by time saved, risk, and how hard they are to build." },
      { title: "Build and test", detail: "Automations run alongside the manual process until the results match." },
      { title: "Hand over", detail: "Your team gets documentation, alerts, and a named owner for each automation." },
    ],
    timeline: "Discovery takes 1 to 2 weeks. A first set of automations usually goes live within 3 to 6 weeks.",
    costFactors: [
      "Number of processes automated",
      "Systems involved and whether they have APIs",
      "AI usage volume (model costs scale with use)",
      "Compliance or review requirements",
    ],
    pitfalls: [
      "Using AI for steps a simple rule would handle more reliably.",
      "Automating a broken process instead of fixing it first.",
      "No alerting, so failures go unnoticed for weeks.",
    ],
    tools: ["n8n, Make, or Zapier", "OpenAI and Anthropic APIs", "Custom Node or Python services", "Your CRM and help desk APIs"],
    related: ["workflow-automation", "ai-chatbot-development", "crm-automation", "reporting-automation"],
    faqs: [
      {
        q: "What kinds of tasks can AI automate?",
        a: "Anything involving reading or writing unstructured text: sorting emails, extracting data from documents, drafting replies, summarizing calls, and classifying requests. Paired with integrations, it can then act on that information in your other systems.",
      },
      {
        q: "Will this replace people on our team?",
        a: "In our experience it mostly removes the parts of the job people dislike, like data entry and copy-paste, so they can spend time on work that needs judgment. How you use that time is your call.",
      },
      {
        q: "Is our data safe?",
        a: "We use business API tiers that don't train on your data, keep sensitive information out of prompts where possible, and store logs in your own accounts. For regulated data we'll discuss the options before building anything.",
      },
      {
        q: "How do we know it's working?",
        a: "We measure the time the task took before automation and track volume, errors, and exceptions after. You'll see the numbers, not just a demo.",
      },
      {
        q: "What does it cost to run?",
        a: "Running costs come from platform subscriptions and AI usage. For most small and mid-size businesses this is modest, and we estimate it before building.",
      },
    ],
  },
  {
    slug: "ai-chatbot-development",
    name: "AI Chatbot Development",
    category: "ai-automation",
    shortDescription: "Chat assistants trained on your own content that answer customers accurately and know when to hand off.",
    metaTitle: "AI Chatbot Development Services | Klikcy",
    metaDescription:
      "Custom AI chatbots that answer from your own documents, book appointments, capture leads, and hand off to a person when needed. Built and tested for accuracy.",
    focusKeyword: "ai chatbot development",
    intro:
      "We build chat assistants that answer from your own content, not the open internet, so they give accurate answers about your business and hand off to a person when they should.",
    overview: [
      "A good chatbot handles the questions your team answers twenty times a day: hours, pricing ranges, policies, how to get started, where an order is. A bad one makes things up with confidence. The difference is mostly in how it's built.",
      "Ours use retrieval-augmented generation (RAG). The bot searches your approved content, such as help articles, policies, product data, and past answers, and responds only from what it finds. If the answer isn't there, it says so and offers to connect the visitor with your team. We test it against a list of real customer questions before launch and keep testing after.",
      "Chatbots can also take action: booking a call, creating a support ticket, checking an order, or capturing a lead in your CRM. Each action is limited to exactly what it needs, so the bot can't do more than you intended.",
    ],
    signs: [
      "Your support inbox is full of questions already answered on your site.",
      "Leads arrive outside business hours and go cold by morning.",
      "You tried a chatbot before and it gave wrong answers.",
      "Your team needs an internal assistant for policies and procedures.",
    ],
    included: [
      "Content audit and knowledge base preparation",
      "Retrieval-based chatbot answering from your sources",
      "Handoff to live chat, email, or ticketing",
      "Actions such as booking, lead capture, and order lookup",
      "Test set of real questions with accuracy scoring",
      "Conversation review dashboard",
    ],
    process: [
      { title: "Gather content", detail: "We collect and clean the documents the bot will answer from, and find the gaps." },
      { title: "Build", detail: "Retrieval, prompts, guardrails, and actions, with a test page for your team." },
      { title: "Test", detail: "We score answers against real customer questions and fix failures before launch." },
      { title: "Launch and review", detail: "We review conversations weekly at first to improve answers and fill content gaps." },
    ],
    timeline: "Most website chatbots launch in 3 to 6 weeks, depending on how much content needs preparing.",
    costFactors: [
      "Amount and condition of your source content",
      "Number of integrations and actions",
      "Languages supported",
      "Conversation volume, which drives AI usage costs",
    ],
    pitfalls: [
      "Letting the bot answer from general knowledge instead of your content.",
      "No clear way to reach a human.",
      "Launching without testing against real customer questions.",
    ],
    tools: ["OpenAI and Anthropic models", "Vector databases such as pgvector or Pinecone", "Intercom, Zendesk, or HubSpot", "Custom web widgets"],
    related: ["ai-agent-development", "ai-business-automation", "workflow-automation", "crm-automation"],
    faqs: [
      {
        q: "How do you stop the chatbot from making things up?",
        a: "It answers only from content we've given it, cites where the answer came from, and is instructed to say when it doesn't know. We test it against real questions and review conversations after launch.",
      },
      {
        q: "Can it hand conversations to a real person?",
        a: "Yes. It can pass the conversation to live chat, open a support ticket, or collect contact details for a callback, along with a summary so your team doesn't start from scratch.",
      },
      {
        q: "Where does the chatbot live?",
        a: "On your website as a widget, inside tools like Slack or Microsoft Teams for internal use, or in channels such as WhatsApp and SMS.",
      },
      {
        q: "How do we update what it knows?",
        a: "When you update your help articles or documents, the bot's knowledge updates with them. We set up a sync so content stays current.",
      },
      {
        q: "Is it expensive to run?",
        a: "Costs depend on conversation volume and the model used. For most business sites, it's comparable to a basic help desk subscription. We estimate it upfront.",
      },
    ],
  },
  {
    slug: "ai-agent-development",
    name: "AI Agent Development",
    category: "ai-automation",
    shortDescription: "AI agents that carry out multi-step tasks across your tools, with limits and approvals built in.",
    metaTitle: "AI Agent Development Services | Klikcy",
    metaDescription:
      "AI agents that research, draft, update records, and complete multi-step tasks across your tools, with permissions, approvals, and logs you control.",
    focusKeyword: "ai agent development",
    intro:
      "An AI agent doesn't just answer a question; it works through a task step by step, using your tools. We build agents for well-defined jobs, with clear limits on what they can touch.",
    overview: [
      "Agents are a good fit for tasks that need several steps and some judgment: researching a lead before a sales call, triaging and routing support tickets, preparing a first draft of a proposal from a template and CRM data, or reconciling records between two systems.",
      "The risk with agents is that they're unpredictable when given too much freedom. We design them narrowly. Each agent gets a specific job, a short list of tools, permissions limited to what that job needs, and approval steps before anything consequential, like sending an email to a customer or changing a payment record.",
      "Every action is logged, so you can see what the agent did and why. We start with the agent drafting and a person approving, and only remove approvals once the results have been consistently right.",
    ],
    signs: [
      "A task takes your team several tools and many small decisions each time.",
      "Your team does research or prep work before every sales call or project.",
      "You want to automate something too varied for fixed rules.",
      "You've seen agent demos and want to know what would actually work for you.",
    ],
    included: [
      "Task analysis and agent design",
      "Tool integrations with scoped permissions",
      "Approval steps for consequential actions",
      "Evaluation set and accuracy testing",
      "Action logs and monitoring",
      "Rollout plan from supervised to more autonomous",
    ],
    process: [
      { title: "Define the job", detail: "We write down exactly what the agent should do, what it shouldn't, and what 'done' looks like." },
      { title: "Build tools", detail: "We connect the systems it needs with the narrowest permissions possible." },
      { title: "Evaluate", detail: "We run the agent against real past examples and measure how often it gets them right." },
      { title: "Supervised rollout", detail: "It drafts, people approve, and autonomy grows only as accuracy is proven." },
    ],
    timeline: "A first agent typically takes 4 to 8 weeks, including evaluation and supervised rollout.",
    costFactors: [
      "Number of tools and systems the agent uses",
      "Complexity and variety of the task",
      "Evaluation depth required",
      "Usage volume",
    ],
    pitfalls: [
      "Giving an agent broad access 'to see what it can do'.",
      "No evaluation set, so nobody knows how often it's wrong.",
      "Removing human approval before the agent has earned it.",
    ],
    tools: ["Anthropic and OpenAI tool use", "Model Context Protocol (MCP)", "LangGraph or custom orchestration", "Your business system APIs"],
    related: ["ai-chatbot-development", "mcp-integrations", "workflow-automation", "ai-business-automation"],
    faqs: [
      {
        q: "What's the difference between a chatbot and an agent?",
        a: "A chatbot answers questions. An agent completes tasks: it decides which steps to take, uses tools to take them, and checks the results. Many projects combine the two.",
      },
      {
        q: "How do you keep agents from doing something harmful?",
        a: "Narrow permissions, a short list of allowed tools, approval steps before consequential actions, and full logs. We also test against tricky cases before giving the agent real work.",
      },
      {
        q: "Which AI models do you use?",
        a: "We pick per task. Claude and GPT models are our usual choices, and we test more than one before deciding. We avoid locking you into a single provider.",
      },
      {
        q: "Can agents work with our existing software?",
        a: "Yes, if the software has an API or an MCP server. For tools without either, we look at other options, such as email-based workflows or browser automation, as a last resort.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    category: "ai-automation",
    shortDescription: "Connect your apps so data moves between them automatically instead of by copy and paste.",
    metaTitle: "Workflow Automation Services | n8n, Make, Zapier | Klikcy",
    metaDescription:
      "Workflow automation that connects your apps with n8n, Make, Zapier, or custom code. Fewer manual steps, fewer errors, and alerts when something needs attention.",
    focusKeyword: "workflow automation services",
    intro:
      "We connect the apps your business runs on, so new leads, orders, and requests flow where they need to go without someone retyping them.",
    overview: [
      "Most businesses run on a dozen tools that don't talk to each other. A form fills in, someone copies it to the CRM, then creates a project, then sends a welcome email, then updates a spreadsheet. Each step is small, but together they eat hours and introduce mistakes.",
      "We map these workflows and connect the systems with whichever platform suits the job. Zapier is quick and familiar. Make handles more complex branching. n8n can be self-hosted for cost or data control. When none of them fit, we write a small custom service.",
      "Reliability is the part people skip. Every workflow we build has error handling, retries, alerts when something fails, and a simple log, so a broken connection is noticed the same day instead of discovered a month later.",
    ],
    signs: [
      "Information is retyped from one tool into another every day.",
      "Leads or orders occasionally fall through the cracks.",
      "Existing Zaps break and nobody knows how to fix them.",
      "Your automation platform bill keeps climbing.",
    ],
    included: [
      "Workflow mapping across your tools",
      "Platform recommendation (Zapier, Make, n8n, or custom)",
      "Build of agreed workflows",
      "Error handling, retries, and failure alerts",
      "Cleanup or rebuild of existing automations",
      "Documentation of every workflow",
    ],
    process: [
      { title: "Map", detail: "We document each workflow, trigger, and system involved." },
      { title: "Choose the platform", detail: "We pick based on complexity, volume, cost, and data requirements." },
      { title: "Build", detail: "Workflows are built and tested with real data in a safe environment." },
      { title: "Monitor", detail: "Alerts and logs go live with the workflows, and we check them in the first weeks." },
    ],
    timeline: "Simple workflows can go live within a week. A broader automation project usually takes 2 to 6 weeks.",
    costFactors: [
      "Number of workflows and steps",
      "Systems without good APIs",
      "Run volume, which affects platform costs",
      "Self-hosting requirements",
    ],
    pitfalls: [
      "Building critical workflows in a personal account that leaves with an employee.",
      "No error alerts.",
      "Dozens of overlapping automations nobody can explain.",
    ],
    tools: ["Zapier", "Make", "n8n", "Custom Node.js services", "Webhooks and REST APIs"],
    related: ["ai-business-automation", "crm-automation", "reporting-automation", "api-development"],
    faqs: [
      {
        q: "Zapier, Make, or n8n: which is best?",
        a: "Zapier is easiest for simple flows. Make handles complex logic at a lower price per run. n8n can be self-hosted, which helps with high volume or strict data rules. We recommend based on your workflows, not habit.",
      },
      {
        q: "Can you fix our existing automations?",
        a: "Yes. We often start by auditing what's already running, removing duplicates, and adding the error handling that was missing.",
      },
      {
        q: "What if one of our apps doesn't have an integration?",
        a: "If it has an API, we can connect it with a custom step. If not, there are sometimes workarounds like email parsing or exports, and we'll tell you how reliable those are.",
      },
      {
        q: "Who owns the automations?",
        a: "You do. Everything is built in accounts your company owns, with documentation so your team or another developer can maintain them.",
      },
    ],
  },
  {
    slug: "crm-automation",
    name: "CRM Automation",
    category: "ai-automation",
    shortDescription: "Lead routing, follow-ups, and pipeline updates handled by your CRM instead of your sales team.",
    metaTitle: "CRM Automation Services | HubSpot & Salesforce | Klikcy",
    metaDescription:
      "CRM automation for HubSpot, Salesforce, Pipedrive, and Zoho: lead routing, follow-up sequences, deal updates, and clean data so your sales team sells more.",
    focusKeyword: "crm automation",
    intro:
      "We set up your CRM to do the administrative work: routing new leads, reminding reps to follow up, updating deal stages, and keeping records clean.",
    overview: [
      "A CRM is only as useful as the data in it, and salespeople hate data entry. The result is half-filled records, leads that sit untouched for days, and pipeline reports nobody believes. Automation fixes this by doing the busywork for them.",
      "We look at how leads arrive and how deals move, then automate the predictable parts. New leads are assigned to the right rep based on territory or service. Follow-up tasks appear on schedule. Deal stages update when a proposal is sent or a contract signed. Duplicate contacts are merged. AI can summarize calls and log notes, so reps stop skipping them.",
      "We work in the CRM you already have where possible. If it genuinely doesn't fit, we'll say so and help you move.",
    ],
    signs: [
      "Leads wait hours or days before anyone contacts them.",
      "Your pipeline report doesn't match reality.",
      "Reps keep their own spreadsheets alongside the CRM.",
      "You have thousands of duplicate or incomplete contacts.",
    ],
    included: [
      "CRM audit of pipelines, properties, and data quality",
      "Lead capture and routing rules",
      "Follow-up tasks and email sequences",
      "Automatic deal stage updates",
      "Duplicate cleanup and data hygiene rules",
      "Pipeline and activity dashboards",
    ],
    process: [
      { title: "Audit", detail: "We review your pipeline stages, fields, and data quality with your sales lead." },
      { title: "Design", detail: "We agree on routing rules, follow-up timing, and what each stage means." },
      { title: "Build", detail: "Workflows, sequences, and integrations are configured and tested." },
      { title: "Adopt", detail: "We train the team and check usage in the following weeks." },
    ],
    timeline: "Most CRM automation projects take 2 to 5 weeks.",
    costFactors: [
      "CRM platform and plan level",
      "Number of pipelines and teams",
      "Data cleanup required",
      "Integrations with forms, phone systems, and billing",
    ],
    pitfalls: [
      "Automating sequences before the pipeline stages are clearly defined.",
      "Sending automated emails that sound automated.",
      "Adding fields nobody fills in.",
    ],
    tools: ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Call recording and AI note tools"],
    related: ["workflow-automation", "ai-business-automation", "email-marketing-setup", "reporting-automation"],
    faqs: [
      {
        q: "Which CRMs do you work with?",
        a: "HubSpot, Salesforce, Pipedrive, and Zoho most often. We can work with others that have an API.",
      },
      {
        q: "Can you clean up our existing CRM data?",
        a: "Yes. We merge duplicates, standardize fields, and set up rules that keep data clean going forward.",
      },
      {
        q: "How fast should new leads be contacted?",
        a: "As fast as you can manage. Response speed has a big effect on whether a lead converts, which is why routing and instant notifications are usually the first thing we automate.",
      },
      {
        q: "Will automated emails feel impersonal?",
        a: "Only if they're written that way. We write sequences that sound like the rep sending them and stop them automatically when the lead replies.",
      },
    ],
  },
  {
    slug: "mcp-integrations",
    name: "MCP Integrations",
    category: "ai-automation",
    shortDescription: "Model Context Protocol servers that let AI assistants use your business tools and data safely.",
    metaTitle: "MCP Server Development & Integration | Klikcy",
    metaDescription:
      "Custom Model Context Protocol (MCP) servers that connect Claude, ChatGPT, and other AI tools to your internal systems, with authentication and scoped access.",
    focusKeyword: "mcp integrations",
    intro:
      "The Model Context Protocol (MCP) is an open standard for connecting AI assistants to tools and data. We build MCP servers that give assistants controlled access to your systems.",
    overview: [
      "MCP was introduced by Anthropic in late 2024 and is now supported by most major AI assistants and development tools. Instead of building a separate integration for every AI product, you build one MCP server for a system, such as your CRM, database, or internal docs, and any compatible assistant can use it.",
      "We build MCP servers for internal systems that don't have one yet, and configure existing servers for tools that do. The important work is in the boundaries: which actions are exposed, what data the assistant can read, how users authenticate, and what gets logged.",
      "A typical result: your team can ask Claude or another assistant 'what's the status of the Henderson project and what did they last email about?' and get an answer pulled from your project tool and inbox, without anyone copying data into a chat window.",
    ],
    signs: [
      "Your team pastes internal data into AI chat tools to get work done.",
      "You want AI assistants to use your internal systems, but safely.",
      "You're building AI features and want a standard way to connect tools.",
      "You have a product and want to offer an MCP server to your customers.",
    ],
    included: [
      "Use case and access design",
      "Custom MCP server development",
      "Authentication and permission scoping",
      "Configuration in your chosen AI clients",
      "Action logging and usage monitoring",
      "Documentation for your team",
    ],
    process: [
      { title: "Scope", detail: "We decide which tools and data the assistant should access, and what it should never touch." },
      { title: "Build", detail: "We develop the MCP server with typed tools, input validation, and authentication." },
      { title: "Secure", detail: "We test permission boundaries and review what's logged." },
      { title: "Roll out", detail: "We configure clients for your team and gather feedback on what to add next." },
    ],
    timeline: "A focused MCP server for one system typically takes 2 to 4 weeks.",
    costFactors: [
      "Number of systems and tools exposed",
      "Authentication requirements such as SSO",
      "Read-only versus write access",
      "Hosting (local, cloud, or your infrastructure)",
    ],
    pitfalls: [
      "Exposing broad write access when read-only would do.",
      "Installing third-party MCP servers without reviewing their code or source.",
      "No logging of which actions the assistant took on whose behalf.",
    ],
    tools: ["Model Context Protocol TypeScript and Python SDKs", "Claude", "ChatGPT", "OAuth", "Your internal APIs"],
    related: ["ai-agent-development", "api-development", "ai-business-automation", "custom-business-software"],
    faqs: [
      {
        q: "What is the Model Context Protocol?",
        a: "MCP is an open standard that defines how AI assistants connect to external tools and data. One MCP server can work with many compatible assistants, much like a USB device works with many computers.",
      },
      {
        q: "Which AI tools support MCP?",
        a: "Claude, ChatGPT, many coding tools such as Cursor and VS Code, and a growing list of others. Support varies by product and plan, so we confirm compatibility for your setup.",
      },
      {
        q: "Is it safe to connect AI to our internal systems?",
        a: "It can be, with the right boundaries. We expose only the actions needed, use proper authentication, prefer read-only access, and log everything.",
      },
      {
        q: "Can you build an MCP server for our SaaS product?",
        a: "Yes. Offering an MCP server lets your customers use your product from inside their AI assistants, which is becoming an expected feature for many tools.",
      },
    ],
  },
  {
    slug: "data-extraction-automation",
    name: "Data Extraction Automation",
    category: "ai-automation",
    shortDescription: "Pull data out of PDFs, emails, scans, and forms automatically and into the systems that need it.",
    metaTitle: "AI Data Extraction & Document Automation | Klikcy",
    metaDescription:
      "Automate data extraction from invoices, PDFs, emails, and forms. AI reads the documents, checks the results, and sends clean data to your systems.",
    focusKeyword: "data extraction automation",
    intro:
      "If your team reads documents and types what they find into another system, that's a job AI now does well. We automate it, with checks so bad data doesn't slip through.",
    overview: [
      "Invoices, purchase orders, intake forms, contracts, shipping documents, and resumes all contain information someone needs in a spreadsheet or system. Older OCR tools needed fixed templates and broke whenever a supplier changed their layout. Modern language models read documents more like a person does.",
      "We build pipelines that receive documents (by email, upload, or folder), extract the fields you need, validate them against rules like totals that add up or dates in range, and send clean data to your accounting system, CRM, or database. Anything uncertain goes to a review queue for a person to check, instead of being guessed.",
      "Accuracy is measured, not assumed. Before launch, we run the pipeline on a batch of your real past documents and compare the output with what your team entered.",
    ],
    signs: [
      "Someone spends hours a week typing data from PDFs or emails.",
      "Documents come from many sources with different layouts.",
      "Data entry errors cause billing or fulfillment problems.",
      "Your backlog of unprocessed documents keeps growing.",
    ],
    included: [
      "Document and field analysis",
      "Extraction pipeline for your document types",
      "Validation rules and confidence checks",
      "Human review queue for uncertain results",
      "Delivery to your system of record",
      "Accuracy report on real sample documents",
    ],
    process: [
      { title: "Sample", detail: "We collect a representative batch of your documents and the correct values for each." },
      { title: "Build", detail: "We set up intake, extraction, validation, and delivery." },
      { title: "Measure", detail: "We compare output against the correct values and tune until accuracy is acceptable." },
      { title: "Run", detail: "The pipeline goes live with a review queue and weekly accuracy checks at first." },
    ],
    timeline: "Most extraction pipelines go live in 3 to 6 weeks.",
    costFactors: [
      "Number of document types and fields",
      "Document quality (clean PDFs versus phone photos)",
      "Volume per month",
      "Integrations with destination systems",
    ],
    pitfalls: [
      "Trusting every extracted value without validation.",
      "Testing on clean sample documents instead of the messy real ones.",
      "No review step for low-confidence results.",
    ],
    tools: ["Claude and GPT vision models", "AWS Textract or Google Document AI where suitable", "n8n or custom pipelines", "QuickBooks, Xero, and CRM APIs"],
    related: ["workflow-automation", "ai-business-automation", "reporting-automation", "api-development"],
    faqs: [
      {
        q: "How accurate is AI data extraction?",
        a: "On typed documents like invoices it's often very high, but it depends on your documents. We measure accuracy on your own samples before launch, and uncertain results go to a person for review.",
      },
      {
        q: "Can it handle scanned or photographed documents?",
        a: "Yes, though accuracy drops with blurry or skewed images. We'll show you the results on your real documents.",
      },
      {
        q: "Where does the extracted data go?",
        a: "Wherever you need it: accounting software, your CRM, a database, or a spreadsheet. We connect directly through APIs where available.",
      },
      {
        q: "Is it secure for sensitive documents?",
        a: "We use providers with business data agreements that don't train on your data, store documents in your own cloud storage, and limit who can access the review queue.",
      },
    ],
  },
  {
    slug: "reporting-automation",
    name: "Reporting Automation",
    category: "ai-automation",
    shortDescription: "Reports that build themselves from your data, on schedule, instead of eating someone's Monday.",
    metaTitle: "Reporting Automation & Dashboards | Klikcy",
    metaDescription:
      "Automated reports and dashboards pulling from your CRM, ads, analytics, and finance tools, delivered on schedule with plain-English summaries.",
    focusKeyword: "reporting automation",
    intro:
      "If someone on your team spends hours each week exporting numbers into a spreadsheet, we can automate that, from data collection to the summary in your inbox.",
    overview: [
      "Weekly and monthly reports are often built by hand: export from the ad platforms, export from the CRM, paste into a spreadsheet, fix the formulas, write a summary, email it around. By the time it's done, it's out of date.",
      "We connect your data sources to a central place, usually a dashboard tool like Looker Studio or a simple data warehouse for larger setups, and define the metrics once so everyone sees the same numbers. Reports refresh automatically and can arrive by email or Slack on whatever schedule you like.",
      "AI is useful for the summary layer: a short written explanation of what changed this week and what looks unusual. We keep the numbers coming straight from the source, so the summary can be checked against them.",
    ],
    signs: [
      "Building reports takes hours of someone's time each week.",
      "Different teams quote different numbers for the same metric.",
      "Leadership asks questions the current reports can't answer.",
      "Reports arrive too late to act on.",
    ],
    included: [
      "Metric definitions agreed with your team",
      "Data connections to your tools",
      "Dashboards for leadership and each team",
      "Scheduled email or Slack reports",
      "Optional AI-written weekly summary",
      "Data quality checks and alerts",
    ],
    process: [
      { title: "Define", detail: "We agree what each metric means and where its data comes from." },
      { title: "Connect", detail: "We set up reliable data connections and check the numbers against the source." },
      { title: "Build", detail: "Dashboards and scheduled reports, reviewed with the people who'll use them." },
      { title: "Maintain", detail: "Alerts flag broken connections or numbers that suddenly look wrong." },
    ],
    timeline: "Most reporting projects take 2 to 5 weeks.",
    costFactors: [
      "Number of data sources",
      "Dashboard tool licensing",
      "Data warehouse needs for larger volumes",
      "Custom metrics and calculations",
    ],
    pitfalls: [
      "Building dashboards before agreeing what each metric means.",
      "Tracking dozens of metrics nobody acts on.",
      "No alerts when a data connection breaks and numbers quietly go stale.",
    ],
    tools: ["Looker Studio", "GA4", "BigQuery", "Supermetrics or similar connectors", "Slack and email delivery"],
    related: ["google-analytics-setup", "workflow-automation", "crm-automation", "google-tag-manager-setup"],
    faqs: [
      {
        q: "Which tools can you pull data from?",
        a: "Most common business tools: Google Analytics, Google and Meta Ads, HubSpot, Salesforce, Shopify, Stripe, QuickBooks, and anything with an API.",
      },
      {
        q: "Do we need a data warehouse?",
        a: "Usually not for small and mid-size businesses. Direct connections to a dashboard tool are enough. We recommend a warehouse like BigQuery when data volume or the number of sources makes direct connections slow or unreliable.",
      },
      {
        q: "Can reports be sent automatically?",
        a: "Yes, by email or Slack, on any schedule, to whoever needs them.",
      },
      {
        q: "Are AI summaries reliable?",
        a: "They're good at describing what changed, but we keep the actual numbers alongside them so anyone can check. We don't let AI calculate the figures themselves.",
      },
    ],
  },
];
