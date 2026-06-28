# Deploy klikcy-next to Hostinger VPS

Replaces the old Next.js app at `/var/www/klikcy-website` (OpenLiteSpeed + PM2 on port 3000).

## New architecture

| Layer | Old VPS | New VPS |
|-------|---------|---------|
| Website | Next.js server (`npm start` → port 3000) | **Static HTML** from `out/` (~21k pages) |
| Contact form | Next.js API routes | **Express** `server/index.mjs` on port **8787** |
| PM2 app | `klikcy-website` | `klikcy-contact-api` only |
| Web server | OpenLiteSpeed → `:3000` | OpenLiteSpeed → **`/var/www/klikcy-website/out`** + proxy `/api` |

No SPA fallback needed — every URL is a real `index.html` file.

---

## Step 1 — Build locally (Windows)

From repo root:

```powershell
cd klikcy-next\deploy
.\prepare-release.ps1
```

This creates `newklikcy/release-vps/` containing:

```
release-vps/
  out/              ← static site + .htaccess (9 legacy 301s)
  server/index.mjs  ← contact API
  deploy/           ← ecosystem.config.cjs, deploy-vps.sh
  .env.example
```

**Important:** Edit `.env` on the server (not in git) with real SMTP values.

---

## Step 2 — Backup old site on VPS

```bash
ssh root@YOUR_VPS_IP
cp -a /var/www/klikcy-website /var/www/klikcy-website.backup-$(date +%F)
pm2 stop klikcy-website
```

---

## Step 3 — Upload release

Upload `release-vps/*` to `/var/www/klikcy-website/` (replace contents).

Options:

- **SCP:** `scp -r release-vps/* root@YOUR_VPS_IP:/var/www/klikcy-website/`
- **SFTP:** FileZilla / Hostinger file manager
- **rsync:** `rsync -avz --delete release-vps/ root@IP:/var/www/klikcy-website/`

---

## Step 4 — Environment on VPS

```bash
cd /var/www/klikcy-website
cp .env.example .env
nano .env
```

Required:

```env
SITE_URL=https://www.klikcy.com
CONTACT_API_PORT=8787
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=build@klikcy.com
SMTP_PASS=your-password
CONTACT_EMAIL=build@klikcy.com
```

The static site was built with `NEXT_PUBLIC_CONTACT_API_URL=` (empty) so the form POSTs to `/api/contact` on the same domain.

---

## Step 5 — Run deploy script on VPS

```bash
cd /var/www/klikcy-website
chmod +x deploy/deploy-vps.sh
bash deploy/deploy-vps.sh
```

This stops `klikcy-website`, starts `klikcy-contact-api`, and runs a health check.

---

## Step 6 — OpenLiteSpeed configuration

In Hostinger hPanel → VPS → OpenLiteSpeed (or WebAdmin):

1. **Virtual Host → General → Document Root**
   - Set to: `/var/www/klikcy-website/out`

2. **Enable `.htaccess`**
   - AllowOverride All (for legacy 301 rules in `out/.htaccess`)

3. **Proxy `/api` to contact server**
   - Context type: Proxy
   - URI: `/api/`
   - Handler: `http://127.0.0.1:8787/api/`

4. **Remove old proxy to port 3000** (if still configured)

5. Reload OpenLiteSpeed

---

## Step 7 — Verify

```bash
# Static homepage
curl -I https://www.klikcy.com/

# Programmatic page (pre-rendered HTML)
curl -s https://www.klikcy.com/custom-website-development/california/los-angeles/ | grep '<title>'

# Legacy 301 (Apache/LiteSpeed + .htaccess)
curl -I https://www.klikcy.com/services/web-development

# Contact API
curl https://www.klikcy.com/api/health
# → {"ok":true,"version":2,...}

pm2 status
pm2 logs klikcy-contact-api --lines 30
```

Submit the contact form in the browser.

---

## Updating later

1. Run `prepare-release.ps1` locally
2. Upload only changed `out/` (or full sync)
3. On VPS: `bash deploy/deploy-vps.sh`

Do **not** regenerate sitemaps unless service/state/city slugs change.

---

## GitHub to VPS auto-deploy

The repo now includes `.github/workflows/deploy-vps.yml` for GitHub Actions deployment on pushes to `main` or manual runs from the Actions tab.

Add these GitHub repository secrets before using it:

```text
VPS_HOST
VPS_USER
VPS_PASSWORD
WEB_ROOT
SITE_URL
CONTACT_API_PORT
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
CONTACT_EMAIL
```

Recommended values:

- `VPS_USER`: `root`
- `WEB_ROOT`: `/var/www/klikcy-website`
- `SITE_URL`: `https://www.klikcy.com`
- `CONTACT_API_PORT`: `8787`

The workflow builds `klikcy-next`, creates the same `release-vps` bundle used by the manual process, uploads it to the VPS, runs `deploy/deploy-vps.sh`, then syncs the server `.env` from GitHub Secrets and restarts `klikcy-contact-api`.

For the first GitHub-based deploy, make sure the VPS already has:

1. OpenLiteSpeed document root set to `/var/www/klikcy-website/out`
2. `/api` proxied to `http://127.0.0.1:8787/api/`
3. `pm2`, `node`, and `npm` installed on the VPS

---

## Difference from Desktop `project/project`

The folder `C:\Users\wassi\Desktop\project\project` is the **old** Next.js site (blog CMS, `server.js`, PM2 on 3000).

This migration uses `newklikcy/klikcy-next` — different codebase, static export, no blog routes.

After cutover you can archive the Desktop project; do not mix the two codebases on the VPS.
