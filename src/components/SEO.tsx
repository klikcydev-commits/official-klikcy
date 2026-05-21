import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, type SeoRobots } from "@/lib/seo/metadata";

interface SEOProps {
  title: string;
  description: string;
  /** Up to 20 service- or geo-specific terms; not SEO-only. */
  keywords?: string[];
  canonical?: string;
  jsonLd?: object | object[];
  robots?: SeoRobots;
  ogImage?: string;
}

function robotsContent(robots?: SeoRobots): string | undefined {
  if (!robots) return undefined;
  const index = robots.index !== false ? "index" : "noindex";
  const follow = robots.follow !== false ? "follow" : "nofollow";
  const base = `${index}, ${follow}`;
  return robots.googleBot ? `${base}, ${robots.googleBot}` : base;
}

const SEO = ({ title, description, keywords, canonical, jsonLd, robots, ogImage }: SEOProps) => {
  const url = canonical || (typeof window !== "undefined" ? window.location.href : "https://www.klikcy.com/");
  const image = ogImage || DEFAULT_OG_IMAGE;
  const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const robotsMeta = robotsContent(robots);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 ? (
        <meta name="keywords" content={keywords.slice(0, 20).join(", ")} />
      ) : null}
      {robotsMeta ? <meta name="robots" content={robotsMeta} /> : null}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
