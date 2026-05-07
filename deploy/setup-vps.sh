#!/bin/bash
# SJT Coaches — VPS Deployment Setup Script
# Run this on your VPS: bash /var/www/sjtcoaches/deploy/setup-vps.sh

set -e

APP_DIR="/var/www/sjtcoaches"
DOMAIN="sjtcoaches.co.uk"

echo "=== SJT Coaches VPS Setup ==="

# ── 1. Write .env ──────────────────────────────────────────────────────────────
cat > "$APP_DIR/.env" << 'EOF'
MONGODB_URI=mongodb+srv://miroclejohn_db_user:6MSLdgBUqQrgEyVG@cluster0.uh3jo1f.mongodb.net/?appName=Cluster0
RESEND_API_KEY=re_R7G4RBkQ_5eJYq4sC61JnaVhrMV5SYPqe
GEMINI_API_KEY=AIzaSyDZrggeWRBWPpYLsyq3he3E0JLWUTvApek
NOTIFICATION_EMAIL=info@sjtcoaches.co.uk
EMAIL_FROM=SJT Coaches <onboarding@resend.dev>
EOF
echo "✓ .env written"

# ── 2. Write wrangler vars file ────────────────────────────────────────────────
cat > "$APP_DIR/dist/server/.dev.vars" << 'EOF'
MONGODB_URI = "mongodb+srv://miroclejohn_db_user:6MSLdgBUqQrgEyVG@cluster0.uh3jo1f.mongodb.net/?appName=Cluster0"
RESEND_API_KEY = "re_R7G4RBkQ_5eJYq4sC61JnaVhrMV5SYPqe"
GEMINI_API_KEY = "AIzaSyDZrggeWRBWPpYLsyq3he3E0JLWUTvApek"
NOTIFICATION_EMAIL = "info@sjtcoaches.co.uk"
EMAIL_FROM = "SJT Coaches <onboarding@resend.dev>"
EOF
echo "✓ wrangler .dev.vars written"

# ── 3. PM2 ecosystem file ──────────────────────────────────────────────────────
cat > "$APP_DIR/ecosystem.config.cjs" << 'EOF'
module.exports = {
  apps: [
    {
      name: "sjtcoaches",
      script: "npx",
      args: "wrangler dev dist/server/index.js --port 3000 --host 127.0.0.1 --no-live-reload",
      cwd: "/var/www/sjtcoaches",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
};
EOF
echo "✓ PM2 ecosystem file written"

# ── 4. Nginx config ────────────────────────────────────────────────────────────
cat > "/etc/nginx/sites-available/sjtcoaches" << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1000;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }
}
EOF

ln -sf /etc/nginx/sites-available/sjtcoaches /etc/nginx/sites-enabled/sjtcoaches
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
echo "✓ Nginx configured"

# ── 5. Start app with PM2 ──────────────────────────────────────────────────────
cd "$APP_DIR"
pm2 delete sjtcoaches 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash
echo "✓ PM2 started and saved"

echo ""
echo "=== Done! ==="
echo "Site running at http://$DOMAIN"
echo "Check logs: pm2 logs sjtcoaches"
echo "Next: run certbot for HTTPS (SSL)"
