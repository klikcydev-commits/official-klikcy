#!/usr/bin/env node
/**
 * Move sitemap 301 rules into context / rewriteRules (where HTTPS requests are handled).
 * Removes duplicate sitemap rules from top-level rewriteRules block.
 */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const VH = "/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf";

const remoteScript = `set -euo pipefail
VH=${VH}
cp -a "$VH" "\${VH}.backup-sitemap-context-$(date +%F-%H%M%S)"

python3 <<'PY'
from pathlib import Path
vh = Path("${VH}")
text = vh.read_text()

sitemap_rules = '''
    RewriteRule ^/sitemap/?$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/sitemap_index\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/sitemap-index\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/sitemap-[0-9]+\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/server-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/page-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/post-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/category-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/service-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/location-sitemap\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]
    RewriteRule ^/wp-sitemap(-.*)?\\.xml$ https://www.klikcy.com/sitemap.xml [R=301,L]'''

# Remove sitemap rules from top-level rewriteRules if present
lines = text.splitlines()
out = []
skip = False
for line in lines:
    if 'RewriteRule ^/sitemap' in line or 'RewriteRule ^/server-sitemap' in line or 'RewriteRule ^/page-sitemap' in line or 'RewriteRule ^/post-sitemap' in line or 'RewriteRule ^/category-sitemap' in line or 'RewriteRule ^/service-sitemap' in line or 'RewriteRule ^/location-sitemap' in line or 'RewriteRule ^/wp-sitemap' in line:
        continue
    out.append(line)
text = "\\n".join(out)

marker = "    RewriteCond %{HTTP_HOST} ^klikcy\\\\.com$ [NC]"
if "RewriteRule ^/sitemap/?$" not in text and marker in text:
    text = text.replace(
        marker,
        sitemap_rules + "\\n\\n" + marker,
        1,
    )
    print("inserted sitemap rules into context /")
else:
    print("context / sitemap rules already present or marker missing")

vh.write_text(text)
PY

/usr/local/lsws/bin/lswsctrl reload
echo "reloaded"
grep -n 'sitemap' "$VH"
curl -sI https://www.klikcy.com/sitemap_index.xml | head -4
curl -sI https://www.klikcy.com/wp-sitemap.xml | head -4
curl -sI https://www.klikcy.com/services/web-development | head -3
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
});
