#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
set +e
echo "=== PM2 ==="
pm2 list
echo "=== LOCAL API ==="
curl -s http://127.0.0.1:8787/api/health
echo ""
echo "=== HOMEPAGE ==="
curl -sI https://www.klikcy.com/ | head -20
echo "=== HOMEPAGE TITLE ==="
curl -s https://www.klikcy.com/ | grep -o '<title>[^<]*</title>' | head -1
echo "=== SERVICE PAGE ==="
curl -sI https://www.klikcy.com/services/custom-website-development/ | head -8
curl -s https://www.klikcy.com/services/custom-website-development/ | grep -o '<title>[^<]*</title>' | head -1
echo "=== LOCATION PAGE ==="
curl -sI https://www.klikcy.com/custom-website-development/california/los-angeles/ | head -8
curl -s https://www.klikcy.com/custom-website-development/california/los-angeles/ | grep -o '<title>[^<]*</title>' | head -1
echo "=== CONTACT ==="
curl -sI https://www.klikcy.com/contact/ | head -8
echo "=== API VIA PROXY ==="
curl -s https://www.klikcy.com/api/health
echo ""
echo "=== ROBOTS ==="
curl -sI https://www.klikcy.com/robots.txt | head -8
echo "=== SITEMAP ==="
curl -sI https://www.klikcy.com/sitemap.xml | head -8
echo "=== LEGACY 301 ==="
curl -sI https://www.klikcy.com/services/web-development | head -8
echo "=== NON-WWW ==="
curl -sI https://klikcy.com/ | head -8
echo "=== HTTP REDIRECT ==="
curl -sI http://www.klikcy.com/ | head -8
echo "=== SECURITY HEADERS ==="
curl -sI https://www.klikcy.com/ | grep -iE 'x-content-type|x-frame|referrer|strict-transport|permissions'
echo "=== OLD NEXTJS HEADERS (should be absent) ==="
curl -sI https://www.klikcy.com/ | grep -i nextjs || echo "No x-nextjs headers (good)"
echo "=== OUT DIR SAMPLE ==="
ls /var/www/klikcy-website/out/ | head -10
`.trim();

const conn = new Client();
conn.on("ready", () => {
  conn.exec(script, (err, stream) => {
    if (err) { console.error(err); process.exit(1); }
    stream.on("data", (d) => process.stdout.write(d));
    stream.stderr.on("data", (d) => process.stderr.write(d));
    stream.on("close", () => conn.end());
  });
}).on("error", (e) => { console.error("SSH:", e.message); process.exit(1); })
.connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
  readyTimeout: 30000,
});
