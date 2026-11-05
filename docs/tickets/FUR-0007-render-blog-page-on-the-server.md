---
id: FUR-0007
title: Render the blog page on the server
type: perf
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

/blog's server HTML contains only "Loading…": `BlogPageContent` reads
`useSearchParams()` inside a Suspense boundary, so Next.js bails out to
client-side rendering. Search engines and link previews see no content,
and visitors see a loading flash.

## Research

## Acceptance criteria

- [ ] Blog list (and category filter) present in the server-rendered HTML
- [ ] Category filtering via the URL still works
- [ ] E2E blog tests green

## Notes

- Likely fix: read `searchParams` in `app/blog/page.tsx` (server) and pass
  the active category down, keeping client code only for interactions.
