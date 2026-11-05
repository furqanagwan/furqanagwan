---
id: FUR-0001
title: Support iPhone Duo screens
type: feature
status: done
priority: P2
created: 2026-11-05
---

## Problem

The iPhone Duo's Safari shows pages from 382px (outer screen) to 951px
(inner screen, landscape) wide, can fold like a book, and has system UI at
the screen edges. The site didn't handle edge insets, the mobile menu took
85% of the 669px inner screen, and blog text ran across the crease.

## Research

## Acceptance criteria

- [x] Page draws edge to edge (`viewport-fit=cover`) with safe-area padding on fixed header, menu and content
- [x] Mobile menu capped at 360px wide
- [x] Blog post text stays on one side of the crease in book posture (`horizontal-viewport-segments: 2`)
- [x] Theme colour matches light and dark mode
- [x] Playwright checks every Duo viewport for sideways scrolling (`tests/iphone-duo.spec.ts`)

## Notes

- Shipped in the FUR-0001 commit; preview and production checked, no runtime errors.
- Viewport sizes from WebKit's Safari 27.1 notes.
