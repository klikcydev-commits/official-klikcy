#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const B = "/var/backups/klikcy/2026-06-21T19-30-52-old-site/klikcy-website";
const script = `
find ${B} -name 'layout.tsx' 2>/dev/null
find ${B} -name 'layout.jsx' 2>/dev/null
grep -rl 'google-site-verification' ${B} --include='*.tsx' --include='*.ts' --include='*.jsx' 2>/dev/null | grep -v node_modules | grep -v '.next' | head -5
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
