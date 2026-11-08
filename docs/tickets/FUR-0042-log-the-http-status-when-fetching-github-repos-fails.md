---
id: FUR-0042
title: Log the HTTP status when fetching GitHub repos fails
type: bug
status: backlog
priority: P3
created: 2026-11-08
---

## Problem

Vercel runtime errors on 2026-11-08 showed one "Failed to fetch GitHub
repos:" on /projects (the FUR-0013 preview deployment) with nothing after
the colon: `src/features/projects/queries.ts` logs `response.statusText`,
which is empty over HTTP/2, so there is no way to tell a rate limit (403/429)
from an outage. Previews may also lack the `GITHUB_PAT` /
`GITHUB_API_TOKEN` variable, which makes rate limits likelier there.

## Research

## Acceptance criteria

- [ ] Research GitHub REST rate-limit responses and headers
- [ ] Log the status code (and rate-limit reset header when present)
- [ ] Check (without reading values) whether the token variable is set for Preview
- [ ] Unit test for the failure path

## Notes
