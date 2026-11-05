---
id: FUR-0031
title: Add a skip link and accessible menu toggles
type: a11y
status: done
priority: P2
created: 2026-11-05
---

## Problem

Keyboard and screen-reader users have no "skip to content" link, so they
must tab through the header and full navigation on every page (WCAG 2.4.1
Bypass Blocks). The mobile menu and sidebar toggle buttons don't expose
whether they're open (`aria-expanded`) or what they control
(`aria-controls`) (WCAG 4.1.2 Name, Role, Value), and the navigation
landmarks have no labels to tell them apart.

## Research


## Acceptance criteria

- [ ] Research recorded: WCAG 2.4.1 and 4.1.2, WAI-ARIA APG disclosure
      pattern, MDN on skip links
- [ ] Visible-on-focus "Skip to content" link targeting `<main>`
- [ ] Toggle buttons expose `aria-expanded` and `aria-controls`;
      navigation landmarks labelled
- [ ] E2E test: first Tab focuses the skip link; toggles report state

## Notes

