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

Download provider implementation, database schema, admin CRUD, caching, and logs start in later confirmed days.

## Local Development

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Docker

```bash
cp .env.example .env
docker compose up --build -d
```

The app listens on `http://localhost:3000`.

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
  analyze(url: string, context: ProviderContext): Promise<ProviderAnalyzeResult>;
}
```

Default provider keys are configured with:

- `DEFAULT_TIKTOK_PROVIDER`
- `DEFAULT_INSTAGRAM_PROVIDER`

Day 3 will replace the stub implementations with real provider adapters without changing the page layer.
