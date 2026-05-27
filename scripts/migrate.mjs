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
    const envPath = path.join(process.cwd(), ".env.local");
    const content = await fs.readFile(envPath, "utf8");

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

function getMigrationsDir(provider) {
  return provider === "postgres"
    ? path.join(process.cwd(), "db", "migrations")
    : path.join(process.cwd(), "db", "migrations", "sqlite");
}

async function listMigrationFiles(provider) {
  const migrationsDir = getMigrationsDir(provider);
  const files = (await fs.readdir(migrationsDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  return { migrationsDir, files };
}

async function migratePostgres() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL must be set in .env.local when DB_PROVIDER=postgres.");
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id text PRIMARY KEY,
        "createdAt" timestamptz NOT NULL DEFAULT now()
      )
    `);

    const { migrationsDir, files } = await listMigrationFiles("postgres");

    for (const file of files) {
      const applied = await client.query("SELECT id FROM schema_migrations WHERE id = $1", [file]);

      if (applied.rowCount) {
        console.log(`skip ${file}`);
        continue;
      }

      const sql = await fs.readFile(path.join(migrationsDir, file), "utf8");
      await client.query("BEGIN");

      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (id) VALUES ($1)', [file]);
        await client.query("COMMIT");
        console.log(`applied ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

async function migrateSqlite() {
  const databasePath = getSqliteDatabasePath();
  await fs.mkdir(path.dirname(databasePath), { recursive: true });

  const db = new DatabaseSync(databasePath);

  try {
    db.exec("PRAGMA foreign_keys = ON");
    db.exec("PRAGMA journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id text PRIMARY KEY,
        "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      )
    `);

    const { migrationsDir, files } = await listMigrationFiles("sqlite");

    for (const file of files) {
      const applied = db
        .prepare("SELECT id FROM schema_migrations WHERE id = ?")
        .all(file);

      if (applied.length) {
        console.log(`skip ${file}`);
        continue;
      }

      const sql = await fs.readFile(path.join(migrationsDir, file), "utf8");
      db.exec("BEGIN");

      try {
        db.exec(sql);
        db.prepare("INSERT INTO schema_migrations (id) VALUES (?)").run(file);
        db.exec("COMMIT");
        console.log(`applied ${file}`);
      } catch (error) {
        db.exec("ROLLBACK");
        throw error;
      }
    }

    console.log(`sqlite database: ${databasePath}`);
  } finally {
    db.close();
  }
}

async function main() {
  await loadDotEnvLocal();

  const provider = getDatabaseProvider();

  if (provider === "postgres") {
    await migratePostgres();
  } else {
    await migrateSqlite();
  }

  console.log("migrations complete");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
