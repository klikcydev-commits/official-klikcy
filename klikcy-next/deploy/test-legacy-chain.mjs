#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
ls -d /var/www/klikcy-website/out/services/web-development 2>/dev/null || echo "no legacy dir"
curl -sI -L https://www.klikcy.com/services/web-development 2>&1 | grep -iE '^HTTP|^location' | head -10
curl -sI -L https://www.klikcy.com/services/app-development/ 2>&1 | grep -iE '^HTTP|^location' | head -10
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
