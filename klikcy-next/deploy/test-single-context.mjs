#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
VH=/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
cp -a /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf.backup-2026-06-21-203441 "$VH"
python3 <<'PY'
from pathlib import Path
vh = Path("/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf")
text = vh.read_text()
block = '''
context /old-sitemap-qa {
  type                    redirect
  uri                     /contact/
  allowBrowse             1
}
'''
text = text.replace("context /api/ {", block + "context /api/ {", 1)
vh.write_text(text)
PY
/usr/local/lsws/bin/lswsctrl reload
curl -sI --http1.1 https://www.klikcy.com/old-sitemap-qa | head -6
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
