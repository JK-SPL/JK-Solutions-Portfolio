"use client";

/**
 * Route transition wipe — remounts on every navigation.
 * A void panel covers the new page and retracts upward with a luxurious
 * ease and a violet leading edge (conceal, then reveal).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div aria-hidden="true" className="route-wipe pointer-events-none fixed inset-0 z-[200]" />
      <style jsx global>{`
        .route-wipe {
          background: linear-gradient(to bottom, #0b0e13 0%, #050507 100%);
          border-bottom: 2px solid #673bf7;
          animation: route-wipe 0.85s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes route-wipe {
          from {
            clip-path: inset(0 0 0 0);
          }
          to {
            clip-path: inset(0 0 100% 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .route-wipe {
            animation: none;
            display: none;
          }
        }
      `}</style>
    </>
  );
}
