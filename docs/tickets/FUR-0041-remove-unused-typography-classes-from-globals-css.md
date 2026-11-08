---
id: FUR-0041
title: Remove unused typography classes from globals.css
type: chore
status: backlog
priority: P3
created: 2026-11-08
---

## Problem

`globals.css` defines `.text-display-lg`, `.text-display-md`,
`.text-display-sm`, `.text-body-lg`, `.text-body-md`, `.text-body-sm` and
`.text-nav`, but no component uses them. Page titles and the error and 404 pages also carry a
`heading-display` class that has no CSS at all. Found while adding the
`text-page-title` size in FUR-0013; dead names make it unclear which
typography scale is the real one.

## Research

## Acceptance criteria

- [ ] Confirm each class is unused (grep src and content, including MDX)
- [ ] Remove the unused rules and the `heading-display` class names
- [ ] No visual change (E2E green; spot-check page titles)

## Notes
