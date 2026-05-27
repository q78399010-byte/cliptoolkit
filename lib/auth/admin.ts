import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "creator_toolkit_admin";
const sessionTtlSeconds = 60 * 60 * 8;

function base64Url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function getSessionSecret() {
  return process.env.COOKIE_SECRET ?? process.env.ADMIN_SESSION_SECRET ?? getRequiredEnv("ADMIN_PASSWORD");
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be set in .env.local before using admin authentication.`);
  }

  return value;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

export function getAdminCredentials() {
  return {
    email: getRequiredEnv("ADMIN_EMAIL"),
    password: getRequiredEnv("ADMIN_PASSWORD")
  };
}

export function verifyAdminCredentials(email: string, password: string) {
  const admin = getAdminCredentials();
  const inputEmail = Buffer.from(email.trim().toLowerCase());
  const adminEmail = Buffer.from(admin.email.trim().toLowerCase());
  const inputPassword = Buffer.from(password);
  const adminPassword = Buffer.from(admin.password);
  const emailOk =
    inputEmail.length === adminEmail.length && crypto.timingSafeEqual(inputEmail, adminEmail);
  const passwordOk =
    inputPassword.length === adminPassword.length &&
    crypto.timingSafeEqual(inputPassword, adminPassword);

  return emailOk && passwordOk;
}

export function createAdminSessionToken(email: string) {
  const payload = base64Url(
    JSON.stringify({
      email,
      exp: Math.floor(Date.now() / 1000) + sessionTtlSeconds
    })
  );
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function readAdminSessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || sign(payload) !== signature) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email: string;
      exp: number;
    };

    if (!parsed.email || parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function setAdminSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createAdminSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionTtlSeconds,
    path: "/"
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return readAdminSessionToken(cookieStore.get(cookieName)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
