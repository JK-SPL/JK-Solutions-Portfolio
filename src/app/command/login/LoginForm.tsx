"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/command/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.replace("/command");
        router.refresh();
      } else {
        setError(data.error ?? "Sign-in failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "w-full border border-line bg-void px-4 py-3 text-paper placeholder:text-faint transition-colors focus:border-primary-glow focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="cmd-user" className="eyebrow mb-2 block">Username</label>
        <input id="cmd-user" value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" className={inputCls} required />
      </div>
      <div>
        <label htmlFor="cmd-pass" className="eyebrow mb-2 block">Password</label>
        <input id="cmd-pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" className={inputCls} required />
      </div>
      {error && <p role="alert" className="text-xs text-danger">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-50">
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
