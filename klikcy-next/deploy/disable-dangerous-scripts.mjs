#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const SCRIPTS = [
  "reconfigure-ols.mjs",
  "test-append-rewrite.mjs",
  "fix-legacy-redirects.mjs",
  "deploy-legacy-redirects.mjs",
  "restore-vhconf.mjs",
  "test-restore-backup.mjs",
  "debug-rewrite.mjs",
  "restore-working-vhconf.mjs",
  "configure-ols.sh",
];

const lines = SCRIPTS.map((s) => {
  const d = `${s}.disabled`;
  return `[ -f "$WEB/${s}" ] && [ ! -f "$WEB/${d}" ] && mv "$WEB/${s}" "$WEB/${d}" && echo "disabled ${s}"; [ -f "$WEB/${d}" ] && echo "ok ${d}";`;
}).join("\n");

const script = `WEB=/var/www/klikcy-website/deploy\nls "$WEB" | head -40\necho "---"\n${lines}\necho "---"\nls "$WEB"/*.disabled 2>/dev/null`;

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
