#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
OLD=/var/backups/klikcy/2026-06-21T19-30-52-old-site/klikcy-website
echo "=== old sitemap.xml ==="
cat $OLD/public/sitemap.xml | head -30
echo ""
echo "=== old next-sitemap.config.js ==="
cat $OLD/next-sitemap.config.js 2>/dev/null
echo ""
echo "=== old next-sitemap dir ==="
ls -la $OLD/next-sitemap 2>/dev/null | head -20
find $OLD/next-sitemap -type f 2>/dev/null | head -20
echo ""
echo "=== old public sitemap* ==="
ls -la $OLD/public/sitemap* 2>/dev/null
echo ""
echo "=== old scripts/fix-sitemap.js ==="
head -40 $OLD/scripts/fix-sitemap.js 2>/dev/null
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
