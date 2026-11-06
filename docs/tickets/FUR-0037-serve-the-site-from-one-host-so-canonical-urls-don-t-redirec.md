---
id: FUR-0037
title: Serve the site from one host so canonical URLs don't redirect
type: bug
status: done
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

- Google Search Central, "Consolidate duplicate URLs"
  (https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls):
  the canonical URL should be the preferred URL that is served directly
  (200); pointing `rel=canonical`, sitemaps and links at a URL that
  redirects sends mixed signals. Use the same host everywhere.
- Vercel "Set up a custom domain"
  (https://vercel.com/docs/domains/set-up-custom-domain): add apex and www
  and redirect one to the other in the project's Domains settings; Vercel's
  own redirect examples use `www.example.com` as the destination
  (https://vercel.com/docs/routing/redirects).
- Vercel REST API "Update a project domain"
  (https://vercel.com/docs/rest-api/projects/update-a-project-domain):
  the domain redirect's status code (301/302/307/308) is a project domain
  setting; `null` means Vercel's default 307.
- Current config (Vercel `list_project_domains`, 2026-11-06):
  `furqanagwan.com` → redirect `www.furqanagwan.com`, status `null`;
  `www.furqanagwan.com` serves the site; `furqanagwan.vercel.app` also
  serves it (canonical tags cover that duplicate).

Decision: **www is the primary host.** It is what Vercel already serves
and redirects to, so switching `SITE_URL` makes every canonical, sitemap,
RSS, `og:url` and JSON-LD URL return 200 immediately, with no DNS or domain
change. Making the apex primary would need the domain redirect reversed in
Vercel, which the automation can't do. Links to the apex (README, old
shares) keep working through the redirect.

## Acceptance criteria

- [x] Decide which host is primary (apex matches `SITE_URL`, README and
      existing links; www is what Vercel serves today) and record why
- [ ] The other host permanently redirects (308) to the primary one:
      moved to FUR-0038 (needs Furqan in the Vercel dashboard)
- [x] `SITE_URL`, sitemap, RSS, JSON-LD and canonical URLs all use the
      primary host, and each returns 200 in production

## Notes
- `SITE_URL` is now `https://www.furqanagwan.com`, and robots.txt,
  sitemap, RSS and JSON-LD import it instead of repeating the URL (AGENTS.md
  "one source of truth"). `tests/seo.spec.ts` imports it too.
- The 308 redirect is split into FUR-0038, owned by Furqan.
