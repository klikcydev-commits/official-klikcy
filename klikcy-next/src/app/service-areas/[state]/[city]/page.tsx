import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCitySlugRedirect, getCity, getCitiesForState } from "@/lib/cities";
import { JsonLd } from "@/components/JsonLd";
import { LegacyRedirect } from "@/components/layout/LegacyRedirect";
import CityPage from "@/views/CityPage";
import { getCityAreaSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { states } from "@/lib/states";

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = [];
  for (const state of states) {
    for (const city of getCitiesForState(state)) {
      params.push({ state: state.slug, city: city.slug });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { state: string; city: string };
}): Promise<Metadata> {
  const city = getCity(params.state, params.city);
  if (!city) return { title: "Not Found" };
  return seoToMetadata(getCityAreaSeo(city));
}

export default function CityRoutePage({ params }: { params: { state: string; city: string } }) {
  const redirectSlug = getCitySlugRedirect(params.state, params.city);
  if (redirectSlug) {
    return <LegacyRedirect href={`/service-areas/${params.state}/${redirectSlug}/`} />;
  }
  const city = getCity(params.state, params.city);
  if (!city) notFound();
  const seo = getCityAreaSeo(city);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <CityPage stateSlug={params.state} citySlug={params.city} />
    </>
  );
}
