#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
curl -sI https://www.klikcy.com/
echo "---HTTP---"
curl -sI http://www.klikcy.com/ | head -6
echo "---LEGACY---"
curl -sI https://www.klikcy.com/services/web-development | head -8
echo "---CONTACT VALIDATION---"
curl -s -X POST https://www.klikcy.com/api/contact -H "Content-Type: application/json" -d "{}"
echo ""
`.trim();

const conn = new Client();
conn.on("ready", () => {
  conn.exec(script, (err, stream) => {
    if (err) throw err;
    stream.on("data", (d) => process.stdout.write(d));
    stream.on("close", () => conn.end());
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
