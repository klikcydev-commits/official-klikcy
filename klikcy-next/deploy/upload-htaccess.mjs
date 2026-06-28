#!/usr/bin/env node
import { Client } from "ssh2";
import { createReadStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { config as loadDotenv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const local = join(__dirname, "..", "out", ".htaccess");
const remote = "/var/www/klikcy-website/out/.htaccess";

const conn = new Client();
conn.on("ready", () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const rs = createReadStream(local);
    const ws = sftp.createWriteStream(remote);
    ws.on("close", () => {
      console.log("Uploaded .htaccess");
      conn.end();
    });
    rs.pipe(ws);
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
