# Klikcy — Next.js 14 static export

Production site for [klikcy.com](https://www.klikcy.com). ~21,013 pre-rendered HTML pages in `out/`.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production build

```bash
# Set before build — baked into static HTML
export NEXT_PUBLIC_SITE_URL=https://www.klikcy.com
export NEXT_PUBLIC_CONTACT_EMAIL=build@klikcy.com
export NEXT_PUBLIC_CONTACT_API_URL=

npm run build
npm run htaccess:generate
npm run preview   # serves out/
```

## Hostinger VPS deploy

See **[deploy/DEPLOY-HOSTINGER-VPS.md](./deploy/DEPLOY-HOSTINGER-VPS.md)**.

Quick path (Windows):

```powershell
.\deploy\prepare-release.ps1
# Upload release-vps/ to /var/www/klikcy-website
# On VPS: bash deploy/deploy-vps.sh
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run build` | Static export → `out/` |
| `npm run htaccess:generate` | Write `out/.htaccess` (legacy 301s) |
| `npm run server` | Contact API (`../server/index.mjs`) |
| `npm run seo:validate` | Check robots + sitemap |
| `npm run sitemap:build` | Regenerate sitemaps (parent `../scripts/`) |

## Architecture

- **Static site:** `out/` served by OpenLiteSpeed/Apache
- **Contact API:** Express on port 8787, proxied at `/api/*`
- **No** `next start` in production
- **No** `redirects()` in `next.config.mjs` (use `.htaccess` + `LegacyRedirect`)

Page content lives in `src/views/` (not `src/pages/`).
