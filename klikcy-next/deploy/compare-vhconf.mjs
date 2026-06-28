#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== BACKUP 201243 rewriteRules ==="
grep -A25 'rewriteRules' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf.backup-2026-06-21-201243 | head -30
echo "=== CURRENT ==="
grep -A25 'rewriteRules' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf | head -30
echo "=== HTACCESS head ==="
head -20 /var/www/klikcy-website/out/.htaccess
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
