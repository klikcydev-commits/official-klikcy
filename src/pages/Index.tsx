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
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomePackagesSection } from "@/components/home/HomePackagesSection";
import { HomeTechnologySection } from "@/components/home/HomeTechnologySection";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeStatsRow } from "@/components/sections/HomeStatsRow";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { SplitText } from "@/components/motion/SplitText";
import { FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { categories } from "@/lib/categories";
import { priorityStates } from "@/lib/states";
import { orgSchema, websiteSchema, faqSchema } from "@/lib/schema";
import {
  credibilityStrip,
  experienceTiles,
  homeFaqs,
  impactCards,
  processSteps,
  whyPillars,
  homeStats,
} from "@/content/home";
import { cn } from "@/utils/cn";

const categoryIcons: Record<string, LucideIcon> = {
  Code2,
  Search,
  Bot,
  ShoppingBag,
  Layers,
  Palette,
  TrendingUp,
  Server,
};

const tileIcons: Record<string, LucideIcon> = {
  zap: Zap,
  search: Search,
  activity: Activity,
  trending: TrendingUp,
  cpu: Cpu,
  chart: BarChart3,
  workflow: Workflow,
  palette: Palette,
  code: Code2,
};

function iconFor(key: string): LucideIcon {
  return tileIcons[key] ?? Code2;
}

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
      <HomeHero />

      {/* Asymmetric credibility — breaks centered rhythm */}
      <section className="relative border-b border-border bg-[hsl(var(--card))] py-[var(--space-section-y)]" aria-labelledby="cred-heading">
        <div className="k-container">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <h2 id="cred-heading" className="font-display text-[length:var(--type-h2)] font-bold tracking-tight text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]">
                <span className="micro-label mb-3 block text-[length:var(--type-label)] font-bold tracking-[0.2em]">Proof in the craft</span>
                <span className="block leading-[var(--leading-tight)]"><SplitText type="words">Engineered for outcomes you can brief an exec on.</SplitText></span>
              </h2>
            </div>
            <StaggerReveal className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {credibilityStrip.map((item) => (
                <li
                  key={item.title}
                  data-reveal-item
                  className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border/80 bg-[hsl(var(--soft-bg))] p-5 transition duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-glow-brand)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                  <p className="mt-3 font-display text-[length:var(--type-body)] font-bold text-[hsl(var(--navy-deep))] dark:text-[hsl(var(--foreground))]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      <HomeStatsRow items={homeStats} />

      <PageSection innerClassName="k-container section">
        <SectionIntro
          kicker="Capabilities"
          title={<>Eight practices. One continuous growth surface.</>}
          description="Each discipline is led with senior-level rigor — designed to compound: your site, your search footprint, your automation layer, and your brand all move together."
        />
        <StaggerReveal className="mt-4 grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((c, i) => {
            const Icon = categoryIcons[c.icon] ?? Code2;
            const featured = i === 0 || i === 3;
            return (
              <Link
                key={c.slug}
                data-reveal-item
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
                  <span className="rounded-full border border-border bg-white/80 px-3 py-1 font-mono text-[length:var(--type-label)] font-bold uppercase tracking-widest text-muted-foreground">
                    {c.short}
                  </span>
                </div>
                <div className={cn("mt-5 flex flex-1 flex-col xl:mt-0", featured && "xl:justify-between")}>
                  <div>
                    <h3 className="font-display text-[length:var(--type-h3)] font-bold tracking-tight text-navy-deep dark:text-white"><SplitText type="words">{c.name}</SplitText></h3>
                    <p className="mt-3 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground">{c.tagline}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-[length:var(--type-body)] font-bold text-primary transition group-hover:gap-3">
                    Enter practice <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </StaggerReveal>
      </PageSection>

      {/* Offset dark panel — bleeds visually */}
      <PageSection variant="ink" className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[min(100vw,600px)] w-[min(100vw,600px)] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/15 blur-[120px]" aria-hidden />
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-end">
          <SectionIntro
            tone="onDark"
            kicker="Why Klikcy"
            title={<>We are not another vendor list — we are the team that ships the whole arc.</>}
            description="Most agencies stop at deliverables. Klikcy connects strategy, interface, engineering, search, automation, and infrastructure so your digital presence performs as a single system."
          />
          <p className="hidden font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.3em] text-primary-light lg:block lg:pb-2">
            Systems over slides
          </p>
        </div>
        <div className="relative mt-4 grid gap-5 md:grid-cols-2">
          {whyPillars.map((p) => (
            <article key={p.title} className="bento-tile">
              <h3 className="font-display text-[length:var(--type-h3)] font-bold text-white"><SplitText type="words">{p.title}</SplitText></h3>
              <FadeUp delay={100}><p className="mt-3 text-[length:var(--type-body)] leading-[var(--leading-body)] text-white/65">{p.body}</p></FadeUp>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection variant="muted" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px timeline-rail opacity-60" aria-hidden />
        <div className="max-w-xl">
          <SectionIntro
            kicker="Process"
            title={<>Discover → design → build → optimize → launch → grow.</>}
            description="A modern, transparent cadence so stakeholders see progress weekly — not as a black box."
          />
        </div>
        <ol className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4" role="list">
          {processSteps.map((s, idx) => (
            <li
              key={s.label}
              className="relative rounded-[var(--radius-lg)] border border-border/80 bg-[hsl(var(--card))] p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-[length:var(--type-label)] font-bold text-primary">
                  {s.n}
                </span>
                {idx < processSteps.length - 1 ? (
                  <span className="hidden font-mono text-[length:var(--type-label)] text-muted-foreground/50 lg:inline" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-display text-[length:var(--type-body)] font-bold text-navy-deep dark:text-[hsl(var(--foreground))]"><SplitText type="words">{s.label}</SplitText></h3>
              <FadeUp delay={100}><p className="mt-2 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground">{s.copy}</p></FadeUp>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection variant="navy" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" aria-hidden />
        <SectionIntro
          tone="onDark"
          kicker="Impact model"
          title={<>What changes when Klikcy owns the full stack.</>}
          description="We do not publish inflated metrics — we engineer conditions for measurable lift: speed, clarity, discoverability, and operational leverage."
        />
        <ul className="relative mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {impactCards.map(({ title, body, iconKey }) => {
            const Icon = iconFor(iconKey);
            return (
              <li key={title} className="bento-tile flex flex-col">
                <Icon className="h-5 w-5 text-primary-light" aria-hidden />
                <h3 className="mt-4 font-display text-[length:var(--type-body)] font-bold text-white"><SplitText type="words">{title}</SplitText></h3>
                <FadeUp delay={100} className="flex-1"><p className="mt-2 text-[length:var(--type-body)] leading-[var(--leading-body)] text-white/65">{body}</p></FadeUp>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionIntro
              kicker="Experience"
              title={<>Design, code, search, automation, analytics, and uptime — orchestrated.</>}
              description="Klikcy is built for teams that want craft-level creative direction with principal-engineer execution across the entire lifecycle."
            />
          </div>
          <p className="font-display text-[length:var(--type-label)] font-bold uppercase tracking-[0.24em] text-primary lg:col-span-5 lg:text-right">
            Tilt cards on desktop
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experienceTiles.map(({ title, body, iconKey }) => {
            const Icon = iconFor(iconKey);
            return (
              <TiltCard
                key={title}
                className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border/80 bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--soft-bg))] p-6 shadow-card"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" aria-hidden />
                <Icon className="relative h-6 w-6 text-primary" aria-hidden />
                <h3 className="relative mt-4 font-display text-[length:var(--type-h3)] font-bold text-navy-deep dark:text-[hsl(var(--foreground))]"><SplitText type="words">{title}</SplitText></h3>
                <FadeUp delay={100}><p className="relative mt-2 text-[length:var(--type-body)] leading-[var(--leading-body)] text-muted-foreground">{body}</p></FadeUp>
              </TiltCard>
            );
          })}
        </div>
      </PageSection>

      <PageSection variant="muted">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            className="lg:max-w-xl"
            kicker="Nationwide"
            title={<>State and city programs tuned for local intent.</>}
            description="Explore hubs for priority markets — built for high-intent local queries and answer-engine visibility."
          />
          <Link
            to="/service-areas"
            className="inline-flex shrink-0 items-center gap-2 self-start font-bold text-primary transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:self-end"
          >
            Browse all service areas
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {priorityStates.map((s) => (
            <Link
              key={s.slug}
              to={`/service-areas/${s.slug}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-[hsl(var(--card))] px-4 py-2.5 text-[length:var(--type-body)] font-semibold text-navy-deep shadow-sm transition hover:border-primary/40 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-[hsl(var(--foreground))]"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              {s.name}
            </Link>
          ))}
        </div>
      </PageSection>

      <HomeTechnologySection />

      <HomePackagesSection />

      <HomeFaqSection items={homeFaqs} />

      <PageSection className="bg-transparent pb-[var(--space-section-y-lg)] pt-4">
        <div className="k-container">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-gradient-to-br from-navy via-ink to-void px-8 py-16 text-white shadow-[0_40px_100px_-40px_hsl(184_100%_37%/0.45)] sm:px-14 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -right-[10%] top-0 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-primary/15 blur-[90px]" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-left sm:text-center">
              <p className="font-display text-[length:var(--type-eyebrow)] font-bold uppercase tracking-[0.28em] text-primary-light">Let’s build</p>
              <h2 className="font-display mt-4 text-[length:var(--type-h2)] font-extrabold leading-[var(--leading-tight)] tracking-tight">
                Ready for a digital system that looks, reads, and performs like a category leader?
              </h2>
              <p className="mt-5 text-[length:var(--type-body-lg)] leading-[var(--leading-body)] text-white/75">
                Share your goals — we’ll respond with a focused plan across web, SEO/AEO, automation, and hosting. No jargon walls, no mystery pricing dance.
              </p>
              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
                <MagneticButton>
                  <Link to="/contact" className="btn-primary min-h-[48px] min-w-[200px] justify-center">
                    Book a strategy call
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/about" className="btn-ghost-light min-h-[48px] min-w-[200px] justify-center">
                    Meet Klikcy
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
    <Footer />
  </>
);

export default Index;
