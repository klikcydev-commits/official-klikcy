#!/usr/bin/env node
/** Extended legacy redirect + cache header checks. */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
set +e
echo "========== LEGACY URL MATRIX =========="
for path in \
  "/services/seo" \
  "/services/branding" \
  "/services/ecommerce" \
  "/services/ecommerce-development" \
  "/services/e-commerce-development/" \
  "/services/ai-automations" \
  "/services/ai-automation" \
  "/services/ui-ux-design" \
  "/services/ui-ux-design/" \
  "/services/cro-seo"; do
  echo "--- https://www.klikcy.com\$path ---"
  curl -sI "https://www.klikcy.com\$path" 2>/dev/null | grep -iE '^HTTP|^location' | head -3
  final=\$(curl -sI -L -o /dev/null -w '%{url_effective} %{http_code}' "https://www.klikcy.com\$path" 2>/dev/null)
  echo "FINAL: \$final"
done

echo ""
echo "========== CACHE HEADERS =========="
curl -sI https://www.klikcy.com/_next/static/css/66185fe3f5116c30.css 2>/dev/null | grep -iE '^HTTP|cache-control|expires|etag' | head -6

echo ""
echo "========== GA4 IN GTM PAGE =========="
curl -s https://www.klikcy.com/ | grep -oE 'G-[A-Z0-9]+|GTM-[A-Z0-9]+|googletagmanager.com/gtag/js' | sort -u

echo ""
echo "========== BACKUPS =========="
ls -la /var/backups/klikcy/ | tail -6
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
