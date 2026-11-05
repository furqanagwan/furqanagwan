---
id: FUR-0008
title: Fix Vitest coverage paths
type: chore
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

`vitest.config.mts` includes coverage from `components/**`, but the code
lives in `src/components/**` (and `src/features/**`), so the coverage
report and its thresholds don't measure the real code.

## Research

## Acceptance criteria

- [ ] Coverage `include`/`exclude` point at `src/`
- [ ] Thresholds set to what the suite actually achieves (no silent lowering of real coverage)
- [ ] `bun run test:unit` green in CI

## Notes
