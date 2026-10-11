/** @type {import('next').NextConfig} */
import { legacyRedirects } from "./src/lib/redirects.mjs";

const nextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      ...legacyRedirects,
      // Retired sitemap URLs (sharded /sitemap/<id>.xml and older sitemap-*.xml files) -> single index.
      { source: "/sitemap/:id.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap-:name.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
