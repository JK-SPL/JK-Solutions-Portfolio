import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/data/social";
import { recordBrief, recordSpamAttempt } from "@/lib/briefs";
import { clientIp, createRateLimit } from "@/lib/rate-limit";

const BUILD_OPTIONS = ["Website", "SaaS", "CRM", "Automation", "AI", "Mobile", "3D / Motion", "Something Experimental"];
const STAGE_OPTIONS = ["Idea", "Prototype", "Existing Product", "Redesign", "Scaling"];

// In-memory rate limit: 5 briefs / hour per IP, 50 / hour process-wide
// (the process ceiling survives simple X-Forwarded-For rotation).
const briefLimit = createRateLimit({ perIp: 5, perProcess: 50, windowMs: 60 * 60 * 1000 });

function str(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function buildMailto(d: { building: string; stage: string; description: string; name: string; email: string; phone?: string }) {
  const subject = encodeURIComponent(`Project brief — ${d.building} (${d.stage}) — ${d.name}`);
  const body = encodeURIComponent(
    `Building: ${d.building}\nStage: ${d.stage}\n\n${d.description}\n\n— ${d.name}\n${d.email}${d.phone ? `\n${d.phone}` : ""}`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Project brief intake boundary. Validates + spam-guards, then delivers via
 * BRIEF_WEBHOOK_URL when configured; otherwise returns a mailto fallback so
 * the enquiry is never silently swallowed. CRM persistence plugs in here later.
 */
export async function POST(req: Request) {
  if (briefLimit(clientIp(req.headers))) {
    return NextResponse.json({ error: "Too many submissions. Try later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot — real users never fill this
  if (typeof body.company === "string" && body.company.length > 0) {
    recordSpamAttempt();
    return NextResponse.json({ ok: true, delivered: true }); // silently drop bots
  }

  const { building, stage, description, name, email, phone } = body as Record<string, string>;

  if (!BUILD_OPTIONS.includes(building)) return NextResponse.json({ error: "Invalid project type." }, { status: 400 });
  if (!STAGE_OPTIONS.includes(stage)) return NextResponse.json({ error: "Invalid stage." }, { status: 400 });
  if (!str(description, 5000) || description.trim().length < 20)
    return NextResponse.json({ error: "Description too short." }, { status: 400 });
  if (!str(name, 120)) return NextResponse.json({ error: "Name required." }, { status: 400 });
  if (!str(email, 200) || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  if (phone !== undefined && phone !== "" && (typeof phone !== "string" || phone.length > 30))
    return NextResponse.json({ error: "Invalid phone." }, { status: 400 });

  const brief = { building, stage, description: description.trim(), name: name.trim(), email: email.trim(), phone: phone?.trim() || undefined, receivedAt: new Date().toISOString() };

  const webhook = process.env.BRIEF_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      recordBrief({ ...brief, delivered: true, delivery: "webhook" });
      return NextResponse.json({ ok: true, delivered: true });
    } catch {
      recordBrief({ ...brief, delivered: false, delivery: "mailto-fallback" });
      return NextResponse.json({ ok: true, delivered: false, mailto: buildMailto(brief) });
    }
  }

  recordBrief({ ...brief, delivered: false, delivery: "mailto-fallback" });
  return NextResponse.json({ ok: true, delivered: false, mailto: buildMailto(brief) });
}
