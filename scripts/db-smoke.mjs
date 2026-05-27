import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import pg from "pg";
import { DatabaseSync } from "node:sqlite";

const { Pool } = pg;

function parseEnvValue(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

async function loadDotEnvLocal() {
  try {
    const content = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }

      const [key, ...valueParts] = trimmed.split("=");

      if (!process.env[key]) {
        process.env[key] = parseEnvValue(valueParts.join("="));
      }
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

function getDatabaseProvider() {
  return process.env.DB_PROVIDER === "postgres" ? "postgres" : "sqlite";
}

function getSqliteDatabasePath() {
  return (
    process.env.SQLITE_DATABASE_PATH ??
    path.join(process.cwd(), "data", "creator-toolkit.sqlite")
  );
}

function toSqliteQuery(sql, params) {
  const boundParams = [];
  const convertedSql = sql.replace(/\$(\d+)/g, (_match, index) => {
    const value = params[Number(index) - 1];

    if (value instanceof Date) {
      boundParams.push(value.toISOString());
    } else if (typeof value === "boolean") {
      boundParams.push(value ? 1 : 0);
    } else if (value && typeof value === "object" && !Buffer.isBuffer(value)) {
      boundParams.push(JSON.stringify(value));
    } else {
      boundParams.push(value);
    }

    return "?";
  });

  return { sql: convertedSql, params: boundParams };
}

async function main() {
  await loadDotEnvLocal();

  const provider = getDatabaseProvider();
  const taskId = crypto.randomUUID();
  const eventId = crypto.randomUUID();
  const url = "https://www.tiktok.com/@creator/video/1234567890";
  const now = new Date();
  const metadata = { source: "db-smoke" };

  const downloadSql = `
    INSERT INTO download_tasks (
      id, url, "normalizedUrl", "urlHash", platform, provider, status,
      "cacheHit", reason, metadata, "createdAt", "updatedAt"
    )
    VALUES ($1, $2, $3, $4, 'tiktok', 'stub-tiktok', 'pending', $5, $6, $7, $8, $8)
  `;
  const analyticsSql = `
    INSERT INTO analytics_events (
      id, "eventName", "pagePath", country, device, metadata, "createdAt", "updatedAt"
    )
    VALUES ($1, 'page_view', '/admin-smoke-test', 'test', 'desktop', $2, $3, $3)
  `;

  if (provider === "postgres") {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("DATABASE_URL must be set in .env.local when DB_PROVIDER=postgres.");
    }

    const pool = new Pool({ connectionString: databaseUrl });

    try {
      await pool.query(downloadSql, [
        taskId,
        url,
        url,
        crypto.createHash("sha256").update(url).digest("hex"),
        false,
        "Smoke-test download task.",
        metadata,
        now
      ]);
      await pool.query(analyticsSql, [eventId, metadata, now]);
    } finally {
      await pool.end();
    }
  } else {
    const databasePath = getSqliteDatabasePath();
    const db = new DatabaseSync(databasePath);

    try {
      db.exec("PRAGMA foreign_keys = ON");

      const download = toSqliteQuery(downloadSql, [
        taskId,
        url,
        url,
        crypto.createHash("sha256").update(url).digest("hex"),
        false,
        "Smoke-test download task.",
        metadata,
        now
      ]);
      const analytics = toSqliteQuery(analyticsSql, [eventId, metadata, now]);

      db.prepare(download.sql).run(...download.params);
      db.prepare(analytics.sql).run(...analytics.params);
      console.log(`sqlite database: ${databasePath}`);
    } finally {
      db.close();
    }
  }

  console.log(`download_tasks write ok: ${taskId}`);
  console.log(`analytics_events write ok: ${eventId}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
