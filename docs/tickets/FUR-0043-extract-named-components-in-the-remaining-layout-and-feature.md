---
id: FUR-0043
title: Extract named components in the remaining layout and feature files
type: chore
status: backlog
priority: P2
created: 2026-11-10
---

## Problem

Follow-up to FUR-0016, which split `LayoutContent.tsx`. The other files whose
section labels FUR-0012 removed still read as long, unlabelled JSX:

- `src/components/layout/Footer.tsx` (link columns, bottom bar: social
  links, copyright, language selector; the inline social icons)
- `src/components/layout/Header.tsx` (`SidebarToggleIcon` lives here but is
  shared with `MobileMenuToggle`)
- `src/components/layout/MobileMenu.tsx` (header area, navigation links,
  bottom section)
- `src/components/layout/Sidebar.tsx` (section header, expandable sub-items)
- `src/features/blog/components/BlogPageContent.tsx`
- `src/features/projects/components/ProjectsList.tsx`
- `src/features/blog/components/PostBody.tsx`

## Research

Same as FUR-0016:
[Thinking in React](https://react.dev/learn/thinking-in-react) (split by the
single responsibility principle),
[Your First Component](https://react.dev/learn/your-first-component)
(define components at the top level, never nested), and Fowler's
[Extract Function](https://refactoring.com/catalog/extractFunction.html)
("if you have to spend effort looking at a fragment of code and figuring out
what it's doing, then you should extract it into a function and name the
function after the 'what'").

## Acceptance criteria

- [ ] One file (or closely related pair) per change, so each is easy to review
- [ ] Sections that needed a label become named components or constants
- [ ] `SidebarToggleIcon` moved to its own file
- [ ] No visual change; E2E (including iPhone Duo and foldable checks) green

## Notes

- Split this ticket further if a single merge would get large.
