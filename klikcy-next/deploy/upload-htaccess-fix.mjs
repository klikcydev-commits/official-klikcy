#!/usr/bin/env node
/** Push root .htaccess — headers + HTTP/HTTPS only (legacy slugs via OLS vhost). */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const htaccess = `# Klikcy — security headers + HTTP/HTTPS canonical
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
</IfModule>

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{SERVER_PORT} ^80$
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
RewriteCond %{HTTPS} on
RewriteCond %{HTTP_HOST} ^klikcy\\.com$ [NC]
RewriteRule .* https://www.klikcy.com%{REQUEST_URI} [R=301,L]
</IfModule>
`;

const conn = new Client();
conn.on("ready", () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const remote = "/var/www/klikcy-website/out/.htaccess";
    const ws = sftp.createWriteStream(remote);
    ws.on("close", () => {
      console.log(`Wrote ${remote}`);
      conn.end();
    });
    ws.write(htaccess);
    ws.end();
  });
}).connect({
  host: process.env.VPS_HOST,
  port: 22,
  username: process.env.VPS_USER || "root",
  password: process.env.VPS_PASSWORD,
});
