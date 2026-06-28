#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== GTM ON LIVE ==="
curl -s https://www.klikcy.com/ | grep -o 'GTM-[A-Z0-9]*' | sort -u
curl -s https://www.klikcy.com/ | grep -c 'gtag/js' || echo "gtag direct count (should be 0):"
echo "=== TITLE (no duplicate) ==="
curl -s https://www.klikcy.com/services/custom-website-development/ | grep -o '<title>[^<]*</title>'
echo "=== SECURITY HEADERS ==="
curl -sI https://www.klikcy.com/ | grep -iE 'strict-transport|x-content|x-frame|cache-control'
echo "=== PM2 ==="
pm2 list
echo "=== STATIC CACHE SAMPLE ==="
curl -sI https://www.klikcy.com/_next/static/css/66185fe3f5116c30.css 2>/dev/null | grep -iE 'HTTP|cache|expires' | head -5
echo "=== API ==="
curl -s https://www.klikcy.com/api/health
echo ""
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
