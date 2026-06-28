"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCity, getCitiesForState } from "@/lib/cities";
import { services as allServices } from "@/lib/services";

const featured = ["custom-website-development", "technical-seo", "ai-automation-services", "shopify-development", "local-seo", "ecommerce-development"];

interface CityPageProps {
  stateSlug: string;
  citySlug: string;
}

const CityPage = ({ stateSlug, citySlug: citySlugStr }: CityPageProps) => {
  const city = getCity(stateSlug, citySlugStr)!;
  const featuredSvcs = allServices.filter((s) => featured.includes(s.slug));
  const otherCities = getCitiesForState(city.state).filter((c) => c.slug !== city.slug);

  return (
    <>
      <Header />
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: city.state.name, href: `/service-areas/${city.state.slug}` },
        { name: city.name },
      ]} />
      <main>
        <section className="bg-gradient-hero">
          <div className="container-x py-14 sm:py-20">
            <span className="micro-label">{city.state.name} · {city.state.abbr}</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Digital agency services in {city.name}, {city.state.abbr}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Klikcy partners with {city.name} businesses on websites, SEO, AEO, AI automation and e-commerce. {city.state.name}'s economy is shaped by {city.state.blurb}, and our work helps {city.name} companies in those industries grow online.
            </p>
            <Link href="/contact" className="btn-primary mt-7">Work with Klikcy in {city.name} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <span className="micro-label">Services in {city.name}</span>
            <h2 className="mt-3 text-3xl font-bold">What Klikcy delivers in {city.name}</h2>
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

        {otherCities.length > 0 && (
          <section className="section bg-[hsl(var(--soft-bg))]">
            <div className="container-x">
              <span className="micro-label">Nearby</span>
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
      </main>
      <Footer />
    </>
  );
};

export default CityPage;
