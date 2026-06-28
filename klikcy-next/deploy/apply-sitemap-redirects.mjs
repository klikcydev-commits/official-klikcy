#!/usr/bin/env node
/**
 * Apply old sitemap 301 redirects to live OpenLiteSpeed vhost (single rewriteRules block).
 * Inserts rules before wp-login block; backs up vhconf; validates and reloads.
 */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { OLD_SITEMAP_VHOST_RULES } from "./old-sitemap-paths.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const VH = "/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf";
const insertLines = OLD_SITEMAP_VHOST_RULES.map((r) => `  ${r}`).join("\n");

const remoteScript = `set -euo pipefail
VH=${VH}
STAMP=$(date +%F-%H%M%S)
cp -a "$VH" "\${VH}.backup-sitemap-\${STAMP}"
echo "Backed up vhconf -> \${VH}.backup-sitemap-\${STAMP}"

if grep -q 'sitemap_index\\\\.xml' "$VH"; then
  echo "Sitemap redirect rules already present — skipping insert"
else
  awk 'BEGIN { inserted=0 }
    /^  RewriteRule \\^\\/wp-login\\\\.php\\$/ && !inserted {
      print "  RewriteRule ^/sitemap/?$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/sitemap_index\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/sitemap-index\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/sitemap-[0-9]+\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/server-sitemap\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/page-sitemap\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/post-sitemap\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/category-sitemap\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/service-sitemap\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/location-sitemap\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      print "  RewriteRule ^/wp-sitemap(-.*)?\\\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]"
      inserted=1
    }
    { print }
  ' "$VH" > "$VH.new" && mv "$VH.new" "$VH"
  echo "Inserted sitemap redirect rules"
fi

echo ""
echo "=== validate ==="
/usr/local/lsws/bin/lshttpd -t 2>&1 | tail -8 || true
echo ""
echo "=== reload ==="
/usr/local/lsws/bin/lswsctrl reload
echo "reloaded"
grep 'sitemap' "$VH" | head -12
`;

const conn = new Client();
conn
  .on("ready", () => {
    conn.exec(remoteScript, (err, stream) => {
      if (err) throw err;
      stream.on("data", (d) => process.stdout.write(d));
      stream.stderr.on("data", (d) => process.stderr.write(d));
      stream.on("close", (code) => process.exit(code ?? 0));
    });
  })
  .on("error", (e) => {
    console.error("SSH:", e.message);
    process.exit(1);
  })
  .connect({
    host: process.env.VPS_HOST,
    port: 22,
    username: process.env.VPS_USER || "root",
    password: process.env.VPS_PASSWORD,
    readyTimeout: 30000,
  });
