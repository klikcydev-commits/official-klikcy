#!/usr/bin/env bash
# Reconfigure OpenLiteSpeed KLIKCY vhost for static export + contact API proxy.
set -euo pipefail

VHCONF="/usr/local/lsws/conf/vhosts/KLIKCY/vhconf.conf"
STAMP="$(date +%F-%H%M%S)"
BACKUP="${VHCONF}.backup-${STAMP}"

cp -a "$VHCONF" "$BACKUP"
echo "Backed up vhconf → $BACKUP"

cat > "$VHCONF" <<'EOF'
docRoot                   /var/www/klikcy-website/out
vhDomain                  klikcy.com, www.klikcy.com
adminEmails               build@klikcy.com
enableGzip                1

errorlog $VH_ROOT/logs/error.log {
  useServer               0
  logLevel                ERROR
  rollingSize             10M
}

accesslog $VH_ROOT/logs/access.log {
  useServer               0
  logFormat               "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\""
  logHeaders              5
  rollingSize             10M
  keepDays                10
}

extprocessor ContactAPI {
  type                    proxy
  address                 http://127.0.0.1:8787
  maxConns                50
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context /api/ {
  type                    proxy
  handler                 ContactAPI
  addDefaultCharset       off
}

context /_next/static/ {
  allowBrowse             1
  enableExpires           1
  expiresDefault          A31536000
}

context /brand/ {
  allowBrowse             1
  enableExpires           1
  expiresDefault          A2592000
}

index  {
  useServer               0
  indexFiles              index.html
}

context / {
  allowBrowse             1
  addDefaultCharset       off
  enableExpires           1
  extraHeaders              <<<END_ctxHeaders
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
END_ctxHeaders
  rewrite  {
    enable                  1
  }
  rewriteRules  {
    RewriteCond %{SERVER_PORT} ^80$
    RewriteRule ^(.*)$ https://www.klikcy.com$1 [R=301,L]

    RewriteCond %{HTTPS} on
    RewriteCond %{HTTP_HOST} ^klikcy\.com$ [NC]
    RewriteRule ^(.*)$ https://www.klikcy.com$1 [R=301,L]
  }
}

rewrite  {
  enable                  1
  autoLoadHtaccess        1
  logLevel                0
}

rewriteRules  {
  RewriteRule ^/services/web-development/?$ https://www.klikcy.com/services/custom-website-development/ [R=301,L]
  RewriteRule ^/services/app-development/?$ https://www.klikcy.com/services/mobile-app-development/ [R=301,L]
  RewriteRule ^/services/digital-marketing/?$ https://www.klikcy.com/services/digital-marketing-strategy/ [R=301,L]
  RewriteRule ^/services/ai-automations/?$ https://www.klikcy.com/services/ai-chatbot-development/ [R=301,L]
  RewriteRule ^/services/saas-application-development/?$ https://www.klikcy.com/services/saas-development/ [R=301,L]
  RewriteRule ^/services/cro-seo/?$ https://www.klikcy.com/services/conversion-rate-optimization/ [R=301,L]
  RewriteRule ^/services/e-commerce-development/?$ https://www.klikcy.com/services/shopify-store-development/ [R=301,L]
  RewriteRule ^/services/ecommerce-development/?$ https://www.klikcy.com/services/shopify-store-development/ [R=301,L]

  RewriteRule ^/wp-login\.php$ - [R=410,L]
  RewriteRule ^/xmlrpc\.php$   - [R=410,L]
  RewriteRule ^/(wp-admin|wp-json|wp-content|wp-includes)(/.*)?$ - [R=410,L]
  RewriteRule ^/(category|tag|author)(/.*)?$ - [R=410,L]
}
EOF

/usr/local/lsws/bin/lswsctrl reload
echo "OpenLiteSpeed reloaded."
