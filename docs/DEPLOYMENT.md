# Deployment Checklist

## VPS Baseline

1. Install Docker and Docker Compose.
2. Clone or upload the project.
3. Copy `.env.example` to `.env`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Run `docker compose up --build -d`.
6. Put Nginx in front of port `3000`.
7. Configure Cloudflare DNS and TLS.

## Pre-Launch Checks

- `/` loads on mobile and desktop.
- `/sitemap.xml` includes the landing pages.
- `/robots.txt` points to the sitemap.
- Legal pages are reachable.
- Provider credentials are configured before enabling real downloads.
