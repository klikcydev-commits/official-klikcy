#!/usr/bin/env bash
# Run ON the Hostinger VPS after uploading/syncing the release bundle.
# Target path: /var/www/klikcy-website (same as the old Next.js app)

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

WEB_ROOT="${WEB_ROOT:-/var/www/klikcy-website}"
cd "$WEB_ROOT"

echo -e "${GREEN}Klikcy static deploy — $WEB_ROOT${NC}"

if [[ ! -d out ]]; then
  echo "Missing out/ directory. Upload klikcy-next/out first." >&2
  exit 1
fi

if [[ ! -f server/index.mjs ]]; then
  echo "Missing server/index.mjs. Copy ../server from the newklikcy repo." >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  echo -e "${YELLOW}Warning: .env not found. Create it from .env.example before starting the API.${NC}"
else
  missing=0
  for key in SMTP_HOST SMTP_USER SMTP_PASS CONTACT_EMAIL SITE_URL; do
    if ! grep -q "^${key}=" .env 2>/dev/null; then
      echo -e "${YELLOW}Missing .env key: ${key}${NC}" >&2
      missing=1
    fi
  done
  if [[ $missing -eq 1 ]]; then
    echo -e "${YELLOW}Run deploy/sync-vps-env.mjs from your machine to sync SMTP settings.${NC}" >&2
  fi
fi

# Contact API dependencies (minimal — only what server/index.mjs needs)
if [[ ! -d node_modules/express ]]; then
  echo -e "${GREEN}Installing contact API dependencies...${NC}"
  npm install --omit=dev express cors dotenv nodemailer zod
fi

echo -e "${GREEN}Stopping old Next.js PM2 app (if any)...${NC}"
pm2 delete klikcy-website 2>/dev/null || true

echo -e "${GREEN}Starting contact API...${NC}"
pm2 delete klikcy-contact-api 2>/dev/null || true
pm2 start deploy/ecosystem.config.cjs
pm2 save

echo -e "${GREEN}Health check:${NC}"
sleep 2
curl -sf "http://127.0.0.1:8787/api/health" || echo -e "${YELLOW}API not responding yet — check .env and pm2 logs${NC}"

# PRODUCTION LOCK: do not auto-run configure-ols.sh — it overwrites vhconf.conf.
# Restore from vhconf.conf.backup-2026-06-21-203441 if needed. See PRODUCTION-LOCK-README.md
# if [[ -x deploy/configure-ols.sh ]]; then
#   bash deploy/configure-ols.sh
# fi

echo ""
echo -e "${GREEN}Done.${NC}"
echo "1. Set OpenLiteSpeed document root to: $WEB_ROOT/out"
echo "2. Proxy /api → http://127.0.0.1:8787"
echo "3. Ensure AllowOverride so out/.htaccess 301 rules work"
echo "4. pm2 logs klikcy-contact-api"
