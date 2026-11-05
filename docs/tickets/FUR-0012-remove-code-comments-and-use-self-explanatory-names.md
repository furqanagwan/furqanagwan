---
id: FUR-0012
title: Remove code comments and use self-explanatory names
type: chore
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

The code relies on comments (including many JSX `{/* … */}` section labels)
to explain what it does. The project convention is that names explain the
code and there are no comments.

## Research

## Acceptance criteria

- [ ] No comments left in `src/`, `scripts/`, `tests/` or root config files, except tool directives (e.g. `eslint-disable`, `@ts-expect-error`)
- [ ] Where a comment was carrying meaning, the code is renamed or split so the meaning is in the names (e.g. an extracted component or a well-named constant)
- [ ] No behaviour change: typecheck, lint, unit, build and E2E all green
- [ ] Done in small batches (e.g. one folder per commit) so each is easy to review

## Notes
