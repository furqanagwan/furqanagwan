---
id: FUR-0003
title: Make CI/CD green
type: ci
status: done
priority: P1
created: 2026-11-05
---

## Problem

The CI/CD workflow had been red since at least January 2026. The E2E job
couldn't install browsers once `ubuntu-latest` became Ubuntu 26.04
(unsupported by Playwright 1.57), and several E2E tests no longer matched
the site.

## Research

## Acceptance criteria

- [x] CI runners pinned to `ubuntu-24.04` (see FUR-0004 to unpin)
- [x] Stale E2E tests fixed or removed (no `/education` page; blog has no posts yet)
- [x] CI runs on every branch push, so changes are checked before merging
- [x] CI/CD green on main

## Notes

- Shipped in the FUR-0003 commit; CI green on main.
