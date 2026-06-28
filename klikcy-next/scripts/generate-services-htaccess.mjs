import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const servicesDir = path.resolve(__dirname, "../out/services");

if (!fs.existsSync(servicesDir)) {
  console.error("out/services/ not found — run npm run build first");
  process.exit(1);
}

// Legacy slug 301s are handled by OpenLiteSpeed vhost rewriteRules (see deploy/configure-ols.sh).
const htaccess = `# 301 — /services/ index to canonical all-services hub
RewriteEngine On
RewriteRule ^$ https://www.klikcy.com/all-services/ [R=301,L]
`;

fs.writeFileSync(path.join(servicesDir, ".htaccess"), htaccess);
console.log("Wrote out/services/.htaccess");
