import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import CityPage from "@/views/CityPage";
import { getCity } from "@/lib/cities";
import { getCityAreaSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { localMarketParams } from "@/content/local-markets";

// Only hand-written priority markets are pre-built; every other city page renders on
// first request and is then cached. City slug aliases redirect at the edge.
export async function generateStaticParams() {
  return localMarketParams();
}

export async function generateMetadata({ params }: { params: { state: string; city: string } }): Promise<Metadata> {
  const city = getCity(params.state, params.city);
  if (!city) return { title: "Not Found" };
  return seoToMetadata(getCityAreaSeo(city));
}

export default function CityRoutePage({ params }: { params: { state: string; city: string } }) {
  const city = getCity(params.state, params.city);
  if (!city) notFound();
  const seo = getCityAreaSeo(city);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <CityPage stateSlug={city.state.slug} citySlug={city.slug} />
    </>
  );
}
