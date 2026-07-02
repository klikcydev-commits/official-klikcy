import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import ServicePage from "@/views/ServicePage";
import { getServiceSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getService, services } from "@/lib/services";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getService(params.slug);
  if (!service) return { title: "Not Found" };
  return seoToMetadata(getServiceSeo(service));
}

export default function ServiceRoutePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();
  const seo = getServiceSeo(service);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <ServicePage slug={params.slug} />
    </>
  );
}
