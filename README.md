# Creator Toolkit MVP

Fast-launch overseas web MVP for TikTok and Instagram Reels downloads.

## Scope

Day 1 includes:

- Next.js + TypeScript + Tailwind foundation
- Mobile-first conversion homepage
- TikTok and Instagram landing pages
- FAQ, Blog, Privacy, Terms, DMCA pages
- Programmatic SEO route registry
- Provider interface skeleton for TikTok and Instagram
- Docker Compose with PostgreSQL and Redis
- Sitemap and robots routes

Day 2 adds:

- SQLite-first local schema and migration runner
- PostgreSQL-compatible production schema path
- Admin login with signed HTTP-only session cookie
- Admin overview, downloads, SEO pages, blog, and settings screens
- Analytics event capture for page views and download clicks
- In-memory cache mock behind a shared cache interface
- Database seed and smoke-test commands

Day 3 adds:

- Unified provider interface with `analyze(url)` and `download(url)`
- Real `/api/analyze` endpoint for TikTok and Instagram links
- TikTok web metadata extraction with direct video/audio URLs
- Instagram web extraction with configurable fallback endpoint
- In-memory analyze cache and IP-based rate limit
- Homepage Analyze flow with result card and media download buttons

Redis-backed caching remains scheduled for later days.

## Local Development

```bash
cp .env.example .env.local
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

Local development defaults to SQLite. The database file is created at:

```text
data/creator-toolkit.sqlite
```

PowerShell users with script execution restrictions can run the same commands as `npm.cmd run db:migrate`, `npm.cmd run db:seed`, and `npm.cmd run dev`.

## Production Build

```bash
npm run build
npm run start
```

Production PostgreSQL remains supported by setting:

```bash
DB_PROVIDER=postgres
DATABASE_URL=<postgresql-connection-string>
```

## Docker

```bash
cp .env.example .env.local
docker compose up --build -d
docker compose run --rm app node scripts/migrate.mjs
```

Docker is no longer required for Day 2 local acceptance. The app still listens on `http://localhost:3000` when started through Docker.

## Day 2 Admin

Configure the local admin account in `.env.local`:

```text
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
```

Run `npm run db:smoke` to verify real SQLite writes into `download_tasks` and `analytics_events`.

## Day 3 Analyze API

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "content-type: application/json" \
  -d "{\"url\":\"https://www.tiktok.com/@example/video/<video-id>\"}"
```

The same URL is cached in memory after the first successful parse. The response includes `x-cache: HIT` on cache hits.

## Day 1 Routes

- `/`
- `/tiktok-downloader`
- `/instagram-reels-downloader`
- `/faq`
- `/blog`
- `/privacy-policy`
- `/terms`
- `/dmca`
- `/download-tiktok-video-online`
- `/download-instagram-reels-hd`
- `/how-to-download-tiktok-videos`
- `/tiktok-video-downloader-no-watermark`
- `/sitemap.xml`
- `/robots.txt`

## Provider Baseline

Provider code lives in `lib/providers`. The UI and API layer should call the shared `DownloadProvider` interface, not vendor-specific parsing code.

```ts
interface DownloadProvider {
  key: string;
  platform: "tiktok" | "instagram";
  canHandle(url: string): boolean;
  normalizeUrl(url: string): string;
  analyze(url: string, context?: Partial<ProviderContext>): Promise<ProviderAnalyzeResult>;
  download(url: string, context?: Partial<ProviderContext>): Promise<ProviderAnalyzeResult>;
}
```

Default provider keys are configured with:

- `DEFAULT_TIKTOK_PROVIDER=<tiktok-provider-key>`
- `DEFAULT_INSTAGRAM_PROVIDER=<instagram-provider-key>`
- `INSTAGRAM_FALLBACK_API_URL=<instagram-fallback-api-url>`
