import type { CategorySlug } from "@/lib/categories";
import type { CityRef } from "@/lib/cities";
import { getCitiesForState } from "@/lib/cities";
import { getCityTierLabel, type CityTier } from "@/lib/city-tiers";
import { pickVariant, pickVariantIndices } from "@/lib/content-variants";
import type { GeoFaq } from "@/lib/geo-aeo-content";
import { getRelatedServices, services, type Service } from "@/lib/services";
import { getVerticalProfile } from "@/lib/metadata/positioning";

export type ServiceCityContentContext = {
  service: Service;
  city: CityRef;
  tier: CityTier;
};

function seed(service: Service, city: CityRef, suffix: string): string {
  return `${service.slug}-${city.state.slug}-${city.slug}-${suffix}`;
}

function loc(city: CityRef): string {
  return `${city.name}, ${city.state.abbr}`;
}

const INTRO_BUILDERS: Record<
  CategorySlug,
  ((ctx: ServiceCityContentContext) => string)[]
> = {
  "web-development": [
    (c) =>
      `For ${loc(c.city)} operators, ${c.service.name.toLowerCase()} is less about a pretty homepage and more about a fast, crawlable foundation that turns search traffic into booked calls. Klikcy scopes builds around how buyers in ${c.city.name} research vendors before they ever fill out a form.`,
    (c) =>
      `Companies in ${c.city.name} rarely need another template — they need ${c.service.focusKeyword} that loads quickly on mobile and supports local SEO without doorway-page shortcuts. Klikcy delivers remotely with milestones your ${c.city.state.abbr} team can track.`,
    (c) =>
      `If your ${c.city.name} site feels dated or slow, ${c.service.name.toLowerCase()} should fix Core Web Vitals and conversion paths in the same engagement — not as a phase-two upsell. Klikcy engineers ${c.service.focusKeyword} for measurable pipeline, not vanity launches.`,
    (c) =>
      `Growing ${c.city.name} brands often outgrow DIY builders right when organic demand picks up. Klikcy's ${c.service.name.toLowerCase()} pairs clean IA with schema and analytics so ${c.city.state.name} campaigns have a site that can scale.`,
    (c) =>
      `Budget-conscious ${c.city.name} teams ask what ${c.service.name.toLowerCase()} should cost versus what it returns. Klikcy quotes fixed scope after discovery — with performance, accessibility, and SEO baked in from week one.`,
    (c) =>
      `Compared with hiring a single freelancer, ${c.service.name.toLowerCase()} with Klikcy gives ${c.city.name} businesses design, engineering, and search readiness in one remote team — aligned to how ${c.city.state.abbr} buyers compare options online.`,
  ],
  "seo-aeo": [
    (c) =>
      `${c.city.name} search markets are competitive — ${c.service.name.toLowerCase()} should tighten crawl paths, internal links, and entity signals so Google and AI answer engines trust your pages. Klikcy audits before we recommend tactics.`,
    (c) =>
      `When ${c.city.name} leads stall, the issue is often indexation or thin templates — not effort. Klikcy's ${c.service.focusKeyword} rebuilds the technical layer so content in ${c.city.state.name} can rank and get cited.`,
    (c) =>
      `Local visibility in ${loc(c.city)} depends on consistent NAP, schema, and helpful copy — not keyword stuffing. Klikcy delivers ${c.service.name.toLowerCase()} with honest nationwide positioning (no fake local offices).`,
    (c) =>
      `Answer-engine traffic is rising for ${c.city.name} queries. ${c.service.name} from Klikcy structures FAQs, metadata, and page depth so both traditional SERPs and AI summaries can quote you accurately.`,
    (c) =>
      `Speed matters for SEO in ${c.city.state.abbr}: slow pages bleed rankings and conversions. Klikcy ties ${c.service.focusKeyword} to Core Web Vitals fixes and content architecture your team can maintain.`,
    (c) =>
      `Rather than chasing every keyword, ${c.city.name} operators need ${c.service.name.toLowerCase()} focused on pages that drive revenue. Klikcy prioritizes crawl budget, canonicals, and internal linking across your ${c.city.state.name} footprint.`,
  ],
  "ai-automation": [
    (c) =>
      `${c.city.name} teams lose hours to manual follow-ups and spreadsheet handoffs. Klikcy's ${c.service.name.toLowerCase()} maps workflows around how your ${c.city.state.abbr} staff already works — then automates the repetitive steps.`,
    (c) =>
      `AI projects fail when they skip process design. For ${loc(c.city)}, Klikcy scopes ${c.service.focusKeyword} with clear inputs, guardrails, and human review before anything touches customer data.`,
    (c) =>
      `If response time is hurting ${c.city.name} sales, ${c.service.name.toLowerCase()} can route leads, draft replies, and sync CRM fields without replacing your team. Klikcy builds automations you can audit.`,
    (c) =>
      `Scaling in ${c.city.state.name} often means doing more with the same headcount. Klikcy delivers ${c.service.name.toLowerCase()} that connects chat, email, and ops tools — remote-first, no on-site visit required.`,
    (c) =>
      `Compliance-conscious ${c.city.name} operators ask where data goes. Klikcy's ${c.service.focusKeyword} documents integrations, retention, and fallbacks so automation stays trustworthy.`,
    (c) =>
      `Compared with off-the-shelf bots, custom ${c.service.name.toLowerCase()} for ${c.city.name} businesses reflects your offer, tone, and escalation rules — Klikcy implements and iterates in measured phases.`,
  ],
  "app-software": [
    (c) =>
      `${c.city.name} products outgrow spreadsheets when workflows get bespoke. Klikcy's ${c.service.name.toLowerCase()} ships maintainable code, auth, and APIs your ${c.city.state.abbr} team can extend.`,
    (c) =>
      `Founders in ${loc(c.city)} need ${c.service.focusKeyword} that de-risks scope — MVPs with real analytics, not throwaway prototypes. Klikcy milestones align engineering to business outcomes.`,
    (c) =>
      `Legacy tools slow ${c.city.name} operators down. Klikcy modernizes with ${c.service.name.toLowerCase()} that prioritizes performance, role-based access, and integrations your stack already uses.`,
    (c) =>
      `Mobile expectations in ${c.city.state.name} are table stakes. Klikcy delivers ${c.service.name.toLowerCase()} with responsive UX, observability, and deployment practices suited to regulated or high-traffic use cases.`,
    (c) =>
      `Hiring a full in-house squad in ${c.city.name} is expensive. Klikcy provides senior ${c.service.focusKeyword} remotely — discovery, design systems, and production releases in one engagement.`,
    (c) =>
      `Speed-to-market matters for ${c.city.name} SaaS and internal tools alike. Klikcy's ${c.service.name.toLowerCase()} balances speed with test coverage and documentation your future team will thank you for.`,
  ],
  ecommerce: [
    (c) =>
      `${c.city.name} merchants need ${c.service.name.toLowerCase()} that protects margin — fast PDPs, clean checkout, and SEO that surfaces collections buyers actually search for in ${c.city.state.abbr}.`,
    (c) =>
      `Cart abandonment in ${loc(c.city)} is often a UX and speed problem, not price alone. Klikcy's ${c.service.focusKeyword} optimizes theme code, apps, and measurement.`,
    (c) =>
      `Seasonal spikes stress ${c.city.name} stores. Klikcy implements ${c.service.name.toLowerCase()} with caching, inventory sync, and payment flows tested before peak weeks.`,
    (c) =>
      `Migrating platforms is risky for ${c.city.state.name} brands. Klikcy handles ${c.service.name.toLowerCase()} with redirect maps and SEO preservation so rankings do not tank at launch.`,
    (c) =>
      `DTC teams in ${c.city.name} want creative freedom without breaking checkout. Klikcy's ${c.service.focusKeyword} keeps merchandising flexible while Core Web Vitals stay green.`,
    (c) =>
      `Marketplace and B2B commerce in ${c.city.name} need integrations — ERP, 3PL, tax. Klikcy scopes ${c.service.name.toLowerCase()} around the connectors your ops team already relies on.`,
  ],
  "branding-design": [
    (c) =>
      `${c.city.name} buyers judge credibility in seconds. Klikcy's ${c.service.name.toLowerCase()} aligns visual systems with conversion paths — not just mood boards that never ship.`,
    (c) =>
      `Rebrands in ${loc(c.city)} fail when UX is an afterthought. Klikcy pairs ${c.service.focusKeyword} with component libraries your marketing and product teams can reuse.`,
    (c) =>
      `Local competition in ${c.city.state.name} is visual as well as functional. Klikcy delivers ${c.service.name.toLowerCase()} that differentiates without sacrificing accessibility or load time.`,
    (c) =>
      `Stakeholders in ${c.city.name} need design decisions tied to metrics. Klikcy's ${c.service.name.toLowerCase()} includes research, prototypes, and handoff specs engineers can implement.`,
    (c) =>
      `Consistency across ads, site, and sales decks matters for ${c.city.name} B2B brands. Klikcy's ${c.service.focusKeyword} documents tokens, type, and layout rules for long-term use.`,
    (c) =>
      `Rather than endless revision cycles, ${c.city.name} teams get structured critique and phased delivery with Klikcy — ${c.service.name.toLowerCase()} that moves from concept to live UI.`,
  ],
  "marketing-growth": [
    (c) =>
      `${c.city.name} funnels leak when analytics and creative are disconnected. Klikcy's ${c.service.name.toLowerCase()} wires tracking, tests, and landing experiences your ${c.city.state.abbr} team can read.`,
    (c) =>
      `Growth in ${loc(c.city)} needs baselines before experiments. Klikcy's ${c.service.focusKeyword} audits events, forms, and offers — then prioritizes tests with clear success metrics.`,
    (c) =>
      `Paid and organic channels compete in ${c.city.name}. Klikcy aligns ${c.service.name.toLowerCase()} with SEO and CRO so spend and content reinforce each other.`,
    (c) =>
      `Founders in ${c.city.state.name} want predictable pipeline. Klikcy delivers ${c.service.name.toLowerCase()} with reporting dashboards and iteration cadences — remote-first delivery.`,
    (c) =>
      `Content without distribution underperforms for ${c.city.name} brands. Klikcy's ${c.service.focusKeyword} connects strategy, assets, and measurement in one system.`,
    (c) =>
      `Compared with siloed vendors, Klikcy gives ${c.city.name} operators ${c.service.name.toLowerCase()} adjacent to web and SEO work — fewer handoffs, faster learning loops.`,
  ],
  "technical-hosting": [
    (c) =>
      `Downtime and deliverability issues cost ${c.city.name} businesses real revenue. Klikcy's ${c.service.name.toLowerCase()} hardens DNS, mail, and hosting with runbooks your team can follow.`,
    (c) =>
      `Migrations make ${loc(c.city)} teams nervous — rightly so. Klikcy plans ${c.service.focusKeyword} with staged cutovers, rollback paths, and post-launch monitoring.`,
    (c) =>
      `Security basics are often skipped until something breaks in ${c.city.state.abbr}. Klikcy implements ${c.service.name.toLowerCase()} with backups, TLS, and access controls appropriate to your stack.`,
    (c) =>
      `Email landing in spam hurts ${c.city.name} sales teams. Klikcy's ${c.service.name.toLowerCase()} configures SPF, DKIM, and SMTP with testing before you announce a new domain.`,
    (c) =>
      `Infrastructure work should be boring in the best way. Klikcy delivers ${c.service.focusKeyword} for ${c.city.name} operators who need reliability without hiring a full-time DevOps bench.`,
    (c) =>
      `Performance monitoring only helps when alerts are actionable. Klikcy sets up ${c.service.name.toLowerCase()} with thresholds and documentation tuned to ${c.city.state.name} business hours.`,
  ],
};

const BENEFITS_BUILDERS: Record<
  CategorySlug,
  ((ctx: ServiceCityContentContext) => { heading: string; bullets: string[] })[]
> = {
  "web-development": [
    (c) => ({
      heading: `Why ${c.city.name} teams choose Klikcy for ${c.service.name.toLowerCase()}`,
      bullets: [
        `Performance budgets enforced before launch — critical for ${c.city.state.abbr} mobile traffic.`,
        `Schema, sitemaps, and canonical strategy included — not a post-launch add-on.`,
        `Editor-friendly CMS or component systems your ${c.city.name} staff can update.`,
        `Accessibility and Core Web Vitals checks on every milestone.`,
      ],
    }),
    (c) => ({
      heading: `Outcomes ${c.service.name} should deliver in ${c.city.name}`,
      bullets: [
        `Faster pages that keep ${c.city.state.name} visitors engaged through the funnel.`,
        `Clear service architecture that supports local and national SEO.`,
        `Analytics and Search Console configured for ${c.city.name} campaigns.`,
        `Launch QA with redirect maps when replacing an existing site.`,
      ],
    }),
    (c) => ({
      heading: `How Klikcy de-risks ${c.service.focusKeyword} in ${c.city.state.abbr}`,
      bullets: [
        `Fixed scope after discovery — no open-ended hourly surprises.`,
        `Design reviews async-friendly for distributed ${c.city.name} teams.`,
        `Technical SEO embedded in templates, not bolted on later.`,
        `Documentation and training so you are not locked in.`,
      ],
    }),
    (c) => ({
      heading: `What changes after launch in ${loc(c.city)}`,
      bullets: [
        `Measurable form and call tracking tied to ${c.city.name} landing pages.`,
        `Maintainable codebase for future feature work.`,
        `Improved crawl efficiency for programmatic and core pages.`,
        `Support options for updates, speed, and security post-launch.`,
      ],
    }),
    (c) => ({
      heading: `Process advantages for ${c.city.name} businesses`,
      bullets: [
        `Discovery workshops focused on buyer journeys in ${c.city.state.name}.`,
        `Wireframes before visual design to align stakeholders early.`,
        `Staging environments for ${c.city.name} team review before go-live.`,
        `Post-launch tuning window for CRO and SEO iterations.`,
      ],
    }),
    (c) => ({
      heading: `Built for ${getCityTierLabel(c.tier)} expectations`,
      bullets: [
        `Competitive ${c.city.name} markets demand sub-3s LCP on key templates.`,
        `Internal linking patterns that help crawlers discover service pages.`,
        `Component reuse to keep future ${c.service.name.toLowerCase()} work affordable.`,
        `Honest remote positioning — no fake ${c.city.name} street addresses.`,
      ],
    }),
  ],
  "seo-aeo": [
    (c) => ({
      heading: `SEO impact Klikcy targets for ${c.city.name}`,
      bullets: [
        `Indexation fixes for ${c.city.state.abbr} templates that never ranked.`,
        `FAQ and entity coverage for AI answer engines.`,
        `Internal links that distribute authority across ${c.city.state.name}.`,
        `Reporting tied to leads — not vanity keyword counts.`,
      ],
    }),
    (c) => ({
      heading: `Technical wins for ${loc(c.city)}`,
      bullets: [
        `Crawl budget optimization on large programmatic sets.`,
        `Canonical and hreflang hygiene for multi-location brands.`,
        `Structured data validated against Google rich-result rules.`,
        `Core Web Vitals remediation on revenue pages.`,
      ],
    }),
    (c) => ({
      heading: `Content system for ${c.city.name} growth`,
      bullets: [
        `Editorial calendars aligned to ${c.city.state.name} seasonality.`,
        `Page templates that vary meaningfully — not doorway swaps.`,
        `Local context without false office claims.`,
        `Ongoing audits with prioritized fix lists.`,
      ],
    }),
    (c) => ({
      heading: `Why ${c.service.name} compounds in ${c.city.state.abbr}`,
      bullets: [
        `Fixes stack — technical work unlocks content performance.`,
        `Answer-engine snippets require consistent FAQ copy.`,
        `Analytics connects organic to pipeline in ${c.city.name}.`,
        `Remote delivery with senior specialists — no junior handoffs.`,
      ],
    }),
    (c) => ({
      heading: `Risk reduction for ${c.city.name} operators`,
      bullets: [
        `Pre-migration audits before replatforming ${c.city.state.name} sites.`,
        `Penalty recovery playbooks when traffic drops suddenly.`,
        `Transparent reporting — you see what we change and why.`,
        `Coordination with dev when fixes need code changes.`,
      ],
    }),
    (c) => ({
      heading: `Local + national balance in ${c.city.name}`,
      bullets: [
        `Geo pages that help buyers in ${c.city.state.abbr} without spam patterns.`,
        `Service hub architecture for crawl depth ≤ 4 clicks.`,
        `Review and GBP guidance where local packs matter.`,
        `Keyword maps focused on commercial intent.`,
      ],
    }),
  ],
  "ai-automation": [
    (c) => ({
      heading: `Automation outcomes in ${c.city.name}`,
      bullets: [
        `Shorter response times for ${c.city.state.abbr} inbound leads.`,
        `Fewer manual CRM updates for ${c.city.name} sales admins.`,
        `Documented workflows your team can adjust safely.`,
        `Human-in-the-loop checkpoints on customer-facing steps.`,
      ],
    }),
    (c) => ({
      heading: `Why ${c.service.name} beats generic tools`,
      bullets: [
        `Integrations mapped to your ${c.city.name} stack — not generic Zap templates.`,
        `Prompt and guardrail design for brand-consistent replies.`,
        `Logging and rollback when automations misfire.`,
        `Security review for data leaving ${c.city.state.name} systems.`,
      ],
    }),
    (c) => ({
      heading: `Implementation approach for ${loc(c.city)}`,
      bullets: [
        `Process mapping workshops with ${c.city.name} stakeholders.`,
        `Pilot automations on one queue before full rollout.`,
        `Training for staff who approve or override AI steps.`,
        `Metrics: hours saved, SLA improvements, error rates.`,
      ],
    }),
    (c) => ({
      heading: `Scale without new hires in ${c.city.state.abbr}`,
      bullets: [
        `Chat and email triage for high-volume ${c.city.name} inboxes.`,
        `Scheduled reporting instead of Friday spreadsheet marathons.`,
        `API bridges between tools that never talked before.`,
        `Iteration sprints after go-live based on real transcripts.`,
      ],
    }),
    (c) => ({
      heading: `Trust and compliance`,
      bullets: [
        `Data handling documented for ${c.city.name} legal review.`,
        `Role-based access on automation admin panels.`,
        `Fallback paths when third-party APIs fail.`,
        `No black-box models on regulated content without review.`,
      ],
    }),
    (c) => ({
      heading: `Partner model for ${c.city.name} businesses`,
      bullets: [
        `Remote-first delivery — no on-site integration circus.`,
        `Works alongside existing agencies on ${c.service.focusKeyword}.`,
        `Clear ownership between marketing ops and engineering.`,
        `Roadmap for phase-two automations after ROI proof.`,
      ],
    }),
  ],
  "app-software": [
    (c) => ({
      heading: `Engineering standards for ${c.city.name} products`,
      bullets: [
        `Typed APIs and test coverage on critical ${c.city.state.abbr} flows.`,
        `Auth, roles, and audit logs for B2B deployments.`,
        `Observability — errors surface before customers call.`,
        `CI/CD so ${c.city.name} releases are predictable.`,
      ],
    }),
    (c) => ({
      heading: `Delivery milestones ${c.service.name} clients get`,
      bullets: [
        `Discovery and technical spec signed before build.`,
        `Clickable prototypes for ${c.city.name} stakeholder buy-in.`,
        `Staging demos on a fixed cadence.`,
        `Launch runbooks and hypercare week in ${c.city.state.name}.`,
      ],
    }),
    (c) => ({
      heading: `Why teams in ${loc(c.city)} pick Klikcy`,
      bullets: [
        `Full-stack squad — not outsourced fragments.`,
        `UX and engineering aligned on ${c.service.focusKeyword}.`,
        `Performance profiling on hot paths early.`,
        `Documentation for internal ${c.city.name} developers.`,
      ],
    }),
    (c) => ({
      heading: `Post-launch continuity`,
      bullets: [
        `Bug SLAs and enhancement backlog grooming.`,
        `Security patches on dependencies.`,
        `Analytics on feature adoption in ${c.city.state.abbr}.`,
        `Optional retainer for ${c.city.name} product iteration.`,
      ],
    }),
    (c) => ({
      heading: `De-risking custom builds`,
      bullets: [
        `MVP scope that proves value in weeks, not quarters.`,
        `Third-party integration spikes before committing architecture.`,
        `Data migration plans for ${c.city.name} legacy systems.`,
        `Exit-friendly code — no proprietary lock-in frameworks.`,
      ],
    }),
    (c) => ({
      heading: `Market fit for ${getCityTierLabel(c.tier)} companies`,
      bullets: [
        `Mobile-first UX expected by ${c.city.name} users.`,
        `Admin tools your ops team in ${c.city.state.name} actually uses.`,
        `Scalable hosting recommendations with cost transparency.`,
        `Honest timelines — we say no when scope is unrealistic.`,
      ],
    }),
  ],
  ecommerce: [
    (c) => ({
      heading: `Revenue-focused ${c.service.name} in ${c.city.name}`,
      bullets: [
        `PDP and collection templates tuned for ${c.city.state.abbr} buyers.`,
        `Checkout friction removed — fewer steps, clearer shipping.`,
        `App bloat trimmed to protect Core Web Vitals.`,
        `Merchandising workflows your ${c.city.name} team controls.`,
      ],
    }),
    (c) => ({
      heading: `Operational reliability`,
      bullets: [
        `Inventory and fulfillment integrations tested under load.`,
        `Tax and payment edge cases handled for ${c.city.state.name}.`,
        `Backup and rollback before theme pushes.`,
        `Monitoring on cart and payment error rates.`,
      ],
    }),
    (c) => ({
      heading: `SEO for ${loc(c.city)} stores`,
      bullets: [
        `Collection architecture that avoids duplicate thin URLs.`,
        `Product schema and review markup where eligible.`,
        `Redirect discipline during catalog migrations.`,
        `Content hubs supporting non-brand search demand.`,
      ],
    }),
    (c) => ({
      heading: `Why Klikcy for ${c.service.focusKeyword}`,
      bullets: [
        `Platform expertise — not generic web agency learning on your dime.`,
        `CRO and SEO coordinated with ${c.city.name} campaigns.`,
        `Async collaboration across ${c.city.state.abbr} time zones.`,
        `Launch playbooks for seasonal peaks.`,
      ],
    }),
    (c) => ({
      heading: `Growth readiness`,
      bullets: [
        `Headless options when ${c.city.name} experiences outgrow themes.`,
        `Subscription and membership flows when needed.`,
        `B2B pricing and quote flows for ${c.city.state.name} wholesalers.`,
        `Analytics on margin, not just sessions.`,
      ],
    }),
    (c) => ({
      heading: `Support after go-live`,
      bullets: [
        `Theme update QA before publishing.`,
        `Performance regressions caught in CI where possible.`,
        `Training for ${c.city.name} merchandisers.`,
        `Roadmap for internationalization if you expand beyond ${c.city.state.abbr}.`,
      ],
    }),
  ],
  "branding-design": [
    (c) => ({
      heading: `Design outcomes for ${c.city.name} brands`,
      bullets: [
        `Visual identity that reads premium on mobile — where ${c.city.state.abbr} buyers decide.`,
        `UI flows tested against real conversion goals.`,
        `Design systems that speed future ${c.service.name.toLowerCase()} work.`,
        `Accessible color and type scales — not afterthought fixes.`,
      ],
    }),
    (c) => ({
      heading: `Collaboration model`,
      bullets: [
        `Workshops with ${c.city.name} stakeholders — remote-friendly.`,
        `Figma libraries devs can implement without guesswork.`,
        `Revision rounds bounded by agreed milestones.`,
        `Brand guidelines your ${c.city.state.name} vendors can follow.`,
      ],
    }),
    (c) => ({
      heading: `Why design + build together`,
      bullets: [
        `No throw-it-over-the-wall handoffs for ${c.service.focusKeyword}.`,
        `Components engineered for performance in ${c.city.name} markets.`,
        `SEO-aware templates designed from day one.`,
        `Fewer launch surprises on responsive breakpoints.`,
      ],
    }),
    (c) => ({
      heading: `Differentiation in ${loc(c.city)}`,
      bullets: [
        `Category research before mood boards.`,
        `Messaging hierarchy aligned to buyer jobs-to-be-done.`,
        `Photography and icon direction when needed.`,
        `Social and ad variants for ${c.city.state.abbr} campaigns.`,
      ],
    }),
    (c) => ({
      heading: `Measurable creative`,
      bullets: [
        `Hypotheses for hero and CTA tests on ${c.city.name} landing pages.`,
        `Heatmap and session review post-launch.`,
        `Iteration sprints after data — not opinions alone.`,
        `Documentation for in-house ${c.city.state.name} designers.`,
      ],
    }),
    (c) => ({
      heading: `Tier-appropriate depth`,
      bullets: [
        `${getCityTierLabel(c.tier)} brands in ${c.city.name} get systems — not one-off PDFs.`,
        `Logo and identity scalable to apps and print.`,
        `Motion and micro-interaction specs when they aid conversion.`,
        `Honest remote partnership — senior designers, no bait-and-switch.`,
      ],
    }),
  ],
  "marketing-growth": [
    (c) => ({
      heading: `Growth levers for ${c.city.name}`,
      bullets: [
        `Funnel maps tied to ${c.city.state.abbr} acquisition channels.`,
        `Experiment backlog ranked by expected impact.`,
        `Landing pages aligned to ad and SEO entry points.`,
        `Lead quality metrics — not just volume.`,
      ],
    }),
    (c) => ({
      heading: `Analytics foundation`,
      bullets: [
        `GA4 and GTM implementations audited for ${c.city.name} properties.`,
        `Event naming conventions your team can maintain.`,
        `Dashboards executives in ${c.city.state.name} actually open.`,
        `Attribution realism — we document limitations.`,
      ],
    }),
    (c) => ({
      heading: `CRO discipline`,
      bullets: [
        `Hypothesis docs before tests go live in ${c.city.state.abbr}.`,
        `Statistical guardrails on smaller ${c.city.name} traffic sites.`,
        `Copy and UX changes shipped together.`,
        `Learnings library so tests compound quarter over quarter.`,
      ],
    }),
    (c) => ({
      heading: `Channel coordination`,
      bullets: [
        `SEO content supports paid quality scores in ${c.city.name}.`,
        `Email and automation aligned to site segments.`,
        `Retargeting audiences built on clean data layers.`,
        `Remote war rooms for ${c.city.state.name} launch weeks.`,
      ],
    }),
    (c) => ({
      heading: `Why Klikcy for ${c.service.focusKeyword}`,
      bullets: [
        `Adjacent web and SEO expertise — fewer vendors.`,
        `Senior strategists on ${c.city.name} accounts.`,
        `Transparent reporting and next-step recommendations.`,
        `No long-term lock-in contracts by default.`,
      ],
    }),
    (c) => ({
      heading: `Sustainable growth`,
      bullets: [
        `Playbooks ${c.city.name} teams can run between sprints.`,
        `Training on tools we configure in ${c.city.state.abbr}.`,
        `Documentation for handoff if you bring work in-house.`,
        `Roadmaps that balance quick wins and infrastructure.`,
      ],
    }),
  ],
  "technical-hosting": [
    (c) => ({
      heading: `Infrastructure outcomes in ${c.city.name}`,
      bullets: [
        `DNS and mail authentication configured and tested.`,
        `Backups verified — not just enabled.`,
        `Uptime checks with sane alert thresholds.`,
        `Runbooks for ${c.city.state.abbr} staff without deep IT benches.`,
      ],
    }),
    (c) => ({
      heading: `Migration safety`,
      bullets: [
        `Cutover windows planned around ${c.city.name} business hours.`,
        `Rollback paths documented before DNS flips.`,
        `SEO-preserving redirects during host changes.`,
        `Post-migration monitoring for 48–72 hours.`,
      ],
    }),
    (c) => ({
      heading: `Security basics done right`,
      bullets: [
        `TLS, headers, and WAF recommendations for your stack.`,
        `Least-privilege access on ${c.city.state.name} admin accounts.`,
        `Patch cadence for CMS and plugins.`,
        `Incident contacts documented for ${c.city.name} leadership.`,
      ],
    }),
    (c) => ({
      heading: `Why ${c.service.name} with Klikcy`,
      bullets: [
        `We also build sites — infra fits the app, not generic hosting upsells.`,
        `Remote delivery for ${loc(c.city)} — no truck rolls.`,
        `Clear scopes: one-time setup vs ongoing care.`,
        `Honest guidance when DIY is sufficient.`,
      ],
    }),
    (c) => ({
      heading: `Email deliverability`,
      bullets: [
        `SPF, DKIM, DMARC aligned for ${c.city.name} sending domains.`,
        `SMTP and transactional provider selection.`,
        `Inbox placement tests before big ${c.city.state.abbr} sends.`,
        `Documentation for marketing vs transactional streams.`,
      ],
    }),
    (c) => ({
      heading: `Ongoing reliability`,
      bullets: [
        `Performance monitoring on revenue paths.`,
        `Monthly health checks optional for ${c.city.name} teams.`,
        `Capacity guidance before traffic spikes.`,
        `Coordination with dev when infra changes need code.`,
      ],
    }),
  ],
};

const CTA_BUILDERS: ((ctx: ServiceCityContentContext) => { title: string; body: string })[ ] = [
  (c) => ({
    title: `Start ${c.service.name.toLowerCase()} in ${c.city.name}`,
    body: `Tell us about your ${c.city.name} business — we respond with scope, timeline, and practical next steps for ${c.city.state.abbr}.`,
  }),
  (c) => ({
    title: `Get a ${c.city.name} quote for ${c.service.name}`,
    body: `Share goals and constraints — Klikcy replies with a fixed-scope plan, not a generic deck.`,
  }),
  (c) => ({
    title: `Ready to improve ${c.service.focusKeyword} in ${c.city.state.name}?`,
    body: `Book a discovery call — remote-first, no local office visit required for ${loc(c.city)} clients.`,
  }),
  (c) => ({
    title: `Talk with Klikcy about ${c.city.name}`,
    body: `Whether you are modernizing or starting fresh, we map ${c.service.name.toLowerCase()} to outcomes that matter in ${c.city.state.abbr}.`,
  }),
];

const LOCAL_MARKET_BUILDERS: ((ctx: ServiceCityContentContext) => string)[] = [
  (c) =>
    `${c.city.name} sits in a ${getCityTierLabel(c.tier)} — buyers compare multiple vendors online before engaging. Klikcy tailors ${c.service.name.toLowerCase()} to how ${c.city.state.name} companies research ${c.service.focusKeyword}, not generic national copy.`,
  (c) =>
    `Operators in ${loc(c.city)} face ${c.city.state.blurb} competition for attention. Our ${c.service.name.toLowerCase()} engagements account for that market context while staying honest about remote delivery.`,
  (c) =>
    `Search demand in ${c.city.name} rewards specificity. Klikcy connects ${c.service.focusKeyword} to the questions ${c.city.state.abbr} prospects actually ask — speed, trust signals, and clear offers.`,
  (c) =>
    `Whether you serve local ${c.city.name} clients or national accounts from ${c.city.state.abbr}, Klikcy aligns ${c.service.name.toLowerCase()} with the funnel step that matters most for your revenue model.`,
];

function categoryFaqPool(category: CategorySlug, ctx: ServiceCityContentContext): GeoFaq[] {
  const { service, city } = ctx;
  const label = loc(city);
  const profile = getVerticalProfile(category);

  const pools: Record<CategorySlug, GeoFaq[]> = {
    "web-development": [
      { q: `How much does ${service.name.toLowerCase()} cost in ${label}?`, a: `Most ${city.name} projects are quoted fixed-scope after discovery — typically mid four to low six figures depending on integrations, content volume, and ${service.focusKeyword} complexity.` },
      { q: `Do you redesign while preserving SEO in ${city.name}?`, a: `Yes. Redirect maps, content migration, and pre/post audits protect rankings for ${city.state.abbr} domains.` },
      { q: `Which stack do you recommend for ${city.name} businesses?`, a: `We match stack to team and goals — often Next.js or WordPress for marketing sites, Shopify for commerce — always with performance budgets.` },
      { q: `Can you integrate CRM and booking tools for ${city.name} sites?`, a: `Yes — HubSpot, Salesforce, Calendly, and custom APIs are common on ${label} builds.` },
      { q: `How long until a ${city.name} site goes live?`, a: `Marketing sites often launch in 4–10 weeks; larger builds take longer. Milestones are set after discovery.` },
      { q: `Do you offer maintenance after launch in ${city.state.name}?`, a: `Yes — hosting, updates, monitoring, and CRO iterations are available on retainer.` },
      { q: `Will my ${city.name} website be accessible?`, a: `We build WCAG-aware templates and test keyboard navigation and contrast before launch.` },
      { q: `Can you migrate from Wix or Squarespace for ${label} companies?`, a: `Yes — content, redirects, and analytics are migrated with SEO preservation.` },
      { q: `Do you write copy for ${city.name} pages?`, a: `We can collaborate on copy or work with your ${city.state.abbr} team — IA always accounts for search intent.` },
      { q: `Why remote instead of a ${city.name}-only agency?`, a: `Senior full-stack delivery without fake local offices — honest positioning with nationwide standards.` },
    ],
    "seo-aeo": [
      { q: `How is ${service.name} different from generic SEO packages in ${label}?`, a: `We start with technical audits and revenue pages — not bulk blog posts — tailored to ${city.state.name} competitive sets.` },
      { q: `Can you fix traffic drops for ${city.name} sites?`, a: `Yes — we diagnose algorithm updates, technical regressions, and indexation issues with prioritized fix lists.` },
      { q: `Do you optimize for ChatGPT and Perplexity in ${city.state.abbr}?`, a: `${service.name} includes FAQ structure, entity clarity, and citation-friendly copy for answer engines.` },
      { q: `How do you handle local SEO without fake addresses in ${city.name}?`, a: `GBP guidance, local content, and schema — without claiming a ${city.name} office we do not have.` },
      { q: `What does the first month of ${service.name.toLowerCase()} include?`, a: `Crawl audit, keyword map, quick wins, and a roadmap aligned to ${label} business goals.` },
      { q: `Do you work with in-house ${city.name} marketing teams?`, a: `Yes — we complement internal teams with technical execution and QA.` },
      { q: `Can you audit Core Web Vitals for ${city.state.name} templates?`, a: `Yes — lab and field data reviewed with dev-ready tickets.` },
      { q: `How do you report progress to ${city.name} stakeholders?`, a: `Dashboards on rankings, indexation, and leads — with plain-language summaries.` },
      { q: `Do you build programmatic SEO for ${label}?`, a: `Yes — when pages are genuinely useful, internally linked, and varied — not doorway templates.` },
      { q: `Is there a minimum term for ${service.name} in ${city.name}?`, a: `SEO compounds over months; we recommend 6+ months for meaningful trends but do not force multi-year contracts.` },
    ],
    "ai-automation": [
      { q: `Is ${service.name.toLowerCase()} secure for ${label} customer data?`, a: `We document data flows, use least-privilege keys, and add human review on customer-facing automations.` },
      { q: `Can you automate CRM for ${city.name} sales teams?`, a: `Yes — lead routing, enrichment, and follow-up sequences are common ${city.state.abbr} workflows.` },
      { q: `Do you build custom chatbots for ${city.name} websites?`, a: `Yes — trained on your content with escalation paths to humans.` },
      { q: `How fast can a pilot go live in ${city.state.name}?`, a: `Focused pilots often ship in 2–6 weeks depending on integrations.` },
      { q: `What tools do you integrate in ${label}?`, a: `Zapier, Make, HubSpot, Salesforce, Slack, Notion, and custom APIs — scoped per project.` },
      { q: `Can AI replace our ${city.name} support team?`, a: `No — we design assistive automation with clear handoffs; humans stay accountable.` },
      { q: `Do you train staff in ${city.state.abbr} to maintain workflows?`, a: `Yes — documentation and handoff sessions are part of delivery.` },
      { q: `How do you measure ROI for ${service.name.toLowerCase()}?`, a: `Hours saved, SLA improvements, and conversion lifts — baselined before automation.` },
      { q: `Can you connect phone and SMS for ${city.name} leads?`, a: `Yes — with provider selection and compliance considerations documented.` },
      { q: `Why Klikcy for ${service.focusKeyword} in ${label}?`, a: `${profile.partnerLabel} with web and SEO context — automations fit your full digital system.` },
    ],
    "app-software": [
      { q: `Do you build MVPs for ${city.name} startups?`, a: `Yes — scoped MVPs with analytics and auth, designed to evolve without rewrite.` },
      { q: `Can you modernize legacy software for ${label}?`, a: `Yes — phased rewrites, APIs, and data migration with uptime planning.` },
      { q: `Which cloud hosts ${city.state.name} apps?`, a: `AWS, Vercel, Azure, or your preference — cost and compliance discussed upfront.` },
      { q: `Do you provide ongoing dev for ${city.name} products?`, a: `Retainers available for features, security patches, and performance work.` },
      { q: `How do you estimate ${service.name.toLowerCase()} timelines?`, a: `After discovery and technical spikes — ranges tighten before build starts.` },
      { q: `Can you integrate payments in ${label}?`, a: `Stripe and similar processors with PCI-aware patterns.` },
      { q: `Do you build mobile apps for ${city.name} markets?`, a: `Yes — native or cross-platform depending on budget and features.` },
      { q: `Will we own the code for ${city.state.abbr} projects?`, a: `Yes — repos and IP transfer on payment milestones per contract.` },
      { q: `How do you handle QA for ${service.name}?`, a: `Automated tests on critical paths, staging demos, and UAT with your ${city.name} team.` },
      { q: `Can you work with our ${city.name} designers?`, a: `Yes — we implement Figma systems or co-design when needed.` },
    ],
    ecommerce: [
      { q: `Shopify or WooCommerce for ${label} stores?`, a: `Depends on catalog complexity, integrations, and team skills — we recommend after discovery.` },
      { q: `Can you improve checkout conversion in ${city.name}?`, a: `Yes — UX, speed, trust badges, and shipping clarity tested on ${city.state.abbr} traffic.` },
      { q: `Do you handle ERP integrations for ${city.name} merchants?`, a: `Common on larger ${service.name.toLowerCase()} engagements — scoped per stack.` },
      { q: `How do you protect SEO during replatforming in ${label}?`, a: `Redirect maps, staging crawls, and monitoring through launch week.` },
      { q: `Can you optimize product pages for ${city.name} keywords?`, a: `Yes — PDP templates, schema, and internal linking patterns.` },
      { q: `Do you support B2B pricing for ${city.state.name}?`, a: `Quote flows, customer groups, and net terms where platforms allow.` },
      { q: `What about subscriptions in ${city.name}?`, a: `Recharge and native subscription setups depending on platform.` },
      { q: `How fast can a ${city.name} store launch?`, a: `Simple catalogs in weeks; complex migrations take longer — milestones after audit.` },
      { q: `Do you train ${label} merchandisers?`, a: `Yes — theme editor, collections, and promo workflows documented.` },
      { q: `Why Klikcy for ${service.focusKeyword}?`, a: `Commerce + SEO + CRO in one remote team — fewer handoffs for ${city.state.abbr} brands.` },
    ],
    "branding-design": [
      { q: `Do you only design or also build for ${city.name}?`, a: `Both — design systems translate to production templates for ${label} launches.` },
      { q: `How many revision rounds are included in ${service.name}?`, a: `Defined per milestone — bounded rounds keep ${city.state.abbr} projects on schedule.` },
      { q: `Can you refresh brand identity for ${city.name} companies?`, a: `Yes — logos, typography, color, and application guidelines.` },
      { q: `Do you run user research in ${label}?`, a: `Remote interviews and heuristic reviews — optional onsite by arrangement.` },
      { q: `Will designs meet accessibility in ${city.state.name}?`, a: `Contrast, type scale, and focus states are part of UI deliverables.` },
      { q: `Can you design for ads and social in ${city.name}?`, a: `Yes — asset kits aligned to the core brand system.` },
      { q: `How long does ${service.name.toLowerCase()} take?`, a: `Identity projects often 4–8 weeks; full UI systems longer — scoped in discovery.` },
      { q: `Do you work with existing ${city.name} brand guidelines?`, a: `Yes — we extend or refine systems rather than replace without reason.` },
      { q: `Can developers implement your files in ${label}?`, a: `Figma specs, tokens, and dev pairing reduce implementation drift.` },
      { q: `Why choose Klikcy over freelance designers in ${city.name}?`, a: `Senior team, build-aware design, and SEO/CRO context — remote-first delivery.` },
    ],
    "marketing-growth": [
      { q: `Do you manage ad spend for ${city.name} businesses?`, a: `We focus on analytics, CRO, and strategy — media buying can be coordinated with your ${city.state.abbr} partners.` },
      { q: `Can you fix broken GA4 tracking in ${label}?`, a: `Yes — event audits and GTM rebuilds are common first steps.` },
      { q: `How do you prioritize tests for ${city.name} sites?`, a: `ICE or PIE frameworks tied to revenue pages and traffic volume.` },
      { q: `Do you create content for ${city.state.name} campaigns?`, a: `Strategy and briefs — production can be in-house or coordinated.` },
      { q: `What is included in ${service.name.toLowerCase()}?`, a: `Audits, roadmaps, experiments, and reporting — scoped per engagement.` },
      { q: `Can you align SEO and CRO in ${label}?`, a: `Yes — landing templates and internal links support both channels.` },
      { q: `How soon will ${city.name} see results?`, a: `Quick instrumentation wins in weeks; test learnings compound over quarters.` },
      { q: `Do you work with B2B ${city.state.name} funnels?`, a: `Yes — longer cycles, lead scoring, and sales handoff tracking.` },
      { q: `Is email setup part of ${service.name}?`, a: `Often included or adjacent — ESP integration and automation flows.` },
      { q: `Why Klikcy for growth in ${city.name}?`, a: `Web-native team — experiments ship without waiting on a separate dev shop.` },
    ],
    "technical-hosting": [
      { q: `Can you migrate ${city.name} email without downtime?`, a: `Staged DNS with TTL planning — cutovers scheduled with ${label} IT contacts.` },
      { q: `Do you provide 24/7 support in ${city.state.name}?`, a: `Business-hours support by default; on-call options for critical sites.` },
      { q: `How do you handle ${service.name.toLowerCase()} security?`, a: `TLS, backups, WAF guidance, and access reviews — documented for ${city.name} teams.` },
      { q: `Can you move a ${label} site between hosts?`, a: `Yes — content, DB, and DNS with rollback plans.` },
      { q: `What monitoring do you set up for ${city.name}?`, a: `Uptime, SSL expiry, and key transaction paths — alerts tuned to avoid noise.` },
      { q: `Do you sell hosting or recommend providers?`, a: `We recommend fit-for-purpose hosts — no inflated reseller margins.` },
      { q: `Can you configure SMTP for ${city.state.abbr} apps?`, a: `Yes — transactional providers with DNS authentication.` },
      { q: `How fast are ${service.name} engagements?`, a: `Many setups complete in days to a few weeks depending on complexity.` },
      { q: `Will you document everything for ${city.name} staff?`, a: `Runbooks and credentials handoff are standard deliverables.` },
      { q: `Why not use a generic IT shop in ${label}?`, a: `We understand web stacks deeply — DNS and mail fixes align with how your site actually runs.` },
    ],
  };

  return pools[category];
}

export function buildServiceCityIntro(ctx: ServiceCityContentContext): string {
  const variants = INTRO_BUILDERS[ctx.service.category];
  return pickVariant(seed(ctx.service, ctx.city, "intro"), variants)(ctx);
}

export function buildServiceCityBenefits(ctx: ServiceCityContentContext): {
  heading: string;
  bullets: string[];
} {
  const variants = BENEFITS_BUILDERS[ctx.service.category];
  return pickVariant(seed(ctx.service, ctx.city, "benefits"), variants)(ctx);
}

export function buildServiceCityCta(ctx: ServiceCityContentContext): { title: string; body: string } {
  return pickVariant(seed(ctx.service, ctx.city, "cta"), CTA_BUILDERS)(ctx);
}

export function buildLocalMarketContext(ctx: ServiceCityContentContext): string | null {
  if (ctx.tier === 3) return null;
  return pickVariant(seed(ctx.service, ctx.city, "local-market"), LOCAL_MARKET_BUILDERS)(ctx);
}

export function pickServiceCityPageFaqs(ctx: ServiceCityContentContext): GeoFaq[] {
  const pool = categoryFaqPool(ctx.service.category, ctx);
  const count = ctx.tier === 3 ? 4 : 5;
  const indices = pickVariantIndices(seed(ctx.service, ctx.city, "faq"), count, pool.length);
  return indices.map((i) => pool[i]!);
}

export function pickNearbyCities(service: Service, city: CityRef, count = 7): CityRef[] {
  const cities = getCitiesForState(city.state);
  const sorted = cities.filter((c) => c.slug !== city.slug).sort((a, b) => a.slug.localeCompare(b.slug));
  if (sorted.length === 0) return [];

  const take = Math.min(count, sorted.length);
  const start = stableHash(`${service.slug}-${city.state.slug}-${city.slug}-nearby`) % sorted.length;
  const picked: CityRef[] = [];
  for (let i = 0; i < take; i += 1) {
    picked.push(sorted[(start + i) % sorted.length]!);
  }
  return picked;
}

export function pickSiblingServices(service: Service, city: CityRef, count = 5): Service[] {
  const sorted = [...services].sort((a, b) => a.slug.localeCompare(b.slug));
  const related = getRelatedServices(service.slug);
  const pool = related.length >= count ? related : sorted.filter((s) => s.slug !== service.slug);
  const take = Math.min(count, pool.length);
  const indices = pickVariantIndices(`${service.slug}-${city.slug}-siblings`, take, pool.length);
  return indices.map((i) => pool[i]!);
}

function stableHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
