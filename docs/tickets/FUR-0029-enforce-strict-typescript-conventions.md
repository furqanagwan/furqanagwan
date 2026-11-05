---
id: FUR-0029
title: Enforce strict TypeScript conventions
type: chore
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

TypeScript already runs with `strict` and `noUncheckedIndexedAccess`, and
the code has no `any`, `@ts-ignore` or non-null assertions. But the
conventions aren't enforced:

- CI never runs `tsc` (FUR-0014); type errors only surface inside
  `next build`.
- ESLint uses `eslint-config-next/typescript` (typescript-eslint's basic
  recommended rules), not the type-aware rule sets that catch unsafe
  `any` flows, floating promises, unnecessary conditions and inconsistent
  type imports.
- Useful compiler checks are off: `noImplicitReturns`,
  `noFallthroughCasesInSwitch`, `noUnusedLocals`, `noUnusedParameters`,
  `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`,
  `verbatimModuleSyntax`. `allowJs` is on although the project is
  TypeScript-only.

## Research


## Acceptance criteria

- [ ] Research recorded: TypeScript TSConfig reference for each option;
      typescript-eslint shared configs (`strictTypeChecked`,
      `stylisticTypeChecked`) and how to combine them with
      `eslint-config-next` in flat config
- [ ] tsconfig enables the extra checks that fit the codebase (with reasons
      for any left off); `allowJs` off
- [ ] ESLint uses typescript-eslint's type-checked strict and stylistic
      configs with `parserOptions.projectService`
- [ ] All resulting errors fixed properly (no blanket disables)
- [ ] CI runs `bun run typecheck` (closes FUR-0014)
- [ ] TypeScript conventions written into AGENTS.md

## Notes

Do after FUR-0004 so the rules target the newest TypeScript and typescript-eslint.
