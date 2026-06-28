#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
set -euo pipefail
VH=/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
HT=/var/www/klikcy-website/out/.htaccess

# restore known good vhconf
cp -a /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf.backup-2026-06-21-203441 "$VH"

# test context / rewrite
python3 <<'PY'
from pathlib import Path
vh = Path("/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf")
text = vh.read_text()
rule = "    RewriteRule ^/test-ctx-qa$ https://www.klikcy.com/sitemap.xml [R=301,L]\\n"
text = text.replace("    RewriteCond %{SERVER_PORT} ^80$", rule + "    RewriteCond %{SERVER_PORT} ^80$", 1)
vh.write_text(text)
PY

# test root htaccess redirect
cat > "$HT" <<'EOF'
Redirect 301 /test-htaccess-qa https://www.klikcy.com/sitemap.xml
Redirect 301 /sitemap_index.xml https://www.klikcy.com/sitemap.xml
EOF

/usr/local/lsws/bin/lswsctrl reload

echo "=== context / rewrite ==="
curl -sI --http1.1 https://www.klikcy.com/test-ctx-qa | head -4
echo "=== htaccess redirect ==="
curl -sI --http1.1 https://www.klikcy.com/test-htaccess-qa | head -4
curl -sI --http1.1 https://www.klikcy.com/sitemap_index.xml | head -4
echo "=== services htaccess ==="
curl -sI --http1.1 https://www.klikcy.com/services/web-development | head -4
`.trim();

const conn = new Client();
conn.on("ready", () => {
  conn.exec(script, (err, stream) => {
    stream.on("data", (d) => process.stdout.write(d));
    stream.on("close", () => conn.end());
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
