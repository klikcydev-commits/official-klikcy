import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Code2,
  Search,
  Bot,
  ShoppingBag,
  Layers,
  Palette,
  TrendingUp,
  Server,
  CheckCircle2,
  Sparkles,
  MapPin,
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

const trustItems = [
  "SEO-Ready Websites",
  "Scalable React & Vite Architecture",
  "AI Automation Workflows",
  "Conversion-Focused UI/UX",
  "Technical SEO Foundation",
  "Data-Driven Growth",
];

const processSteps = [
  { n: "01", t: "Discover", d: "We map goals, audience, technical context and growth levers." },
  { n: "02", t: "Design", d: "Brand-aligned UI/UX with conversion and SEO baked in." },
  { n: "03", t: "Build", d: "Modern stacks — React, Vite, WordPress, Shopify — engineered for speed." },
  { n: "04", t: "Optimize", d: "Technical SEO, AEO, schema and Core Web Vitals tuning." },
  { n: "05", t: "Scale", d: "AI automations, programmatic SEO and ongoing growth systems." },
];

const capabilityPanels = [
  { title: "Ship fast", body: "Vite-powered React experiences tuned for Core Web Vitals.", accent: "from-primary/20 to-transparent" },
  { title: "Get found", body: "SEO + AEO so Google and answer engines cite your brand.", accent: "from-navy/30 to-transparent" },
  { title: "Automate", body: "Workflows that remove manual handoffs between tools and teams.", accent: "from-primary/25 to-transparent" },
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
    <main id="main-content">
      {/* Hero — purpose: state offer, desire, and proof in one scan */}
      <section className="relative overflow-hidden bg-gradient-hero" aria-labelledby="hero-heading">
        <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-[0.45]" aria-hidden />
        <div className="relative container-x section pb-20 pt-4 sm:pb-24 lg:pb-28 lg:pt-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="animate-fade-up max-w-xl lg:col-span-7 lg:max-w-none">
              <span className="micro-label">Digital Agency · United States</span>
              <h1
                id="hero-heading"
                className="font-display mt-5 text-4xl font-extrabold leading-[1.04] tracking-tight text-navy-deep sm:text-5xl xl:text-[3.35rem]"
              >
                Websites, SEO, AI Automation &amp;{" "}
                <span className="gradient-text">Digital Growth</span> for U.S. Businesses
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-[1.65] text-muted-foreground sm:text-xl">
                Klikcy builds scalable websites, SEO systems, AI automations, e-commerce platforms and digital solutions for
                companies across all 50 states — remote-first, conversion-led, technically excellent.
              </p>
              <div className="mt-9 flex w-full flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
                <Link to="/contact" className="btn-primary w-full justify-center sm:w-auto">
                  Request a Strategy Call <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <Link to="/categories/web-development" className="btn-secondary w-full justify-center sm:w-auto">
                  Explore services
                </Link>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground sm:text-left">
                <span className="font-medium text-navy-deep/80">Trusted delivery</span> — SEO-ready builds, schema-first pages,
                and AI workflows that scale with you.
              </p>
              <dl className="mt-10 grid gap-6 border-t border-border/70 pt-8 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Coverage</dt>
                  <dd className="font-display mt-1 text-2xl font-bold tabular-nums text-navy-deep">50 states + DC</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Practices</dt>
                  <dd className="font-display mt-1 text-2xl font-bold tabular-nums text-navy-deep">8 disciplines</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Model</dt>
                  <dd className="font-display mt-1 text-2xl font-bold text-navy-deep">Remote-first</dd>
                </div>
              </dl>
            </div>

            <div className="animate-fade-up-delayed relative hidden lg:col-span-5 lg:block" aria-hidden>
              <div className="absolute -right-6 top-1/2 h-[120%] w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
              <div className="relative flex flex-col gap-4 pl-4">
                {capabilityPanels.map((p, i) => (
                  <div
                    key={p.title}
                    className={cn(
                      "rounded-2xl border border-white/80 bg-white/90 p-5 shadow-card backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-glow motion-reduce:hover:translate-y-0",
                      i === 1 && "translate-x-3 motion-reduce:translate-x-0",
                      i === 2 && "translate-x-1 motion-reduce:translate-x-0",
                    )}
                  >
                    <div className={cn("mb-3 h-1 w-12 rounded-full bg-gradient-to-r", p.accent)} />
                    <div className="font-display text-sm font-bold text-navy-deep">{p.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                ))}
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                  <span>One partner for site, search, and automation.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative bridge — purpose: sharpen why Klikcy exists */}
      <section className="border-y border-navy/10 bg-navy text-white" aria-labelledby="bridge-heading">
        <div className="container-x py-9 sm:py-11">
          <h2 id="bridge-heading" className="sr-only">
            Why teams choose Klikcy
          </h2>
          <p className="font-display max-w-4xl text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl sm:leading-snug">
            Most teams don’t need another generic template — they need a site that converts, search that compounds, and AI that
            removes busywork. Klikcy delivers all three as one growth partner for businesses nationwide.
          </p>
        </div>
      </section>

      {/* Trust strip — purpose: qualify capabilities quickly */}
      <section className="border-b border-border bg-white" aria-labelledby="trust-heading">
        <div className="container-x py-12 sm:py-14">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p id="trust-heading" className="micro-label">
              Built for measurable growth
            </p>
            <p className="text-sm text-muted-foreground sm:max-w-xl">
              Every engagement is engineered around performance, discoverability, and systems you can operate — not one-off
              deliverables.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" role="list">
            {trustItems.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-2xl border border-border/90 bg-[hsl(var(--soft-bg))] px-4 py-3.5 text-left text-sm font-semibold leading-snug text-navy-deep transition hover:border-primary/35 hover:shadow-soft"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services / categories — purpose: route visitors to the right practice */}
      <PageSection>
        <SectionIntro
          kicker="What we do"
          title={<>Eight practices, one senior partner for the full stack.</>}
          description="From websites and SEO to AI automation and e-commerce — Klikcy delivers across your entire digital surface area with one accountable team."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((c) => {
            const Icon = iconMap[c.icon] ?? Code2;
            return (
              <Link key={c.slug} to={`/categories/${c.slug}`} className="card-soft group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-soft">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-deep">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  View practice
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </PageSection>

      {/* Process — purpose: reduce perceived risk */}
      <PageSection variant="muted">
        <SectionIntro
          kicker="How we work"
          title={<>Discover, design, build, optimize, scale — without chaos.</>}
          description="A clear phased model so stakeholders always know what ships when, and how it ties to revenue."
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {processSteps.map((s) => (
            <li
              key={s.n}
              className="card-soft flex flex-col border-l-[3px] border-l-primary bg-white/95 pl-1 sm:border-l-4 sm:pl-2"
            >
              <span className="font-display text-xs font-extrabold tracking-[0.2em] text-primary">{s.n}</span>
              <h3 className="font-display mt-3 text-lg font-bold text-navy-deep">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* Service areas — purpose: local intent + internal discovery */}
      <PageSection>
        <SectionIntro
          kicker="Nationwide"
          title={<>Local SEO and service pages for every state you serve.</>}
          description="Explore state hubs and city-level programs — built for high-intent searches and answer-engine visibility."
        />
        <div className="flex flex-wrap gap-2">
          {priorityStates.map((s) => (
            <Link
              key={s.slug}
              to={`/service-areas/${s.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-navy-deep shadow-sm transition hover:border-primary/50 hover:bg-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/80" aria-hidden />
              {s.name}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/service-areas"
            className="inline-flex items-center gap-2 font-semibold text-primary transition hover:gap-3 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View all service areas
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </PageSection>

      <HomeFaqSection items={homeFaqs} />

      {/* Final CTA — purpose: single high-conversion close */}
      <PageSection className="bg-transparent">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-primary px-8 py-14 text-white shadow-glow sm:px-12 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-primary/30 blur-3xl" aria-hidden />
          <div className="relative">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">Next step</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
              Let’s plan your next digital chapter.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88 sm:text-lg">
              Tell us about your business and goals. We’ll respond with a concise plan covering websites, SEO, AEO, and AI
              automation — scoped for outcomes, not buzzwords.
            </p>
          </div>
          <div className="relative mt-10 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col lg:items-stretch">
            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-center font-bold text-primary shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start your project
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-white/50 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Meet the agency
            </Link>
          </div>
        </div>
      </PageSection>
    </main>
    <Footer />
  </>
);

export default Index;
