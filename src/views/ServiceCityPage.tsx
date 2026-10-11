import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { getService } from "@/lib/services";
import { getCity, getCitiesForState } from "@/lib/cities";
import { shortTimeZone } from "@/lib/state-copy";

/** Not indexed (see lib/seo/indexing.ts). Exists for visitors and old links; points to the full service page. */
export default function ServiceCityPage({
  serviceSlug,
  stateSlug,
  citySlug,
}: {
  serviceSlug: string;
  stateSlug: string;
  citySlug: string;
}) {
  const service = getService(serviceSlug)!;
  const city = getCity(stateSlug, citySlug)!;
  const others = getCitiesForState(city.state).filter((c) => c.slug !== city.slug);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={`${service.name} in ${city.name}, ${city.state.abbr}`}
          lede={service.intro}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: city.state.name, href: `/service-areas/${city.state.slug}` },
            { name: city.name, href: `/service-areas/${city.state.slug}/${city.slug}` },
            { name: service.name },
          ]}
        >
          <Link href="/contact" className="btn btn-primary">
            Get a quote
          </Link>
          <Link href={`/services/${service.slug}`} className="btn btn-secondary">
            Full details on {service.name}
          </Link>
        </PageHero>

        <section className="section" aria-labelledby="remote-heading">
          <div className="wrap ledger">
            <SectionHead id="remote-heading" title={`Working with ${city.name} businesses`} />
            <div className="prose-k">
              <p>
                We work remotely with businesses in {city.name} and across {city.state.name}, with calls scheduled in{" "}
                {shortTimeZone(city.state)}. There&apos;s no local office to visit, and no travel costs added to your quote.
              </p>
              <p>
                The <Link href={`/services/${service.slug}`} className="link">{service.name} page</Link> explains the work,
                timeline, and pricing in detail.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="included-heading">
          <div className="wrap ledger">
            <SectionHead id="included-heading" title="What's included" />
            <ul className="ticks">
              {service.included.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </section>

        <Faq items={service.faqs.slice(0, 4)} title={`${service.name} questions`} />

        {others.length > 0 ? (
          <section className="section section-mist" aria-labelledby="nearby-heading">
            <div className="wrap ledger">
              <SectionHead id="nearby-heading" title={`Elsewhere in ${city.state.name}`} />
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${service.slug}/${city.state.slug}/${c.slug}`} className="link">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
