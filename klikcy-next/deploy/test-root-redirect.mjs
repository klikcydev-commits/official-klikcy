#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const LEGACY = [
  "web-development",
  "app-development",
  "digital-marketing",
  "ai-automations",
  "saas-application-development",
  "cro-seo",
  "e-commerce-development",
  "ecommerce-development",
];

const rootHtaccess = `# Klikcy redirects — Redirect directive (OLS-safe after removing redirect contexts)
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
</IfModule>

Redirect 301 /services/web-development https://www.klikcy.com/services/custom-website-development/
Redirect 301 /services/app-development https://www.klikcy.com/services/mobile-app-development/
Redirect 301 /services/digital-marketing https://www.klikcy.com/services/digital-marketing-strategy/
Redirect 301 /services/ai-automations https://www.klikcy.com/services/ai-chatbot-development/
Redirect 301 /services/saas-application-development https://www.klikcy.com/services/saas-development/
Redirect 301 /services/cro-seo https://www.klikcy.com/services/conversion-rate-optimization/
Redirect 301 /services/e-commerce-development https://www.klikcy.com/services/shopify-store-development/
Redirect 301 /services/ecommerce-development https://www.klikcy.com/services/shopify-store-development/
Redirect 301 /services/ https://www.klikcy.com/all-services/

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{SERVER_PORT} ^80$
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
RewriteCond %{HTTPS} on
RewriteCond %{HTTP_HOST} ^klikcy\\.com$ [NC]
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
</IfModule>
`;

const servicesHtaccess = `# /services/ index only
RewriteEngine On
RewriteRule ^$ https://www.klikcy.com/all-services/ [R=301,L]
`;

const conn = new Client();
conn.on("ready", () => {
  const rm = LEGACY.map((s) => `rm -rf /var/www/klikcy-website/out/services/${s}`).join("\n");
  conn.exec(rm, () => {
    conn.sftp((err, sftp) => {
      if (err) throw err;
      let done = 0;
      const finish = () => {
        if (++done < 2) return;
        conn.exec(
          `
curl -sI https://www.klikcy.com/services/web-development | head -4
curl -sI https://www.klikcy.com/services/web-development/ | head -4
curl -sI https://www.klikcy.com/services/app-development/ | head -4
curl -sI http://www.klikcy.com/services/web-development | head -4
curl -sI -L https://www.klikcy.com/services/web-development | grep -iE '^HTTP|^location' | head -8
`.trim(),
          (e, stream) => {
            stream.on("data", (d) => process.stdout.write(d));
            stream.on("close", () => conn.end());
          },
        );
      };
      for (const [remote, content] of [
        ["/var/www/klikcy-website/out/.htaccess", rootHtaccess],
        ["/var/www/klikcy-website/out/services/.htaccess", servicesHtaccess],
      ]) {
        const ws = sftp.createWriteStream(remote);
        ws.on("close", finish);
        ws.write(content);
        ws.end();
        console.log(`Wrote ${remote}`);
      }
    });
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
