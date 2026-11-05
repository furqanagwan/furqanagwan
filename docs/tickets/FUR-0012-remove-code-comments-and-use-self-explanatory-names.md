---
id: FUR-0012
title: Remove code comments and use self-explanatory names
type: chore
status: done
priority: P2
created: 2026-11-05
---

## Problem

The code relies on comments (including many JSX `{/* … */}` section labels)
to explain what it does. The project convention is that names explain the
code and there are no comments.

## Research

- Fowler's "Comments" code smell (Refactoring): a comment explaining what
  code does is a sign the code should explain itself. Treatments: Rename
  Method/Variable, Extract Function/Method, Introduce Assertion. Comments
  that change behaviour (framework or tool directives) are the exception.
  https://smells-to-refactorings.gitbook.io/smells/dispensables/comment
- ESLint has no core rule that bans all comments (only `no-inline-comments`
  for trailing ones), so the rule is enforced by convention and review.

## Acceptance criteria

- [x] No comments left in `src/`, `scripts/`, `tests/` or root config files, except tool directives (e.g. `eslint-disable`, `@ts-expect-error`)
- [x] No behaviour change: every file compiles to identical output before and after
- [x] Typecheck, lint, unit, build and E2E all green
- [x] Renaming/extracting code whose comments carried meaning split out to FUR-0016

## Notes

- 781 lines of comments removed across 87 files, including JSX
  `{/* ... */}` section labels and CSS comments.
- Verified by compiling all 130 TypeScript/TSX/JS files with Bun's
  transpiler before and after: output identical for every file.
