#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== HTTP REDIRECTS (after fix) ==="
for url in "http://klikcy.com/" "http://www.klikcy.com/" "http://klikcy.com/contact/"; do
  echo "--- \$url ---"
  curl -sI "\$url" | grep -iE '^HTTP|^location' | head -3
done

echo ""
echo "=== HTTPS non-www -> www ==="
curl -sI https://klikcy.com/ | grep -iE '^HTTP|^location' | head -3

echo ""
echo "=== CONTACT (valid payload) ==="
curl -s -X POST https://www.klikcy.com/api/contact -H 'Content-Type: application/json' -d '{"name":"QA Test","email":"qa@example.com","phone":"5551234567","service":"Other","message":"Production QA test message from final deploy check.","website":""}'

echo ""
echo ""
echo "=== GTM container references GA4? ==="
curl -s 'https://www.googletagmanager.com/gtm.js?id=GTM-PF4N2DXK' | grep -o 'G-PHEFSHYPR7' | head -1 || echo "(GA4 ID not found in gtm.js — configure GA4 tag inside GTM)"

echo ""
echo "=== /services/ redirect ==="
curl -sI https://www.klikcy.com/services/ | grep -iE '^HTTP|^location' | head -4

echo ""
echo "=== PM2 restart test ==="
pm2 restart klikcy-contact-api >/dev/null 2>&1
sleep 2
pm2 list | grep klikcy
curl -sf http://127.0.0.1:8787/api/health && echo ""
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
