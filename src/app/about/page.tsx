import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getAboutSeo } from "@/lib/seo";
import { aboutFaqs } from "@/content/about";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import About from "@/views/About";

const seo = getAboutSeo(aboutFaqs);

export const metadata: Metadata = seoToMetadata(seo);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <About />
    </>
  );
}
