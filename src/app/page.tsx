import type { Metadata } from "next";
import { homeFaqs } from "@/content/home";
import { JsonLd } from "@/components/JsonLd";
import { getHomeSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import Index from "@/views/Index";

const seo = getHomeSeo(homeFaqs);

export const metadata: Metadata = seoToMetadata(seo);

export default function HomePage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <Index />
    </>
  );
}
