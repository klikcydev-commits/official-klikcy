#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== GTM container references GA4 ==="
curl -s 'https://www.googletagmanager.com/gtm.js?id=GTM-PF4N2DXK' | grep -o 'G-PHEFSHYPR7' | head -1 || echo "(not found in gtm.js)"

echo ""
echo "=== noindex check ==="
for path in / /contact/ /services/custom-website-development/ /all-services/; do
  echo -n "$path: "
  curl -s "https://www.klikcy.com$path" | grep -i 'noindex' | head -1 || echo "ok (no noindex)"
done

echo ""
echo "=== non-www HTTPS ==="
curl -sI https://klikcy.com/ | grep -iE '^HTTP|^location' | head -3

echo ""
echo "=== cache headers static ==="
curl -sI https://www.klikcy.com/_next/static/chunks/webpack.js 2>/dev/null | grep -iE 'cache|expires' | head -3 || curl -sI https://www.klikcy.com/_next/static/ | head -5

echo ""
echo "=== wp-login 410 ==="
curl -sI https://www.klikcy.com/wp-login.php | head -3
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
