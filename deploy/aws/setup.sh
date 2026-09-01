#!/usr/bin/env bash
# One-time setup for a fresh Ubuntu 22.04 EC2 instance that will run the
# METAM marketing site. Safe to re-run: every step is idempotent.
#
# Usage:
#   SITE_DOMAINS="metamservices.com, www.metamservices.com" ./deploy/aws/setup.sh
set -euo pipefail

SITE_DOMAINS="${SITE_DOMAINS:-metamservices.com, www.metamservices.com}"
UPSTREAM_PORT="${UPSTREAM_PORT:-8788}"

echo "==> Installing Node.js 22"
if ! command -v node >/dev/null || [[ "$(node -v)" != v22* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - >/dev/null
  sudo apt-get install -y -qq nodejs git
else
  echo "    Node 22 already installed, skipping."
fi

echo "==> Installing PM2"
if ! command -v pm2 >/dev/null; then
  sudo npm install -g pm2 --silent
else
  echo "    PM2 already installed, skipping."
fi

echo "==> Installing Caddy"
if ! command -v caddy >/dev/null; then
  sudo apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' |
    sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' |
    sudo tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
  sudo apt-get update -qq
  sudo apt-get install -y -qq caddy
else
  echo "    Caddy already installed, skipping."
fi

CADDYFILE=/etc/caddy/Caddyfile
FIRST_HOST="${SITE_DOMAINS%%,*}"
if ! sudo grep -qF "$SITE_DOMAINS {" "$CADDYFILE" 2>/dev/null; then
  echo "==> Adding ${SITE_DOMAINS} to ${CADDYFILE}"
  {
    echo ""
    echo "${SITE_DOMAINS} {"
    echo "    reverse_proxy localhost:${UPSTREAM_PORT}"
    echo "}"
  } | sudo tee -a "$CADDYFILE" >/dev/null
  sudo systemctl reload caddy 2>/dev/null || sudo systemctl restart caddy
else
  echo "==> ${SITE_DOMAINS} already present in ${CADDYFILE}, skipping."
fi

cat <<EOF

==> Setup complete.
    Domains:  ${SITE_DOMAINS} -> localhost:${UPSTREAM_PORT}
    Next:     point ${FIRST_HOST}'s DNS A record at this server's IP, then run
              ./deploy/aws/deploy.sh
EOF
