---
id: FUR-0004
title: Upgrade packages to latest
type: chore
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

Dependencies (Next.js 16.1.1, React 19.2.3, Playwright 1.57, etc.) haven't
been updated. Playwright 1.57 also can't run on Ubuntu 26.04, which is why
CI is pinned to `ubuntu-24.04` (FUR-0003).

## Research

## Acceptance criteria

- [ ] Every dependency and devDependency on its latest release (via
      FUR-0028's `"latest"` resolution), including TypeScript,
      Tailwind CSS, Playwright, Vitest, ESLint, Zod and `@types/node`
      matched to the Node.js version Vercel runs
- [ ] Release notes for each major upgrade researched and breaking
      changes handled
- [ ] Typecheck, lint, unit, build and E2E all green
- [ ] CI runners back on `ubuntu-latest` once Playwright supports it
- [ ] Snyk PRs #6, #7 and #8 superseded

## Notes

- Unblocked by FUR-0020 and FUR-0028 (lockfile resolved on GitHub's runners).
- Includes Snyk PRs #6 and #7 (react, react-dom 19.2.4) and #8
  (lucide-react 0.563.0); close them once this lands. Next.js itself is
  FUR-0018 (security, P1).
