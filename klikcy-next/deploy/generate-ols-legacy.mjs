#!/usr/bin/env node
/**
 * Emit OpenLiteSpeed redirect context blocks for legacy service slugs.
 * Used by configure-ols.sh on the VPS.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Keep in sync with src/lib/legacy-service-slugs.ts */
const LEGACY = {
  "web-development": "custom-website-development",
  "app-development": "mobile-app-development",
  "digital-marketing": "digital-marketing-strategy",
  "ai-automations": "ai-chatbot-development",
  "saas-application-development": "saas-development",
  "cro-seo": "conversion-rate-optimization",
  "e-commerce-development": "shopify-store-development",
  "ecommerce-development": "shopify-store-development",
};

const blocks = Object.entries(LEGACY).flatMap(
  ([from, to]) => [
    `
context /services/${from}/ {
  type                    redirect
  uri                     /services/${to}/
  allowBrowse             1
}`,
    `
context /services/${from} {
  type                    redirect
  uri                     /services/${to}/
  allowBrowse             1
}`,
  ],
);

const out = path.join(__dirname, "ols-legacy-redirects.conf");
fs.writeFileSync(out, blocks.join("\n") + "\n");
console.log(`Wrote ${out} (${Object.keys(LEGACY).length} legacy slugs)`);
