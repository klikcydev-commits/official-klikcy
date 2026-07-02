import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getState } from "@/lib/states";
import { categories } from "@/lib/categories";
import { services as allServices } from "@/lib/services";
import { getCitiesForState } from "@/lib/cities";
import { stateIntroContent } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { aeoSectionsToFaqs, buildStateAreaAeoSections, buildStateAreaFaqs } from "@/lib/geo-aeo-content";

const featured = [
  "custom-website-development",
  "technical-seo",
  "ai-chatbot-development",
  "shopify-development",
  "local-seo",
  "shopify-store-development",
] as const;

interface StatePageProps {
  slug: string;
}

const StatePage = ({ slug }: StatePageProps) => {
  const state = getState(slug)!;
  const c = stateIntroContent(state);
  const featuredSvcs = allServices.filter((s) => (featured as readonly string[]).includes(s.slug));
  const aeoSections = buildStateAreaAeoSections(state);
  const faqs = buildStateAreaFaqs(state);

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: state.name }]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{state.region} · {state.abbr}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Digital agency serving businesses in {state.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{c.intro}</p>
            <Link href="/contact" className="btn-primary mt-7">Work with Klikcy in {state.name} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <FaqAccordion
          faqs={aeoSectionsToFaqs(aeoSections)}
          heading={`About Klikcy in ${state.name}`}
          idPrefix={`aeo-state-${state.slug}`}
          itemIdKind="aeo"
          linkContext={{ state: { name: state.name, slug: state.slug } }}
        />

        <section className="section">
          <div className="container-x">
            <span className="micro-label">Services in {state.name}</span>
            <h2 className="mt-3 text-3xl font-bold">What Klikcy delivers across {state.name}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredSvcs.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/${state.slug}`} className="card-soft group block">
                  <h3 className="text-lg font-bold">{s.name} in {state.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">View <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x">
            <span className="micro-label">Cities served</span>
            <h2 className="mt-3 text-3xl font-bold">{state.name} cities we serve</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {getCitiesForState(state).map((c) => (
                <Link key={c.slug} href={`/service-areas/${state.slug}/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm text-navy-deep hover:border-primary hover:text-primary">{c.name}</Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Remote-first delivery — we serve every city in {state.name}, not just the ones listed above.</p>
          </div>
        </section>

        <FaqAccordion
          faqs={faqs}
          idPrefix={`state-${state.slug}`}
          itemIdKind="faq"
          linkContext={{ state: { name: state.name, slug: state.slug } }}
        />

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x">
            <span className="micro-label">Practices</span>
            <h2 className="mt-3 text-3xl font-bold">Explore Klikcy practices</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/categories/${cat.slug}`} className="card-soft">
                  <h3 className="text-lg font-bold">{cat.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cat.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold">Ready to work with Klikcy in {state.name}?</h2>
            <p className="mt-3 text-muted-foreground">Nationwide remote-first delivery — request a quote and we will respond with a practical plan.</p>
            <Link href="/contact" className="btn-primary mt-6">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StatePage;
