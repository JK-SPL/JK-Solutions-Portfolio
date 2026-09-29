import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal signed session for /command — HMAC-SHA256 token, no DB required.
 * Enabled only when COMMAND_USER / COMMAND_PASS / COMMAND_SECRET env vars exist.
 * Replace with a full auth system when the CMS/CRM backend lands.
 */

const COOKIE_NAME = "jk_command_session";
const TTL_MS = 12 * 60 * 60 * 1000; // 12h

function secret() {
  return process.env.COMMAND_SECRET;
}

export function commandAuthConfigured() {
  return Boolean(process.env.COMMAND_USER && process.env.COMMAND_PASS && process.env.COMMAND_SECRET);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()!).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const payload = JSON.stringify({ exp: Date.now() + TTL_MS });
  const b64 = Buffer.from(payload).toString("base64url");
  return `${b64}.${sign(b64)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !secret()) return false;
  const i = token.lastIndexOf(".");
  if (i <= 0) return false;
  const b64 = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = sign(b64);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(b64, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export function validateCredentials(user: string, pass: string): boolean {
  if (!commandAuthConfigured()) return false;
  const eu = Buffer.from(process.env.COMMAND_USER!);
  const ep = Buffer.from(process.env.COMMAND_PASS!);
  const au = Buffer.from(user);
  const ap = Buffer.from(pass);
  const pad = (buf: Buffer, len: number) => Buffer.concat([buf, Buffer.alloc(Math.max(0, len - buf.length))]).subarray(0, len);
  const len = Math.max(eu.length, au.length, 1);
  const lenP = Math.max(ep.length, ap.length, 1);
  return timingSafeEqual(pad(eu, len), pad(au, len)) && timingSafeEqual(pad(ep, lenP), pad(ap, lenP));
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = TTL_MS / 1000;
