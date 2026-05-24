# Docker Deployment

Day 1 provides a production-oriented Docker baseline:

- `app`: Next.js production server
- `postgres`: PostgreSQL 16
- `redis`: Redis 7

## Run

```bash
cp .env.example .env
docker compose up --build -d
```

## Logs

```bash
docker compose logs -f app
```

## Stop

```bash
docker compose down
```

Use `docker compose down -v` only when you intentionally want to remove PostgreSQL and Redis data volumes.
