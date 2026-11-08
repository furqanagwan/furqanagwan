---
id: FUR-0014
title: Run the type checker in the CI lint job
type: ci
status: done
priority: P2
created: 2026-11-05
---

## Problem

The CI job is named "Lint & Type Check" but only runs `bun run lint`. Type
errors are only caught later by `next build`, which is slower and reports
them less clearly (FUR-0011 hit exactly this).

## Research

- [Next.js TypeScript config](https://nextjs.org/docs/app/api-reference/config/typescript):
  `next build` still fails on type errors, and the docs suggest running
  `tsc --noEmit` yourself before building. Route helper types and
  `next-env.d.ts` (which lets TypeScript understand stylesheet and image
  imports) are generated "during next dev, next build, or via
  `next typegen`"; `next-env.d.ts` is gitignored, so a fresh CI checkout
  has neither until `next typegen` runs.
- The `content-collections` import resolves to
  `.content-collections/generated` (tsconfig `paths`), which only exists
  after `bun run content:build`, as the unit-test job already does.

## Acceptance criteria

- [x] CI runs `bun run typecheck` (it may need `bun run content:build`
      first, as the unit-test job does, for the generated content types)
- [x] A type error fails the "Lint & Type Check" job
- [x] CI/CD green

## Notes

- Was folded into FUR-0029; split back out because it is small and
  independent. FUR-0029 keeps the stricter compiler and ESLint rules.
- `bun run typecheck` is now `next typegen && tsc --noEmit`, so it works
  the same on a fresh checkout locally and in CI.
