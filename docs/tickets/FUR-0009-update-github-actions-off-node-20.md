---
id: FUR-0009
title: Update GitHub Actions off Node 20
type: ci
status: done
priority: P3
created: 2026-11-05
---

## Problem

CI warns that `actions/checkout@v4`, `actions/cache@v4` and
`actions/upload-artifact@v4` target the deprecated Node 20 runtime and are
being forced onto Node 24.

## Research

## Acceptance criteria

- [x] Actions bumped to releases that run on Node 24 (done in FUR-0022)
- [x] No Node 20 deprecation warnings in CI
- [x] CI/CD green

## Notes
