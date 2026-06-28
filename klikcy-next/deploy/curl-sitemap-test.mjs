#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
echo "=== http1.1 ==="
curl -sI --http1.1 https://www.klikcy.com/sitemap_index.xml | head -10
echo "=== http1.1 follow ==="
curl -sI --http1.1 -L https://www.klikcy.com/sitemap_index.xml | grep -iE '^HTTP|^location'
echo "=== wp ==="
curl -sI --http1.1 https://www.klikcy.com/wp-sitemap.xml | head -6
echo "=== sitemap path ==="
curl -sI --http1.1 https://www.klikcy.com/sitemap/ | head -6
echo "=== count contexts ==="
grep -c 'context /sitemap' /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
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
