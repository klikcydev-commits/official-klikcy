# Klikcy production lock (2026-06-21)

**Status:** Live site verified. OpenLiteSpeed vhost locked to known-good config.

## Do not run without staging test

| Script | Risk |
|--------|------|
| `reconfigure-ols.mjs` | Uploads and runs `configure-ols.sh`, **overwrites** `vhconf.conf` |
| `configure-ols.sh` | Full vhost replace; can break legacy 301s if run twice or appended |
| `test-append-rewrite.mjs` | **Duplicates** `rewriteRules` blocks |
| `fix-legacy-redirects.mjs` | Modifies live redirect setup |
| `deploy-legacy-redirects.mjs` | Deploys redirect experiments |
| `restore-vhconf.mjs` / `restore-working-vhconf.mjs` | Restores older backup without QA |
| `debug-rewrite.mjs` | Changes OLS log level on live vhost |

These are renamed to `*.disabled` on the VPS under `/var/www/klikcy-website/deploy/` after the final lock pass.

## Known-good OpenLiteSpeed backup

```
/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf.backup-2026-06-21-203441
```

Live `vhconf.conf` should match this file. Legacy service 301s live in the **vhost** `rewriteRules` block (leading-slash patterns), not in duplicate context redirect blocks.

## Safe operations

- `node deploy/qa-final.mjs` — read-only live QA
- `node deploy/production-lock-qa.mjs` — backup + compare + redirect tests (no config writes except backups)
- Content deploy via `upload-vps.mjs` + `deploy-vps.sh` **without** running `configure-ols.sh` (comment out lines 59–62 in deploy-vps.sh if needed)

## Sitemap migration (2026-06-21)

Old SEO sitemap URLs (WordPress/Yoast-style paths, `sitemap_index.xml`, etc.) redirect to `https://www.klikcy.com/sitemap.xml` via **directory stub + `.htaccess`** under `out/` (OLS applies subdirectory htaccess reliably; vhost `rewriteRules` do not fire for root paths on this host).

After deploy:

```bash
node scripts/generate-sitemap-stubs.mjs
node scripts/generate-htaccess.mjs
# upload out/ to VPS
```

Live apply script: `node deploy/apply-sitemap-stub-redirects.mjs`  
QA: `node deploy/test-sitemap-redirects.mjs`

**Do not** add `context /sitemap {` redirect blocks — prefix-matches `/sitemap.xml` and loops.


```bash
B=/usr/local/lsws/conf/vhosts/KLIKCY
cp -a $B/vhconf.conf.backup-2026-06-21-203441 $B/vhconf.conf
/usr/local/lsws/bin/lshttpd -t && /usr/local/lsws/bin/lswsctrl reload
curl -sI https://www.klikcy.com/services/web-development | head -4
```

## Final working backup

Created by `production-lock-qa.mjs` under:

```
/var/backups/klikcy/<timestamp>-final-working-production/
```

Contains: `ols/`, `htaccess/`, `website/`, `pm2/`, `env/` (redacted).
