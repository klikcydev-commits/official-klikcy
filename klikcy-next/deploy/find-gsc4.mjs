#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const B = "/var/backups/klikcy/2026-06-21T19-30-52-old-site/klikcy-website";
const script = `
grep -roh 'google-site-verification[^>]*content="[^"]*"' ${B}/.next/server/app 2>/dev/null | head -5
grep -roh 'content="[^"]*" name="google-site-verification"' ${B}/.next/server/app 2>/dev/null | head -5
grep -rn 'verification' ${B}/src/lib ${B}/src/app 2>/dev/null | head -15
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
