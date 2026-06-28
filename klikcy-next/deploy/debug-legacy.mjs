#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "single hop web-development:"
curl -sI https://www.klikcy.com/services/web-development | head -5
echo "single hop web-development/:"
curl -sI https://www.klikcy.com/services/web-development/ | head -5
echo "rename htaccess test:"
mv /var/www/klikcy-website/out/.htaccess /var/www/klikcy-website/out/.htaccess.bak 2>/dev/null || true
curl -sI https://www.klikcy.com/services/web-development | head -5
mv /var/www/klikcy-website/out/.htaccess.bak /var/www/klikcy-website/out/.htaccess 2>/dev/null || true
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
