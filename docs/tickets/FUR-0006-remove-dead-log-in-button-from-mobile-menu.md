---
id: FUR-0006
title: Remove dead Log In button from mobile menu
type: bug
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

The mobile menu shows a "Log In" button (copied from openai.com's design)
that links to `/login`, which doesn't exist; its click handler just closes
the menu. A control that does nothing confuses visitors.

## Research

## Acceptance criteria

- [ ] Button removed, or replaced with something real in the same style (e.g. Contact)
- [ ] Mobile menu still looks balanced at 382px and 669px widths

## Notes

- `src/components/layout/MobileMenu.tsx`
