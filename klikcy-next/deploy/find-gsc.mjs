#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const B = "/var/backups/klikcy/2026-06-21T19-30-52-old-site/klikcy-website";
const script = `
grep -n 'google-site-verification\\|GTM-PF4N2DXK\\|G-PHEFSHYPR7\\|GoogleAnalytics\\|GoogleTagManager' ${B}/app/layout.tsx 2>/dev/null
grep -rn 'google-site-verification' ${B}/app ${B}/src --include='*.tsx' --include='*.ts' 2>/dev/null | head -10
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
