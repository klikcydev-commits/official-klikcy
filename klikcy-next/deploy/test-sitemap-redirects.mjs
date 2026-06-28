#!/usr/bin/env node
/** Full sitemap redirect QA after stub deployment. */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
set +e
fail=0
check() {
  local url="$1"
  local first=\$(curl -sI --http1.1 -o /dev/null -w '%{http_code}' "$url")
  local final=\$(curl -sI --http1.1 -L -o /dev/null -w '%{url_effective}|%{http_code}' "$url")
  echo "$url => first:$first final:$final"
  if [[ "$first" != "301" && "$first" != "308" ]]; then echo "  FAIL first hop"; fail=$((fail+1)); fi
  if [[ "$final" != *"www.klikcy.com/sitemap.xml|200" ]]; then echo "  FAIL final"; fail=$((fail+1)); fi
}

echo "========== OLD SITEMAP URLS =========="
check "http://klikcy.com/sitemap_index.xml"
check "http://www.klikcy.com/sitemap_index.xml"
check "https://klikcy.com/sitemap_index.xml"
check "https://www.klikcy.com/sitemap_index.xml"
check "https://www.klikcy.com/wp-sitemap.xml"
check "https://www.klikcy.com/page-sitemap.xml"
check "https://www.klikcy.com/post-sitemap.xml"
check "https://www.klikcy.com/server-sitemap.xml"
check "https://www.klikcy.com/sitemap-0.xml"
check "https://www.klikcy.com/sitemap/"
check "https://www.klikcy.com/sitemap"

echo ""
echo "========== NEW SITEMAPS STAY 200 =========="
for p in /sitemap.xml /sitemap-static.xml /sitemap-services.xml /sitemap-areas.xml /sitemap-service-state.xml /sitemap-service-state-city-1.xml /sitemap-full.xml; do
  c=\$(curl -sI --http1.1 -o /dev/null -w '%{http_code}' "https://www.klikcy.com\${p}")
  echo "\${p} -> \${c}"
  [[ "\$c" != "200" ]] && fail=$((fail+1))
done

echo ""
echo "========== ROBOTS =========="
curl -s https://www.klikcy.com/robots.txt | grep -i sitemap

echo ""
echo "========== LEGACY + API + GTM =========="
curl -sI --http1.1 https://www.klikcy.com/services/web-development | grep -iE '^HTTP|^location' | head -2
curl -s https://www.klikcy.com/ | grep -o 'GTM-[A-Z0-9]*' | head -1
curl -s https://www.klikcy.com/ | grep -c 'googletagmanager.com/gtag/js' || echo 0
curl -s https://www.klikcy.com/api/health

echo ""
echo "FAILURES: \$fail"
exit \$fail
`.trim();

const conn = new Client();
conn.on("ready", () => {
  conn.exec(script, (err, stream) => {
    stream.on("data", (d) => process.stdout.write(d));
    stream.on("close", (code) => process.exit(code ?? 0));
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
