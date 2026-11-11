---
id: FUR-0046
title: Extract named components in the footer and feature pages
type: chore
status: backlog
priority: P2
created: 2026-11-11
---

## Problem

Split from FUR-0043, which did the header, sidebar and mobile menu. These
files still read as long, unlabelled JSX:

- `src/components/layout/Footer.tsx` (link columns; bottom bar with social
  links and copyright; five inline social icons that could join
  `components/ui/BrandIcons`; its Navigate/About links repeat
  `navigation.ts`, against AGENTS.md rule 6)
- `src/features/blog/components/BlogPageContent.tsx`
- `src/features/projects/components/ProjectsList.tsx`
- `src/features/blog/components/post/PostBody.tsx`

## Research

Same as FUR-0016/FUR-0043:
[Thinking in React](https://react.dev/learn/thinking-in-react),
[Your First Component](https://react.dev/learn/your-first-component) and
Fowler's [Extract Function](https://refactoring.com/catalog/extractFunction.html).

## Acceptance criteria

- [ ] One file (or closely related pair) per change; split this ticket again
      if one merge would get large
- [ ] Sections that needed a label become named components or constants
- [ ] Footer links come from `navigation.ts` instead of a second list
- [ ] No visual change; E2E (including iPhone Duo and foldable checks) green

## Notes
