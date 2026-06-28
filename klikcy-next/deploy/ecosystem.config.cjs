/**
 * PM2 — contact API only.
 * Static site is served by OpenLiteSpeed/Apache from ./out (no Node server needed).
 *
 * On VPS: pm2 start deploy/ecosystem.config.cjs
 */
module.exports = {
  apps: [
    {
      name: "klikcy-contact-api",
      script: "server/index.mjs",
      cwd: "/var/www/klikcy-website",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "256M",
      env: {
        NODE_ENV: "production",
        CONTACT_API_PORT: 8787,
        SITE_URL: "https://www.klikcy.com",
      },
    },
  ],
};
