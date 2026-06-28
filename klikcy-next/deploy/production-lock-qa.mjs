#!/usr/bin/env node
/**
 * Final production lock: backup working state, compare OLS config, redirect regression,
 * OLS validation. Read-only on live config except creating backups and disabling scripts.
 */
import { Client } from "ssh2";
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "..", "..", ".env") });

const STAMP = new Date().toISOString().slice(0, 16).replace("T", "-").replace(":", "");
const BACKUP_ROOT = `/var/backups/klikcy/${STAMP}-final-working-production`;
const WORKING_VHCONF_BACKUP = "vhconf.conf.backup-2026-06-21-203441";
const WEB_ROOT = "/var/www/klikcy-website";
const VH_DIR = "/usr/local/lsws/conf/vhosts/KLIKCY";

const DANGEROUS_SCRIPTS = [
  "reconfigure-ols.mjs",
  "test-append-rewrite.mjs",
  "fix-legacy-redirects.mjs",
  "deploy-legacy-redirects.mjs",
  "restore-vhconf.mjs",
  "test-restore-backup.mjs",
  "debug-rewrite.mjs",
  "restore-working-vhconf.mjs",
];

const LEGACY_REDIRECT_TESTS = [
  { path: "/services/web-development", expect: "/services/custom-website-development/" },
  { path: "/services/web-development/", expect: "/services/custom-website-development/" },
  { path: "/services/app-development", expect: "/services/mobile-app-development/" },
  { path: "/services/app-development/", expect: "/services/mobile-app-development/" },
  { path: "/services/digital-marketing", expect: "/services/digital-marketing-strategy/" },
  { path: "/services/digital-marketing/", expect: "/services/digital-marketing-strategy/" },
  { path: "/services/seo", expect: null },
  { path: "/services/branding", expect: null },
  { path: "/services/ecommerce", expect: null },
  { path: "/services/ecommerce-development", expect: "/services/shopify-store-development/" },
  { path: "/services/e-commerce-development/", expect: "/services/shopify-store-development/" },
  { path: "/services/ai-automations", expect: "/services/ai-chatbot-development/" },
  { path: "/services/ai-automation", expect: null },
  { path: "/services/ui-ux-design", expect: "/services/ui-ux-design/" },
];

const script = `
set -euo pipefail
STAMP="${STAMP}"
BACKUP_ROOT="${BACKUP_ROOT}"
WORKING="${WORKING_VHCONF_BACKUP}"
WEB="${WEB_ROOT}"
VH="${VH_DIR}"

echo "========== A. CREATE FINAL WORKING BACKUP =========="
mkdir -p "$BACKUP_ROOT"/{ols,htaccess,website,pm2,env}
cp -a "$VH/vhconf.conf" "$BACKUP_ROOT/ols/vhconf.conf"
cp -a "$VH/$WORKING" "$BACKUP_ROOT/ols/$WORKING" 2>/dev/null || true
ls -lt "$VH"/vhconf.conf.backup-* 2>/dev/null | head -8 > "$BACKUP_ROOT/ols/vhconf-backup-list.txt" || true
cp -a "$WEB/out/services/.htaccess" "$BACKUP_ROOT/htaccess/services.htaccess" 2>/dev/null || echo "(no services/.htaccess)" > "$BACKUP_ROOT/htaccess/services.htaccess"
cp -a "$WEB/out/.htaccess" "$BACKUP_ROOT/htaccess/root.htaccess" 2>/dev/null || echo "(no root .htaccess)" > "$BACKUP_ROOT/htaccess/root.htaccess"
tar -czf "$BACKUP_ROOT/website/klikcy-website-out.tar.gz" -C "$WEB" out 2>/dev/null || echo "WARN: website tar failed"
pm2 jlist > "$BACKUP_ROOT/pm2/pm2-jlist.json" 2>/dev/null || pm2 list > "$BACKUP_ROOT/pm2/pm2-list.txt"
pm2 save --force 2>/dev/null || true
if [[ -f "$WEB/.env" ]]; then
  sed -E 's/^(SMTP_PASS|VPS_PASSWORD|.*_SECRET|.*_KEY)=.*/\\1=***REDACTED***/' "$WEB/.env" > "$BACKUP_ROOT/env/dotenv-redacted.env"
  grep -E '^[A-Z_]+=' "$WEB/.env" | cut -d= -f1 | sort > "$BACKUP_ROOT/env/dotenv-keys.txt"
fi
echo "Backup path: $BACKUP_ROOT"
du -sh "$BACKUP_ROOT" "$BACKUP_ROOT"/* 2>/dev/null || true

echo ""
echo "========== B. VHCONF COMPARISON (no changes) =========="
echo "--- md5 current vs known-good backup ---"
md5sum "$VH/vhconf.conf" "$VH/$WORKING" 2>/dev/null || true
if diff -q "$VH/vhconf.conf" "$VH/$WORKING" >/dev/null 2>&1; then
  echo "MATCH: live vhconf.conf == $WORKING"
else
  echo "DIFF: live vhconf.conf != $WORKING (showing rewriteRules diff only)"
  diff -u <(grep -A30 'rewriteRules' "$VH/$WORKING" 2>/dev/null | head -35) <(grep -A30 'rewriteRules' "$VH/vhconf.conf" 2>/dev/null | head -35) || true
fi
echo "--- rewriteRules block count (must be 1) ---"
grep -c 'rewriteRules' "$VH/vhconf.conf" || echo 0
echo "--- vhost legacy rewriteRules (leading slash) ---"
grep 'RewriteRule.*services/' "$VH/vhconf.conf" | head -12
echo "--- broken redirect context blocks (should be 0) ---"
grep -c 'context /services/web-development' "$VH/vhconf.conf" 2>/dev/null || echo 0
echo "--- configure-ols.sh on server (reference only, NOT run) ---"
head -5 "$WEB/deploy/configure-ols.sh" 2>/dev/null || echo "(missing)"
grep -c 'RewriteRule.*services/' "$WEB/deploy/configure-ols.sh" 2>/dev/null || echo 0

echo ""
echo "========== C. OLS VALIDATION =========="
/usr/local/lsws/bin/lshttpd -t 2>&1 | tail -5 || echo "lshttpd -t unavailable"
echo "--- OLS status ---"
/usr/local/lsws/bin/lswsctrl status 2>&1 | head -3

echo ""
echo "========== D. HTACCESS DOCUMENTATION =========="
echo "--- root .htaccess (first 20 lines) ---"
head -20 "$WEB/out/.htaccess" 2>/dev/null || echo "(none)"
echo "--- services/.htaccess ---"
cat "$WEB/out/services/.htaccess" 2>/dev/null || echo "(none)"

echo ""
echo "========== E. LEGACY REDIRECT REGRESSION =========="
fail=0
check_redirect() {
  local path="$1"
  local expect="$2"
  local url="https://www.klikcy.com\${path}"
  local http_url="http://www.klikcy.com\${path}"
  local code loc final
  code=\$(curl -sI -o /dev/null -w '%{http_code}' "\$url" 2>/dev/null || echo "000")
  loc=\$(curl -sI "\$url" 2>/dev/null | grep -i '^location:' | head -1 | tr -d '\\r')
  final=\$(curl -sI -L -o /dev/null -w '%{url_effective}|%{http_code}' "\$url" 2>/dev/null || echo "fail|000")
  echo "PATH=\$path FIRST=\$code LOC=\$loc FINAL=\$final"
  if [[ "\$code" != "301" && "\$code" != "308" ]]; then
    echo "  WARN: expected 301 on first hop for \$path (got \$code)"
    fail=\$((fail+1))
  fi
  if [[ -n "\$expect" && "\$final" != *"\$expect"* ]]; then
    echo "  WARN: final URL missing expected \$expect"
    fail=\$((fail+1))
  fi
  if [[ "\$final" != *"https://www.klikcy.com"* ]]; then
    echo "  WARN: final not https www"
    fail=\$((fail+1))
  fi
  # HTTP variant
  local hcode=\$(curl -sI -o /dev/null -w '%{http_code}' "\$http_url" 2>/dev/null || echo "000")
  local hfinal=\$(curl -sI -L -o /dev/null -w '%{url_effective}|%{http_code}' "\$http_url" 2>/dev/null)
  echo "  HTTP first=\$hcode HTTP final=\$hfinal"
}
${LEGACY_REDIRECT_TESTS.map((t) => `check_redirect "${t.path}" "${t.expect ?? ""}"`).join("\n")}
echo "Redirect failures flagged: \$fail"

echo ""
echo "========== F. BLOG STATUS =========="
blog_code=\$(curl -sI -o /dev/null -w '%{http_code}' https://www.klikcy.com/blog/ 2>/dev/null)
blog_final=\$(curl -sI -L -o /dev/null -w '%{url_effective}|%{http_code}' https://www.klikcy.com/blog/ 2>/dev/null)
echo "blog/ first=\$blog_code final=\$blog_final"
ls -la "$WEB/out/blog" 2>/dev/null | head -5 || echo "(no out/blog directory)"

echo ""
echo "========== G. DISABLE DANGEROUS REMOTE SCRIPTS =========="
for s in ${DANGEROUS_SCRIPTS.map((s) => `"${s}"`).join(" ")}; do
  if [[ -f "$WEB/deploy/\$s" && ! -f "$WEB/deploy/\$s.disabled" ]]; then
    mv "$WEB/deploy/\$s" "$WEB/deploy/\$s.disabled"
    echo "Disabled: \$s -> \$s.disabled"
  elif [[ -f "$WEB/deploy/\$s.disabled" ]]; then
    echo "Already disabled: \$s.disabled"
  else
    echo "Not found: \$s"
  fi
done
if [[ ! -f "$WEB/deploy/PRODUCTION-LOCK-README.txt" ]]; then
  cat > "$WEB/deploy/PRODUCTION-LOCK-README.txt" <<'LOCKEOF'
Klikcy production lock — DO NOT run these without testing on staging:
- reconfigure-ols.mjs.disabled (overwrites vhconf.conf)
- configure-ols.sh (full vhost rewrite — only after backup + validation)
- test-append-rewrite.mjs.disabled (duplicates rewriteRules)
- fix-legacy-redirects.mjs.disabled / deploy-legacy-redirects.mjs.disabled
- restore-vhconf.mjs.disabled / restore-working-vhconf.mjs.disabled
Known-good OLS backup: vhconf.conf.backup-2026-06-21-203441
Final working backup: ${BACKUP_ROOT}
LOCKEOF
  echo "Wrote PRODUCTION-LOCK-README.txt"
fi
ls -la "$WEB/deploy"/*.disabled 2>/dev/null | head -15 || true

echo ""
echo "========== H. EXISTING BACKUPS =========="
ls -la /var/backups/klikcy/ 2>/dev/null | tail -10 || echo "(none)"
`.trim();

const conn = new Client();
conn
  .on("ready", () => {
    conn.exec(script, (err, stream) => {
      if (err) throw err;
      stream.on("data", (d) => process.stdout.write(d));
      stream.stderr.on("data", (d) => process.stderr.write(d));
      stream.on("close", (code) => process.exit(code ?? 0));
    });
  })
  .on("error", (e) => {
    console.error("SSH:", e.message);
    process.exit(1);
  })
  .connect({
    host: process.env.VPS_HOST,
    port: 22,
    username: process.env.VPS_USER || "root",
    password: process.env.VPS_PASSWORD,
    readyTimeout: 30000,
  });
