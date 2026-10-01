#!/usr/bin/env node
/* global process:readonly, console:readonly, fetch:readonly, Buffer:readonly */
/**
 * verify-api.mjs — API + security verification suite (Muse-authored).
 *
 * Standalone, zero dependencies. Exercises the rate limiters, the command
 * session lifecycle (login → redirect → forged/expired rejection → logout)
 * and sitemap integrity against a running production server.
 *
 * Usage:
 *   COMMAND_USER=u COMMAND_PASS=p COMMAND_SECRET=s npm run verify:api
 *   BASE_URL=http://127.0.0.1:3000 npm run verify:api
 *
 * Exit code 0 = every check passed, 1 = at least one failed.
 */

import { createHmac } from "node:crypto";

const BASE = (process.env.BASE_URL || process.argv[2] || "http://127.0.0.1:3224").replace(/\/$/, "");
const USER = process.env.COMMAND_USER;
const PASS = process.env.COMMAND_PASS;
const SECRET = process.env.COMMAND_SECRET;

let passed = 0;
const failures = [];
function check(name, cond, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ok   ${name}`);
  } else {
    failures.push(name);
    console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const post = (path, body, headers = {}) =>
  fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    redirect: "manual",
  });

const get = (path, headers = {}) => fetch(`${BASE}${path}`, { headers, redirect: "manual" });

const VALID_BRIEF = {
  building: "Website",
  stage: "Idea",
  description: "This is a valid test description over twenty chars",
  name: "Verifier",
  email: "verify@example.co",
};

function expiredToken() {
  const b64 = Buffer.from(JSON.stringify({ exp: Date.now() - 60_000 })).toString("base64url");
  return `${b64}.${createHmac("sha256", SECRET).update(b64).digest("base64url")}`;
}

async function main() {
  console.log(`verify-api → ${BASE}\n`);

  // ---- C. session lifecycle (before the login limiter is exhausted) ----
  console.log("session:");
  if (!USER || !PASS || !SECRET) {
    check("command auth env configured", false, "COMMAND_USER/PASS/SECRET required");
  } else {
    const loginRes = await post("/api/command/login", { user: USER, pass: PASS });
    check("login: valid credentials → 200", loginRes.status === 200, `got ${loginRes.status}`);
    const setCookie = loginRes.headers.get("set-cookie") || "";
    const cookie = setCookie.split(";")[0];
    check("login: session cookie set", cookie.startsWith("jk_command_session="), setCookie.slice(0, 60));
    const jar = { Cookie: cookie };

    const toLogin = await get("/command/login", jar);
    check(
      "login page: valid session → 307 to /command",
      toLogin.status === 307 && (toLogin.headers.get("location") || "").endsWith("/command"),
      `got ${toLogin.status} → ${toLogin.headers.get("location")}`
    );

    const followed = await fetch(`${BASE}/command/login`, { headers: jar, redirect: "follow" });
    check("login page: no redirect loop (lands on /command 200)", followed.status === 200 && followed.url.endsWith("/command"), `got ${followed.status} at ${followed.url}`);

    const forged = await get("/command/login", { Cookie: "jk_command_session=forged.payload.sig" });
    check("login page: forged cookie stays (200, no redirect)", forged.status === 200 && !forged.headers.get("location"), `got ${forged.status}`);

    const expired = await get("/command/login", { Cookie: `jk_command_session=${expiredToken()}` });
    check("login page: expired cookie stays (200, no redirect)", expired.status === 200 && !expired.headers.get("location"), `got ${expired.status}`);

    const gated = await get("/command", { Cookie: "jk_command_session=forged.payload.sig" });
    check("console: forged cookie → 307 to /command/login", gated.status === 307 && (gated.headers.get("location") || "").endsWith("/command/login"), `got ${gated.status}`);

    const logoutRes = await post("/api/command/logout", {}, jar);
    const cleared = (logoutRes.headers.get("set-cookie") || "").toLowerCase();
    check("logout: 200 and cookie cleared", logoutRes.status === 200 && /max-age=0|expires=thu, 01 jan 1970/.test(cleared), `got ${logoutRes.status}`);
  }

  // ---- B. login rate limiting (fresh XFF IP: the session checks above consumed 1 request on the default IP) ----
  console.log("login rate limit:");
  const FRESH_IP = { "X-Forwarded-For": "10.77.0.99" };
  const codes = [];
  for (let i = 0; i < 9; i++) codes.push((await post("/api/command/login", { user: USER, pass: "wrong" }, FRESH_IP)).status);
  check("login: 9th same-IP attempt → 429 (8×401 first)", codes.slice(0, 8).every((c) => c === 401) && codes[8] === 429, codes.join(","));
  let rotAt = -1;
  for (let i = 1; i <= 60; i++) {
    const r = await post("/api/command/login", { user: USER, pass: "wrong" }, { "X-Forwarded-For": `10.88.0.${i}` });
    if (r.status === 429) { rotAt = i; break; }
  }
  check("login: XFF rotation cannot bypass process ceiling", rotAt > 0, rotAt < 0 ? "no 429 in 60 rotating requests" : `429 at rotating #${rotAt}`);

  // ---- A. brief rate limiting ----
  console.log("brief rate limit:");
  const bCodes = [];
  for (let i = 0; i < 6; i++) bCodes.push((await post("/api/brief", VALID_BRIEF)).status);
  check("brief: 6th same-IP request → 429 (5×200 first)", bCodes.slice(0, 5).every((c) => c === 200) && bCodes[5] === 429, bCodes.join(","));
  let bRotAt = -1;
  for (let i = 1; i <= 60; i++) {
    const r = await post("/api/brief", {}, { "X-Forwarded-For": `10.99.0.${i}` });
    if (r.status === 429) { bRotAt = i; break; }
  }
  check("brief: XFF rotation cannot bypass process ceiling", bRotAt > 0, bRotAt < 0 ? "no 429 in 60 rotating requests" : `429 at rotating #${bRotAt}`);

  // ---- D. sitemap ----
  console.log("sitemap:");
  const xml = await (await get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
  const expected = ["/products/aaradhya", "/products/aaradhya/services", "/products/aaradhya/services/aadhaar-services", "/products/aaradhya/services/pan-card", "/products/aaradhya/services/passport-assistance", "/products/aaradhya/services/income-certificate"];
  check("sitemap: aaradhya index + 4 service details advertised", expected.every((p) => locs.includes(p)), `found ${locs.filter((p) => p.includes("aaradhya")).length}/6`);
  check("sitemap: no chhatrapati product URLs (pages don't exist)", !locs.some((p) => p.startsWith("/products/chhatrapati")), locs.filter((p) => p.includes("chhatrapati")).join(","));
  const bad = [];
  for (const p of locs) {
    const r = await get(p);
    if (r.status !== 200) bad.push(`${r.status} ${p}`);
  }
  check("sitemap: every advertised URL returns 200", bad.length === 0, bad.slice(0, 5).join("; "));

  console.log(`\n${passed} passed, ${failures.length} failed.`);
  if (failures.length) {
    console.log("failures:\n - " + failures.join("\n - "));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("verify-api crashed:", err);
  process.exit(1);
});
