import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  commandAuthConfigured,
  createSessionToken,
  validateCredentials,
} from "@/lib/session";
import { clientIp, createRateLimit } from "@/lib/rate-limit";

// In-memory rate limit: 8 attempts / 10 min per IP, 40 / 10 min process-wide
// (the process ceiling survives simple X-Forwarded-For rotation).
const loginLimit = createRateLimit({ perIp: 8, perProcess: 40, windowMs: 10 * 60 * 1000 });

export async function POST(req: Request) {
  if (!commandAuthConfigured()) {
    return NextResponse.json({ error: "Authentication is not configured on this deployment." }, { status: 503 });
  }
  if (loginLimit(clientIp(req.headers))) {
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
