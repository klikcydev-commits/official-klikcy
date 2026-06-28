#!/usr/bin/env node
/** Apply old sitemap redirects using OLS-safe Redirect directives in root .htaccess. */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const TARGET = "https://www.klikcy.com/sitemap.xml";
const paths = [
  "/sitemap",
  "/sitemap/",
  "/sitemap_index.xml",
  "/sitemap-index.xml",
  "/server-sitemap.xml",
  "/page-sitemap.xml",
  "/post-sitemap.xml",
  "/category-sitemap.xml",
  "/service-sitemap.xml",
  "/location-sitemap.xml",
  "/wp-sitemap.xml",
  "/wp-sitemap-posts-page-1.xml",
  "/wp-sitemap-posts-post-1.xml",
  ...Array.from({ length: 10 }, (_, i) => `/sitemap-${i}.xml`),
];

const redirectBlock = [
  "# Old sitemap URLs → canonical sitemap index (Redirect directives — OLS-safe)",
  ...paths.map((p) => `Redirect 301 ${p} ${TARGET}`),
  "",
].join("\n");

const htaccess = `# Klikcy — security headers + HTTP/HTTPS canonical
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
</IfModule>

${redirectBlock}
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{SERVER_PORT} ^80$
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
RewriteCond %{HTTPS} on
RewriteCond %{HTTP_HOST} ^klikcy\\.com$ [NC]
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
</IfModule>
`;

const b64 = Buffer.from(htaccess).toString("base64");
const remoteScript = `set -euo pipefail
HT=/var/www/klikcy-website/out/.htaccess
cp -a "$HT" "\${HT}.backup-sitemap-redirect-$(date +%F-%H%M%S)"
echo '${b64}' | base64 -d > "$HT"
echo "Wrote Redirect-based htaccess"
curl -sI https://www.klikcy.com/sitemap_index.xml | head -4
curl -sI https://www.klikcy.com/wp-sitemap.xml | head -4
curl -sI https://www.klikcy.com/sitemap.xml | head -3
`;

const conn = new Client();
conn.on("ready", () => {
  conn.exec(remoteScript, (err, stream) => {
    stream.on("data", (d) => process.stdout.write(d));
    stream.on("close", (code) => process.exit(code ?? 0));
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
