#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== old site backup blog paths ==="
find /var/backups/klikcy -maxdepth 4 -type d -name blog 2>/dev/null | head -5
find /var/backups/klikcy -path '*blog*' -name '*.html' 2>/dev/null | head -10
echo "=== schema on homepage ==="
curl -s https://www.klikcy.com/ | grep -o 'application/ld+json' | wc -l
curl -s https://www.klikcy.com/ | grep -o '@type":"Organization' | head -1
echo "=== sitemap future dates ==="
curl -s https://www.klikcy.com/sitemap-services.xml | grep lastmod | grep -E '202[7-9]|203[0-9]' | head -3 || echo "none"
echo "=== duplicate rewriteRules at vhost level ==="
grep -n 'rewriteRules' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
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
