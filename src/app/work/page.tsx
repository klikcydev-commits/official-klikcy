import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getWorkSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import Work from "@/views/Work";

const seo = getWorkSeo();

export const metadata: Metadata = seoToMetadata(seo);

export default function WorkPage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <Work />
    </>
  );
}
