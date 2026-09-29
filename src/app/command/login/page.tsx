import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "JK COMMAND — Sign in",
  robots: { index: false, follow: false },
};

export default function CommandLoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-void px-5">
      <div className="w-full max-w-sm border border-line bg-panel p-8">
        <p className="eyebrow mb-2">JK COMMAND</p>
        <h1 className="font-display text-xl font-semibold tracking-tight text-paper">Restricted access</h1>
        <p className="mb-8 mt-2 text-sm text-mute">Sign in to continue.</p>
        <LoginForm />
      </div>
    </div>
  );
}
