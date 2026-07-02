import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCity } from "@/lib/cities";
import { JsonLd } from "@/components/JsonLd";
import CityPage from "@/views/CityPage";
import { getCityAreaSeo } from "@/lib/seo";
import { getPrerenderServiceAreaCityParams } from "@/lib/seo/prerender";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getState } from "@/lib/states";

export async function generateStaticParams() {
  return getPrerenderServiceAreaCityParams();
}

export const dynamicParams = true;
export const revalidate = 2_592_000;

export async function generateMetadata({
  params,
}: {
  params: { state: string; city: string };
}): Promise<Metadata> {
  const state = getState(params.state);
  const city = getCity(params.state, params.city);
  if (!state || !city) return { title: "Not Found" };
  return seoToMetadata(getCityAreaSeo(city));
}

export default function CityRoutePage({ params }: { params: { state: string; city: string } }) {
  const state = getState(params.state);
  const city = getCity(params.state, params.city);
  if (!state || !city) notFound();
  const seo = getCityAreaSeo(city);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <CityPage stateSlug={params.state} citySlug={params.city} />
    </>
  );
}
