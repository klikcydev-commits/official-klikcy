import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { getCity, getCitiesForState } from "@/lib/cities";
import { getService } from "@/lib/services";
import { getStateServices, shortTimeZone } from "@/lib/state-copy";
import { getLocalMarket, getLocalMarketsForState, type LocalMarket } from "@/content/local-markets";
import type { CityRef } from "@/lib/cities";

/**
 * City hub. Hand-written priority markets (src/content/local-markets.ts) render a full,
 * indexed local page; every other city renders a short noindexed page that points to
 * the state hub.
 */
export default function CityPage({ stateSlug, citySlug }: { stateSlug: string; citySlug: string }) {
  const city = getCity(stateSlug, citySlug)!;
  const market = getLocalMarket(stateSlug, citySlug);
  return market ? <MarketPage city={city} market={market} /> : <GenericCityPage city={city} />;
}

function MarketPage({ city, market }: { city: CityRef; market: LocalMarket }) {
  const siblings = getLocalMarketsForState(city.state.slug).filter((m) => m.city !== city.slug);
  const cityName = (slug: string) => getCitiesForState(city.state).find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={market.h1}
          lede={market.intro}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: city.state.name, href: `/service-areas/${city.state.slug}` },
            { name: city.name },
          ]}
          aside={
            <dl className="sheet text-[0.95rem]">
              <div className="px-5 pb-4 pt-5">
                <dt className="font-semibold">Working with {city.name} businesses</dt>
                <dd className="meta">Remote team, {shortTimeZone(city.state)}</dd>
              </div>
              <div className="sheet-row">
                <dt className="text-sm font-semibold">Areas</dt>
                <dd className="muted leading-snug">{market.areas.join(", ")}</dd>
              </div>
              <div className="sheet-row">
                <dt className="text-sm font-semibold">Office</dt>
                <dd className="muted leading-snug">None locally. We work remotely and never charge for travel.</dd>
              </div>
              <div className="sheet-row">
                <dt className="text-sm font-semibold">Price</dt>
                <dd className="muted leading-snug">A fixed, written quote. Free to ask.</dd>
              </div>
            </dl>
          }
        >
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
          <Link href={`/service-areas/${city.state.slug}`} className="btn btn-secondary">
            About working in {city.state.name}
          </Link>
        </PageHero>

        <section className="section" aria-labelledby="landscape-heading">
          <div className="wrap ledger">
            <SectionHead id="landscape-heading" title={`Doing business online in ${city.name}`} />
            <div className="prose-k">
              {market.landscape.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="needs-heading">
          <div className="wrap">
            <h2 id="needs-heading" className="h2 max-w-[24ch]">
              What {city.name} businesses usually need from us
            </h2>
            <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-3">
              {market.needs.map((need) => (
                <div key={need.title} className="border-t-2 border-ink pt-5">
                  <h3 className="text-lg">{need.title}</h3>
                  <p className="muted mt-2">{need.body}</p>
                  <ul className="mt-3 space-y-1 text-[0.95rem]">
                    {need.services.map((slug) => {
                      const s = getService(slug);
                      return s ? (
                        <li key={slug}>
                          <Link href={`/services/${slug}`} className="link">
                            {s.name}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="search-heading">
          <div className="wrap ledger">
            <SectionHead id="search-heading" title={`How local search works in ${city.name}`} />
            <div className="prose-k">
              <p>{market.search}</p>
              {market.rules ? (
                <>
                  <h3>Rules that affect your website</h3>
                  <p>{market.rules}</p>
                </>
              ) : null}
            </div>
          </div>
        </section>

        <div className="border-t border-line">
          <Faq items={market.faqs} title={`Working with Klikcy in ${city.name}`} />
        </div>

        {siblings.length > 0 ? (
          <section className="section section-mist" aria-labelledby="nearby-heading">
            <div className="wrap ledger">
              <SectionHead id="nearby-heading" title={`More in ${city.state.name}`} />
              <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {siblings.map((m) => (
                  <li key={m.city}>
                    <Link href={`/service-areas/${m.state}/${m.city}`} className="link text-lg font-semibold">
                      {cityName(m.city)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/service-areas/${city.state.slug}`} className="link text-lg font-semibold">
                    All of {city.state.name}
                  </Link>
                </li>
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

function GenericCityPage({ city }: { city: CityRef }) {
  const featured = getStateServices(city.state);
  const others = getCitiesForState(city.state).filter((c) => c.slug !== city.slug);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={`Web development and SEO for ${city.name} businesses`}
          lede={`Klikcy works remotely with businesses in ${city.name}, ${city.state.name}, on websites, search visibility, AI automation, apps, and online stores. Calls are scheduled in ${shortTimeZone(city.state)}.`}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: city.state.name, href: `/service-areas/${city.state.slug}` },
            { name: city.name },
          ]}
        >
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
          <Link href={`/service-areas/${city.state.slug}`} className="btn btn-secondary">
            About working in {city.state.name}
          </Link>
        </PageHero>

        <section className="section" aria-labelledby="services-heading">
          <div className="wrap ledger">
            <SectionHead id="services-heading" title="Where most clients start" />
            <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {featured.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link text-lg font-semibold">
                    {s.name}
                  </Link>
                  <p className="muted mt-1 text-[0.95rem]">{s.shortDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {others.length > 0 ? (
          <section className="section section-mist" aria-labelledby="nearby-heading">
            <div className="wrap ledger">
              <SectionHead id="nearby-heading" title={`Elsewhere in ${city.state.name}`} />
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/service-areas/${city.state.slug}/${c.slug}`} className="link">
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
