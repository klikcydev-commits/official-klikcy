#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
VH=/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
cp -a $VH \${VH}.backup-sitemap-ctx-test-$(date +%F-%H%M%S)

# Add redirect context before context /api/
python3 <<'PY'
from pathlib import Path
vh = Path("/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf")
text = vh.read_text()
block = '''
context /sitemap_index.xml {
  type                    redirect
  uri                     https://www.klikcy.com/sitemap.xml
  allowBrowse             1
}

'''
if "context /sitemap_index.xml" not in text:
    text = text.replace("context /api/ {", block + "context /api/ {", 1)
    vh.write_text(text)
    print("added redirect context")
else:
    print("already exists")
PY

/usr/local/lsws/bin/lswsctrl reload
curl -sI https://www.klikcy.com/sitemap_index.xml | head -5
curl -sI https://www.klikcy.com/sitemap.xml | head -3
curl -sI https://www.klikcy.com/services/web-development | head -3
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
