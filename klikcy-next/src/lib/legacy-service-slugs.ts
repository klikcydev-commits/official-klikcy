/** Legacy klikcy.com service URLs → current catalog slugs. */
export const LEGACY_SERVICE_SLUG_REDIRECTS: Record<string, string> = {
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

export const legacyServiceSlugs = Object.entries(LEGACY_SERVICE_SLUG_REDIRECTS).map(([from, to]) => ({
  from,
  to,
}));
