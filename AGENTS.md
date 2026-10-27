# AGENTS.md — Standing rules for anyone working in this repository

## 1. Read the audit first

Before any work in this repo — coding, planning, documenting, estimating — read
**[AUDIT-2026-10-26.md](./AUDIT-2026-10-26.md)** in full. It is an independent audit of
what is actually built here, verified against the code. Where any other document in
this repo disagrees with the audit, the audit governs until a fresh verification
supersedes it.

## 2. Standing facts the audit established

- This repo contains **three overlapping application codebases** (the four apps in
  `apps/`, plus an older full application in root `src/`, including ~34,500 lines of
  retired code in `src/_disabled/`). Know which codebase a file belongs to before
  touching it.
- **Most documentation in this repo is unreliable.** Roughly half or more of the
  markdown files are leftover agent session/status reports. Never cite a status or
  completion document as evidence that a feature exists — verify against code,
  routes, schemas, and tests.
- The data model is the strongest asset: two Prisma schemas (root and
  provider-portal), orgId row-level tenancy, real migrations. Treat schema changes
  with corresponding care.
- **Never commit generated artifacts**: `node_modules/`, build output, caches
  (`.turbo/`), test reports, logs, or coverage output. (The committed `node_modules`
  was removed in PR #266; `.gitignore` already lists these — if something is tracked
  anyway, untrack it, do not work around it.)

## 3. Working rules

- Do not generate new status/completion documents. If a summary is genuinely needed,
  put it in the PR description, not in a new markdown file.
- Verify every factual claim about this codebase against the code before repeating
  it — file paths, feature completeness, counts, all of it.
- Finish one thing before starting the next. Breadth-first scaffolding is the
  failure mode this repo is recovering from.
- No salvage/rebuild decision has been made yet (owner reviewing, as of 2026-10-26).
  Until it is, limit changes to owner-approved cleanups and fixes.

*These rules were added 2026-10-26 at the owner's direction, alongside the audit.*
