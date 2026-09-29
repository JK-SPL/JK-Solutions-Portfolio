import type { Metadata } from "next";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session";

export const metadata: Metadata = {
  title: "JK Command",
  robots: { index: false, follow: false },
};

/**
 * The session is only trusted when its HMAC signature verifies AND it has not
 * expired. Cookie existence alone proves nothing — the cookie is fully
 * attacker-controlled, so anyone can set `jk_command_session` to any value.
 */
export default async function CommandPage() {
  const token = (await cookies()).get("jk_command_session")?.value;
  const isAuthed = verifySessionToken(token);

  if (!isAuthed) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-void">
        <div className="border border-line bg-panel p-12 text-center">
          <p className="eyebrow mb-4">ACCESS RESTRICTED</p>
          <h1 className="font-display text-2xl font-semibold text-paper mb-6">
            Command Center
          </h1>
          <p className="mb-8 text-mute max-w-xs">
            Authentication not configured. Set COMMAND_USER, COMMAND_PASS and COMMAND_SECRET environment variables to unlock the admin console.
          </p>
          <form action="/api/command/login" method="POST" className="flex flex-col gap-4 max-w-xs">
            <input name="user" type="text" placeholder="Username" required className="border border-line bg-void px-4 py-3 text-paper" />
            <input name="pass" type="password" placeholder="Password" required className="border border-line bg-void px-4 py-3 text-paper" />
            <button type="submit" className="btn-primary">
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <h1 className="display-1">JK Command</h1>
      <p className="lead mt-6">Authenticated — dashboard ready for CRM integration.</p>
    </div>
  );
}