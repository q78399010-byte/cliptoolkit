import "server-only";
import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";

type QueryResult<T> = {
  rows: T[];
  rowCount: number;
};

type SqliteStatement = {
  all: (...params: unknown[]) => unknown[];
  run: (...params: unknown[]) => { changes: number };
};

type SqliteDatabase = {
  exec: (sql: string) => void;
  prepare: (sql: string) => SqliteStatement;
};

type SqliteModule = {
  DatabaseSync: new (filename: string) => SqliteDatabase;
};

const globalForDb = globalThis as unknown as {
  pgPool?: Pool;
  sqliteDb?: SqliteDatabase;
  sqliteModulePromise?: Promise<SqliteModule>;
};

export type DatabaseProvider = "sqlite" | "postgres";

export function getDatabaseProvider(): DatabaseProvider {
  return process.env.DB_PROVIDER === "postgres" ? "postgres" : "sqlite";
}

export function getSqliteDatabasePath() {
  return (
    process.env.SQLITE_DATABASE_PATH ??
    path.join(process.cwd(), "data", "creator-toolkit.sqlite")
  );
}

function getPostgresDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL must be set in .env.local when DB_PROVIDER=postgres.");
  }

  return databaseUrl;
}

function getPool() {
  if (!globalForDb.pgPool) {
    globalForDb.pgPool = new Pool({
      connectionString: getPostgresDatabaseUrl(),
      max: 10
    });
  }

  return globalForDb.pgPool;
}

async function loadSqliteModule() {
  if (!globalForDb.sqliteModulePromise) {
    const dynamicImport = new Function("specifier", "return import(specifier)") as (
      specifier: string
    ) => Promise<unknown>;
    globalForDb.sqliteModulePromise = dynamicImport("node:sqlite") as Promise<SqliteModule>;
  }

  return globalForDb.sqliteModulePromise;
}

async function getSqliteDatabase() {
  if (!globalForDb.sqliteDb) {
    const sqlite = await loadSqliteModule();
    const databasePath = getSqliteDatabasePath();
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
    globalForDb.sqliteDb = new sqlite.DatabaseSync(databasePath);
    globalForDb.sqliteDb.exec("PRAGMA foreign_keys = ON");
    globalForDb.sqliteDb.exec("PRAGMA journal_mode = WAL");
  }

  return globalForDb.sqliteDb;
}

function toSqliteParam(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (value && typeof value === "object" && !Buffer.isBuffer(value)) {
    return JSON.stringify(value);
  }

  return value;
}

function toSqliteQuery(sql: string, params: unknown[]) {
  const boundParams: unknown[] = [];
  const convertedSql = sql.replace(/\$(\d+)/g, (_match, index: string) => {
    boundParams.push(toSqliteParam(params[Number(index) - 1]));
    return "?";
  });

  return { sql: convertedSql, params: boundParams };
}

const dateFields = new Set(["createdAt", "updatedAt", "deletedAt", "publishedAt"]);
const booleanFields = new Set(["cacheHit", "published", "enabled"]);
const jsonFields = new Set(["metadata", "schemaJson", "payload", "configJson"]);

function hydrateSqliteRow<T>(row: unknown): T {
  const source = row as Record<string, unknown>;
  const next: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(source)) {
    if (value === null || value === undefined) {
      next[key] = null;
      continue;
    }

    if (dateFields.has(key) && typeof value === "string") {
      next[key] = new Date(value);
      continue;
    }

    if (booleanFields.has(key)) {
      next[key] = Boolean(value);
      continue;
    }

    if (jsonFields.has(key) && typeof value === "string") {
      try {
        next[key] = JSON.parse(value);
      } catch {
        next[key] = {};
      }
      continue;
    }

    next[key] = value;
  }

  return next as T;
}

function expectsRows(sql: string) {
  const trimmed = sql.trim();
  return /^(SELECT|WITH|PRAGMA)\b/i.test(trimmed) || /\bRETURNING\b/i.test(trimmed);
}

async function querySqlite<T>(sql: string, params: unknown[]) {
  const db = await getSqliteDatabase();
  const prepared = toSqliteQuery(sql, params);
  const statement = db.prepare(prepared.sql);

  if (expectsRows(prepared.sql)) {
    const rows = statement.all(...prepared.params).map(hydrateSqliteRow<T>);
    return {
      rows,
      rowCount: rows.length
    };
  }

  const result = statement.run(...prepared.params);
  return {
    rows: [],
    rowCount: result.changes
  };
}

export async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  if (getDatabaseProvider() === "postgres") {
    return getPool().query(sql, params) as unknown as Promise<QueryResult<T>>;
  }

  return querySqlite<T>(sql, params);
}
