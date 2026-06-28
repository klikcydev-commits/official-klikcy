"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getService, getRelatedServices } from "@/lib/services";
import { getCity, getCitiesForState } from "@/lib/cities";
import { buildServiceCityAeoSections, visibleServiceCityFaqs } from "@/lib/geo-aeo-content";

interface ServiceCityPageProps {
  serviceSlug: string;
  stateSlug: string;
  citySlug: string;
}

const ServiceCityPage = ({ serviceSlug, stateSlug, citySlug: citySlugStr }: ServiceCityPageProps) => {
  const service = getService(serviceSlug)!;
  const city = getCity(stateSlug, citySlugStr)!;

  const faqs = visibleServiceCityFaqs(service, city);
  const aeoSections = buildServiceCityAeoSections(service, city);
  const otherCities = getCitiesForState(city.state).filter((c) => c.slug !== city.slug);
  const related = getRelatedServices(service.slug).slice(0, 4);

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
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{service.name} serving businesses in {city.name}, {city.state.abbr}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Klikcy delivers {service.focusKeyword} for companies in {city.name}, {city.state.name} — remote-first nationwide delivery with no local office in {city.name}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Request a {city.name} quote <ArrowRight className="h-4 w-4" /></Link>
              <Link href={`/${service.slug}/${city.state.slug}`} className="btn-secondary">{service.name} in {city.state.name}</Link>
              <Link href={`/services/${service.slug}`} className="btn-secondary">About {service.name}</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x prose-klikcy max-w-3xl">
            {aeoSections.map((sec) => (
              <div key={sec.h}>
                <h2>{sec.h}</h2>
                <p>{sec.p}</p>
                {sec.list && <ul>{sec.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </div>
            ))}
            <h2>Common questions about {service.name} in {city.name}, {city.state.abbr}</h2>
            {faqs.map((f) => (
              <div key={f.q} className="mb-5"><h3>{f.q}</h3><p>{f.a}</p></div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="section bg-[hsl(var(--soft-bg))]">
            <div className="container-x">
              <span className="micro-label">Related in {city.name}</span>
              <h2 className="mt-3 text-3xl font-bold">Related services for {city.name} businesses</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}/${city.state.slug}/${city.slug}`} className="card-soft block">
                    <h3 className="font-bold">{s.name} in {city.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {otherCities.length > 0 && (
          <section className="section">
            <div className="container-x">
              <span className="micro-label">Also in {city.state.name}</span>
              <h2 className="mt-3 text-3xl font-bold">{service.name} in nearby {city.state.name} cities</h2>
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

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold">Start {service.name.toLowerCase()} in {city.name}</h2>
            <p className="mt-3 text-muted-foreground">Tell us about your {city.name} business — we will respond with scope, timeline, and next steps.</p>
            <Link href="/contact" className="btn-primary mt-6">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceCityPage;
