import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../out");
const htaccessPath = path.join(outDir, ".htaccess");

const lines = [
  "# Klikcy — security headers + HTTP/HTTPS canonical (Hostinger / OpenLiteSpeed)",
  "# Legacy /services/* slug 301s: OpenLiteSpeed vhost rewriteRules",
  "# Old sitemap URL 301s: OpenLiteSpeed vhost rewriteRules (see deploy/old-sitemap-paths.mjs)",
  "# Generate: npm run htaccess:generate (after npm run build)",
  "",
  "<IfModule mod_headers.c>",
  '  Header set X-Content-Type-Options "nosniff"',
  '  Header set X-Frame-Options "SAMEORIGIN"',
  '  Header set Referrer-Policy "strict-origin-when-cross-origin"',
  '  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"',
  '  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS',
  "</IfModule>",
  "",
  "<IfModule mod_rewrite.c>",
  "RewriteEngine On",
  "# Bare /sitemap and /sitemap/ → canonical sitemap index",
  "RewriteRule ^sitemap/?$ https://www.klikcy.com/sitemap.xml [R=301,L]",
  "# Old sitemap file URLs use out/<name>/.htaccess stub directories (see scripts/generate-sitemap-stubs.mjs)",
  "RewriteCond %{SERVER_PORT} ^80$",
  "RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]",
  "RewriteCond %{HTTPS} on",
  "RewriteCond %{HTTP_HOST} ^klikcy\\.com$ [NC]",
  "RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]",
  "</IfModule>",
  "",
];

if (!fs.existsSync(outDir)) {
  console.error("out/ not found — run npm run build first");
  process.exit(1);
}

fs.writeFileSync(htaccessPath, lines.join("\n"));
console.log(`Wrote ${htaccessPath}`);
