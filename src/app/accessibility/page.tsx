import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getAccessibilitySeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import Accessibility from "@/views/Accessibility";

const seo = getAccessibilitySeo();

export const metadata: Metadata = seoToMetadata(seo);

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <Accessibility />
    </>
  );
}
