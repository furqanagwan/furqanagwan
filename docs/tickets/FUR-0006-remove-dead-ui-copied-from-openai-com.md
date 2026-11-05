---
id: FUR-0006
title: Remove dead UI copied from openai.com
type: bug
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

Two controls copied from openai.com's design don't do anything:

- The mobile menu's "Log In" button links to `/login`, which doesn't
  exist; its click handler just closes the menu.
- The footer's language selector offers 34 languages, but the site exists
  only in English; choosing one changes nothing. It also shows
  "English · United States" although the site is UK-based.

Controls that do nothing confuse visitors and hurt trust.

## Research

## Acceptance criteria

- [ ] Research recorded (WCAG 3.2 Predictable; openai.com's current
      footer/menu as reference)
- [ ] Log In button removed or replaced with something real in the same
      style (e.g. Contact)
- [ ] Language selector removed (or replaced by a static, accurate label)
- [ ] Mobile menu and footer still look balanced at 382px and 669px widths

## Notes

- `src/components/layout/MobileMenu.tsx`
