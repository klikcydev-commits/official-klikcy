#!/usr/bin/env node
import { Client } from "ssh2";
import { createReadStream, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { config as loadDotenv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

function upload(conn, local, remote) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const rs = createReadStream(local);
      const ws = sftp.createWriteStream(remote);
      ws.on("close", resolve);
      ws.on("error", reject);
      rs.pipe(ws);
    });
  });
}

const files = [
  [join(__dirname, "..", "out", ".htaccess"), "/var/www/klikcy-website/out/.htaccess"],
  [join(__dirname, "..", "out", "services", ".htaccess"), "/var/www/klikcy-website/out/services/.htaccess"],
];

const conn = new Client();
conn.on("ready", async () => {
  try {
    for (const [local, remote] of files) {
      if (!existsSync(local)) throw new Error(`Missing ${local}`);
      await upload(conn, local, remote);
      console.log(`Uploaded ${remote}`);
    }
    conn.end();
  } catch (e) {
    console.error(e.message);
    conn.end();
    process.exit(1);
  }
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
