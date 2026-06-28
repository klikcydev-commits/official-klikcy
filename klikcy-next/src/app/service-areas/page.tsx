import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import ServiceAreas from "@/views/ServiceAreas";
import { getServiceAreasSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";

const seo = getServiceAreasSeo();

export const metadata: Metadata = seoToMetadata(seo);

export default function ServiceAreasRoutePage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <ServiceAreas />
    </>
  );
}
