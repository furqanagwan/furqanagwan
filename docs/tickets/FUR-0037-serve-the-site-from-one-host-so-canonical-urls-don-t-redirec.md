---
id: FUR-0037
title: Serve the site from one host so canonical URLs don't redirect
type: bug
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

`https://furqanagwan.com/*` answers with a 307 redirect to
`https://www.furqanagwan.com/*`, but the site's `metadataBase`, canonical
URLs, `og:url`, sitemap, RSS and JSON-LD all use the apex
`https://furqanagwan.com` (`SITE_URL` in `src/lib/site.ts`). Every
canonical URL therefore points at a redirect, and the redirect is
temporary (307) rather than permanent (308/301). Found while verifying
FUR-0030 in production on 2026-11-05.

## Research

Starting points (to be read and summarised before implementing):

- Vercel: redirecting between apex and www is set per domain in the
  project's Domains settings, and should be a permanent redirect.
  https://vercel.com/docs/domains/deploying-and-redirecting
- Google Search Central: canonical URLs should be the preferred, directly
  served (200) URL, not one that redirects.
  https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

## Acceptance criteria

- [ ] Decide which host is primary (apex matches `SITE_URL`, README and
      existing links; www is what Vercel serves today) and record why
- [ ] The other host permanently redirects (308) to the primary one
- [ ] `SITE_URL`, sitemap, RSS, JSON-LD and canonical URLs all use the
      primary host, and each returns 200 in production

## Notes
