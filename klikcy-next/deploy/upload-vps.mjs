#!/usr/bin/env node
/**
 * Upload release-vps tarball to Hostinger VPS and run deploy-vps.sh.
 * Windows-friendly (password auth via ssh2 — no sshpass required).
 *
 * Env: VPS_HOST, VPS_USER, VPS_PASSWORD (or read from repo root .env VPS_*)
 */
import { Client } from 'ssh2';
import { createReadStream, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { config as loadDotenv } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..', '..');
loadDotenv({ path: join(repoRoot, '.env') });

const VPS_HOST = process.env.VPS_HOST || '72.61.2.90';
const VPS_USER = process.env.VPS_USER || 'root';
const VPS_PASSWORD = process.env.VPS_PASSWORD;
const WEB_ROOT = process.env.WEB_ROOT || '/var/www/klikcy-website';
const tarball = resolve(repoRoot, 'release-vps.tar.gz');

if (!VPS_PASSWORD) {
  console.error('Missing VPS_PASSWORD. Set it in .env or the environment.');
  process.exit(1);
}
if (!existsSync(tarball)) {
  console.error(`Missing ${tarball}. Run: npm run release:prepare`);
  process.exit(1);
}

function sshExec(conn, cmd) {
  return new Promise((resolvePromise, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let out = '';
      stream
        .on('close', (code) => {
          if (code !== 0) reject(new Error(`Command failed (${code}): ${cmd}\n${out}`));
          else resolvePromise(out);
        })
        .on('data', (d) => {
          process.stdout.write(d);
          out += d;
        })
        .stderr.on('data', (d) => process.stderr.write(d));
    });
  });
}

function sftpUpload(conn, localPath, remotePath) {
  return new Promise((resolvePromise, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const readStream = createReadStream(localPath);
      const writeStream = sftp.createWriteStream(remotePath);
      writeStream.on('close', () => resolvePromise());
      writeStream.on('error', reject);
      readStream.on('error', reject);
      readStream.pipe(writeStream);
    });
  });
}

const conn = new Client();

conn
  .on('ready', async () => {
    try {
      const remoteTar = '/tmp/klikcy-release.tar.gz';

      console.log(`Uploading ${tarball} → ${remoteTar} ...`);
      await sftpUpload(conn, tarball, remoteTar);
      console.log('Upload complete.\n');

      console.log('Deploying on VPS...');
      const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const backupRoot = `/var/backups/klikcy/${stamp}-old-site`;
      const remoteScript = `
set -e
BACKUP_ROOT="${backupRoot}"
WEB_ROOT="${WEB_ROOT}"
REMOTE_TAR="${remoteTar}"
mkdir -p "$BACKUP_ROOT"
if [ -d "$WEB_ROOT" ]; then cp -a "$WEB_ROOT" "$BACKUP_ROOT/klikcy-website"; fi
pm2 save 2>/dev/null || true
if command -v pm2 >/dev/null; then pm2 jlist > "$BACKUP_ROOT/pm2-jlist.json" 2>/dev/null || true; fi
for f in /usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf /usr/local/lsws/conf/vhosts/klikcy.com/vhost.conf /etc/nginx/sites-available/klikcy.com /etc/nginx/sites-enabled/klikcy.com; do
  if [ -f "$f" ]; then cp -a "$f" "$BACKUP_ROOT/"; fi
done
mkdir -p "$WEB_ROOT"
tar -xzf "$REMOTE_TAR" -C "$WEB_ROOT"
rm -f "$REMOTE_TAR"
chmod +x "$WEB_ROOT/deploy/deploy-vps.sh" "$WEB_ROOT/deploy/configure-ols.sh" 2>/dev/null || true
cd "$WEB_ROOT" && bash deploy/deploy-vps.sh
echo "Backup stored at $BACKUP_ROOT"
`.trim();
      await sshExec(conn, remoteScript);

      console.log('\nSyncing server .env (SMTP)...');
      conn.end();
      // sync-vps-env opens its own connection
      const { spawnSync } = await import('node:child_process');
      const sync = spawnSync(process.execPath, [join(__dirname, 'sync-vps-env.mjs')], {
        stdio: 'inherit',
        cwd: join(__dirname),
      });
      if (sync.status !== 0) process.exit(sync.status ?? 1);

      console.log('\nDeployment finished.');
    } catch (e) {
      console.error(e.message || e);
      conn.end();
      process.exit(1);
    }
  })
  .on('error', (err) => {
    console.error('SSH error:', err.message);
    process.exit(1);
  })
  .connect({
    host: VPS_HOST,
    port: 22,
    username: VPS_USER,
    password: VPS_PASSWORD,
    readyTimeout: 30000,
  });
