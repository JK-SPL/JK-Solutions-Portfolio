import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  commandAuthConfigured,
  createSessionToken,
  validateCredentials,
} from "@/lib/session";

// naive in-memory rate limit: 8 attempts / 10 min per IP
const attempts = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const cur = attempts.get(ip);
  if (!cur || cur.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  cur.count += 1;
  return cur.count > 8;
}

export async function POST(req: Request) {
  if (!commandAuthConfigured()) {
    return NextResponse.json({ error: "Authentication is not configured on this deployment." }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try later." }, { status: 429 });
  }

  let body: { user?: string; pass?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { user, pass } = body;
  if (typeof user !== "string" || typeof pass !== "string" || user.length > 200 || pass.length > 200) {
    return NextResponse.json({ error: "Invalid credentials format." }, { status: 400 });
  }
  if (!validateCredentials(user, pass)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
