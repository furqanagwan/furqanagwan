---
id: FUR-0006
title: Remove dead UI copied from openai.com
type: bug
status: done
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

- openai.com's own mobile menu ends with real account actions ("Log in",
  "Try ChatGPT"), and its footer language selector really switches the
  site's language. This site has neither accounts nor translations, so
  copying those controls produced buttons that do nothing.
- WCAG guideline 3.2 (Predictable): components should behave as users
  expect; a control that does nothing fails that expectation.
  https://www.w3.org/WAI/WCAG22/Understanding/predictable

## Acceptance criteria

- [x] Research recorded
- [x] Log In button replaced with a real Contact button in the same pill style
- [x] Language selector removed (component deleted)
- [x] E2E tests: menu button goes to /contact; no language selector

## Notes

- `src/components/layout/MobileMenu.tsx`
