---
id: FUR-0009
title: Update GitHub Actions off Node 20
type: ci
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

CI warns that `actions/checkout@v4`, `actions/cache@v4` and
`actions/upload-artifact@v4` target the deprecated Node 20 runtime and are
being forced onto Node 24.

## Research

## Acceptance criteria

- [ ] Actions bumped to releases that run on Node 24 (check each action's releases)
- [ ] No Node 20 deprecation warnings in CI
- [ ] CI/CD green

## Notes
