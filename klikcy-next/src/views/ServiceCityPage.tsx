"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getService } from "@/lib/services";
import { getCity, getCitiesForState } from "@/lib/cities";
import { buildGeoAeoFaqs, mergeFaqs } from "@/lib/metadata";

interface ServiceCityPageProps {
  serviceSlug: string;
  stateSlug: string;
  citySlug: string;
}

const ServiceCityPage = ({ serviceSlug, stateSlug, citySlug: citySlugStr }: ServiceCityPageProps) => {
  const service = getService(serviceSlug)!;
  const city = getCity(stateSlug, citySlugStr)!;

  const faqs = mergeFaqs(service.faqs, buildGeoAeoFaqs(service, { state: city.state, city }), 8);
  const otherCities = getCitiesForState(city.state).filter((c) => c.slug !== city.slug);

  return (
    <>
      <Header />
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: city.state.name, href: `/service-areas/${city.state.slug}` },
        { name: city.name, href: `/service-areas/${city.state.slug}/${city.slug}` },
        { name: service.name },
      ]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{city.name} · {city.state.abbr}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{service.name} in {city.name}, {city.state.abbr}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{service.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Get a {city.name} quote <ArrowRight className="h-4 w-4" /></Link>
              <Link href={`/${service.slug}/${city.state.slug}`} className="btn-secondary">{service.name} in {city.state.name}</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x prose-klikcy max-w-3xl">
            <h2>{service.name} for {city.name} businesses</h2>
            <p>Klikcy delivers {service.focusKeyword} for companies across {city.name}, {city.state.name}. {city.state.name}'s economy is anchored by {city.state.blurb}, and we tailor every engagement to how {city.name} companies grow online.</p>
            <h2>What's included</h2>
            <ul>{service.included.map((i) => <li key={i}>{i}</li>)}</ul>
            <h2>Technical foundation</h2>
            <ul>{service.technical.map((t) => <li key={t}>{t}</li>)}</ul>
            <h2>Frequently asked questions</h2>
            {faqs.map((f) => (
              <div key={f.q} className="mb-5"><h3>{f.q}</h3><p>{f.a}</p></div>
            ))}
          </div>
        </section>

        {otherCities.length > 0 && (
          <section className="section bg-[hsl(var(--soft-bg))]">
            <div className="container-x">
              <span className="micro-label">Also in {city.state.name}</span>
              <h2 className="mt-3 text-3xl font-bold">{service.name} in nearby cities</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {otherCities.map((c) => (
                  <Link key={c.slug} href={`/${service.slug}/${city.state.slug}/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">
                    {service.name} in {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ServiceCityPage;
