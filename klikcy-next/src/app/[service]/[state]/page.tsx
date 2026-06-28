import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import ServiceStatePage from "@/views/ServiceStatePage";
import { getServiceStateSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getService, services } from "@/lib/services";
import { getState, states } from "@/lib/states";

export async function generateStaticParams() {
  const params: { service: string; state: string }[] = [];
  for (const service of services) {
    for (const state of states) {
      params.push({ service: service.slug, state: state.slug });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { service: string; state: string };
}): Promise<Metadata> {
  const service = getService(params.service);
  const state = getState(params.state);
  if (!service || !state) return { title: "Not Found" };
  return seoToMetadata(getServiceStateSeo(service, state));
}

export default function ServiceStateRoutePage({
  params,
}: {
  params: { service: string; state: string };
}) {
  const service = getService(params.service);
  const state = getState(params.state);
  if (!service || !state) notFound();
  const seo = getServiceStateSeo(service, state);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <ServiceStatePage serviceSlug={params.service} stateSlug={params.state} />
    </>
  );
}
