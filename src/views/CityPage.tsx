"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCity, getCitiesForState } from "@/lib/cities";
import { services as allServices } from "@/lib/services";
import { buildCityAreaAeoSections, buildCityAreaFaqs } from "@/lib/geo-aeo-content";

const featured = ["custom-website-development", "technical-seo", "ai-automation-services", "shopify-development", "local-seo", "ecommerce-development"];

interface CityPageProps {
  stateSlug: string;
  citySlug: string;
}

const CityPage = ({ stateSlug, citySlug: citySlugStr }: CityPageProps) => {
  const city = getCity(stateSlug, citySlugStr)!;
  const featuredSvcs = allServices.filter((s) => featured.includes(s.slug));
  const otherCities = getCitiesForState(city.state).filter((c) => c.slug !== city.slug);
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

        <section className="section">
          <div className="container-x prose-klikcy max-w-3xl">
            {aeoSections.map((sec) => (
              <div key={sec.h}>
                <h2>{sec.h}</h2>
                <p>{sec.p}</p>
              </div>
            ))}
          </div>
        </section>

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
          </div>
        </section>

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x prose-klikcy max-w-3xl">
            <h2>Common questions about Klikcy in {city.name}, {city.state.abbr}</h2>
            {faqs.map((f) => (
              <div key={f.q} className="mb-5">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {otherCities.length > 0 && (
          <section className="section">
            <div className="container-x">
              <span className="micro-label">Also in {city.state.name}</span>
              <h2 className="mt-3 text-3xl font-bold">Other {city.state.name} cities we serve</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {otherCities.map((c) => (
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
