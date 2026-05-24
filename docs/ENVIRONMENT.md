# Environment Variables

Copy `.env.example` to `.env` before local or Docker runs.

| Name | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL used for canonical links, sitemap, and robots. |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Display name. |
| `DATABASE_URL` | Day 2 | PostgreSQL connection string. |
| `REDIS_URL` | Day 3 | Redis connection string for cache and locks. |
| `ADMIN_EMAIL` | Day 2 | Initial admin login email. |
| `ADMIN_PASSWORD` | Day 2 | Initial admin login password. |
| `DEFAULT_TIKTOK_PROVIDER` | Day 3 | Active TikTok provider key. |
| `DEFAULT_INSTAGRAM_PROVIDER` | Day 3 | Active Instagram provider key. |
| `TIKTOK_PROVIDER_API_KEY` | Day 3 | Provider credential when required. |
| `INSTAGRAM_PROVIDER_API_KEY` | Day 3 | Provider credential when required. |
| `DOWNLOAD_CACHE_TTL_SECONDS` | Day 3 | Redis TTL for successful download analysis results. |
| `RATE_LIMIT_PER_HOUR` | Day 6 | Basic IP rate limit. |
