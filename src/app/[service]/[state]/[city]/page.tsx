import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import ServiceCityPage from "@/views/ServiceCityPage";
import { getCity, getCitiesForState } from "@/lib/cities";
import { getServiceCitySeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getService, services } from "@/lib/services";
import { states } from "@/lib/states";

export async function generateStaticParams() {
  const params: { service: string; state: string; city: string }[] = [];
  for (const service of services) {
    for (const state of states) {
      for (const city of getCitiesForState(state)) {
        params.push({
          service: service.slug,
          state: state.slug,
          city: city.slug,
        });
      }
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { service: string; state: string; city: string };
}): Promise<Metadata> {
  const service = getService(params.service);
  const city = getCity(params.state, params.city);
  if (!service || !city) return { title: "Not Found" };
  return seoToMetadata(getServiceCitySeo(service, city));
}

export default function ServiceCityRoutePage({
  params,
}: {
  params: { service: string; state: string; city: string };
}) {
  const service = getService(params.service);
  const city = getCity(params.state, params.city);
  if (!service || !city) notFound();
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
