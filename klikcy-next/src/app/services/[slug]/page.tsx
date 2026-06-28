import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LegacyRedirect } from "@/components/layout/LegacyRedirect";
import ServicePage from "@/views/ServicePage";
import { LEGACY_SERVICE_SLUG_REDIRECTS } from "@/lib/legacy-service-slugs";
import { getServiceSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getService, services } from "@/lib/services";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const canonicalSlug = LEGACY_SERVICE_SLUG_REDIRECTS[params.slug] ?? params.slug;
  const service = getService(canonicalSlug);
  if (!service) return { title: "Not Found" };
  return seoToMetadata(getServiceSeo(service));
}

export default function ServiceRoutePage({ params }: { params: { slug: string } }) {
  const canonicalSlug = LEGACY_SERVICE_SLUG_REDIRECTS[params.slug] ?? params.slug;
  if (canonicalSlug !== params.slug) {
    return <LegacyRedirect href={`/services/${canonicalSlug}/`} />;
  }
  const service = getService(canonicalSlug);
  if (!service) notFound();
  const seo = getServiceSeo(service);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <ServicePage slug={canonicalSlug} />
    </>
  );
}
