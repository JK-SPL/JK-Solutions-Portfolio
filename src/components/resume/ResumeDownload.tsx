"use client";

import { useState } from "react";
import { RESUME_PDF } from "@/data/resume";
import { cn } from "@/lib/utils";

/**
 * Resume download control.
 *
 * No verified PDF asset exists in the repository yet, so the default state is
 * an honest "pending" notice rather than a link to a missing file. When the
 * real file is added under /public and `RESUME_PDF.ready` is true, this renders
 * a stable, working download that works on desktop and mobile (native anchor +
 * `download`), and never 404s.
 */
export function ResumeDownload({ className }: { className?: string }) {
  const [noticeOpen, setNoticeOpen] = useState(false);

  if (RESUME_PDF.ready) {
    return (
      <a
        href={RESUME_PDF.href}
        download
        data-lit
        className={cn("btn-primary", className)}
        aria-label="Download resume (PDF)"
      >
        DOWNLOAD RESUME <span aria-hidden="true">↓</span>
      </a>
    );
  }

  return (
    <span className={cn("inline-flex flex-col items-start gap-3", className)}>
      <button
        type="button"
        data-lit
        aria-expanded={noticeOpen}
        onClick={() => setNoticeOpen((v) => !v)}
        className="btn-ghost"
      >
        DOWNLOAD RESUME <span aria-hidden="true">↓</span>
      </button>
      {noticeOpen && (
        <p className="max-w-xs font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-faint">
          The verified PDF résumé is still being prepared. A stable download link
          activates the moment the approved file is added — no placeholder is
          published before then.
        </p>
      )}
    </span>
  );
}
