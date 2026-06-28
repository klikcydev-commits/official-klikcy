#!/usr/bin/env node
/** Discover old sitemap URLs from VPS backup and test live responses. */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
set +e
echo "========== OLD SITE BACKUP: sitemap files =========="
find /var/backups/klikcy -type f \\( -iname '*sitemap*' -o -name 'robots.txt' \\) 2>/dev/null | grep -v '/out/' | head -40

echo ""
echo "========== OLD robots.txt (backup) =========="
for f in \\
  /var/backups/klikcy/2026-06-21T19-30-52-old-site/klikcy-website/public/robots.txt \\
  /var/backups/klikcy/2026-06-21T19-30-52-old-site/klikcy-website/robots.txt \\
  /var/www/klikcy-website/out/../robots.txt; do
  if [[ -f "$f" ]]; then echo "--- $f ---"; cat "$f"; fi
done

echo ""
echo "========== OLD public sitemap files in backup =========="
find /var/backups/klikcy/2026-06-21T19-30-52-old-site -path '*/public/*sitemap*' -type f 2>/dev/null
find /var/backups/klikcy/2026-06-21T19-30-52-old-site -path '*/.next/*sitemap*' -type f 2>/dev/null | head -15

echo ""
echo "========== grep Sitemap in old project =========="
grep -rih 'Sitemap:' /var/backups/klikcy/2026-06-21T19-30-52-old-site 2>/dev/null | sort -u | head -20

echo ""
echo "========== LIVE: current sitemap responses =========="
for path in \\
  /sitemap.xml \\
  /sitemap \\
  /sitemap/ \\
  /sitemap_index.xml \\
  /sitemap-index.xml \\
  /sitemap-0.xml \\
  /sitemap-1.xml \\
  /server-sitemap.xml \\
  /page-sitemap.xml \\
  /post-sitemap.xml \\
  /category-sitemap.xml \\
  /service-sitemap.xml \\
  /location-sitemap.xml \\
  /wp-sitemap.xml \\
  /wp-sitemap-posts-page-1.xml \\
  /wp-sitemap-posts-post-1.xml \\
  /sitemap-full.xml \\
  /sitemap-services.xml \\
  /sitemap-static.xml; do
  code=\$(curl -sI -o /dev/null -w '%{http_code}' "https://www.klikcy.com\${path}")
  echo "\${path} -> \${code}"
done

echo ""
echo "========== LIVE vhconf rewriteRules tail =========="
grep -A20 '^rewriteRules' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf | tail -22

echo ""
echo "========== LIVE root .htaccess =========="
cat /var/www/klikcy-website/out/.htaccess 2>/dev/null
`.trim();

const conn = new Client();
conn.on("ready", () => {
  conn.exec(script, (err, stream) => {
    stream.on("data", (d) => process.stdout.write(d));
    stream.stderr.on("data", (d) => process.stderr.write(d));
    stream.on("close", () => conn.end());
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
  readyTimeout: 30000,
});
