---
id: FUR-0004
title: Upgrade packages to latest
type: chore
status: blocked
priority: P2
created: 2026-11-05
blocked-by: package registry not reachable from the automation environment
---

## Problem

Dependencies (Next.js 16.1.1, React 19.2.3, Playwright 1.57, etc.) haven't
been updated. Playwright 1.57 also can't run on Ubuntu 26.04, which is why
CI is pinned to `ubuntu-24.04` (FUR-0003).

## Research

## Acceptance criteria

- [ ] All packages updated and `bun.lock` regenerated (CI uses `--frozen-lockfile`)
- [ ] Typecheck, lint, unit, build and E2E all green
- [ ] CI runners moved back to `ubuntu-latest` once Playwright supports it

## Notes

- Blocked until the automation environment is allowed to install packages.
- Includes Snyk PRs #6 and #7 (react, react-dom 19.2.4) and #8
  (lucide-react 0.563.0); close them once this lands. Next.js itself is
  FUR-0018 (security, P1).
