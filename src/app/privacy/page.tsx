import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getPrivacySeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import Privacy from "@/views/Privacy";

const seo = getPrivacySeo();

export const metadata: Metadata = seoToMetadata(seo);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <Privacy />
    </>
  );
}
