import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  MapPin,
  Palette,
  Search,
  Server,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";
import { categories } from "@/lib/categories";
import { priorityStates } from "@/lib/states";
import { orgSchema, websiteSchema, faqSchema } from "@/lib/schema";
import { homeFaqs } from "@/lib/home-content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Search,
  Bot,
  ShoppingBag,
  Layers,
  Palette,
  TrendingUp,
  Server,
};

const credibilityStrip = [
  { title: "Strategy-first websites", body: "Information architecture and UX that align to revenue, not vanity pages." },
  { title: "SEO/AEO-ready builds", body: "Semantic structure, schema, and performance budgets baked in from day one." },
  { title: "Automation-driven systems", body: "Agents, workflows, and integrations that remove manual bottlenecks." },
  { title: "Performance-focused development", body: "Lean React (Vite) stacks, tuned assets, and measurable Core Web Vitals." },
  { title: "Conversion-focused design", body: "Visual hierarchy, CTAs, and trust paths tested for clarity on every breakpoint." },
];

const whyPillars = [
  {
    title: "Growth systems, not one-off pages",
    body: "We connect brand, UX, engineering, search, and automation so your digital footprint compounds instead of fragmenting.",
  },
  {
    title: "Design + SEO + automation together",
    body: "No silos: the same team ships UI that converts, copy that ranks, and workflows that keep operations lean.",
  },
  {
    title: "Built for visibility and conversion",
    body: "Answer-engine readiness, structured data, and CRO-minded layouts — engineered for humans and machines.",
  },
  {
    title: "Technical depth with business fluency",
    body: "From hosting and security to analytics and APIs — we speak both boardroom outcomes and implementation detail.",
  },
];

const processSteps = [
  { n: "01", label: "Discover", copy: "Goals, audience, constraints, and growth levers — mapped in one strategic frame." },
  { n: "02", label: "Design", copy: "Experience architecture, UI systems, and narrative flow that earn attention." },
  { n: "03", label: "Build", copy: "Accessible, fast frontends and reliable integrations — React, Vite, WordPress, Shopify." },
  { n: "04", label: "Optimize", copy: "Technical SEO, AEO, schema, CWV tuning, and analytics you can trust." },
  { n: "05", label: "Launch", copy: "Hardened hosting, DNS, email, monitoring, and rollback-safe releases." },
  { n: "06", label: "Grow", copy: "Automation, content systems, and iterative experiments that scale what works." },
];

const impactCards = [
  { title: "Faster websites", body: "Lean builds and disciplined assets so every interaction feels instant and intentional.", icon: Zap },
  { title: "Better search visibility", body: "Structured entities, internal linking, and technical hygiene that search engines reward.", icon: Search },
  { title: "Cleaner user journeys", body: "Clarified paths from first touch to conversion — fewer dead ends, more momentum.", icon: Activity },
  { title: "Stronger conversion paths", body: "CTA systems, proof placement, and narrative rhythm tuned for decisions.", icon: TrendingUp },
  { title: "Scalable digital systems", body: "Components, data layers, and automation that keep working as you add markets.", icon: Cpu },
];

const experienceTiles = [
  { title: "UI/UX design", body: "Product-grade interfaces, design systems, and brand-led storytelling.", icon: Palette },
  { title: "Development", body: "Modern React (Vite), WordPress, Shopify, APIs, and integrations.", icon: Code2 },
  { title: "SEO & AEO", body: "Technical + on-page SEO with answer-engine optimization for AI citations.", icon: Search },
  { title: "Automation", body: "AI workflows, agents, CRM automation, and operational tooling.", icon: Workflow },
  { title: "Analytics", body: "Measurement plans, event quality, and dashboards leadership actually uses.", icon: BarChart3 },
  { title: "Hosting & maintenance", body: "Security, backups, email, DNS, uptime, and proactive performance care.", icon: Server },
];

const Index = () => (
  <>
    <SEO
      title="Klikcy — Websites, SEO, AEO & AI Automation Agency"
      description="Klikcy builds scalable websites, SEO/AEO systems, AI automations and e-commerce platforms for businesses across the United States."
      canonical="https://klikcy.com/"
      jsonLd={[orgSchema(), websiteSchema(), faqSchema(homeFaqs)]}
    />
    <Header />
    <main id="main-content" className="bg-background">
      {/* 1. Editorial hero */}
      <section
        className="relative overflow-hidden bg-ink text-white"
        aria-labelledby="hero-heading"
      >
        <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 hero-noise opacity-70 mix-blend-overlay" aria-hidden />
        <div
          className="pointer-events-none absolute -left-1/4 top-0 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-primary/25 blur-[100px] motion-reduce:opacity-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-1/3 bottom-0 h-[min(90vw,640px)] w-[min(90vw,640px)] rounded-full bg-[hsl(181_86%_43%/0.2)] blur-[120px] motion-reduce:opacity-30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br from-primary/20 via-transparent to-navy/40 opacity-40 motion-reduce:animate-none animate-gradient-shift"
          aria-hidden
        />

        <div className="relative container-x pb-20 pt-10 sm:pb-28 sm:pt-14 lg:pb-32 lg:pt-16">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="animate-fade-up lg:col-span-7">
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.28em] text-primary-light">Digital agency · United States</p>
              <h1
                id="hero-heading"
                className="font-display mt-5 max-w-[18ch] text-[clamp(2.35rem,4vw+1.2rem,3.85rem)] font-extrabold leading-[1.02] tracking-tight text-white"
              >
                The growth studio for{" "}
                <span className="bg-gradient-to-r from-white via-primary-light to-primary bg-clip-text text-transparent">
                  serious
                </span>{" "}
                digital brands.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/72 sm:text-xl sm:leading-relaxed">
                Klikcy is a remote-first agency shipping websites, SEO &amp; AEO, AI automation, apps, commerce, brand design,
                marketing, and technical hosting — one accountable partner from strategy to scale.
              </p>
              <div className="mt-10 flex w-full flex-col gap-3 sm:max-w-md sm:flex-row sm:items-center">
                <Link to="/contact" className="btn-primary w-full justify-center sm:w-auto">
                  Start a project <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <Link to="/categories/web-development" className="btn-ghost-light w-full sm:w-auto">
                  View capabilities
                </Link>
              </div>
              <dl className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">Coverage</dt>
                  <dd className="font-display mt-2 text-2xl font-bold text-white">50 states + DC</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">Disciplines</dt>
                  <dd className="font-display mt-2 text-2xl font-bold text-white">Eight practices</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">Delivery</dt>
                  <dd className="font-display mt-2 text-2xl font-bold text-white">Remote-first</dd>
                </div>
              </dl>
            </div>

            <div className="relative hidden animate-fade-up-delayed lg:col-span-5 lg:block" aria-hidden>
              <div className="absolute -left-8 top-8 h-32 w-32 rounded-full border border-white/10 bg-white/5 blur-2xl" />
              <div className="relative flex flex-col gap-4">
                <div className="ml-0 rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary-light">
                    <Sparkles className="h-3.5 w-3.5" />
                    Live stack
                  </div>
                  <p className="mt-3 font-display text-lg font-bold text-white">React · Vite · TypeScript</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">Production-grade SPAs with SEO/AEO-friendly structure — no template lock-in.</p>
                </div>
                <div className="ml-8 rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl motion-reduce:ml-0">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary-light">
                    <Bot className="h-3.5 w-3.5" />
                    Systems
                  </div>
                  <p className="mt-3 font-display text-lg font-bold text-white">Search + automation</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">Schema-first pages, programmatic SEO patterns, and AI workflows wired to your ops.</p>
                </div>
                <div className="ml-4 rounded-2xl border border-dashed border-primary/40 bg-primary/10 p-4 text-sm font-medium text-primary-light">
                  One partner for brand, build, search, and scale.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Credibility strip */}
      <section className="relative border-b border-border bg-white py-14 sm:py-16" aria-labelledby="cred-heading">
        <div className="container-x">
          <div className="max-w-3xl">
            <h2 id="cred-heading" className="font-display text-[clamp(1.5rem,1.5vw+1rem,2.1rem)] font-bold tracking-tight text-navy-deep">
              <span className="micro-label mb-3 block text-[0.7rem] font-bold tracking-[0.2em]">Proof in the craft</span>
              <span className="block leading-tight">Engineered for outcomes you can brief an exec on.</span>
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
            {credibilityStrip.map((item) => (
              <li
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-[hsl(var(--soft-bg))] p-5 transition duration-300 hover:border-primary/30 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                <p className="mt-3 font-display text-sm font-bold text-navy-deep">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Services */}
      <PageSection>
        <SectionIntro
          kicker="Capabilities"
          title={<>Eight practices. One continuous growth surface.</>}
          description="Each discipline is led with senior-level rigor — designed to compound: your site, your search footprint, your automation layer, and your brand all move together."
        />
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((c, i) => {
            const Icon = iconMap[c.icon] ?? Code2;
            const featured = i === 0 || i === 3;
            return (
              <Link
                key={c.slug}
                to={`/categories/${c.slug}`}
                className={cn(
                  "service-showcase group flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  featured && "sm:col-span-2 xl:col-span-2 xl:min-h-[280px] xl:flex-row xl:items-stretch xl:gap-8",
                )}
              >
                <div className={cn("flex shrink-0 items-start justify-between gap-4", featured && "xl:flex-col xl:justify-between")}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="rounded-full border border-border bg-white/80 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                    {c.short}
                  </span>
                </div>
                <div className={cn("mt-5 flex flex-1 flex-col xl:mt-0", featured && "xl:justify-between")}>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-navy-deep">{c.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{c.tagline}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition group-hover:gap-3">
                    Enter practice <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </PageSection>

      {/* 4. Why Klikcy */}
      <PageSection variant="ink" className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[min(100vw,600px)] w-[min(100vw,600px)] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/15 blur-[120px]" aria-hidden />
        <SectionIntro
          tone="onDark"
          kicker="Why Klikcy"
          title={<>We are not another vendor list — we are the team that ships the whole arc.</>}
          description="Most agencies stop at deliverables. Klikcy connects strategy, interface, engineering, search, automation, and infrastructure so your digital presence performs as a single system."
        />
        <div className="relative mt-4 grid gap-5 md:grid-cols-2">
          {whyPillars.map((p) => (
            <article key={p.title} className="bento-tile">
              <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{p.body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* 5. Process */}
      <PageSection variant="muted" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px timeline-rail opacity-60" aria-hidden />
        <SectionIntro
          kicker="Process"
          title={<>Discover → design → build → optimize → launch → grow.</>}
          description="A modern, transparent cadence so stakeholders see progress weekly — not as a black box."
        />
        <div className="relative mt-4">
          <div className="hidden lg:block">
            <div className="absolute left-0 right-0 top-8 h-0.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10" aria-hidden />
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4" role="list">
            {processSteps.map((s, idx) => (
              <li
                key={s.label}
                className="relative rounded-2xl border border-border/80 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary">
                    {s.n}
                  </span>
                  {idx < processSteps.length - 1 ? (
                    <span className="hidden font-mono text-[0.65rem] text-muted-foreground/50 lg:inline" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-navy-deep">{s.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{s.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </PageSection>

      {/* 6. Impact / results (qualitative) */}
      <PageSection variant="navy" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" aria-hidden />
        <SectionIntro
          tone="onDark"
          kicker="Impact model"
          title={<>What changes when Klikcy owns the full stack.</>}
          description="We do not publish inflated metrics — we engineer conditions for measurable lift: speed, clarity, discoverability, and operational leverage."
        />
        <ul className="relative mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {impactCards.map(({ title, body, icon: Icon }) => (
            <li key={title} className="bento-tile flex flex-col">
              <Icon className="h-5 w-5 text-primary-light" aria-hidden />
              <h3 className="mt-4 font-display text-base font-bold text-white">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* 7. Experience bento */}
      <PageSection>
        <SectionIntro
          kicker="Experience"
          title={<>Design, code, search, automation, analytics, and uptime — orchestrated.</>}
          description="Klikcy is built for teams that want craft-level creative direction with principal-engineer execution across the entire lifecycle."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experienceTiles.map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-white to-[hsl(var(--soft-bg))] p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-glow motion-reduce:hover:translate-y-0"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" aria-hidden />
              <Icon className="relative h-6 w-6 text-primary" aria-hidden />
              <h3 className="relative mt-4 font-display text-lg font-bold text-navy-deep">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* 8. Service areas */}
      <PageSection variant="muted">
        <SectionIntro
          kicker="Nationwide"
          title={<>State and city programs tuned for local intent.</>}
          description="Explore hubs for priority markets — built for high-intent local queries and answer-engine visibility."
        />
        <div className="flex flex-wrap gap-2">
          {priorityStates.map((s) => (
            <Link
              key={s.slug}
              to={`/service-areas/${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-navy-deep shadow-sm transition hover:border-primary/40 hover:bg-white hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              {s.name}
            </Link>
          ))}
        </div>
        <Link
          to="/service-areas"
          className="mt-8 inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Browse all service areas
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </PageSection>

      <HomeFaqSection items={homeFaqs} />

      {/* 10. Final CTA */}
      <PageSection className="bg-transparent pb-24 pt-4 sm:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-navy via-ink to-void px-8 py-16 text-white shadow-[0_40px_100px_-40px_hsl(184_100%_37%/0.45)] sm:px-14 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-primary/15 blur-[90px]" aria-hidden />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.28em] text-primary-light">Let’s build</p>
            <h2 className="font-display mt-4 text-[clamp(1.85rem,2vw+1rem,2.75rem)] font-extrabold leading-tight tracking-tight">
              Ready for a digital system that looks, reads, and performs like a category leader?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Share your goals — we’ll respond with a focused plan across web, SEO/AEO, automation, and hosting. No jargon walls,
              no mystery pricing dance.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary min-w-[200px] justify-center">
                Book a strategy call
              </Link>
              <Link to="/about" className="btn-ghost-light min-w-[200px] justify-center">
                Meet Klikcy
              </Link>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
    <Footer />
  </>
);

export default Index;
