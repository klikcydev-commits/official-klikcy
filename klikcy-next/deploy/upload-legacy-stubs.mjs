#!/usr/bin/env node
/** Generate and upload instant-redirect HTML stubs for legacy /services/* slugs. */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

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

function stubHtml(target) {
  const url = `https://www.klikcy.com/services/${target}/`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${url}"><link rel="canonical" href="${url}"><title>Redirecting…</title><script>location.replace("${url}")</script></head><body><p><a href="${url}">Continue</a></p></body></html>`;
}

const conn = new Client();
conn.on("ready", () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const base = "/var/www/klikcy-website/out/services";
    let pending = Object.keys(LEGACY).length;

    for (const [from, to] of Object.entries(LEGACY)) {
      const dir = `${base}/${from}`;
      const file = `${dir}/index.html`;
      conn.exec(`mkdir -p ${dir}`, () => {
        const ws = sftp.createWriteStream(file);
        ws.on("close", () => {
          console.log(`Wrote stub ${from} → ${to}`);
          if (--pending === 0) conn.end();
        });
        ws.write(stubHtml(to));
        ws.end();
      });
    }
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
