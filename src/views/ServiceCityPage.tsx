import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getService } from "@/lib/services";
import { getCity } from "@/lib/cities";
import { FaqAccordion } from "@/components/FaqAccordion";
import { aeoSectionsToFaqs, buildServiceCityAeoSections } from "@/lib/geo-aeo-content";
import { buildServiceCityContext } from "@/lib/seo/indexable";
import {
  buildLocalMarketContext,
  buildServiceCityBenefits,
  buildServiceCityCta,
  buildServiceCityIntro,
  pickNearbyCities,
  pickServiceCityPageFaqs,
  pickSiblingServices,
} from "@/lib/service-city-content";

interface ServiceCityPageProps {
  serviceSlug: string;
  stateSlug: string;
  citySlug: string;
}

const ServiceCityPage = ({ serviceSlug, stateSlug, citySlug: citySlugStr }: ServiceCityPageProps) => {
  const service = getService(serviceSlug)!;
  const city = getCity(stateSlug, citySlugStr)!;
  const ctx = buildServiceCityContext(service, city);

  const intro = buildServiceCityIntro(ctx);
  const benefits = buildServiceCityBenefits(ctx);
  const cta = buildServiceCityCta(ctx);
  const localMarket = buildLocalMarketContext(ctx);
  const faqs = pickServiceCityPageFaqs(ctx);
  const aeoSections = buildServiceCityAeoSections(service, city);
  const nearbyCities = pickNearbyCities(service, city);
  const siblingServices = pickSiblingServices(service, city);

  return (
    <>
      <Header />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: service.name, href: `/services/${service.slug}` },
          { name: city.state.name, href: `/${service.slug}/${city.state.slug}` },
          { name: city.name },
        ]}
      />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">
              {city.name} · {city.state.abbr}
            </span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
              {service.name} serving businesses in {city.name}, {city.state.abbr}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Request a {city.name} quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${service.slug}/${city.state.slug}`} className="btn-secondary">
                {service.name} in {city.state.name}
              </Link>
              <Link href={`/services/${service.slug}`} className="btn-secondary">
                About {service.name}
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-x max-w-3xl">
            <h2 className="text-3xl font-bold">{benefits.heading}</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              {benefits.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {localMarket && (
          <section className="section bg-[hsl(var(--soft-bg))]">
            <div className="container-x max-w-3xl">
              <span className="micro-label">Local market context</span>
              <p className="mt-3 text-lg text-muted-foreground">{localMarket}</p>
            </div>
          </section>
        )}

        <FaqAccordion
          faqs={aeoSectionsToFaqs(aeoSections)}
          heading={`About ${service.name} in ${city.name}, ${city.state.abbr}`}
          idPrefix={`aeo-svc-city-${service.slug}-${city.state.slug}-${city.slug}`}
          itemIdKind="aeo"
          linkContext={{
            state: { name: city.state.name, slug: city.state.slug },
            city: { name: city.name, slug: city.slug, stateSlug: city.state.slug },
            service: { name: service.name, slug: service.slug },
          }}
        />

        <FaqAccordion
          faqs={faqs}
          heading="Frequently Asked Questions"
          idPrefix={`svc-city-${service.slug}-${city.state.slug}-${city.slug}`}
          itemIdKind="faq"
          linkContext={{
            state: { name: city.state.name, slug: city.state.slug },
            city: { name: city.name, slug: city.slug, stateSlug: city.state.slug },
            service: { name: service.name, slug: service.slug },
          }}
        />

        {siblingServices.length > 0 && (
          <section className="section bg-[hsl(var(--soft-bg))]">
            <div className="container-x">
              <span className="micro-label">Other services</span>
              <h2 className="mt-3 text-3xl font-bold">Other services in {city.name}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {siblingServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}/${city.state.slug}/${city.slug}`}
                    className="card-soft block"
                  >
                    <h3 className="font-bold">
                      {s.name} in {city.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {nearbyCities.length > 0 && (
          <section className="section">
            <div className="container-x">
              <span className="micro-label">Nearby areas</span>
              <h2 className="mt-3 text-3xl font-bold">Nearby areas we serve in {city.state.name}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {nearbyCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${service.slug}/${city.state.slug}/${c.slug}`}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-primary hover:text-primary"
                  >
                    {service.name} in {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section bg-[hsl(var(--soft-bg))]">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold">{cta.title}</h2>
            <p className="mt-3 text-muted-foreground">{cta.body}</p>
            <Link href="/contact" className="btn-primary mt-6">
              Get Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceCityPage;
