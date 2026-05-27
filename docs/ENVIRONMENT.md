# Environment Variables

Copy `.env.example` to `.env.local` before local or Docker runs. Keep real secrets only in `.env.local`; committed files should contain placeholders only.

| Name | Required | Description |
| --- | --- | --- |
| `DOMAIN` | Production | Bare production domain, for example `example.com`. Used as a fallback when `SITE_URL` is not set. |
| `SITE_URL` | Production | Canonical production URL, for example `https://example.com`. Preferred source for canonical, sitemap, robots, and schema URLs. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL used for canonical links, sitemap, and robots. Keep equal to `SITE_URL` in production. |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Display name. |
| `CDN_URL` | Optional | CDN base URL reserved for future static asset/media delivery. |
| `DB_PROVIDER` | Yes | `sqlite` for local Day 2 development; `postgres` for production. |
| `SQLITE_DATABASE_PATH` | Local | SQLite database file path. Defaults to `data/creator-toolkit.sqlite`. |
| `DATABASE_URL` | Production | PostgreSQL connection string used only when `DB_PROVIDER=postgres`. |
| `ADMIN_EMAIL` | Day 2 | Initial admin login email. |
| `ADMIN_PASSWORD` | Day 2 | Initial admin login password. |
| `ADMIN_SESSION_SECRET` | Day 2 | Secret used to sign admin session cookies. |
| `COOKIE_SECRET` | Production | Preferred secret for signing admin cookies. Keep private and long. |
| `ANALYTICS_SALT` | Production | Preferred salt used before hashing IP and session identifiers. |
| `ANALYTICS_HASH_SALT` | Day 2 | Backward-compatible salt used before hashing IP and session identifiers. |
| `DEFAULT_TIKTOK_PROVIDER` | Yes | Active TikTok provider key. The Day 3 web provider key is `tiktok-web`. |
| `DEFAULT_INSTAGRAM_PROVIDER` | Yes | Active Instagram provider key. The Day 3 web provider key is `instagram-web`. |
| `TIKTOK_PROVIDER_API_KEY` | Day 3 | Provider credential when required. |
| `INSTAGRAM_PROVIDER_API_KEY` | Day 3 | Provider credential when required. |
| `INSTAGRAM_FALLBACK_API_URL` | Day 3 | Optional fallback endpoint used when Instagram public HTML does not expose media URLs. |
| `INSTAGRAM_COOKIE` | Optional | Optional authenticated Instagram cookie string for direct web extraction. |
| `INSTAGRAM_APP_ID` | Optional | Instagram web app id header when required by the selected provider. |
| `CACHE_DRIVER` | Day 2 | Defaults to `memory`. Redis is not required for Day 2. |
| `REDIS_URL` | Later | Reserved for a future Redis cache implementation. |
| `DOWNLOAD_CACHE_TTL_SECONDS` | Day 2 | TTL for the cache interface. Day 2 uses the in-memory mock. |
| `RATE_LIMIT_PER_HOUR` | Day 6 | Basic IP rate limit. |
| `GOOGLE_SITE_VERIFICATION` | Launch | Google Search Console verification token. |
| `GOOGLE_SEARCH_CONSOLE_VERIFICATION` | Launch | Alias for Google Search Console verification token. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Launch | Optional Google Analytics measurement id. Script loads only when this is set. |
| `CLOUDFLARE_TURNSTILE_SITE_KEY` | Later | Reserved public Turnstile site key. |
| `CLOUDFLARE_TURNSTILE_SECRET_KEY` | Later | Reserved private Turnstile secret key. |
| `LEGAL_CONTACT_EMAIL` | Production | Public legal/privacy/DMCA contact email shown on legal pages. |

## Docker Build Note

Next.js prerenders SEO pages during `docker compose up --build`. Use:

```bash
docker compose --env-file .env.local up --build -d
```

This passes public build-time values such as `SITE_URL`, `DOMAIN`, Google verification, and `LEGAL_CONTACT_EMAIL` into the Docker build so canonical URLs and legal pages are generated with production values.
