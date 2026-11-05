---
id: FUR-0010
title: Delete merged and stale branches
type: chore
status: blocked
priority: P3
created: 2026-11-05
owner: Furqan
blocked-by: branch deletion is refused (HTTP 403) from the automation environment
---

## Problem

Merged and abandoned branches clutter the repo: `iphone-duo-support`,
`chore/tidy-codebase`, `fix/ci-green`, `FUR-*` branches once merged, `preview`, `redesign/openai-style`
and four old `snyk-*` branches.

## Research

## Acceptance criteria

- [ ] Merged branches deleted
- [ ] Old `snyk-*`, `preview` and `redesign/openai-style` reviewed and deleted if no longer needed

## Notes
