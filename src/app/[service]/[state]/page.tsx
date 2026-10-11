import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import ServiceStatePage from "@/views/ServiceStatePage";
import { getServiceStateSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getService } from "@/lib/services";
import { getState } from "@/lib/states";

// Noindexed template pages (see lib/seo/indexing.ts): rendered on first request, then cached.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: { service: string; state: string } }): Promise<Metadata> {
  const service = getService(params.service);
  const state = getState(params.state);
  if (!service || !state) return { title: "Not Found" };
  return seoToMetadata(getServiceStateSeo(service, state));
}

export default function ServiceStateRoutePage({ params }: { params: { service: string; state: string } }) {
  const service = getService(params.service);
  const state = getState(params.state);
  if (!service || !state) notFound();
  const seo = getServiceStateSeo(service, state);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <ServiceStatePage serviceSlug={service.slug} stateSlug={state.slug} />
    </>
  );
}
