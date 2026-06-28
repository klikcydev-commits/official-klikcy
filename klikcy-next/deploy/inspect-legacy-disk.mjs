#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
OUT=/var/www/klikcy-website/out/services
echo "=== legacy paths on disk ==="
for s in web-development app-development digital-marketing custom-website-development; do
  echo "-- $s --"
  ls -la "$OUT/$s" 2>&1 | head -5
done

echo ""
echo "=== curl body web-development/ ==="
curl -s -D - "https://www.klikcy.com/services/web-development/" -o /tmp/body.html | head -20
echo "body bytes:" $(wc -c </tmp/body.html)
head -3 /tmp/body.html 2>/dev/null

echo ""
echo "=== without htaccess ==="
mv /var/www/klikcy-website/out/.htaccess /tmp/htaccess.bak
curl -sI "https://www.klikcy.com/services/web-development" | head -6
curl -sI "https://www.klikcy.com/services/web-development/" | head -6
mv /tmp/htaccess.bak /var/www/klikcy-website/out/.htaccess

echo ""
echo "=== OLS rewrite log ==="
tail -5 /usr/local/lsws/logs/error.log 2>/dev/null
tail -5 /usr/local/lsws/conf/vhosts/KLIKCY/logs/error.log 2>/dev/null
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
