import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { createContactFormToken } from "@/lib/contact-form-token";
import { getContactSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import Contact from "@/views/Contact";

const seo = getContactSeo();

export const metadata: Metadata = seoToMetadata(seo);

export default function ContactPage() {
  const formToken = createContactFormToken();

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <Contact formToken={formToken} />
    </>
  );
}
