---
id: FUR-0044
title: Lint with typescript-eslint's type-checked strict and stylistic configs
type: chore
status: backlog
priority: P2
created: 2026-11-11
---

## Problem

Split from FUR-0029, which tightened `tsconfig.json`. ESLint still uses
`eslint-config-next/typescript` (typescript-eslint's basic `recommended`
rules), so it misses unsafe `any` flows, floating promises, unnecessary
conditions and inconsistent type imports, which need type information.

## Research

To do before implementing: typescript-eslint
[shared configs](https://typescript-eslint.io/users/configs/)
(`strictTypeChecked`, `stylisticTypeChecked`),
[typed linting with `projectService`](https://typescript-eslint.io/getting-started/typed-linting/),
and the [Next.js ESLint docs](https://nextjs.org/docs/app/api-reference/config/eslint)
for combining them with `eslint-config-next` in flat config.

## Acceptance criteria

- [ ] Research recorded
- [ ] ESLint uses `strictTypeChecked` and `stylisticTypeChecked` with
      `parserOptions.projectService`; JS config files excluded from typed rules
- [ ] `consistent-type-imports` agrees with `verbatimModuleSyntax`
      (`import type`)
- [ ] All resulting errors fixed properly (no blanket disables)
- [ ] AGENTS.md TypeScript rule mentions the lint rules

## Notes

Needs `bun install` to run locally, or iterate on CI; the error count may be
large, so split by directory if needed.
