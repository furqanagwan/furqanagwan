---
id: FUR-0016
title: Extract named components where comments labelled sections
type: chore
status: done
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

- React, [Thinking in React](https://react.dev/learn/thinking-in-react):
  break the UI into a component hierarchy using the single responsibility
  principle; a component should ideally only do one thing, and grows into
  smaller subcomponents when it does more.
- React, [Your First Component](https://react.dev/learn/your-first-component):
  define every component at the top level of a module, never nested inside
  another component's body (nesting recreates it on every render).
- Martin Fowler, [Extract Function](https://refactoring.com/catalog/extractFunction.html):
  when you have to read a fragment to work out what it does, extract it and
  name it after *what* it does; a comment labelling a block is the usual
  signal (see the "Comments" smell in *Refactoring*, 2nd ed.).
- [Tailwind CSS v4: detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files):
  Tailwind scans source files as plain text for complete class names, so
  shared class strings can live in a `.ts` constant as long as each class is
  written out whole (never built by concatenating fragments).

## Acceptance criteria

- [x] Research recorded (React docs on splitting components; Fowler's Extract Function)
- [x] Large components split into named sub-components where a section label was needed (e.g. `MobileLogo`, `MobileMenuToggle`, `MenuOverlay`, `DesktopSidebarColumn`) — done for `LayoutContent.tsx`; the other files moved to FUR-0043
- [x] Magic class strings repeated across components given names where it helps
- [x] No visual change: E2E (including iPhone Duo checks) green; screenshots could not be captured from the agent sandbox (see Notes)

## Notes

- Do it one component file per batch so each change is easy to review.
- 2026-11-10: Split `LayoutContent.tsx` into `MobileLogo`, `MobileMenuToggle`,
  `MenuOverlay` and `DesktopSidebarColumn`, each in its own file in
  `src/components/layout/`. The mobile-menu slide timing and the
  "over menu / over page" text colours, each written twice, now live in
  `mobileMenuStyles.ts`. The always-0px spacer column in the layout grid
  (previously labelled "Mobile Sidebar spacer (0px on desktop)") was removed
  with its empty `<div>`; the grid template went from `0px 200px 1fr` /
  `0px 0px 1fr` to `200px 1fr` / `0px 1fr`, which lays out identically.
- The rest of the files are split out to FUR-0043, so this ticket doesn't stay
  open across many merges.
- Screenshots: `bun install` could not reach the npm registry from the agent
  sandbox, so no local build or browser screenshots this time; the rendered
  DOM and class lists are unchanged apart from the removed empty spacer, and
  CI's Playwright suite (including iPhone Duo and foldable viewports) is the
  visual check.

