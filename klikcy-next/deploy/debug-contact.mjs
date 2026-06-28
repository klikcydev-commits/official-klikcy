#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== PM2 LOGS (contact) ==="
pm2 logs klikcy-contact-api --lines 25 --nostream 2>&1 | tail -30
echo "=== LOCAL CONTACT TEST ==="
curl -s -X POST http://127.0.0.1:8787/api/contact -H 'Content-Type: application/json' -d '{"name":"QA Test","email":"qa@example.com","phone":"5551234567","service":"Other","message":"Production QA test message from deploy script.","website":""}'
echo ""
echo "=== ENV KEYS (names only) ==="
grep -E '^[A-Z_]+=' /var/www/klikcy-website/.env 2>/dev/null | cut -d= -f1 | sort
`.trim();

const conn = new Client();
conn.on("ready", () => {
  conn.exec(script, (err, stream) => {
    stream.on("data", (d) => process.stdout.write(d));
    stream.stderr.on("data", (d) => process.stderr.write(d));
    stream.on("close", () => conn.end());
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
