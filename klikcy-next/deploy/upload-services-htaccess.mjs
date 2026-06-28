#!/usr/bin/env node
/** Push services/.htaccess — /services/ index redirect only (legacy slugs via OLS vhost). */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const servicesHtaccess = `# 301 — /services/ index to canonical all-services hub
RewriteEngine On
RewriteRule ^$ https://www.klikcy.com/all-services/ [R=301,L]
`;

const conn = new Client();
conn.on("ready", () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const remote = "/var/www/klikcy-website/out/services/.htaccess";
    const ws = sftp.createWriteStream(remote);
    ws.on("close", () => {
      console.log(`Wrote ${remote}`);
      conn.end();
    });
    ws.write(servicesHtaccess);
    ws.end();
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
