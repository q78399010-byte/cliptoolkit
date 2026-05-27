# Beginner Deployment Guide

This guide is written for a first production launch. Replace every placeholder such as `<your-domain.com>` with your own value.

## 0. What You Need

- A domain name, for example `<your-domain.com>`.
- A VPS server, recommended minimum: 2 CPU, 2 GB RAM, Ubuntu 22.04 or 24.04.
- Cloudflare account.
- SSH access to the server.
- This repository pushed to GitHub or uploaded to the server.

## 1. Buy A Server

1. Choose a VPS provider.
2. Create an Ubuntu server.
3. Copy the server public IP address.
4. Make sure ports `22`, `80`, and `443` are open in the provider firewall.

Plain English:

- `22` is for SSH login.
- `80` is for HTTP.
- `443` is for HTTPS.

## 2. Connect To The Server

On your computer, open a terminal:

```bash
ssh root@<server-ip>
```

If the provider gives you a username other than `root`, use that username:

```bash
ssh <username>@<server-ip>
```

Update the server:

```bash
apt update
apt upgrade -y
```

## 3. Install Docker

Install Docker and Docker Compose:

```bash
apt install -y ca-certificates curl gnupg git nginx
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" > /etc/apt/sources.list.d/docker.list
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Check Docker:

```bash
docker --version
docker compose version
```

## 4. Upload The Project

Option A: clone from GitHub:

```bash
cd /opt
git clone <your-repo-url> creator-toolkit
cd /opt/creator-toolkit
```

Option B: upload files with your panel or SFTP, then place the project at:

```text
/opt/creator-toolkit
```

## 5. Create Production Env

Create `.env.local` from the production example:

```bash
cp .env.production.example .env.local
nano .env.local
```

Minimum production values:

```bash
NEXT_PUBLIC_SITE_NAME=<site-name>
DOMAIN=<your-domain.com>
SITE_URL=https://<your-domain.com>
NEXT_PUBLIC_SITE_URL=https://<your-domain.com>
CDN_URL=

DB_PROVIDER=postgres
POSTGRES_USER=<postgres-user>
POSTGRES_PASSWORD=<strong-postgres-password>
POSTGRES_DB=<postgres-database>
DATABASE_URL=postgresql://<postgres-user>:<strong-postgres-password>@postgres:5432/<postgres-database>

ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<strong-admin-password>
COOKIE_SECRET=<long-random-secret>
ADMIN_SESSION_SECRET=<long-random-secret>
ANALYTICS_SALT=<long-random-secret>
ANALYTICS_HASH_SALT=<long-random-secret>

DEFAULT_TIKTOK_PROVIDER=tiktok-web
DEFAULT_INSTAGRAM_PROVIDER=instagram-web
CACHE_DRIVER=memory
DOWNLOAD_CACHE_TTL_SECONDS=604800
RATE_LIMIT_PER_HOUR=80

LEGAL_CONTACT_EMAIL=<legal-email@your-domain.com>
GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
CLOUDFLARE_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET_KEY=
```

Generate random secrets:

```bash
openssl rand -hex 32
```

Run that command three times and use different values for:

- `COOKIE_SECRET`
- `ADMIN_SESSION_SECRET`
- `ANALYTICS_SALT`

Important:

- Do not commit `.env.local`.
- Do not put real cookies or API keys in README or docs.
- `DATABASE_URL` inside Docker must use host `postgres`, not `localhost`.

## 6. Build And Start Docker

Use `--env-file .env.local`. This is important because SEO pages are prerendered during build.

```bash
docker compose --env-file .env.local up --build -d
```

Run database migration:

```bash
docker compose --env-file .env.local run --rm app node scripts/migrate.mjs
docker compose --env-file .env.local run --rm app node scripts/seed.mjs
```

Check containers:

```bash
docker compose --env-file .env.local ps
```

Check app logs:

```bash
docker compose --env-file .env.local logs -f app
```

Test locally on the server:

```bash
curl -I http://127.0.0.1:3000
curl http://127.0.0.1:3000/robots.txt
curl http://127.0.0.1:3000/sitemap.xml
```

## 7. Point Domain To Server

In your DNS provider or Cloudflare:

1. Add an `A` record.
2. Name: `@`
3. Value: `<server-ip>`
4. Add another `A` record.
5. Name: `www`
6. Value: `<server-ip>`

Wait until DNS starts resolving:

```bash
dig <your-domain.com>
```

If `dig` is not installed:

```bash
apt install -y dnsutils
```

## 8. Configure Nginx

Create an Nginx config:

```bash
nano /etc/nginx/sites-available/creator-toolkit
```

Paste:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name <your-domain.com> www.<your-domain.com>;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 60s;
    }
}
```

Enable it:

```bash
ln -s /etc/nginx/sites-available/creator-toolkit /etc/nginx/sites-enabled/creator-toolkit
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

Visit:

```text
http://<your-domain.com>
```

## 9. Add SSL

Install Certbot:

```bash
apt install -y certbot python3-certbot-nginx
```

Generate SSL:

```bash
certbot --nginx -d <your-domain.com> -d www.<your-domain.com>
```

Choose redirect HTTP to HTTPS when prompted.

Test renewal:

```bash
certbot renew --dry-run
```

Visit:

```text
https://<your-domain.com>
```

## 10. Configure Cloudflare

In Cloudflare:

1. Add your domain.
2. Change nameservers at your domain registrar to Cloudflare nameservers.
3. DNS records:
   - `A @ <server-ip>`
   - `A www <server-ip>`
4. Proxy status can be orange cloud after SSL works.
5. SSL/TLS mode: `Full (strict)`.
6. Enable Always Use HTTPS.
7. Optional: enable Brotli.
8. Optional: create cache rules for static assets.

Do not cache API routes aggressively:

```text
/api/*
/admin/*
```

## 11. Google Search Console

1. Open Google Search Console.
2. Add property for `https://<your-domain.com>`.
3. Choose HTML tag verification.
4. Copy only the token value.
5. Put it in `.env.local`:

```bash
GOOGLE_SITE_VERIFICATION=<token>
```

Rebuild because verification meta is generated at build time:

```bash
docker compose --env-file .env.local up --build -d
```

Submit sitemap:

```text
https://<your-domain.com>/sitemap.xml
```

## 12. Google Analytics

If you want Google Analytics:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Then rebuild:

```bash
docker compose --env-file .env.local up --build -d
```

If the value is empty, no Google Analytics script is loaded.

## 13. Cloudflare Turnstile Reserve

Turnstile is reserved for anti-abuse. Current production env supports:

```bash
CLOUDFLARE_TURNSTILE_SITE_KEY=<site-key>
CLOUDFLARE_TURNSTILE_SECRET_KEY=<secret-key>
```

Do not enable blocking until abuse appears or until the API flow is ready to validate tokens.

## 14. Final Launch Checklist

Run these checks:

```bash
curl -I https://<your-domain.com>
curl https://<your-domain.com>/robots.txt
curl https://<your-domain.com>/sitemap.xml
curl -I https://<your-domain.com>/tiktok-downloader
curl -I https://<your-domain.com>/download-tiktok-video-without-watermark
```

Open these pages in a browser:

- `/`
- `/tiktok-downloader`
- `/instagram-reels-downloader`
- `/download-tiktok-video-online`
- `/download-tiktok-video-without-watermark`
- `/tiktok-downloader-hd`
- `/download-instagram-reels-hd`
- `/how-to-download-instagram-reels`
- `/blog`
- `/privacy-policy`
- `/terms`
- `/dmca`
- `/admin/login`

Check source HTML:

- canonical uses `https://<your-domain.com>`
- sitemap URLs use `https://<your-domain.com>`
- robots points to `https://<your-domain.com>/sitemap.xml`
- Google verification meta appears if configured

## 15. Updating The Site

Pull latest code:

```bash
cd /opt/creator-toolkit
git pull
docker compose --env-file .env.local up --build -d
docker compose --env-file .env.local run --rm app node scripts/migrate.mjs
```

## 16. Rollback

If a deployment fails:

```bash
docker compose --env-file .env.local logs app
git log --oneline -5
git checkout <previous-commit>
docker compose --env-file .env.local up --build -d
```

Only use rollback when you know the previous commit worked.
