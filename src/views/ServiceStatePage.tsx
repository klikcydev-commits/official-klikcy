"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getService } from "@/lib/services";
import { getState } from "@/lib/states";
import { buildServiceStateContent } from "@/lib/content";
import { buildServiceStateAeoSections, visibleServiceStateFaqs } from "@/lib/geo-aeo-content";
import { getCitiesForState } from "@/lib/cities";

interface ServiceStatePageProps {
  serviceSlug: string;
  stateSlug: string;
}

const ServiceStatePage = ({ serviceSlug, stateSlug }: ServiceStatePageProps) => {
  const service = getService(serviceSlug)!;
  const state = getState(stateSlug)!;

  const sections = buildServiceStateContent(service, state);
  const aeoSections = buildServiceStateAeoSections(service, state);
  const faqs = visibleServiceStateFaqs(service, state);

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: state.name, href: `/service-areas/${state.slug}` }, { name: service.name }]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{state.name} · {state.abbr}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{service.name} serving businesses in {state.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Klikcy delivers {service.focusKeyword} for companies across {state.name} — remote-first nationwide delivery available for every metro in the state.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Get a {state.name} quote <ArrowRight className="h-4 w-4" /></Link>
              <Link href={`/services/${service.slug}`} className="btn-secondary">About this service</Link>
            </div>
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
            {sections.map((sec, i) => (
              <div key={i}>
                <h2>{sec.h}</h2>
                {sec.p && <p>{sec.p}</p>}
                {sec.list && <ul>{sec.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </div>
            ))}
            <h2>Common questions about {service.name} in {state.name}</h2>
            {faqs.map((f) => (
              <div key={f.q} className="mb-5">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <span className="micro-label">{state.name} cities</span>
            <h2 className="mt-3 text-3xl font-bold">{service.name} in {state.name} cities</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {getCitiesForState(state).map((c) => (
                <Link key={c.slug} href={`/${service.slug}/${state.slug}/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">
                  {service.name} in {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold">Ready to start {service.name.toLowerCase()} in {state.name}?</h2>
            <p className="mt-3 text-muted-foreground">Tell us about your business — we will respond with a clear plan.</p>
            <Link href="/contact" className="btn-primary mt-6">Get Free Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceStatePage;
