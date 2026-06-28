#!/usr/bin/env node
/**
 * Old sitemap 301s via per-URL directory stubs + .htaccess (OLS applies subdir htaccess reliably).
 * Restores known-good vhconf; does not touch service redirects or tracking.
 */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const TARGET = "https://www.klikcy.com/sitemap.xml";
const OUT = "/var/www/klikcy-website/out";

const stubNames = [
  "sitemap_index.xml",
  "sitemap-index.xml",
  "server-sitemap.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "category-sitemap.xml",
  "service-sitemap.xml",
  "location-sitemap.xml",
  "wp-sitemap.xml",
  "wp-sitemap-posts-page-1.xml",
  "wp-sitemap-posts-post-1.xml",
  ...Array.from({ length: 10 }, (_, i) => `sitemap-${i}.xml`),
];

const stubScript = stubNames
  .map((name) => {
    const dir = `${OUT}/${name}`;
    return `
mkdir -p "${dir}"
cat > "${dir}/.htaccess" <<'EOF'
RewriteEngine On
RewriteRule ^ https://www.klikcy.com/sitemap.xml [R=301,L]
EOF
touch "${dir}/index.html"
`;
  })
  .join("\n");

const remoteScript = `set -euo pipefail
VH=/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
HT=${OUT}/.htaccess
cp -a /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf.backup-2026-06-21-203441 "$VH"
cp -a "\${HT}.backup-sitemap-ctx-final-"* "$HT" 2>/dev/null || true

# restore standard root htaccess
cat > "$HT" <<'HTEOF'
# Klikcy — security headers + HTTP/HTTPS canonical
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
</IfModule>
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^sitemap/?$ ${TARGET} [R=301,L]
RewriteCond %{SERVER_PORT} ^80$
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
RewriteCond %{HTTPS} on
RewriteCond %{HTTP_HOST} ^klikcy\\.com$ [NC]
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
</IfModule>
HTEOF

# sitemap/ directory stub for /sitemap/ requests
mkdir -p ${OUT}/sitemap
cat > ${OUT}/sitemap/.htaccess <<'EOF'
RewriteEngine On
RewriteRule ^ https://www.klikcy.com/sitemap.xml [R=301,L]
EOF
touch ${OUT}/sitemap/index.html

${stubScript}

/usr/local/lsws/bin/lswsctrl reload
echo "=== tests ==="
for u in \
  "https://www.klikcy.com/sitemap_index.xml" \
  "https://www.klikcy.com/wp-sitemap.xml" \
  "https://www.klikcy.com/sitemap/" \
  "https://www.klikcy.com/sitemap" \
  "http://klikcy.com/sitemap_index.xml"; do
  echo "--- $u ---"
  curl -sI --http1.1 -L "$u" | grep -iE '^HTTP|^location' | head -4
done
curl -sI --http1.1 https://www.klikcy.com/sitemap.xml | head -2
curl -sI --http1.1 https://www.klikcy.com/services/web-development | grep -iE '^HTTP|^location' | head -2
`;

const conn = new Client();
conn.on("ready", () => {
  conn.exec(remoteScript, (err, stream) => {
    stream.on("data", (d) => process.stdout.write(d));
    stream.stderr.on("data", (d) => process.stderr.write(d));
    stream.on("close", (code) => process.exit(code ?? 0));
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
  readyTimeout: 120000,
});
