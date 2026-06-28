#!/usr/bin/env node
/**
 * Restore known-good vhconf base, then add exact-path sitemap redirect contexts only.
 * Avoids context /sitemap which prefix-matches /sitemap.xml and loops.
 */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const VH = "/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf";
const GOOD = "vhconf.conf.backup-2026-06-21-203441";

const exactPaths = [
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

const contextBlocks = exactPaths
  .map(
    (p) => `context ${p} {
  type                    redirect
  uri                     /sitemap.xml
  allowBrowse             1
}`,
  )
  .join("\n\n");

const remoteScript = `set -euo pipefail
VH=${VH}
B=/usr/local/lsws/conf/vhosts/KLIKCY
cp -a "$B/${GOOD}" "$VH"
cp -a "$VH" "\${VH}.backup-sitemap-exact-$(date +%F-%H%M%S)"

python3 <<'PY'
from pathlib import Path
vh = Path("${VH}")
text = vh.read_text()
blocks = """${contextBlocks.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"""

# Bare /sitemap (no trailing slash) via context / rewriteRules — exact, does not match .xml
insert = '''
    RewriteRule ^/sitemap$ https://www.klikcy.com/sitemap.xml [R=301,L]
'''
marker = "    RewriteCond %{HTTP_HOST} ^klikcy\\\\.com$ [NC]"
text = text.replace("context /api/ {", blocks + "\\n\\ncontext /api/ {", 1)
if "RewriteRule ^/sitemap$" not in text:
    text = text.replace(marker, insert + "\\n" + marker, 1)
vh.write_text(text)
print("patched vhconf")
PY

/usr/local/lsws/bin/lswsctrl reload
echo "=== tests ==="
curl -sI --http1.1 https://www.klikcy.com/sitemap_index.xml | grep -iE '^HTTP|^location' | head -4
curl -sI --http1.1 -L https://www.klikcy.com/sitemap_index.xml | grep -iE '^HTTP|^location' | head -6
curl -sI --http1.1 https://www.klikcy.com/sitemap.xml | head -2
curl -sI --http1.1 https://www.klikcy.com/sitemap | grep -iE '^HTTP|^location' | head -3
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
  readyTimeout: 60000,
});
