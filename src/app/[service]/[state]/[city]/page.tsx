import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import ServiceCityPage from "@/views/ServiceCityPage";
import { getCity } from "@/lib/cities";
import { getServiceCitySeo } from "@/lib/seo";
import { getPrerenderServiceCityParams } from "@/lib/seo/prerender";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getService } from "@/lib/services";
import { getState } from "@/lib/states";

export async function generateStaticParams() {
  return getPrerenderServiceCityParams();
}

export const dynamicParams = true;
export const revalidate = 2_592_000; // 30 days

export async function generateMetadata({
  params,
}: {
  params: { service: string; state: string; city: string };
}): Promise<Metadata> {
  const service = getService(params.service);
  const state = getState(params.state);
  const city = getCity(params.state, params.city);
  if (!service || !state || !city) return { title: "Not Found" };
  return seoToMetadata(getServiceCitySeo(service, city));
}

export default function ServiceCityRoutePage({
  params,
}: {
  params: { service: string; state: string; city: string };
}) {
  const service = getService(params.service);
  const state = getState(params.state);
  const city = getCity(params.state, params.city);
  if (!service || !state || !city) notFound();
  const seo = getServiceCitySeo(service, city);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <ServiceCityPage
        serviceSlug={params.service}
        stateSlug={params.state}
        citySlug={params.city}
      />
    </>
  );
}
