#!/usr/bin/env node
/** Remove legacy service slug static folders so OLS 301 rewrite rules apply. */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const LEGACY = [
  "web-development",
  "app-development",
  "digital-marketing",
  "ai-automations",
  "saas-application-development",
  "cro-seo",
  "e-commerce-development",
  "ecommerce-development",
];

const base = "/var/www/klikcy-website/out/services";
const script = `
${LEGACY.map((s) => `rm -rf ${base}/${s}`).join("\n")}
echo "Removed legacy static service folders"
curl -sI https://www.klikcy.com/services/web-development | head -4
curl -sI https://www.klikcy.com/services/web-development/ | head -4
curl -sI https://www.klikcy.com/services/app-development/ | head -4
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
