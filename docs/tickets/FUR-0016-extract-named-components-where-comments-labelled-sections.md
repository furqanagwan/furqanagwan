---
id: FUR-0016
title: Extract named components where comments labelled sections
type: chore
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

FUR-0012 removed the comments that labelled sections of large components
(e.g. "Sticky mobile logo", "Mobile menu toggle", "Overlay to close menu",
"Desktop sidebar container" in `LayoutContent.tsx`, and similar in
`BlogPageContent.tsx`, `ProjectsList.tsx`, `Footer.tsx`, `PostBody.tsx`).
That meaning should now live in the code: well-named components, constants
or helpers, so the JSX reads without commentary.

## Research

## Acceptance criteria

- [ ] Research recorded (React docs on splitting components; Fowler's Extract Function)
- [ ] Large components split into named sub-components where a section label was needed (e.g. `MobileLogo`, `MobileMenuToggle`, `MenuOverlay`, `DesktopSidebarColumn`)
- [ ] Magic class strings repeated across components given names where it helps
- [ ] No visual change: before/after screenshots, E2E (including iPhone Duo checks) green

## Notes

- Do it one component file per batch so each change is easy to review.
