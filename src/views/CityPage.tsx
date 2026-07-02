import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCity } from "@/lib/cities";
import { getService, services as allServices } from "@/lib/services";
import { pickNearbyCities, pickSiblingServices } from "@/lib/service-city-content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { aeoSectionsToFaqs, buildCityAreaAeoSections, buildCityAreaFaqs } from "@/lib/geo-aeo-content";

const featured = [
  "custom-website-development",
  "technical-seo",
  "ai-chatbot-development",
  "shopify-development",
  "local-seo",
  "shopify-store-development",
] as const;

interface CityPageProps {
  stateSlug: string;
  citySlug: string;
}

const CityPage = ({ stateSlug, citySlug: citySlugStr }: CityPageProps) => {
  const city = getCity(stateSlug, citySlugStr)!;
  const anchorService = getService("custom-website-development") ?? allServices[0]!;
  const featuredSvcs = allServices.filter((s) => (featured as readonly string[]).includes(s.slug));
  const areaServices = pickSiblingServices(anchorService, city, 6);
  const nearbyCities = pickNearbyCities(anchorService, city, 8);
  const aeoSections = buildCityAreaAeoSections(city);
  const faqs = buildCityAreaFaqs(city);

  return (
    <>
      <Header />
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Service Areas", href: "/service-areas" },
        { name: city.state.name, href: `/service-areas/${city.state.slug}` },
        { name: city.name },
      ]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{city.state.name} · {city.state.abbr}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Digital agency serving businesses in {city.name}, {city.state.abbr}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Klikcy is a remote-first digital agency available for companies in {city.name}, {city.state.name}. We partner on websites, SEO/AEO, AI automation, and e-commerce — serving {city.name} businesses without a local office in the city.
            </p>
            <Link href="/contact" className="btn-primary mt-7">Request a quote for {city.name} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <FaqAccordion
          faqs={aeoSectionsToFaqs(aeoSections)}
          heading={`About Klikcy in ${city.name}, ${city.state.abbr}`}
          idPrefix={`aeo-city-${city.state.slug}-${city.slug}`}
          itemIdKind="aeo"
          linkContext={{
            state: { name: city.state.name, slug: city.state.slug },
            city: { name: city.name, slug: city.slug, stateSlug: city.state.slug },
          }}
        />

        <section className="section">
          <div className="container-x">
            <span className="micro-label">Services in {city.name}</span>
            <h2 className="mt-3 text-3xl font-bold">What Klikcy delivers for {city.name} businesses</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredSvcs.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/${city.state.slug}/${city.slug}`} className="card-soft group block">
                  <h3 className="text-lg font-bold">{s.name} in {city.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">View <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
            {areaServices.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {areaServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}/${city.state.slug}/${city.slug}`}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary"
                  >
                    {s.name} in {city.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <FaqAccordion
          faqs={faqs}
          idPrefix={`city-${city.state.slug}-${city.slug}`}
          itemIdKind="faq"
          linkContext={{
            state: { name: city.state.name, slug: city.state.slug },
            city: { name: city.name, slug: city.slug, stateSlug: city.state.slug },
          }}
        />

        {nearbyCities.length > 0 && (
          <section className="section">
            <div className="container-x">
              <span className="micro-label">Also in {city.state.name}</span>
              <h2 className="mt-3 text-3xl font-bold">Nearby areas we serve in {city.state.name}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {nearbyCities.map((c) => (
                  <Link key={c.slug} href={`/service-areas/${city.state.slug}/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">{c.name}</Link>
                ))}
              </div>
              <Link href={`/service-areas/${city.state.slug}`} className="mt-6 inline-flex text-sm font-semibold text-primary">All of {city.state.name} →</Link>
            </div>
          </section>
        )}

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold">Ready to work with Klikcy in {city.name}?</h2>
            <p className="mt-3 text-muted-foreground">Remote-first delivery for {city.name}, {city.state.abbr} — tell us about your project and we will respond with a clear plan.</p>
            <Link href="/contact" className="btn-primary mt-6">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CityPage;
