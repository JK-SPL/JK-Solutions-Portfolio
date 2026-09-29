"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { publishedProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface Command {
  label: string;
  hint: string;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(
    () => [
      { label: "Open Work", hint: "GO", action: () => router.push("/work") },
      { label: "Open Products", hint: "GO", action: () => router.push("/products") },
      { label: "Open Lab", hint: "GO", action: () => router.push("/lab") },
      { label: "About JK", hint: "GO", action: () => router.push("/about") },
      { label: "Contact JK", hint: "GO", action: () => router.push("/contact") },
      ...publishedProjects.map((p) => ({
        label: `Project — ${p.title}`,
        hint: p.categories[0],
        action: () => router.push(`/work/${p.slug}`),
      })),
    ],
    [router]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  if (!open) return null;

  const run = (cmd: Command) => {
    setOpen(false);
    cmd.action();
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-start justify-center bg-void/80 px-4 pt-[14vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl border border-line bg-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow">CMD</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && filtered[active]) {
                run(filtered[active]);
              }
            }}
            placeholder="Search projects & destinations…"
            aria-label="Command search"
            className="w-full bg-transparent py-4 text-sm text-paper placeholder:text-faint focus:outline-none"
          />
          <kbd className="border border-line px-1.5 py-0.5 font-mono text-[0.5625rem] text-faint">ESC</kbd>
        </div>

        <ul role="listbox" className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-xs text-faint">NO MATCHES</li>
          )}
          {filtered.map((cmd, i) => (
            <li key={cmd.label}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => run(cmd)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 text-left transition-colors",
                  i === active ? "bg-primary/15 text-paper" : "text-mute"
                )}
              >
                <span className="text-sm">{cmd.label}</span>
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">{cmd.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
