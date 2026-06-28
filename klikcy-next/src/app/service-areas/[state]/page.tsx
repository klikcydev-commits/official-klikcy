import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import StatePage from "@/views/StatePage";
import { getStateAreaSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";
import { getState, states } from "@/lib/states";

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const state = getState(params.state);
  if (!state) return { title: "Not Found" };
  return seoToMetadata(getStateAreaSeo(state));
}

export default function StateRoutePage({ params }: { params: { state: string } }) {
  const state = getState(params.state);
  if (!state) notFound();
  const seo = getStateAreaSeo(state);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <StatePage slug={params.state} />
    </>
  );
}
