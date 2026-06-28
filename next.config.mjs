/** @type {import('next').NextConfig} */

const LEGACY_SERVICE_SLUG_REDIRECTS = {
  "web-development": "custom-website-development",
  "app-development": "mobile-app-development",
  "ui-ux-design": "ui-ux-design",
  "digital-marketing": "digital-marketing-strategy",
  "ai-automations": "ai-chatbot-development",
  "saas-application-development": "saas-development",
  "cro-seo": "conversion-rate-optimization",
  "e-commerce-development": "shopify-store-development",
  "ecommerce-development": "shopify-store-development",
};

function legacyServiceRedirects() {
  const rules = [
    { source: "/services", destination: "/all-services/", permanent: true },
  ];

  for (const [from, to] of Object.entries(LEGACY_SERVICE_SLUG_REDIRECTS)) {
    if (from === to) continue;
    rules.push(
      { source: `/services/${from}`, destination: `/services/${to}/`, permanent: true },
      { source: `/services/${from}/`, destination: `/services/${to}/`, permanent: true },
    );
  }

  rules.push(
    {
      source: "/service-areas/new-york/bronx",
      destination: "/service-areas/new-york/the-bronx/",
      permanent: true,
    },
    {
      source: "/service-areas/new-york/bronx/",
      destination: "/service-areas/new-york/the-bronx/",
      permanent: true,
    },
  );

  return rules;
}

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
    return legacyServiceRedirects();
  },
};

export default nextConfig;
