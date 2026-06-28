#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const VPS_HOST = process.env.VPS_HOST;
const VPS_USER = process.env.VPS_USER || "root";
const VPS_PASSWORD = process.env.VPS_PASSWORD;

if (!VPS_PASSWORD || !VPS_HOST) {
  console.error("Missing VPS_HOST or VPS_PASSWORD in repo root .env");
  process.exit(1);
}

const script = `
set +e
echo "=== HOST ==="
hostname; uname -a
echo "=== /var/www ==="
ls -la /var/www/
echo "=== PM2 ==="
pm2 list
echo "=== LISTEN PORTS ==="
ss -tlnp 2>/dev/null | grep -E '3000|8787|443|80' || netstat -tlnp 2>/dev/null | grep -E '3000|8787'
echo "=== WEB SERVER ==="
which nginx lswsctrl 2>/dev/null
systemctl is-active nginx 2>/dev/null
systemctl is-active lsws 2>/dev/null
echo "=== OLS VHOSTS ==="
ls -la /usr/local/lsws/conf/vhosts/ 2>/dev/null
grep -h docRoot /usr/local/lsws/conf/vhosts/*/vhost.conf 2>/dev/null
grep -h 'proxy' /usr/local/lsws/conf/vhosts/*/vhost.conf 2>/dev/null | head -20
echo "=== LOCAL APP ==="
curl -sI http://127.0.0.1:3000/ 2>/dev/null | head -8
curl -s http://127.0.0.1:8787/api/health 2>/dev/null
echo "=== LIVE SITE HEADERS ==="
curl -sI https://www.klikcy.com/ 2>/dev/null | head -20
`.trim();

const conn = new Client();
conn
  .on("ready", () => {
    conn.exec(script, (err, stream) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      stream.on("data", (d) => process.stdout.write(d));
      stream.stderr.on("data", (d) => process.stderr.write(d));
      stream.on("close", (code) => {
        conn.end();
        process.exit(code ?? 0);
      });
    });
  })
  .on("error", (err) => {
    console.error("SSH error:", err.message);
    process.exit(1);
  })
  .connect({
    host: VPS_HOST,
    port: 22,
    username: VPS_USER,
    password: VPS_PASSWORD,
    readyTimeout: 30000,
  });
