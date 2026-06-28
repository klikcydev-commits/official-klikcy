import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import CategoryPage from "@/views/CategoryPage";
import { categories, getCategory } from "@/lib/categories";
import { getCategorySeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = getCategory(params.slug);
  if (!cat) return { title: "Not Found" };
  return seoToMetadata(getCategorySeo(cat));
}

export default function CategoryRoutePage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  const seo = getCategorySeo(cat);

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <CategoryPage slug={params.slug} />
    </>
  );
}
