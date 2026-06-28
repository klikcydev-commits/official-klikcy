#!/usr/bin/env node
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const script = `
VH=/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf
cp -a $VH $VH.bak-slash-test
# Add vhost-level rewriteRules with leading slash
cat >> $VH <<'EOF'

rewriteRules  {
  RewriteRule ^/services/web-development/?$ https://www.klikcy.com/services/custom-website-development/ [R=301,L]
  RewriteRule ^/services/app-development/?$ https://www.klikcy.com/services/mobile-app-development/ [R=301,L]
}
EOF
/usr/local/lsws/bin/lswsctrl reload
curl -sI https://www.klikcy.com/services/web-development | head -4
curl -sI https://www.klikcy.com/services/web-development/ | head -4
# restore
mv $VH.bak-slash-test $VH
/usr/local/lsws/bin/lswsctrl reload
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
