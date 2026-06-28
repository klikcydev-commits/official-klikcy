#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const BACKUP = "/var/backups/klikcy/2026-06-21T19-30-52-old-site/klikcy-website";

const script = `
echo "=== OLD BACKUP: GTM / GA / GSC ==="
grep -rhiE 'GTM-[A-Z0-9]+|G-[A-Z0-9]{8,}|google-site-verification|googletagmanager\\.com|gtag\\(|NEXT_PUBLIC_GTM|NEXT_PUBLIC_GA|GOOGLE_SITE_VERIFICATION' ${BACKUP} \
  --include='*.tsx' --include='*.ts' --include='*.jsx' --include='*.js' --include='*.html' --include='*.env*' 2>/dev/null | sort -u | head -40

echo ""
echo "=== OLD google*.html verification files ==="
find ${BACKUP} -iname 'google*.html' 2>/dev/null

echo ""
echo "=== OLD app layout/head files ==="
find ${BACKUP}/app ${BACKUP}/src -maxdepth 4 \\( -name 'layout.*' -o -name '_document.*' -o -name 'Head.*' \\) 2>/dev/null | head -15

echo ""
echo "=== LIVE NEW SITE (tracking present?) ==="
curl -s https://www.klikcy.com/ | grep -iE 'GTM-|googletagmanager|google-site-verification|gtag|G-[A-Z0-9]{8,}' | head -10 || echo "(none found on new site)"
`.trim();

const conn = new Client();
conn
  .on("ready", () => {
    conn.exec(script, (err, stream) => {
      if (err) throw err;
      stream.on("data", (d) => process.stdout.write(d));
      stream.stderr.on("data", (d) => process.stderr.write(d));
      stream.on("close", () => conn.end());
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
