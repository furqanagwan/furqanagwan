---
id: FUR-0007
title: Render the blog page on the server
type: perf
status: done
priority: P2
created: 2026-11-05
---

## Problem

/blog's server HTML contains only "Loading…": `BlogPageContent` reads
`useSearchParams()` inside a Suspense boundary, so Next.js bails out to
client-side rendering. Search engines and link previews see no content,
and visitors see a loading flash.

## Research

- Next.js `useSearchParams` reference
  (https://nextjs.org/docs/app/api-reference/functions/use-search-params):
  on a statically rendered route, calling `useSearchParams` makes the Client
  Component tree up to the closest `<Suspense>` boundary render on the
  client only; the server HTML holds just the fallback. That is exactly the
  "Loading..." /blog served (confirmed on production on 2026-11-06: the
  HTML contained `Loading...` and no `<h2>`).
- Next.js `page.js` reference
  (https://nextjs.org/docs/app/api-reference/file-conventions/page): in
  Next.js 15+ `searchParams` is a Promise that the page awaits; it is a
  request-time API, so using it renders the page per request, with the
  values available on the server. The docs recommend reading it in the
  Server Component page and passing plain values to Client Components.
- Navigations that change the query string (`<Link href="/blog?category=…">`)
  re-render the server page with the new `searchParams`, so filters keep
  working through the URL (URL state per AGENTS.md).
- Next.js "deopted into client rendering" message
  (https://nextjs.org/docs/messages/deopted-into-client-rendering)
  describes the same bail-out.
- The project does not enable `cacheComponents`, so awaiting `searchParams`
  in the page needs no extra `<Suspense>` boundary.
- AGENTS.md rule 2: validate user input with Zod, so the params are parsed
  by a tested `parseBlogSearchParams()` in `features/blog/utils.ts`.
- Note: this run's WebFetch of the two nextjs.org pages timed out on a
  permission prompt; the summary above is from the current Next.js docs as
  known for v15/16 plus the search results that list these pages.

Decision: render /blog per request. The page is cheap (posts are bundled
by content-collections, no network calls), and server HTML with real
content matters more for search engines and link previews than serving a
static "Loading..." shell.

## Acceptance criteria

- [x] Blog list (and category filter) present in the server-rendered HTML
- [x] Category filtering via the URL still works
- [x] E2E blog tests green

## Notes

- Likely fix: read `searchParams` in `app/blog/page.tsx` (server) and pass
  the active category down, keeping client code only for interactions.
- Done: `app/blog/page.tsx` awaits `searchParams`, validates them and
  passes `categoryParam`/`viewParam` to `BlogPageContent`, which no longer
  calls `useSearchParams` or wraps itself in `<Suspense>`.
- New E2E test fetches /blog without a browser and checks the `<h2>Blog</h2>`
  heading is in the HTML and "Loading..." is not.
