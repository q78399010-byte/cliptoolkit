# Docker Deployment

The Docker baseline is optional for Day 2 local acceptance. It includes:

- `app`: Next.js production server
- `postgres`: PostgreSQL 16
- `redis`: Redis 7 behind the optional `cache` profile

## Run

```bash
cp .env.example .env.local
docker compose --env-file .env.local up --build -d
docker compose --env-file .env.local run --rm app node scripts/migrate.mjs
docker compose --env-file .env.local run --rm app node scripts/seed.mjs
```

The compose file sets `DB_PROVIDER=postgres` for containers. Use `--env-file .env.local` so Docker build receives public SEO values such as `SITE_URL`, `DOMAIN`, and Google verification tokens.

To start the reserved Redis service:

```bash
docker compose --env-file .env.local --profile cache up -d redis
```

## Logs

```bash
docker compose --env-file .env.local logs -f app
```

## Stop

```bash
docker compose --env-file .env.local down
```

Use `docker compose down -v` only when you intentionally want to remove container data volumes.
