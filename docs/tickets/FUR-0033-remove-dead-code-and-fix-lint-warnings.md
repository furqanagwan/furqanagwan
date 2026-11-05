---
id: FUR-0033
title: Remove dead code and fix lint warnings
type: chore
status: done
priority: P3
created: 2026-11-05
---

## Problem

Lint reports warnings and there is dead code: `GITHUB_API_BASE` in
`src/features/projects/constants.ts` is never used; `getQualificationTypes`
is imported but unused in `QualificationsList.tsx`; the placeholder
Anthropic and Gemini AI providers have unused parameters.

## Research

- ESLint `--max-warnings`: exits non-zero when warnings exceed the
  number; `--max-warnings=0` makes any warning fail CI.
  https://eslint.org/docs/latest/use/command-line-interface#--max-warnings
- `@typescript-eslint/no-unused-vars` (enabled by `eslint-config-next`'s
  TypeScript config) reports unused imports, variables and parameters; the
  fix is to delete them rather than prefix with `_` or disable the rule.
  https://typescript-eslint.io/rules/no-unused-vars/
- TypeScript function compatibility: a method with fewer parameters is
  assignable to one with more, so the placeholder providers can implement
  `generateContent()` without the unused parameters and still satisfy
  `BaseAIProvider`.
  https://www.typescriptlang.org/docs/handbook/type-compatibility.html#comparing-two-functions
- Decision: keep the Anthropic and Gemini placeholder providers. The
  generator's README already documents them as placeholders, and the AI
  post workflow is Furqan's (FUR-0005), so only their unused parameters
  go.


## Acceptance criteria

- [x] Research recorded (ESLint `no-unused-vars` / typescript-eslint
      equivalents; whether placeholder providers should stay)
- [x] Unused code removed; placeholder providers kept as documented
      placeholders (see Research) with their unused parameters removed
- [x] `bun run lint` reports zero warnings, and CI fails on warnings
      (`--max-warnings=0`)

## Notes

- Also removed: the never-visible "Toggle mobile menu" button in
  `Header.tsx` (class `hidden` with no breakpoint override; the real mobile
  toggle lives in `LayoutContent.tsx`), the unused `Sheet` component and
  its test, and the `@radix-ui/react-dialog` dependency only `Sheet` used.

