---
id: FUR-0043
title: Extract named components in the remaining layout and feature files
type: chore
status: done
priority: P2
created: 2026-11-10
---

## Problem

Scope: the header, sidebar and mobile menu. The footer and the feature
files moved to FUR-0046 so this merge stays reviewable.

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

The sidebar and mobile menu both branched on optional `href`/`items` and
used non-null `!` to read them. TypeScript's
[discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
and [`in` narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing)
let one type guard (`isNavGroup`) narrow a section to either a link or a
group, so neither component needs `!`. The two copies of the
expanded-groups state became one hook, as React's
[Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
recommends for state logic repeated across components.

## Acceptance criteria

- [x] One file (or closely related pair) per change, so each is easy to review
      (header, sidebar and mobile menu here; the rest in FUR-0046)
- [x] Sections that needed a label become named components or constants
- [x] `SidebarToggleIcon` moved to its own file
- [x] No visual change; E2E (including iPhone Duo and foldable checks) green

## Notes

- Split this ticket further if a single merge would get large.
