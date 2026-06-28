#!/usr/bin/env node
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

const htaccess = [
  "# Legacy /services/* slug 301 redirects (OLS applies when path is under /services/)",
  "RewriteEngine On",
  ...Object.entries(LEGACY).map(
    ([from, to]) =>
      `RewriteRule ^${from}/?$ https://www.klikcy.com/services/${to}/ [R=301,L]`,
  ),
  "RewriteRule ^$ https://www.klikcy.com/all-services/ [R=301,L]",
  "",
].join("\n");

const conn = new Client();
conn.on("ready", () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const ws = sftp.createWriteStream("/var/www/klikcy-website/out/services/.htaccess");
    ws.on("close", () => {
      console.log("Restored services/.htaccess with legacy redirects");
      conn.exec(
        `curl -sI https://www.klikcy.com/services/web-development | head -4
curl -sI https://www.klikcy.com/services/web-development/ | head -4
curl -sI http://www.klikcy.com/services/web-development | head -4`,
        (e, stream) => {
          stream.on("data", (d) => process.stdout.write(d));
          stream.on("close", () => conn.end());
        },
      );
    });
    ws.write(htaccess);
    ws.end();
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
