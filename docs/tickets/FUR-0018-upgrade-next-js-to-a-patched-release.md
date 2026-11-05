---
id: FUR-0018
title: Upgrade Next.js to a patched release
type: bug
status: blocked
priority: P1
created: 2026-11-05
blocked-by: package registry not reachable from the automation environment
---

## Problem

The site runs Next.js 16.1.1. Nine security advisories published in July
2026 affect every 16.x release before 16.2.11, four of them high severity
(SSRF via dynamic rewrites/redirects, SSRF in Server Actions on custom
servers, middleware/proxy bypass with Turbopack, and a Server Actions
denial of service). Snyk PR #5 only goes to 16.1.5, which is still
affected.

## Research

- July 2026 advisories and fixed versions:
  https://teramont.net/blog/nextjs-9-vulnerabilities-july-2026-16-2-11-15-5-21
- Before upgrading, check the Next.js security advisories and release notes
  for anything newer than 16.2.11, and the 16.2 upgrade notes for breaking
  changes.

## Acceptance criteria

- [ ] `next` and `eslint-config-next` on the latest patched 16.x release (at least 16.2.11)
- [ ] `bun.lock` regenerated; CI green (lint, unit, build, E2E)
- [ ] Preview and production checked page by page
- [ ] PR #5 closed as superseded

## Notes

- Highest-priority ticket. Needs package installs enabled for the
  automation environment, or Furqan to run `bun update next eslint-config-next`
  and push the lockfile.
