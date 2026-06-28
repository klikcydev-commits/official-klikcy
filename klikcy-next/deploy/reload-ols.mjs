#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
/usr/local/lsws/bin/lswsctrl reload
echo "reloaded"
grep -A3 'web-development' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf | head -6
curl -sI https://www.klikcy.com/services/web-development | head -5
curl -sI https://www.klikcy.com/services/web-development/ | head -5
curl -sI http://www.klikcy.com/services/web-development | head -5
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
