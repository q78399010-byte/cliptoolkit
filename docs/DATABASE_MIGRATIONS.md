# Database Migrations

Day 2 local development uses SQLite by default. Production keeps the PostgreSQL path by setting `DB_PROVIDER=postgres`.

## Tables

- `schema_migrations`
- `users`
- `providers`
- `download_tasks`
- `provider_logs`
- `seo_pages`
- `faq_items`
- `blog_posts`
- `system_configs`
- `analytics_events`

## Local SQLite Run

```bash
cp .env.example .env.local
npm install
npm run db:migrate
npm run db:seed
npm run db:smoke
```

The default SQLite database path is:

```text
data/creator-toolkit.sqlite
```

On Windows PowerShell with blocked npm scripts, use `npm.cmd run db:migrate`, `npm.cmd run db:seed`, and `npm.cmd run db:smoke`.

## Production PostgreSQL Run

```bash
DB_PROVIDER=postgres DATABASE_URL=<postgresql-connection-string> npm run db:migrate
DB_PROVIDER=postgres DATABASE_URL=<postgresql-connection-string> npm run db:seed
```

`schema_migrations` prevents already-applied SQL files from running again. SQLite migrations live in `db/migrations/sqlite`; PostgreSQL migrations live in `db/migrations`.
