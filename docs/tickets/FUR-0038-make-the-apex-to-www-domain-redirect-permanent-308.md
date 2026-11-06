---
id: FUR-0038
title: Make the apex-to-www domain redirect permanent (308)
type: chore
status: blocked
priority: P3
created: 2026-11-06
owner: Furqan
blocked-by: the project-domain update API isn't available to the automation (no Vercel MCP tool or token for it)
---

## Problem

`furqanagwan.com` redirects to `www.furqanagwan.com` with a 307
(temporary). The Vercel project domain has `redirect: www.furqanagwan.com`
and `redirectStatusCode: null`, so Vercel uses its default 307. Search
engines treat a temporary redirect as "keep the old URL", so the apex can
linger in results. Split out of FUR-0037, which made www the canonical host
in code.

## Research

- Vercel REST API, "Update a project domain"
  (https://vercel.com/docs/rest-api/projects/update-a-project-domain):
  `PATCH /v9/projects/{idOrName}/domains/{domain}` accepts
  `redirectStatusCode` of 301, 302, 307 or 308. The same setting is in the
  dashboard: Project → Settings → Domains → `furqanagwan.com` → Edit →
  redirect to `www.furqanagwan.com` with "308 Permanent Redirect".
- Vercel "Set up a custom domain"
  (https://vercel.com/docs/domains/set-up-custom-domain): when both apex
  and www are added, redirect one to the other to avoid duplicate content.
- Google Search Central, redirects
  (https://developers.google.com/search/docs/crawling-indexing/301-redirects):
  permanent server-side redirects (301/308) are the strongest signal that
  the target should be the canonical URL.

## Acceptance criteria

- [ ] `furqanagwan.com` domain redirect set to 308 in Vercel (Furqan:
      dashboard, about 30 seconds)
- [ ] `curl -sI https://furqanagwan.com/blog` returns 308 with
      `location: https://www.furqanagwan.com/blog`

## Notes

- Found in FUR-0037 on 2026-11-06 via `list_project_domains`.
