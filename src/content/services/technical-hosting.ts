import type { Service } from "@/lib/service-types";

export const technicalHostingServices: Service[] = [
  {
    slug: "domain-setup",
    name: "Domain Setup",
    category: "technical-hosting",
    shortDescription: "Domains registered, transferred, and organized in accounts your business owns.",
    metaTitle: "Domain Registration, Transfer & Setup | Klikcy",
    metaDescription:
      "Domain setup for businesses: registration, transfers, renewals, privacy, and DNS handoff, kept in accounts you own so you never lose control of your domain.",
    focusKeyword: "domain setup",
    intro:
      "Your domain is the address for your website and email. We make sure it's registered correctly, owned by your business, protected from expiring, and connected to the right services.",
    overview: [
      "We regularly meet businesses whose domain is registered in a former employee's or old web designer's personal account. When it comes up for renewal or needs a change, nobody can log in. Recovering it can take weeks, and in the worst cases the domain is lost.",
      "We register new domains or transfer existing ones into an account your company controls, with auto-renew, registrar lock, and two-factor login turned on. If you own several domains, like old brand names, common misspellings, or other extensions, we consolidate them and set up redirects to your main site.",
      "Then we connect the domain to your website and email by pointing its DNS where it needs to go, coordinating the switch so nothing goes offline.",
    ],
    signs: [
      "You're not sure who controls your domain or where it's registered.",
      "Your domains are spread across several registrars and accounts.",
      "You're launching a new business or brand.",
      "A domain renewal notice arrived and nobody knew what it was.",
    ],
    included: [
      "Domain registration or transfer",
      "Consolidation into a company-owned account",
      "Auto-renew, registrar lock, and two-factor login",
      "WHOIS privacy where available",
      "Redirects from secondary domains",
      "Documentation of where everything lives",
    ],
    process: [
      { title: "Inventory", detail: "We list every domain you own, where it's registered, and who can access it." },
      { title: "Secure", detail: "Domains move into a company account with locks and auto-renew." },
      { title: "Connect", detail: "DNS pointed to your website and email providers." },
      { title: "Document", detail: "A simple record of registrars, renewal dates, and access." },
    ],
    timeline: "New registrations take minutes. Transfers usually complete within 5 to 7 days.",
    costFactors: [
      "Number of domains",
      "Recovery of domains in inaccessible accounts",
      "Registrar fees for each domain",
      "DNS changes involved",
    ],
    pitfalls: [
      "Registering the domain in a personal account.",
      "Letting a domain expire because the renewal email went to an old address.",
      "Transferring a domain without copying its DNS records first.",
    ],
    tools: ["Cloudflare Registrar", "Namecheap", "GoDaddy"],
    related: ["dns-configuration", "business-email-setup", "hosting-setup", "website-migration"],
    faqs: [
      {
        q: "Who should own our domain?",
        a: "Your business, in an account the business controls, with at least two people having access. Never a single employee or outside contractor.",
      },
      {
        q: "How long does a domain transfer take?",
        a: "Usually 5 to 7 days, though some registrars release domains faster. A domain can't be transferred within 60 days of registration or a previous transfer.",
      },
      {
        q: "Will transferring our domain take our website or email offline?",
        a: "Not if it's done carefully. We copy all DNS records before the transfer so services keep working throughout.",
      },
      {
        q: "Which registrar do you recommend?",
        a: "Cloudflare Registrar for most businesses, because it charges at-cost prices and includes solid security. We work with any reputable registrar.",
      },
    ],
  },
  {
    slug: "dns-configuration",
    name: "DNS Configuration",
    category: "technical-hosting",
    shortDescription: "DNS records set up correctly for your website, email, and services, without downtime.",
    metaTitle: "DNS Configuration & Management Services | Klikcy",
    metaDescription:
      "DNS configuration for websites and email: A, CNAME, MX, SPF, DKIM, and DMARC records set up correctly, documented, and changed without downtime.",
    focusKeyword: "dns configuration",
    intro:
      "DNS tells the internet where your website and email live. When it's wrong, sites go down and emails disappear. We configure and tidy DNS so everything points where it should.",
    overview: [
      "DNS records are small but critical. A records and CNAMEs point your domain to your website host. MX records route email. TXT records verify services and authenticate your email with SPF, DKIM, and DMARC. Over time, records pile up from old providers and experiments, and nobody remembers what they're for.",
      "We review your current records, remove the ones that no longer serve a purpose, fix errors, and document what each remaining record does. For moves between providers, we lower TTLs beforehand so changes take effect quickly, then switch over at a quiet time.",
      "We usually recommend Cloudflare for DNS hosting because it's fast, reliable, free for most businesses, and adds security features.",
    ],
    signs: [
      "Your email authentication fails or emails land in spam.",
      "You're moving your website or email to a new provider.",
      "Your DNS has records nobody can explain.",
      "Your site or email went down after someone changed a setting.",
    ],
    included: [
      "DNS audit and cleanup",
      "Website and service records",
      "Email routing and authentication records",
      "Planned provider migration with low TTLs",
      "Move to Cloudflare DNS if wanted",
      "Record documentation",
    ],
    process: [
      { title: "Audit", detail: "We export current records and identify what each one does." },
      { title: "Plan", detail: "We prepare the new record set and lower TTLs ahead of changes." },
      { title: "Change", detail: "We apply changes at a low-traffic time and verify each service." },
      { title: "Document", detail: "You get a list of records and what they're for." },
    ],
    timeline: "Most DNS work takes a few days, including time for TTLs to expire.",
    costFactors: [
      "Number of domains and records",
      "Provider migration",
      "Email authentication fixes",
      "Complex setups such as multiple services or subdomains",
    ],
    pitfalls: [
      "Changing nameservers without copying every existing record.",
      "Having two SPF records, which breaks email authentication.",
      "Setting DMARC to reject before checking which services send email for you.",
    ],
    tools: ["Cloudflare", "AWS Route 53", "MXToolbox", "DMARC report tools"],
    related: ["domain-setup", "business-email-setup", "smtp-setup", "website-security"],
    faqs: [
      {
        q: "What are SPF, DKIM, and DMARC?",
        a: "Three DNS records that prove your emails really come from you. SPF lists approved senders, DKIM adds a signature, and DMARC tells receiving servers what to do when checks fail.",
      },
      {
        q: "How long do DNS changes take?",
        a: "It depends on each record's TTL. We lower TTLs before planned changes so they take effect within minutes rather than hours.",
      },
      {
        q: "Should we use Cloudflare?",
        a: "For most businesses, yes. It's fast, free at the basic level, and adds useful security and performance features.",
      },
      {
        q: "Can DNS changes break our email?",
        a: "Yes, if MX or authentication records are lost. That's why we copy and verify every record before any change.",
      },
    ],
  },
  {
    slug: "business-email-setup",
    name: "Business Email Setup",
    category: "technical-hosting",
    shortDescription: "Google Workspace or Microsoft 365 set up with proper authentication and a smooth migration.",
    metaTitle: "Business Email Setup | Workspace & Microsoft 365 | Klikcy",
    metaDescription:
      "Business email setup with Google Workspace or Microsoft 365: accounts, migration, SPF, DKIM, and DMARC, shared inboxes, and device setup for your team.",
    focusKeyword: "business email setup",
    intro:
      "We set up professional email on your own domain with Google Workspace or Microsoft 365, migrate old mail, and configure it so messages reach inboxes.",
    overview: [
      "An email address on your own domain looks more trustworthy than a free Gmail or Yahoo address, and it means your business owns the mailboxes, not individual employees. Google Workspace and Microsoft 365 are the two main options, and both work well. The right one depends mostly on which apps your team already uses.",
      "Setup involves more than creating accounts. We configure domain authentication (SPF, DKIM, and DMARC), so your emails are trusted, set up shared inboxes and aliases like info@ and support@, migrate existing mail and contacts, and help your team connect phones and computers.",
      "We also set sensible security defaults: two-factor login for everyone and admin access limited to the people who need it.",
    ],
    signs: [
      "Your business uses free email addresses.",
      "You're moving between email providers.",
      "Your emails are marked as spam by clients.",
      "Former employees still have access to company email.",
    ],
    included: [
      "Workspace or Microsoft 365 recommendation and setup",
      "User accounts, aliases, and shared inboxes",
      "SPF, DKIM, and DMARC configuration",
      "Mail, calendar, and contact migration",
      "Two-factor login and admin security",
      "Device setup help for your team",
    ],
    process: [
      { title: "Plan", detail: "We choose the platform and list users, aliases, and shared inboxes." },
      { title: "Configure", detail: "Accounts, authentication, and security settings set up." },
      { title: "Migrate", detail: "Existing mail and contacts moved, then MX records switched." },
      { title: "Support", detail: "We help your team connect devices and handle any issues in the first days." },
    ],
    timeline: "Most email setups take 1 to 2 weeks, depending on migration size.",
    costFactors: [
      "Number of users",
      "Mailbox migration size",
      "Shared inboxes and complex routing",
      "On-site or remote device support",
    ],
    pitfalls: [
      "Switching MX records before migration is ready, so mail goes missing.",
      "Skipping DKIM, which hurts deliverability.",
      "Not removing access when employees leave.",
    ],
    tools: ["Google Workspace", "Microsoft 365", "Migration tools", "Cloudflare DNS"],
    related: ["dns-configuration", "smtp-setup", "domain-setup", "email-marketing-setup"],
    faqs: [
      {
        q: "Google Workspace or Microsoft 365?",
        a: "Google Workspace if your team prefers Gmail and Google Docs. Microsoft 365 if you rely on Outlook, Word, and Excel. Both handle business email well.",
      },
      {
        q: "Will we lose emails during the migration?",
        a: "No, when it's planned properly. We migrate existing mail first, then switch email routing, and keep the old account available briefly as a safety net.",
      },
      {
        q: "What are shared inboxes?",
        a: "Addresses like info@ or support@ that several people can read and reply from, without sharing one password.",
      },
      {
        q: "How do we make sure our emails don't go to spam?",
        a: "Proper SPF, DKIM, and DMARC records are the foundation. We set and test all three.",
      },
    ],
  },
  {
    slug: "smtp-setup",
    name: "SMTP Setup",
    category: "technical-hosting",
    shortDescription: "Reliable delivery for the emails your website and apps send: receipts, resets, and notifications.",
    metaTitle: "SMTP & Transactional Email Setup | Klikcy",
    metaDescription:
      "SMTP and transactional email setup with Postmark, SendGrid, Amazon SES, or Resend, so password resets, receipts, and form notifications reach the inbox.",
    focusKeyword: "smtp setup",
    intro:
      "Password resets, order receipts, and contact form notifications need to arrive every time. We set up a proper sending service so they do.",
    overview: [
      "Websites and apps often send email directly from their web server. Those emails frequently land in spam or vanish, because the server isn't authenticated to send for your domain. Customers don't get their receipts, and form submissions never reach you.",
      "We set up a dedicated transactional email provider, such as Postmark, Amazon SES, SendGrid, or Resend, authenticate it on your domain, and connect your website, store, or app to it. Bounces and complaints are handled automatically, and you get logs showing what was sent and whether it was delivered.",
      "We keep transactional email separate from marketing email, often on a subdomain, so a marketing campaign that annoys people can't hurt delivery of your password resets.",
    ],
    signs: [
      "Contact form notifications don't arrive reliably.",
      "Customers say receipts or password resets go to spam.",
      "Your app sends email straight from the web server.",
      "You have no record of which emails were delivered.",
    ],
    included: [
      "Provider recommendation and account setup",
      "Domain authentication for sending",
      "Website, store, or app integration",
      "Bounce and complaint handling",
      "Branded email templates",
      "Delivery logs and alerts",
    ],
    process: [
      { title: "Review", detail: "We identify every email your systems send and how they send it today." },
      { title: "Set up", detail: "Provider account, domain authentication, and templates." },
      { title: "Integrate", detail: "Your site or app connected and tested for each email type." },
      { title: "Monitor", detail: "Delivery logs and alerts for bounces or failures." },
    ],
    timeline: "Most SMTP setups take a few days to a week.",
    costFactors: [
      "Number of systems sending email",
      "Template design",
      "Email volume (which affects provider cost)",
      "Webhook handling in custom apps",
    ],
    pitfalls: [
      "Sending transactional and marketing email from the same domain and provider.",
      "Ignoring bounce notifications.",
      "Using a personal Gmail account as the site's SMTP sender.",
    ],
    tools: ["Postmark", "Amazon SES", "SendGrid", "Resend", "WP Mail SMTP for WordPress"],
    related: ["business-email-setup", "email-marketing-setup", "dns-configuration", "api-development"],
    faqs: [
      {
        q: "Which transactional email provider is best?",
        a: "Postmark for the best deliverability on critical email, Amazon SES for low cost at high volume, Resend for developer-friendly setups, and SendGrid when you need both transactional and marketing features.",
      },
      {
        q: "Why aren't our WordPress form emails arriving?",
        a: "WordPress sends email through your web server by default, which usually isn't authenticated. Connecting it to a proper SMTP service fixes this in most cases.",
      },
      {
        q: "Should transactional email use a subdomain?",
        a: "Often, yes, such as mail.yourdomain.com. It separates its reputation from marketing email.",
      },
      {
        q: "Can we see whether an email was delivered?",
        a: "Yes. Transactional providers keep logs of every message, including delivery, opens where tracked, and bounces.",
      },
    ],
  },
  {
    slug: "website-migration",
    name: "Website Migration",
    category: "technical-hosting",
    shortDescription: "Move to a new platform or host without losing rankings, content, or uptime.",
    metaTitle: "Website Migration Services (SEO-Safe) | Klikcy",
    metaDescription:
      "SEO-safe website migrations between platforms and hosts: URL mapping, 301 redirects, content transfer, DNS planning, and post-launch monitoring.",
    focusKeyword: "website migration services",
    intro:
      "Moving to a new platform or host is one of the riskiest things a website goes through. We plan it so your content, rankings, and email all make it across.",
    overview: [
      "A migration changes the plumbing: a new CMS, a new host, a new domain, or all three. Even when the design stays the same, small details can do real damage, like URLs that change shape, missing redirects, lost meta data, images left behind, or a robots setting copied from staging that tells Google not to index the new site.",
      "Every migration we run starts with a full crawl of the current site and an export of its search performance. Each URL gets mapped to its new location. Content, metadata, images, and structured data are moved and checked. DNS changes are planned with low TTLs so the switch is quick, and email is left untouched unless it's moving too.",
      "After launch we re-crawl the old URL list to confirm every redirect works, monitor Search Console for errors, and compare traffic and rankings against the pre-migration baseline in the weeks that follow.",
    ],
    signs: [
      "You're leaving Wix, Squarespace, Webflow, or an old CMS.",
      "Your host is slow, unreliable, or expensive.",
      "You're changing domain names after a rebrand.",
      "You're merging several websites into one.",
    ],
    included: [
      "Pre-migration crawl and performance baseline",
      "URL mapping and 301 redirect plan",
      "Content, metadata, and media transfer",
      "Staging review before launch",
      "DNS and launch coordination",
      "Post-launch redirect checks and ranking comparison",
    ],
    process: [
      { title: "Baseline", detail: "We crawl the site and record traffic, rankings, and backlinks per URL." },
      { title: "Map", detail: "Every old URL gets a new destination and redirect rule." },
      { title: "Move and test", detail: "Content transferred to staging and checked page by page." },
      { title: "Launch and monitor", detail: "Planned switchover, redirect verification, and ranking checks against the baseline." },
    ],
    timeline: "Most migrations take 4 to 10 weeks, depending on site size and platforms.",
    costFactors: [
      "Number of pages and content types",
      "Source and destination platforms",
      "Domain change involved",
      "Design changes alongside the migration",
    ],
    pitfalls: [
      "Launching with the staging site's 'noindex' setting still on.",
      "Redirecting every old URL to the homepage instead of the matching page.",
      "Changing domain, platform, and design all at once without a clear baseline.",
    ],
    tools: ["Screaming Frog", "Google Search Console", "Ahrefs or Semrush", "Platform import tools", "Cloudflare"],
    related: ["website-redesign", "technical-seo", "hosting-setup", "dns-configuration"],
    faqs: [
      {
        q: "Will we lose Google rankings when we migrate?",
        a: "A short period of fluctuation is common. With complete one-to-one redirects and preserved content, rankings usually recover within a few weeks. Big drops almost always trace back to missing redirects or lost content.",
      },
      {
        q: "Will there be downtime?",
        a: "Usually none, or only a few minutes. We prepare everything on staging and plan DNS changes so the switch is fast.",
      },
      {
        q: "Which platforms can you migrate between?",
        a: "Most of them, including WordPress, Shopify, Wix, Squarespace, Webflow, WooCommerce, Magento, and custom sites, into WordPress, Shopify, or Next.js.",
      },
      {
        q: "What's the difference between a migration and a redesign?",
        a: "A migration moves your site to a new platform, host, or domain. A redesign changes how it looks and is structured. They can happen together, but doing them separately makes problems easier to spot.",
      },
    ],
  },
  {
    slug: "website-security",
    name: "Website Security",
    category: "technical-hosting",
    shortDescription: "Hardening, firewalls, monitoring, and malware cleanup for business websites.",
    metaTitle: "Website Security & Malware Removal Services | Klikcy",
    metaDescription:
      "Website security for WordPress, Shopify, and custom sites: hardening, firewall setup, two-factor login, monitoring, and fast malware cleanup if you're hacked.",
    focusKeyword: "website security services",
    intro:
      "Most website attacks are automated and aimed at known weaknesses: outdated plugins, weak passwords, and missing updates. We close those gaps and watch for the rest.",
    overview: [
      "Small business sites get attacked not because someone chose them, but because bots scan the whole internet for easy targets. A hacked site can redirect visitors to scams, send spam from your domain, get flagged by Google with a warning screen, and expose customer data.",
      "Our security work covers the basics that stop most attacks: up-to-date software, removal of unused plugins and accounts, two-factor login for every admin, least-privilege access, a web application firewall in front of the site, and off-site backups. We add monitoring for file changes, uptime, and blocklist status.",
      "If your site has already been hacked, we clean it, find out how the attacker got in, close that door, and request removal from Google's and browsers' warning lists.",
    ],
    signs: [
      "Your site has been hacked before, or shows signs of it now.",
      "Google or your browser shows a security warning on your site.",
      "Plugins and software haven't been updated in months.",
      "Many people share the same admin login.",
    ],
    included: [
      "Security audit",
      "Software updates and removal of unused components",
      "Two-factor login and access review",
      "Web application firewall setup",
      "File integrity and blocklist monitoring",
      "Malware cleanup and incident response when needed",
    ],
    process: [
      { title: "Audit", detail: "We check software versions, users, permissions, hosting, and existing defenses." },
      { title: "Harden", detail: "Updates, access cleanup, firewall rules, and secure settings." },
      { title: "Monitor", detail: "Alerts for file changes, downtime, and blocklisting." },
      { title: "Respond", detail: "If something happens, we contain, clean, and close the entry point." },
    ],
    timeline: "Hardening usually takes 1 to 2 weeks. If a site is already infected, cleanup is handled as urgent work and scheduled first.",
    costFactors: [
      "Platform and number of plugins",
      "Current condition of the site",
      "Active infection versus prevention",
      "Ongoing monitoring",
    ],
    pitfalls: [
      "Cleaning malware without finding how the attacker got in.",
      "Shared admin logins with no two-factor authentication.",
      "Backups stored on the same server that was compromised.",
    ],
    tools: ["Cloudflare WAF", "Wordfence or Patchstack for WordPress", "Sucuri SiteCheck", "Google Search Console security reports"],
    related: ["website-maintenance", "website-backup-setup", "hosting-setup", "performance-monitoring"],
    faqs: [
      {
        q: "How do I know if my website has been hacked?",
        a: "Common signs include Google security warnings, redirects to unfamiliar sites, new admin users you didn't create, unexpected pages in search results, and complaints about spam from your domain.",
      },
      {
        q: "Can you fix a hacked WordPress site?",
        a: "Yes. We remove the malware, patch the vulnerability that let it in, reset credentials, and request removal from Google's warning lists.",
      },
      {
        q: "Is Shopify more secure than WordPress?",
        a: "Shopify handles server security for you, which removes a lot of risk. You still need strong passwords, two-factor login, and careful choice of apps.",
      },
      {
        q: "Do we need a firewall?",
        a: "A web application firewall blocks a large share of automated attacks before they reach your site. Cloudflare offers one at a low cost.",
      },
    ],
  },
  {
    slug: "website-backup-setup",
    name: "Website Backup Setup",
    category: "technical-hosting",
    shortDescription: "Automatic off-site backups, and restores we've actually tested.",
    metaTitle: "Website Backup Setup & Restore Testing | Klikcy",
    metaDescription:
      "Website backup setup: automatic, versioned, off-site backups for WordPress, WooCommerce, and custom sites, with regular test restores so recovery really works.",
    focusKeyword: "website backup setup",
    intro:
      "A backup only matters if it can be restored. We set up automatic, off-site backups and test restoring them, so you know recovery will work when you need it.",
    overview: [
      "Most businesses assume their host backs up their site. Sometimes it does, often only for a few days, stored on the same infrastructure, and with no guarantee it restores cleanly. When a site is hacked, an update goes wrong, or someone deletes the wrong page, that assumption gets tested.",
      "We set up backups that run automatically, keep multiple versions going back weeks or months, and store copies off-site in cloud storage your business controls. Databases and files are both covered. Online stores get more frequent database backups, because orders change constantly.",
      "Then we test a restore to a staging environment and write down the steps, so anyone on your team or ours can recover the site quickly.",
    ],
    signs: [
      "You don't know where your site's backups are or how old they are.",
      "Your only backups are on the same server as the site.",
      "You've never tried restoring a backup.",
      "You run an online store where lost orders would be a problem.",
    ],
    included: [
      "Backup schedule for files and databases",
      "Off-site, versioned cloud storage",
      "Retention policy for your risk level",
      "Test restore to staging",
      "Written recovery steps",
      "Alerts if a backup fails",
    ],
    process: [
      { title: "Assess", detail: "We check what's backed up today, how often, and where." },
      { title: "Configure", detail: "Automated backups to off-site storage on a sensible schedule." },
      { title: "Test", detail: "We restore to a staging site and confirm it works." },
      { title: "Document", detail: "Clear recovery steps and failure alerts." },
    ],
    timeline: "Most backup setups take a few days, including a test restore.",
    costFactors: [
      "Site size and database size",
      "Backup frequency",
      "Retention period",
      "Number of sites",
    ],
    pitfalls: [
      "Keeping backups only on the same server.",
      "Backing up files but not the database, or the other way round.",
      "Never testing a restore.",
    ],
    tools: ["Cloud storage such as Amazon S3 or Backblaze B2", "BlogVault or UpdraftPlus for WordPress", "Host snapshot tools", "Database dump scripts"],
    related: ["website-security", "website-maintenance", "hosting-setup", "performance-monitoring"],
    faqs: [
      {
        q: "How often should we back up our website?",
        a: "Daily for most business sites. Online stores and sites with frequent changes benefit from more frequent database backups.",
      },
      {
        q: "Doesn't our host already back up our site?",
        a: "Many do, but often only for a short period, stored alongside your site, and without restore testing. We add independent, off-site backups you control.",
      },
      {
        q: "How long should backups be kept?",
        a: "At least 30 days for most sites, so problems discovered late can still be undone. Some businesses keep monthly copies for a year.",
      },
      {
        q: "Can you back up Shopify stores?",
        a: "Shopify runs the platform, but your products, customers, and theme can still be lost through mistakes or bad apps. Backup apps and regular exports cover that.",
      },
    ],
  },
  {
    slug: "hosting-setup",
    name: "Hosting Setup",
    category: "technical-hosting",
    shortDescription: "The right hosting for your site, configured for speed and security, without overpaying.",
    metaTitle: "Website Hosting Setup & Configuration | Klikcy",
    metaDescription:
      "Hosting setup for WordPress, Next.js, and custom sites: choosing the right host, SSL, CDN, caching, and security, configured for speed without overpaying.",
    focusKeyword: "hosting setup",
    intro:
      "Hosting affects how fast your site loads, how often it goes down, and how secure it is. We pick a host that fits your site and set it up properly.",
    overview: [
      "Cheap shared hosting is the most common reason we see for slow, unreliable small business sites. Your site shares a server with hundreds of others, and when one gets busy or hacked, everyone suffers. The opposite mistake is also common: paying for enterprise infrastructure a small site doesn't need.",
      "We match hosting to the site. Managed WordPress hosts like Kinsta or WP Engine for WordPress sites, Vercel for Next.js, a managed cloud platform for custom apps. Then we configure it: SSL, a CDN for faster delivery across the U.S., caching, PHP or Node versions, staging environments, and security settings.",
      "Accounts are set up in your company's name, with billing and access you control.",
    ],
    signs: [
      "Your site is slow even after optimizing images and plugins.",
      "Your site goes down during busy periods.",
      "You're on cheap shared hosting or don't know where your site is hosted.",
      "Your hosting bill seems high for what you get.",
    ],
    included: [
      "Hosting recommendation based on your site and budget",
      "Account setup in your company's name",
      "SSL certificate and HTTPS redirects",
      "CDN and caching configuration",
      "Staging environment",
      "Security and access settings",
    ],
    process: [
      { title: "Assess", detail: "We review your site's platform, traffic, and requirements." },
      { title: "Recommend", detail: "We suggest a host and plan, with the reasons and the cost." },
      { title: "Configure", detail: "Account, SSL, CDN, caching, and staging set up." },
      { title: "Move", detail: "If you're switching, we migrate the site with minimal downtime." },
    ],
    timeline: "Most hosting setups take a few days to two weeks, including migration.",
    costFactors: [
      "Platform and traffic level",
      "Migration from an existing host",
      "Number of environments (staging, production)",
      "Custom server configuration",
    ],
    pitfalls: [
      "Choosing hosting purely on price.",
      "Hosting accounts owned by a contractor.",
      "No staging environment, so changes are tested on the live site.",
    ],
    tools: ["Vercel", "Kinsta", "WP Engine", "Cloudways", "AWS", "Cloudflare CDN"],
    related: ["website-migration", "performance-monitoring", "dns-configuration", "website-security"],
    faqs: [
      {
        q: "What's the best hosting for WordPress?",
        a: "Managed WordPress hosts like Kinsta, WP Engine, or Cloudways for most business sites. They handle caching, backups, and security in ways shared hosting doesn't.",
      },
      {
        q: "Where should a Next.js site be hosted?",
        a: "Vercel is the default because it's built by the Next.js team. AWS or a Node server makes sense for specific cost or compliance needs.",
      },
      {
        q: "Do we need a CDN?",
        a: "For most sites, yes. A CDN serves your files from locations close to each visitor, which speeds up loading across the country. Cloudflare's free plan covers many sites.",
      },
      {
        q: "Will changing hosts cause downtime?",
        a: "Usually no more than a few minutes, if any. We copy the site first, test it, then switch DNS.",
      },
    ],
  },
  {
    slug: "performance-monitoring",
    name: "Performance Monitoring",
    category: "technical-hosting",
    shortDescription: "Uptime, errors, and real-visitor speed watched around the clock, with alerts that matter.",
    metaTitle: "Website Performance & Uptime Monitoring | Klikcy",
    metaDescription:
      "Uptime checks, error tracking, and real-user Core Web Vitals monitoring, with alerts by email, Slack, or SMS so problems get fixed before customers notice.",
    focusKeyword: "performance monitoring",
    intro:
      "We set up monitoring that tells you when your site is down, throwing errors, or getting slower, ideally before a customer tells you.",
    overview: [
      "Without monitoring, you find out about problems when a customer complains or sales drop. By then, the issue may have been happening for hours or days. Monitoring turns that into an alert within minutes.",
      "We cover three layers. Uptime checks from several locations confirm the site responds. Error tracking captures problems in the browser and on the server, with enough detail to fix them. Real-user monitoring measures how fast pages load for actual visitors, so slowdowns get noticed before they affect search rankings.",
      "Alerts are tuned so they mean something. Too many false alarms and people start ignoring them, so we route alerts by severity to the right person through email, Slack, or SMS.",
    ],
    signs: [
      "You've found out about outages from customers.",
      "Errors happen on your site but nobody sees them.",
      "Your site feels slower lately and you can't tell why.",
      "You run a store or app where downtime costs money.",
    ],
    included: [
      "Multi-location uptime checks",
      "SSL and domain expiry alerts",
      "Front-end and server error tracking",
      "Real-user Core Web Vitals monitoring",
      "Alert routing by severity",
      "Status dashboard",
    ],
    process: [
      { title: "Identify", detail: "We list the pages, functions, and services that matter most." },
      { title: "Instrument", detail: "Monitoring tools set up across uptime, errors, and performance." },
      { title: "Tune", detail: "Alert thresholds adjusted so alerts are rare and meaningful." },
      { title: "Review", detail: "A monthly look at trends, recurring errors, and slowdowns." },
    ],
    timeline: "Most monitoring setups take 2 to 5 days.",
    costFactors: [
      "Number of sites, apps, and services",
      "Monitoring tool subscriptions",
      "Alerting channels and on-call needs",
      "Custom health checks",
    ],
    pitfalls: [
      "Only checking that the homepage loads, while checkout is broken.",
      "Alerts so noisy that everyone ignores them.",
      "Forgetting SSL certificate and domain expiry checks.",
    ],
    tools: ["Better Stack", "Sentry", "Vercel Speed Insights", "Cloudflare analytics", "PagerDuty"],
    related: ["website-maintenance", "website-security", "hosting-setup", "website-speed-optimization"],
    faqs: [
      {
        q: "What's the difference between uptime and performance monitoring?",
        a: "Uptime monitoring checks whether your site responds at all. Performance monitoring measures how fast it loads and how it behaves for real visitors.",
      },
      {
        q: "How quickly will we know about an outage?",
        a: "Typically within a minute or two, depending on check frequency.",
      },
      {
        q: "Can monitoring check more than the homepage?",
        a: "Yes. We can monitor key pages and flows, like login, search, or checkout, so a broken function triggers an alert even when the homepage looks fine.",
      },
      {
        q: "Who receives the alerts?",
        a: "Whoever you choose: your team, us, or both. Alerts can go to email, Slack, SMS, or an on-call tool.",
      },
    ],
  },
];
