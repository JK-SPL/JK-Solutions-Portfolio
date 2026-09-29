# Phase 0 — Design & Validation Baseline

**Project:** JK Solutions Portfolio (`E:\JK Prompt\Fresh\Portfolio`)
**Captured:** 2026-09-29 23:35 → 2026-09-30 00:03 (local)
**Purpose:** Establish the recoverable, measurable starting state for the cinematic experience work (Phase 1+). No cinematic implementation, no Payload CMS work, no new assets were created in Phase 0.

---

## 1. Backup & recoverability record

| Item | Value |
|---|---|
| Git repository | `git init` — created in Phase 0 (none existed before) |
| Baseline commit | `0c5b2c5` — 1,256 pre-existing files, hash-verified vs backup 1 |
| Phase 0 commit | the commit containing this document (`.gitignore` + `docs/`) |
| Timestamped backup (pre-Phase 0) | `backups/20260929-233528/` — 1,260 files / 71.9 MB |
| Timestamped backup (incl. concurrent work) | `backups/20260930-001418-reconciliation/` — 1,296 files / 76.3 MB |
| Backup contents | full site tree excluding `node_modules`, `.next`, `.git`, `*.log` |
| Backup verified | `Hero.tsx`, `Hero.tsx.stage42-final`, `app/page.tsx`, `package.json`, SevaDesk hero media, `.gitignore` all present |
| `.gitignore` | added `backups/` (line 10) — backups are not tracked |
| `Hero.tsx.stage42-final` | **preserved**, untouched (mtime `2026-09-28 18:33`) |
| `Hero.tsx` | **untouched** (mtime `2026-09-29 10:52` — unchanged from Stage 4.2.6) |

Recovery paths: (a) `git` baseline commit, (b) `backups/<timestamp>/` full copy.

---

## 2. Validation baseline

| Check | Command | Result |
|---|---|---|
| Typecheck | `tsc --noEmit` | **EXIT 0** (pre-concurrent state *and* current tree) |
| Lint | `eslint src --ext .ts,.tsx --quiet` | **EXIT 0** (both runs) |
| Production build | `next build` | **EXIT 0** — `Generating static pages (34/34)` |
| Build ID (that build) | — | `XhYnI8D6XDy0uJsoSEjdg` |
| Shared JS | — | `103 kB` First Load JS; `/` = 166 kB |

### 2a. Build re-verification after the Phase 0 `tsconfig.json` change

| Run | Tree built | Result |
|---|---|---|
| Main working tree, 2026-09-30 00:2x | committed tree **+ concurrent WIP** | **EXIT 1** — compiled ✓ (25.6s), failed only on the lint error `react-hooks/refs` in `src/components/aaradhya/ArServiceFinder.tsx:76` — **an untracked concurrent file, not committed, not mine to fix** |
| Isolated `git worktree` of `362bd9e` (real `node_modules` copy; no junction — webpack rejects junction paths) | **committed tree only** | **EXIT 0** — compiled ✓ (56s), lint + typecheck pass, `✓ Generating static pages (34/34)`, same route table as the 23:38 build |

Conclusion: **the committed Phase 0 tree builds clean.** Working-tree build failures while the concurrent agent's files exist are attributable to those files and will clear when they finish; OpenCode does not modify or "fix" another agent's files. Build isolation rule for all future phases: run `next build` only in a temporary `git worktree` + copied `node_modules` — never in the shared tree while another agent may be using `.next`.

**Versions observed:** `next 15.5.26` · `react 19.3.0` · `gsap 3.15.0`

**Pre-existing warnings (documented, deliberately NOT fixed in Phase 0):**

1. `Warning: React version not specified in eslint-plugin-react settings` — emitted by ESLint on every run.
2. `react-hooks/set-state-in-effect` at `src/lib/motion.ts:26` — flagged during `next build` (warning, does not fail the build).

---

## 3. Route baseline — 32 checks

All results matched expectations. Source: `docs/design-baseline/baseline-results.json`.

| Status | Count | Routes |
|---|---|---|
| 200 | 26 | `/`, `/about`, `/capabilities`, `/contact`, `/lab`, `/process`, `/products`, `/products/jk-attendance`, `/products/sevadesk`, `/resume`, `/work`, `/command/login`, `/robots.txt`, `/sitemap.xml`, `/icon.svg`, and all 11 `/work/*` slugs |
| 308 | 1 | `/services` → `/capabilities` (intentional permanent redirect) |
| 307 | 1 | `/command` → `/command/login` (auth gate) |
| 405 | 3 | `/api/brief`, `/api/command/login`, `/api/command/logout` (POST-only; GET rejected) |
| 404 | 1 | `/this-route-does-not-exist` |

**Work slugs (11):** `3d-motion-experiments`, `aaradhya-online-seva-kendra`, `chhatrapati-online-service`, `e-file-finder`, `e-parvana`, `google-workspace-systems`, `jk-attendance`, `sevadesk`, `sulabh-pranali`, `supply-licensing`, `vibe-coding-experiments`.

---

## 4. Static composition audit — 6 required breakpoints

Settled-state capture (2,600 ms after `networkidle`, so entrance animations have resolved).

| Viewport | Horizontal overflow | scrollWidth | Console errors | Failed requests | Images | Fonts | h1 |
|---|---|---|---|---|---|---|---|
| 1920×1080 | **none** | 1920 | 0 | 0 | 4/4 loaded | loaded | 1 |
| 1440×900 | **none** | 1440 | 0 | 0 | 4/4 loaded | loaded | 1 |
| 1024×768 | **none** | 1024 | 0 | 0 | 4/4 loaded | loaded | 1 |
| 768×1024 | **none** | 768 | 0 | 0 | 4/4 loaded | loaded | 1 |
| 390×844 | **none** | 390 | 0 | 0 | 4/4 loaded | loaded | 1 |
| 375×667 | **none** | 375 | 0 | 0 | 4/4 loaded | loaded | 1 |

Aggregate flag: `ALL_BREAKPOINTS_CLEAN = True`.

Body text length: 5,965 chars (≥1024) → 5,922 (768) → 5,873 (≤390). Title `JK SOLUTIONS — Digital Products & Engineering`; `lang="en"`; meta description present.

---

## 5. Reduced-motion baseline

`prefers-reduced-motion: reduce` @ 1440×900:

- text length **5,965** — identical to full-motion rendering (no content is hidden by the reduced-motion path)
- elements with content but `opacity:0`/`visibility:hidden`: **0**
- no horizontal overflow

---

## 6. Asset baseline

| Item | Value |
|---|---|
| `public/` | 43.2 MB, 184 files (largest: `aaradhya-hero.mp4` 5.67 MB) |
| Homepage images | 4 — all resolve to HTTP 200 after scroll |
| `images/jk-portrait.jpg` | present, 238,445 bytes |

**Lazy-loading verification (was initially mis-flagged as a broken image):** the portrait renders with `loading="lazy"` at `y ≈ 7,766 px`, so it is legitimately unloaded on first paint. Focused test scrolled it into view: `complete=true`, `naturalWidth=432`, response **HTTP 200**, zero failed requests. The dev optimizer served `w=640` for the 384 px rendered box. **Not a defect.**

---

## 7. Screenshot inventory

`docs/design-baseline/` — 11 PNG + 1 JSON, all dimension-verified and non-blank (per-image colour variance checked).

| File | Dimensions | KB |
|---|---|---|
| `home-1920x1080.png` | 1920×1080 | 592.0 |
| `home-1440x900.png` | 1440×900 | 514.6 |
| `home-1024x768.png` | 1024×768 | 380.1 |
| `home-768x1024.png` | 768×1024 | 99.1 |
| `home-390x844.png` | 390×844 | 71.7 |
| `home-375x667.png` | 375×667 | 58.1 |
| `home-full-390.png` | 390×14237 | 142.1 |
| `work-full-1440.png` | 1440×7807 | 124.3 |
| `case-sevadesk-full-1440.png` | 1440×12937 | 698.8 |
| `home-reduced-motion-1440.png` | 1440×900 | 98.1 |
| `portrait-inview-1440.png` | 1440×900 | 165.6 |
| `baseline-results.json` | raw metrics | 7.5 |

---

## 8. Server record (Phase 0 incidents)

**Baseline server actually used:** `npx next dev -p 3111 -H 127.0.0.1` → **port 3111**, reachable (`HTTP 200`, CSS `HTTP 200` 57,532 bytes).
**Project's own scripts:** `dev = next dev` (default port 3000), `start = next start`, `build = next build`.

### Incident A — `127.0.0.1:3111` refused to connect
**Cause:** the leftover `next dev -p 3111` from a previous session was deliberately stopped during Phase 0 because it was rewriting `.next` *while* `next build` ran (it invalidated the first production build). At the moment the URL was opened there was no listener on 3111. A dev server was subsequently started (externally — not a command issued by Phase 0) and now serves correctly.

### Incident B — production server on :3000 returned HTTP 400 for all static chunks
**Cause:** `.next` mtime `2026-09-29 23:46:03` = dev-server startup. `next dev` and `next start` **share the `.next` directory**; starting dev deleted `BUILD_ID` and the production chunks, so the still-running `next start` served HTML referencing files that no longer existed (`CSS 400`, `webpack-*.js 400`).

**Consequence — important for all future phases:** an intermediate audit run reported `overflow=True` @390/375, `consoleErr=14`, `netFail=15`. **These were artifacts of unstyled rendering from the clobbered build, not real responsive defects.** The authoritative run above (healthy server) shows zero overflow at every breakpoint.

**Rule for later phases:** never run `next build` / `next start` while `next dev` is running, and vice versa — stop one before using the other. Production artifacts are currently **not** present (dev owns `.next`); rebuild before any `next start`.

---

## 9. Concurrency event & safe reconciliation

A second actor (**Qoder / Aaradhya**, per `AGENTS.md` ownership) modified this repository *during* Phase 0. All of its work was detected, classified, and preserved. **Nothing of it was modified, reverted, deleted, or overwritten by OpenCode.**

### 9.1 Detection

- Scan method: MD5 comparison of every file against `backups/20260929-233528/` using `-LiteralPath` (an earlier comparison using wildcard paths produced a false positive on `src/app/work/[slug]/page.tsx` because PowerShell treats `[slug]` as a character class).
- Write timestamps observed: `00:01` → `00:11` on 2026-09-30, i.e. live and ongoing during capture.

### 9.2 Classification

| Class | Files | Handling |
|---|---|---|
| **OpenCode Phase 0** | `.gitignore` (added `backups/`), `docs/design-baseline.md`, `docs/design-baseline/*` (12), `backups/*/`, `.git/`, `baseline-server.log` (gitignored) | committed / kept |
| **Concurrent Qoder — modified pre-existing** | `AGENTS.md` (00:06:14) | **excluded from both commits, left untouched** |
| **Concurrent Qoder — new** | `src/data/aaradhya-services.ts` (38.3 KB), `src/data/aaradhya-i18n.ts` (19.7 KB), `src/app/products/sevadesk/fonts.ts`, `src/app/products/sevadesk/aaradhya.css`, `_audit/` (17 files), `.playwright-mcp/` (1 file) | **excluded from both commits, left untouched** |
| **Uncertain / not mine** | `server.log` (09-27, pre-existing but excluded from the backup by `*.log`), `tsconfig.tsbuildinfo` (build artifact, gitignored) | left alone |
| **Pre-existing, unchanged** | all other 1,256 files — byte-identical to backup 1, incl. `globals.css`, `tailwind.config.ts`, `products/sevadesk/page.tsx`, `Hero.tsx` | committed as baseline |

**Verified: zero pre-existing files were modified by the concurrent actor at scan time**, and **zero pre-existing files were modified by OpenCode** other than the single documented `.gitignore` line.

### 9.3 Note on paths named in the concurrent files' headers

`prisma/seed-landing.ts` and `docs/aaradhya/CONTENT-SOURCES.md` appear **only as provenance strings inside the generated headers** of `aaradhya-services.ts`. **Neither file exists in this working tree** — they are references to another location, not concurrent files here.

### 9.4 Backups (both preserved — newest work wins)

| Backup | Contents | Rule applied |
|---|---|---|
| `backups/20260929-233528/` | 1,260 files / 71.9 MB — state **before** Phase 0 | retained, never overwritten |
| `backups/20260930-001418-reconciliation/` | 1,296 files / 76.3 MB — state **including** all concurrent work | new snapshot; captured Qoder's 4 new files + modified `AGENTS.md` |

No `git reset --hard`, `git clean`, `git checkout --`, or `git restore` was used at any point. The only index operations were `git add --pathspec-from-file` and `git commit`.

### 9.5 Commits

| Commit | Contents |
|---|---|
| `0c5b2c5` — *baseline: pre-cinematic known-good state* | the 1,256 pre-existing files, hash-verified against backup 1, generated from backup 1's file manifest so that any file created concurrently during the operation could not leak in |
| *(this document's commit)* — *Phase 0: design & validation baseline* | `.gitignore` + `docs/design-baseline.md` + `docs/design-baseline/*` |

Verified after staging: `AGENTS.md`, `.gitignore`, `_audit/*`, `.playwright-mcp/*` and all 4 concurrent `src` files were **not** staged (`staged=False` for each).

### 9.6 Deliberately left untouched

`AGENTS.md`, `src/data/aaradhya-services.ts`, `src/data/aaradhya-i18n.ts`, `src/app/products/sevadesk/fonts.ts`, `src/app/products/sevadesk/aaradhya.css`, `_audit/**`, `.playwright-mcp/**` — ownership is certain (concurrent actor), so they were neither committed nor edited. They remain untracked on disk exactly as written.

---

## 9a. Configuration changes made by OpenCode

| Change | Scope | Reversible |
|---|---|---|
| `.gitignore` += `backups/` | repo | yes (one line) |
| `git init` | repo | yes |
| `git config user.name/user.email` = `OpenCode <opencode@localhost>` — **no git identity existed anywhere on this machine** | **repo-local only, global config untouched** | `git config --unset user.name/user.email` |

### 9b. Work-boundary compliance — OpenCode vs Qoder (verified 2026-09-30 00:3x)

Question asked by the user: *are OpenCode and Qoder repeating or overlapping each other's work?* — **No. Verified, not assumed:**

| Boundary check | Evidence | Result |
|---|---|---|
| Qoder source files inside my 3 commits | `git show --name-only 0c5b2c5` filtered for `src/**/aaradhya*` and `src/**/Ar*` | **0 files** |
| Qoder's working files (untracked, never staged, never edited) | `git status --short` | `src/data/aaradhya-*.ts` (5), `src/components/aaradhya/`, `src/app/products/aaradhya/`, `src/lib/aaradhya-fonts.ts`, `src/styles/`, `AGENTS.md`, `_audit/`, `.playwright-mcp/` |
| `public/work/aaradhya/*` media (35 files) flagged by name-match in commit 1 | present in `backups/20260929-233528/` with **identical count 35/35**, i.e. before Qoder's first write (00:01) | **pre-existing JK-portfolio case-study assets — my boundary (portfolio content), not Qoder's in-flight work** |
| Did OpenCode delete/move any Qoder file? | `src/app/products/sevadesk/{fonts.ts,aaradhya.css}` created by Qoder 00:05/00:07, now absent; their `src/lib/aaradhya-fonts.ts` present | **they relocated their own files; OpenCode deleted nothing** |
| Shared config touched by OpenCode | `.gitignore` (`backups/`), `tsconfig.json` (`exclude: backups`) | project-wide, disclosed in §9a; **no Qoder file edited** |
| Process/port discipline | listeners | my server only on **:3111**; **:3000 left free** for the other agent; builds only in isolated worktree so shared `.next` is never clobbered |

**Boundary rules OpenCode follows from now on:** never read-modify-write `AGENTS.md`, `src/data/aaradhya*`, `src/components/aaradhya/`, `src/app/products/aaradhya/`, `src/lib/aaradhya*`, `src/styles/`, `_audit/`, `.playwright-mcp/`, or any path Qoder creates; never stage/commit them; never fix their lint/build errors (report only); never stop a process they started; before editing any shared file (`.gitignore`, `tsconfig.json`, `package.json`) re-read it first and never revert their newer changes.

---

## 10. Pre-existing observations carried forward (not fixed in Phase 0)

1. **P3 — hero reel is `hidden lg:block`.** No reel panel below 1024 px. Pre-existing/by design (Stage 4.2.6 protection).
2. Hero already runs restrained ScrollTrigger depth scrubs (`yPercent 12 / -18`, `scrub 1.2 / 1.6 / 1`) — the cinematic work extends these, it does not replace them.
3. ESLint/React-version warning and `motion.ts:26` hook warning (§2) — candidates for a later cleanup pass, not Phase 0 scope.
4. `next dev` / `next start` share `.next` (§8, Incident B).

---

## 11. What Phase 0 did NOT do

No cinematic implementation · no modification of `Hero.tsx` · no Payload CMS work · no new/generated assets · no dependency installs · no application code changes of any kind. Tracked files edited: exactly two config lines — `backups/` added to `.gitignore`, `backups` added to `tsconfig.json` `exclude`. **Zero files owned by the concurrent agent were created, modified, moved, or deleted by OpenCode.**

---

## 12. Reproduction

```bash
# validation
node_modules\.bin\tsc.cmd --noEmit
node_modules\.bin\eslint.cmd src --ext .ts,.tsx --quiet
node_modules\.bin\next.cmd build

# baseline capture (edit BASE in the script first)
python <phase0_baseline.py>     # routes + 6 breakpoints + full-page + reduced-motion
python <phase0_shots.py>        # screenshot integrity
```
