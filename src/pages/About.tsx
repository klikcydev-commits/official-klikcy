import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  MapPin,
  Palette,
  Search,
  Shield,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PageSection, SectionIntro } from "@/components/layout/PageSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getAboutSeo } from "@/lib/seo";
import {
  aboutCta,
  aboutDifferentiators,
  aboutFaqs,
  aboutHero,
  aboutIndustries,
  aboutLocations,
  aboutProcessSteps,
  aboutSeoPhilosophy,
  aboutServiceCards,
  aboutTechStacks,
  aboutTrust,
  aboutWhoWeAre,
} from "@/content/about";
import { faqSchema } from "@/lib/schema";

const diffIcons = [Code2, Search, Shield, MapPin] as const;
const serviceIcons = [Code2, ShoppingBag, Smartphone, Cloud, Bot, Palette] as const;

const aboutSeo = getAboutSeo();

const About = () => (
  <>
    <SEO
      title={aboutSeo.title}
      description={aboutSeo.description}
      keywords={aboutSeo.keywords}
      canonical={aboutSeo.canonical}
      robots={aboutSeo.robots}
      ogImage={aboutSeo.ogImage}
      jsonLd={[...(aboutSeo.jsonLd ?? []), faqSchema(aboutFaqs)]}
    />
    <Header />
    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
    <main id="main-content">
      <section className="bg-gradient-hero">
        <div className="container-x py-14 sm:py-20">
          <span className="micro-label">{aboutHero.kicker}</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{aboutHero.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{aboutHero.lead}</p>
        </div>
      </section>

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="prose-klikcy">
            <h2>{aboutWhoWeAre.title}</h2>
            <p>{aboutWhoWeAre.body}</p>
            <p>
              Klikcy was founded to solve a recurring problem: businesses pay agencies for websites and SEO but rarely
              receive systems that compound into real growth. We engineer websites, SEO/AEO, and AI automations as one
              connected stack—with senior practitioners, async delivery, and measurable outcomes.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutDifferentiators.map((d, i) => {
              const Icon = diffIcons[i] ?? Sparkles;
              return (
                <div key={d.title} className="card-soft">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </PageSection>

      <PageSection variant="muted">
        <SectionIntro
          kicker="What we do"
          title={<>Comprehensive digital solutions tailored to your business.</>}
          description="From custom websites and commerce to mobile apps, SaaS, AI automations, and design — each practice ships with SEO, analytics, and conversion discipline."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aboutServiceCards.map((s, i) => {
            const Icon = serviceIcons[i] ?? Code2;
            return (
              <article key={s.title} className="card-soft flex h-full flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <ul className="mt-4 flex-1 space-y-2" role="list">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={s.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                >
                  Explore <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection>
        <SectionIntro
          kicker="How we work"
          title={<>Discovery → IA/UX → build → QA → launch → optimize.</>}
          description="A transparent cadence so stakeholders see progress weekly — not as a black box."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {aboutProcessSteps.map((step) => (
            <li
              key={step.step}
              className="rounded-[var(--radius-lg)] border border-border bg-card p-5 shadow-card"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">{step.step}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection variant="muted">
        <SectionIntro kicker="Technology" title={<>Platforms and tools we ship with every day.</>} align="center" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutTechStacks.map((stack) => (
            <div key={stack.label} className="rounded-[var(--radius-lg)] border border-border bg-card p-5">
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">{stack.label}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground" role="list">
                {stack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionIntro
              kicker="Nationwide reach"
              title={<>Where we operate</>}
              description="Klikcy supports organizations across the United States with nationwide reach and local relevance."
              align="left"
            />
            <div className="flex flex-wrap gap-2">
              {aboutLocations.map((loc) => (
                <span
                  key={loc}
                  className="rounded-full border border-border bg-[hsl(var(--soft-bg))] px-3 py-1.5 text-xs font-semibold text-foreground/80"
                >
                  {loc}
                </span>
              ))}
            </div>
            <Link
              to="/service-areas"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
            >
              Browse all service areas <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div>
            <SectionIntro kicker="Industries" title={<>Who we build for</>} align="left" />
            <ul className="space-y-2" role="list">
              {aboutIndustries.map((ind) => (
                <li key={ind} className="flex items-center gap-2 text-[length:var(--type-body)] text-foreground/90">
                  <Target className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {ind}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection variant="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">Our SEO philosophy</h2>
            <ul className="mt-4 space-y-3" role="list">
              {aboutSeoPhilosophy.seo.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Our CRO philosophy</h2>
            <ul className="mt-4 space-y-3" role="list">
              {aboutSeoPhilosophy.cro.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionIntro kicker="Trust" title={<>Accessibility, security & privacy</>} align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {aboutTrust.map((t) => (
            <div key={t.title} className="card-soft">
              <h3 className="text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection variant="muted" id="faq">
        <SectionIntro
          align="center"
          kicker="Questions"
          title={<>Straight answers before you reach out.</>}
          description="Common questions about how Klikcy works with teams across the U.S."
        />
        <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card px-2 shadow-card sm:px-4">
          {aboutFaqs.map((f, i) => (
            <AccordionItem key={f.q} value={`about-faq-${i}`} className="border-border px-2 sm:px-3">
              <AccordionTrigger className="py-5 text-left text-[0.95rem] font-semibold leading-snug text-navy-deep hover:no-underline sm:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>

      <section className="surface-dark section bg-gradient-primary text-white">
        <div className="container-x text-center text-white">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{aboutCta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{aboutCta.description}</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary"
          >
            Get Free Quote <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
