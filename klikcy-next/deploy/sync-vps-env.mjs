#!/usr/bin/env node
/** Sync server .env keys from repo root to VPS (values never printed). */
import { Client } from "ssh2";
import { existsSync } from "fs";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const envPath = join(repoRoot, ".env");
if (existsSync(envPath)) {
  loadDotenv({ path: envPath });
}

const KEYS = [
  "SITE_URL",
  "CONTACT_API_PORT",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_EMAIL",
];

const lines = KEYS.filter((k) => process.env[k]?.trim()).map((k) => `${k}=${process.env[k].trim()}`);

if (!process.env.VPS_HOST || !process.env.VPS_PASSWORD) {
  console.error("Missing VPS_HOST or VPS_PASSWORD.");
  process.exit(1);
}

if (!lines.some((l) => l.startsWith("SMTP_USER="))) {
  console.error("Missing SMTP_USER — cannot sync.");
  process.exit(1);
}

const remoteEnv = lines.join("\n") + "\n";
const remotePath = "/var/www/klikcy-website/.env";

const conn = new Client();
conn
  .on("ready", () => {
    conn.sftp((err, sftp) => {
      if (err) throw err;
      const ws = sftp.createWriteStream(remotePath, { mode: 0o600 });
      ws.on("close", () => {
        console.log("Synced server .env to VPS (keys only logged):", KEYS.filter((k) => process.env[k]).join(", "));
        conn.exec("pm2 restart klikcy-contact-api && sleep 2 && curl -sf http://127.0.0.1:8787/api/health", (e, stream) => {
          stream.on("data", (d) => process.stdout.write(d));
          stream.on("close", () => conn.end());
        });
      });
      ws.write(remoteEnv);
      ws.end();
    });
  })
  .on("error", (e) => {
    console.error("SSH:", e.message);
    process.exit(1);
  })
  .connect({
    host: process.env.VPS_HOST,
    port: 22,
    username: process.env.VPS_USER || "root",
    password: process.env.VPS_PASSWORD,
    readyTimeout: 30000,
  });
