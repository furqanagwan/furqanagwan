---
id: FUR-0017
title: Triage open pull requests
type: chore
status: done
priority: P2
created: 2026-11-05
---

## Problem

Five pull requests had been open for months (oldest January 2026), drifting
further from `main` and collecting conflicts, with no record of whether any
of them could land.

## Research

- GitHub, "Keeping your pull request in sync with the base branch": update
  a PR from its base (merge or rebase; rebase keeps history linear) before
  merging, to surface conflicts and test failures early.
  https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/keeping-your-pull-request-in-sync-with-the-base-branch
- GitHub, "Linking a pull request to an issue": `Closes`/`Fixes`/`Resolves`
  in a PR or commit closes the issue when it is merged into the default
  branch, so tickets close on merge, not before.
  https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue
- Next.js security advisories, July 2026: nine CVEs affect 16.0.0 to
  16.2.10 (four high: SSRF via rewrites/redirects, SSRF in Server Actions,
  middleware bypass, Server Actions DoS); 16.2.11 is the minimum fixed 16.x.
  https://teramont.net/blog/nextjs-9-vulnerabilities-july-2026-16-2-11-15-5-21

## Acceptance criteria

- [x] Every open PR assessed and given a ticket or folded into one
- [x] PR hygiene (sync, merge, close stale) added to the conventions

## Notes

| PR | What | Outcome |
| -- | ---- | ------- |
| #5 | Snyk: next 16.1.1 → 16.1.5 (security) | Superseded: 16.1.5 is still vulnerable to the July 2026 CVEs. Replaced by FUR-0018 (P1). Close #5 once FUR-0018 lands. |
| #6, #7 | Snyk: react, react-dom 19.2.3 → 19.2.4 | Folded into FUR-0004. Can't pass CI as-is: they change `package.json` without regenerating `bun.lock` (CI installs with `--frozen-lockfile`). |
| #8 | Snyk: lucide-react 0.562.0 → 0.563.0 | Folded into FUR-0004, same lockfile problem. |
| #9 | Redesign: OpenAI-style top nav, cards, editorial layout, four blog posts (April 2026) | FUR-0019, owned by Furqan: a design and content decision. It now conflicts with FUR-0001 and FUR-0012 in the header, menus, layout and CSS. |

- Closing PRs needs GitHub API access that the automation doesn't have yet;
  until then they're closed by Furqan or when their commits reach `main`.
