import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getService } from "@/lib/services";
import { getState } from "@/lib/states";
import { serviceSchema, faqSchema, breadcrumbSchema, SITE } from "@/lib/schema";
import { buildServiceStateContent } from "@/lib/content";
import { getCitiesForState } from "@/lib/cities";

const ServiceStatePage = () => {
  const { service: serviceSlug = "", state: stateSlug = "" } = useParams();
  const service = getService(serviceSlug);
  const state = getState(stateSlug);
  if (!service || !state) return <Navigate to="/404" replace />;

  const url = `${SITE.url}/${service.slug}/${state.slug}`;
  const sections = buildServiceStateContent(service, state);
  const title = `${service.name} in ${state.name} | Klikcy`;
  const description = `${service.name} for ${state.name} businesses. ${service.shortDescription} Klikcy serves ${state.cities.slice(0, 3).join(", ")} and every ${state.name} city.`;

  const faqs = [
    { q: `Do you offer ${service.name.toLowerCase()} in ${state.name}?`, a: `Yes — Klikcy delivers ${service.name.toLowerCase()} for businesses across ${state.name}, including ${state.cities.slice(0, 4).join(", ")} and every other city.` },
    { q: `How does Klikcy work with ${state.name} clients remotely?`, a: `We run discovery, design and delivery over video and async tools. ${state.name} clients get the same quality and timelines as on-site engagements, without travel overhead.` },
    ...service.faqs.slice(0, 3),
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={url}
        jsonLd={[
          serviceSchema(service),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: state.name, url: `${SITE.url}/service-areas/${state.slug}` },
            { name: `${service.name} in ${state.name}`, url },
          ]),
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: state.name, href: `/service-areas/${state.slug}` }, { name: service.name }]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{state.name} · {state.abbr}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{service.name} in {state.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{service.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get a {state.name} quote <ArrowRight className="h-4 w-4" /></Link>
              <Link to={`/services/${service.slug}`} className="btn-secondary">About this service</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x prose-klikcy max-w-3xl">
            {sections.map((sec, i) => (
              <div key={i}>
                <h2>{sec.h}</h2>
                {sec.p && <p>{sec.p}</p>}
                {sec.list && <ul>{sec.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </div>
            ))}
            <h2>Frequently asked questions</h2>
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
                <Link key={c.slug} to={`/${service.slug}/${state.slug}/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary">
                  {service.name} in {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold">Ready to start {service.name.toLowerCase()} in {state.name}?</h2>
            <p className="mt-3 text-muted-foreground">Tell us about your business — we'll respond with a clear plan.</p>
            <Link to="/contact" className="btn-primary mt-6">Request a Strategy Call <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceStatePage;
