---
id: FUR-0014
title: Run the type checker in the CI lint job
type: ci
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

The CI job is named "Lint & Type Check" but only runs `bun run lint`. Type
errors are only caught later by `next build`, which is slower and reports
them less clearly (FUR-0011 hit exactly this).

## Research

## Acceptance criteria

- [ ] CI runs `bun run typecheck` (it may need `bun run content:build`
      first, as the unit-test job does, for the generated content types)
- [ ] A type error fails the "Lint & Type Check" job
- [ ] CI/CD green

## Notes

- Folded into FUR-0029 (strict TypeScript conventions), which adds the CI typecheck.
