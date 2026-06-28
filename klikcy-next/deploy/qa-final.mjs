#!/usr/bin/env node
/**
 * Final QA pass on live klikcy.com — tracking, redirects, sitemap, contact API, production.
 */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
set +e
echo "========== 1. TRACKING =========="
for path in / /contact/ /services/custom-website-development/ /custom-website-development/california/los-angeles/; do
  echo "--- https://www.klikcy.com\$path ---"
  html=\$(curl -s "https://www.klikcy.com\$path")
  echo "GTM: \$(echo "\$html" | grep -o 'GTM-[A-Z0-9]*' | sort -u | tr '\\n' ' ')"
  gtag=\$(echo "\$html" | grep -c 'googletagmanager.com/gtag/js')
  echo "direct gtag.js count: \$gtag"
done

echo ""
echo "========== 2. GSC DNS (google-site-verification TXT) =========="
dig +short TXT klikcy.com 2>/dev/null | grep -i google || echo "(no google TXT on apex)"
dig +short TXT www.klikcy.com 2>/dev/null | grep -i google || echo "(no google TXT on www)"

echo ""
echo "========== 3. HTTP -> HTTPS =========="
for url in "http://klikcy.com/" "http://www.klikcy.com/" "http://klikcy.com/contact/" "http://www.klikcy.com/services/web-development"; do
  echo "--- \$url ---"
  curl -sI "\$url" 2>/dev/null | grep -iE '^HTTP|^location' | head -3
done

echo ""
echo "========== 4. LEGACY REDIRECTS =========="
for url in \
  "https://www.klikcy.com/services/web-development" \
  "https://www.klikcy.com/services/web-development/" \
  "https://www.klikcy.com/services/app-development/" \
  "https://klikcy.com/services/web-development/" \
  "https://www.klikcy.com/services/" \
  "https://www.klikcy.com/blog/" \
  "https://www.klikcy.com/service-areas/california/los-angeles/"; do
  echo "--- \$url ---"
  curl -sI -L "\$url" 2>/dev/null | grep -iE '^HTTP|^location' | head -6
done

echo ""
echo "========== 5. SITEMAP =========="
curl -sI https://www.klikcy.com/sitemap.xml | head -5
curl -s https://www.klikcy.com/sitemap.xml | head -12
echo "--- sample lastmods from service sitemap ---"
curl -s https://www.klikcy.com/sitemap-services.xml | grep lastmod | sort -u | head -8
curl -s https://www.klikcy.com/sitemap-services.xml | grep -c localhost || echo "0 localhost"
curl -s https://www.klikcy.com/robots.txt

echo ""
echo "========== 6. CONTACT API =========="
curl -s https://www.klikcy.com/api/health
echo ""
curl -s -X POST https://www.klikcy.com/api/contact -H 'Content-Type: application/json' -d '{}' 
echo ""
curl -s -X POST https://www.klikcy.com/api/contact -H 'Content-Type: application/json' -d '{"name":"QA","email":"qa@test.com","phone":"5551234567","service":"Other","message":"QA rate limit test message here","website":""}' | head -c 120
echo ""

echo ""
echo "========== 7. PRODUCTION =========="
curl -sI https://www.klikcy.com/ | grep -iE 'HTTP|strict-transport|x-content|x-frame|cache-control'
pm2 list
grep -A20 'listener Default' /usr/local/lsws/conf/httpd_config.conf 2>/dev/null | head -25
grep -A5 'rewriteRules' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf 2>/dev/null | head -15
`.trim();

const conn = new Client();
conn
  .on("ready", () => {
    conn.exec(script, (err, stream) => {
      if (err) throw err;
      stream.on("data", (d) => process.stdout.write(d));
      stream.stderr.on("data", (d) => process.stderr.write(d));
      stream.on("close", (code) => process.exit(code ?? 0));
    });
  })
  .on("error", (e) => {
    console.error("SSH:", e.message);
    process.exit(1);
  })
  .connect({
    host: process.env.VPS_HOST,
    port: 22,
    username: process.env.VPS_USER || "root",
    password: process.env.VPS_PASSWORD,
    readyTimeout: 30000,
  });
