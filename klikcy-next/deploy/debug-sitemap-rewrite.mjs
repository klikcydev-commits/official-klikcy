#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
VH=/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
# add test rule at top of rewriteRules
python3 <<'PY'
from pathlib import Path
vh = Path("/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf")
text = vh.read_text()
if "test-redirect-qa" not in text:
    text = text.replace("rewriteRules  {", "rewriteRules  {\\n  RewriteRule ^/test-redirect-qa$ https://www.klikcy.com/sitemap.xml [R=301,L]", 1)
    vh.write_text(text)
PY
/usr/local/lsws/bin/lswsctrl reload

echo "=== test top-level fake path ==="
curl -sI --http1.1 https://www.klikcy.com/test-redirect-qa | head -4

echo "=== services htaccess backup test ==="
HTS=/var/www/klikcy-website/out/services/.htaccess
mv "$HTS" "\${HTS}.off" 2>/dev/null || true
curl -sI --http1.1 https://www.klikcy.com/services/web-development | head -4
mv "\${HTS}.off" "$HTS" 2>/dev/null || true

echo "=== disk paths ==="
ls -la /var/www/klikcy-website/out/sitemap* 2>/dev/null | head -10
ls -la /var/www/klikcy-website/out/services/web-development 2>/dev/null || echo "no web-development dir"
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
