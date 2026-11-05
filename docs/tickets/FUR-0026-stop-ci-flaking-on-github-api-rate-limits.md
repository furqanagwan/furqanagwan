---
id: FUR-0026
title: Stop CI flaking on GitHub API rate limits
type: ci
status: done
priority: P1
created: 2026-11-05
---

## Problem

CI/CD went red on main for the FUR-0021 commit, which had passed on its
branch minutes earlier. Two Projects E2E tests found no projects because
the dev server's call to GitHub failed: "Failed to fetch GitHub repos: rate
limit exceeded". The call was unauthenticated, so CI runners (shared IPs)
can hit GitHub's anonymous limit at any time.

The fetch also had a latent privacy risk: when `GITHUB_PAT` is set it
called `/user/repos?affiliation=owner`, which includes private
repositories, and would publish their names on the Projects page. (The
live page currently shows only the six public repos.)

## Research

- GitHub, "Rate limits for the REST API": unauthenticated requests get 60
  per hour, tied to the originating IP; a personal access token gets 5,000
  per hour; `GITHUB_TOKEN` in Actions gets 1,000 per hour per repository.
  https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

## Acceptance criteria

- [x] CI's E2E job passes the Actions `GITHUB_TOKEN` to the app as `GITHUB_API_TOKEN`
- [x] The app authenticates with `GITHUB_PAT` or `GITHUB_API_TOKEN` when present
- [x] The app always uses the public endpoint `/users/{username}/repos`, so
      a token raises the rate limit but can never expose private repositories
- [x] CI/CD green on the branch and on main

## Notes

- Decision: the Projects page shows public repositories only.
