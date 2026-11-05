---
id: FUR-0033
title: Remove dead code and fix lint warnings
type: chore
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

Lint reports warnings and there is dead code: `GITHUB_API_BASE` in
`src/features/projects/constants.ts` is never used; `getQualificationTypes`
is imported but unused in `QualificationsList.tsx`; the placeholder
Anthropic and Gemini AI providers have unused parameters.

## Research


## Acceptance criteria

- [ ] Research recorded (ESLint `no-unused-vars` / typescript-eslint
      equivalents; whether placeholder providers should stay)
- [ ] Unused code removed; placeholder providers either implemented
      honestly or removed with the README updated
- [ ] `bun run lint` reports zero warnings, and CI fails on warnings
      (`--max-warnings=0`)

## Notes

