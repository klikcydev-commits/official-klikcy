#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== KLIKCY VHOST ==="
cat /usr/local/lsws/conf/vhosts/KLIKCY/vhost.conf 2>/dev/null
echo "=== HTTPD CONFIG SNIPPET ==="
grep -A5 -B2 KLIKCY /usr/local/lsws/conf/httpd_config.conf 2>/dev/null | head -40
echo "=== CURRENT WEB ROOT CONTENTS ==="
ls -la /var/www/klikcy-website/ | head -20
echo "=== PACKAGE.JSON ==="
head -5 /var/www/klikcy-website/package.json 2>/dev/null
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
