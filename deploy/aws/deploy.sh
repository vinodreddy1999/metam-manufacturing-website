#!/usr/bin/env bash
# Repeatable deploy/update for the METAM marketing site. Run this on the site
# server after ./deploy/aws/setup.sh has run once. Safe to re-run on every
# release: pulls the latest commit, reinstalls deps, rebuilds, and restarts
# the PM2-managed process (starting it on the very first run).
set -euo pipefail

PORT="${PORT:-8788}"
PROCESS_NAME="${PROCESS_NAME:-metam-site}"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_DIR"

echo "==> Pulling latest changes"
git pull --ff-only

echo "==> Installing dependencies"
bash scripts/install-ci.sh

echo "==> Building"
npm run build

echo "==> Starting/restarting ${PROCESS_NAME} on port ${PORT}"
if pm2 describe "$PROCESS_NAME" >/dev/null 2>&1; then
  pm2 restart "$PROCESS_NAME"
else
  pm2 start "npm run start -- --port ${PORT}" --name "$PROCESS_NAME"
fi
pm2 save

echo "==> Waiting for the site to respond"
for i in $(seq 1 30); do
  if curl -sf "http://127.0.0.1:${PORT}/" >/dev/null; then
    echo "    Up."
    break
  fi
  if [[ "$i" -eq 30 ]]; then
    echo "Site did not come up in time. Check: pm2 logs ${PROCESS_NAME}" >&2
    exit 1
  fi
  sleep 2
done

echo "==> Done. Deployed $(git rev-parse --short HEAD)."
