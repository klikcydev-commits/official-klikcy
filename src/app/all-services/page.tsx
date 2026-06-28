import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getAllServicesSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import AllServicesPage from "@/views/AllServicesPage";

const seo = getAllServicesSeo();

export const metadata: Metadata = seoToMetadata(seo);

export default function AllServicesRoute() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <AllServicesPage />
    </>
  );
}
