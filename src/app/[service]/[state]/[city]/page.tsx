import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import ServiceCityPage from "@/views/ServiceCityPage";
import { getCity } from "@/lib/cities";
import { getServiceCitySeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getService } from "@/lib/services";

// Noindexed template pages (see lib/seo/indexing.ts): rendered on first request, then cached.
export async function generateStaticParams() {
  return [];
}

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
      <ServiceCityPage serviceSlug={service.slug} stateSlug={city.state.slug} citySlug={city.slug} />
    </>
  );
}
