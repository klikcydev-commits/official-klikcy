#!/usr/bin/env node
/** Run remote deploy only (tarball must already exist at /tmp/klikcy-release.tar.gz). */
import { Client } from "ssh2";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { config as loadDotenv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..", "..");
loadDotenv({ path: join(repoRoot, ".env") });

const VPS_HOST = process.env.VPS_HOST;
const VPS_USER = process.env.VPS_USER || "root";
const VPS_PASSWORD = process.env.VPS_PASSWORD;
const WEB_ROOT = process.env.WEB_ROOT || "/var/www/klikcy-website";
const remoteTar = "/tmp/klikcy-release.tar.gz";

function sshExec(conn, cmd) {
  return new Promise((resolvePromise, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let out = "";
      stream
        .on("close", (code) => {
          if (code !== 0) reject(new Error(`Command failed (${code})\n${out}`));
          else resolvePromise(out);
        })
        .on("data", (d) => {
          process.stdout.write(d);
          out += d;
        })
        .stderr.on("data", (d) => process.stderr.write(d));
    });
  });
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backupRoot = `/var/backups/klikcy/${stamp}-old-site`;

const remoteScript = `
set -e
BACKUP_ROOT="${backupRoot}"
WEB_ROOT="${WEB_ROOT}"
REMOTE_TAR="${remoteTar}"
if [ ! -f "$REMOTE_TAR" ]; then echo "Missing $REMOTE_TAR — upload tarball first." >&2; exit 1; fi
mkdir -p "$BACKUP_ROOT"
if [ -d "$WEB_ROOT" ]; then cp -a "$WEB_ROOT" "$BACKUP_ROOT/klikcy-website"; fi
pm2 save 2>/dev/null || true
if command -v pm2 >/dev/null; then pm2 jlist > "$BACKUP_ROOT/pm2-jlist.json" 2>/dev/null || true; fi
for f in /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf; do
  if [ -f "$f" ]; then cp -a "$f" "$BACKUP_ROOT/"; fi
done
mkdir -p "$WEB_ROOT"
tar -xzf "$REMOTE_TAR" -C "$WEB_ROOT"
rm -f "$REMOTE_TAR"
chmod +x "$WEB_ROOT/deploy/deploy-vps.sh" "$WEB_ROOT/deploy/configure-ols.sh" 2>/dev/null || true
cd "$WEB_ROOT" && bash deploy/deploy-vps.sh
echo "Backup stored at $BACKUP_ROOT"
`.trim();

const conn = new Client();
conn
  .on("ready", async () => {
    try {
      await sshExec(conn, remoteScript);
      console.log("\nRemote deploy finished.");
      conn.end();
    } catch (e) {
      console.error(e.message || e);
      conn.end();
      process.exit(1);
    }
  })
  .on("error", (err) => {
    console.error("SSH error:", err.message);
    process.exit(1);
  })
  .connect({
    host: VPS_HOST,
    port: 22,
    username: VPS_USER,
    password: VPS_PASSWORD,
    readyTimeout: 30000,
  });
