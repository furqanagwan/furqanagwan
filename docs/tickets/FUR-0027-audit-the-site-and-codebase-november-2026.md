---
id: FUR-0027
title: Audit the site and codebase (November 2026)
type: chore
status: done
priority: P1
created: 2026-11-05
---

## Problem

A full audit of the site and codebase, so every improvement is tracked as
a detailed ticket before work starts, and the repo stays on the latest
packages with strict TypeScript conventions.

## Research

- Tickets filed: FUR-0028 (resolve "latest" dependencies), FUR-0029
  (strict TypeScript), FUR-0030 (social previews and canonical URLs),
  FUR-0031 (skip link and accessible toggles), FUR-0032 (Apple touch icon
  and manifest icons), FUR-0033 (dead code and lint warnings), FUR-0034
  (server components), FUR-0035 (adopt new platform features).
- Updated: FUR-0004 (unblocked; every package to latest), FUR-0006 (now
  covers the dead language selector too).
- Already tracked: FUR-0007 (blog server rendering), FUR-0014 (typecheck
  in CI, folded into FUR-0029), FUR-0016, FUR-0023, FUR-0024.

## Acceptance criteria

- [x] Code audit: TypeScript strictness, lint, dead code, client/server split
- [x] Site audit of the rendered production HTML: SEO and link previews,
      accessibility, icons, dead UI
- [x] Every finding filed as a ticket with a detailed description

## Notes

Production checks: no `og:image`/`twitter:image`, no canonical, no skip
link, toggles without `aria-expanded`, no `apple-touch-icon`; the code has
no `any`, `@ts-ignore` or non-null assertions.
