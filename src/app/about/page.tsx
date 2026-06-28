import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getAboutSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import About from "@/views/About";

const seo = getAboutSeo();

export const metadata: Metadata = seoToMetadata(seo);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <About />
    </>
  );
}
