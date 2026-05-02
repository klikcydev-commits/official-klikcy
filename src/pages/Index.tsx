import { Link } from "react-router-dom";
import { ArrowRight, Code2, Search, Bot, ShoppingBag, Layers, Palette, TrendingUp, Server, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { categories } from "@/lib/categories";
import { priorityStates } from "@/lib/states";
import { orgSchema, websiteSchema, faqSchema } from "@/lib/schema";

const iconMap: Record<string, any> = { Code2, Search, Bot, ShoppingBag, Layers, Palette, TrendingUp, Server };

const trustItems = [
  "SEO-Ready Websites",
  "Scalable Next.js Architecture",
  "AI Automation Workflows",
  "Conversion-Focused UI/UX",
  "Technical SEO Foundation",
  "Data-Driven Growth",
];

const processSteps = [
  { n: "01", t: "Discover", d: "We map goals, audience, technical context and growth levers." },
  { n: "02", t: "Design", d: "Brand-aligned UI/UX with conversion and SEO baked in." },
  { n: "03", t: "Build", d: "Modern stacks — Next.js, WordPress, Shopify — engineered for speed." },
  { n: "04", t: "Optimize", d: "Technical SEO, AEO, schema and Core Web Vitals tuning." },
  { n: "05", t: "Scale", d: "AI automations, programmatic SEO and ongoing growth systems." },
];

const homeFaqs = [
  { q: "Where is Klikcy based?", a: "Klikcy is a remote-first digital agency serving clients across the United States — all 50 states and Washington DC." },
  { q: "What services does Klikcy offer?", a: "Website development, SEO and AEO, AI automation, e-commerce, app and software development, branding, UI/UX, digital marketing and technical hosting." },
  { q: "Do you work with small businesses and enterprise?", a: "Yes — from local services and DTC brands to SaaS startups and enterprise marketing teams." },
  { q: "How long does a typical project take?", a: "Marketing sites in 4–8 weeks, e-commerce in 6–10 weeks, web apps in 8–16 weeks. We provide a fixed timeline after discovery." },
  { q: "Do you provide SEO and AEO together?", a: "Yes — our SEO programs are built for both Google rankings and AI engine citations (ChatGPT, Gemini, Perplexity, AI Overviews)." },
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
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-x section">
          <div className="mx-auto max-w-4xl text-center animate-fade-up">
            <span className="micro-label">Digital Agency · USA</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Websites, SEO, AI Automation &<br className="hidden sm:block" />
              <span className="gradient-text"> Digital Growth</span> for Modern Businesses
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Klikcy builds scalable websites, SEO systems, AI automations, e-commerce platforms and digital solutions for businesses across the United States.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">Request a Strategy Call <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/categories/web-development" className="btn-secondary">View Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-border bg-white">
        <div className="container-x py-12">
          <div className="text-center"><span className="micro-label">Built for Digital Growth</span></div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {trustItems.map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-3 text-sm font-medium text-navy-deep">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="micro-label">What We Do</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Eight practices, one growth partner.</h2>
            <p className="mt-3 text-muted-foreground">From websites and SEO to AI automation and e-commerce — Klikcy delivers across the full digital stack.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const Icon = iconMap[c.icon] || Code2;
              return (
                <Link key={c.slug} to={`/categories/${c.slug}`} className="card-soft group block">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-[hsl(var(--soft-bg))]">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="micro-label">How We Work</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Discover. Design. Build. Optimize. Scale.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((s) => (
              <div key={s.n} className="card-soft">
                <div className="text-sm font-bold text-primary">{s.n}</div>
                <div className="mt-2 text-lg font-bold">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="micro-label">Nationwide Service</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Serving businesses across the United States.</h2>
            <p className="mt-3 text-muted-foreground">A remote-first agency available for companies in every U.S. state and major metro.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {priorityStates.map((s) => (
              <Link key={s.slug} to={`/service-areas/${s.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep transition-colors hover:border-primary hover:bg-accent hover:text-primary">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-white shadow-glow sm:p-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Let's plan your next digital chapter.</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">Tell us about your business. We'll respond with a clear plan for websites, SEO, AEO and AI automation.</p>
            <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Index;
