#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== /services/ index ==="
curl -sI https://www.klikcy.com/services/ | head -5
echo "=== custom-website-development (exists) ==="
curl -sI https://www.klikcy.com/services/custom-website-development/ | head -3
echo "=== context / rewrite test wp-login ==="
curl -sI https://www.klikcy.com/wp-login.php | head -3
echo "=== htaccess autoLoad ==="
grep -A3 'rewrite' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf | tail -8
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
