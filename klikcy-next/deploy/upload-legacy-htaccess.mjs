#!/usr/bin/env node
/** Legacy slug dirs with per-folder .htaccess 301 (OLS applies rewrites when dir exists). */
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

const conn = new Client();
conn.on("ready", () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const base = "/var/www/klikcy-website/out/services";
    let pending = Object.keys(LEGACY).length;

    for (const [from, to] of Object.entries(LEGACY)) {
      const dir = `${base}/${from}`;
      const target = `https://www.klikcy.com/services/${to}/`;
      const htaccess = `RewriteEngine On\nRewriteRule ^.*$ ${target} [R=301,L]\n`;

      conn.exec(`mkdir -p ${dir}`, () => {
        const ws = sftp.createWriteStream(`${dir}/.htaccess`);
        ws.on("close", () => {
          console.log(`Wrote ${from}/.htaccess → ${to}`);
          if (--pending === 0) {
            conn.exec(
              `
echo "=== legacy redirect tests ==="
for path in web-development web-development/ app-development/ digital-marketing saas-application-development cro-seo e-commerce-development/; do
  echo "--- /services/\$path ---"
  curl -sI "https://www.klikcy.com/services/\$path" | grep -iE '^HTTP|^location' | head -3
done
echo "=== chain web-development ==="
curl -sI -L "https://www.klikcy.com/services/web-development" | grep -iE '^HTTP|^location' | head -8
echo "=== http port 80 ==="
curl -sI "http://www.klikcy.com/services/web-development" | grep -iE '^HTTP|^location' | head -4
`.trim(),
              (e, stream) => {
                stream.on("data", (d) => process.stdout.write(d));
                stream.on("close", () => conn.end());
              },
            );
          }
        });
        ws.write(htaccess);
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
