---
id: FUR-0020
title: Sync bun.lock automatically when package.json changes
type: ci
status: done
priority: P1
created: 2026-11-05
---

## Problem

Dependency changes can't land: CI installs with `bun install
--frozen-lockfile`, so any change to `package.json` also needs a
regenerated `bun.lock`. The automation environment can't reach the package
registry to regenerate it, and Snyk's PRs (#5 to #8) don't update it
either. That blocks the Next.js security upgrade (FUR-0018) and all other
upgrades (FUR-0004).

## Research

- GitHub Actions runners have registry access, so the lockfile can be
  regenerated there and pushed back to the branch with the job's
  `GITHUB_TOKEN` (`contents: write`).
- GitHub, "Triggering a workflow": events caused by `GITHUB_TOKEN` don't
  start new workflow runs (which prevents loops), except `workflow_dispatch`
  and `repository_dispatch`. So after pushing the lockfile, the job
  dispatches CI explicitly (`actions: write`), and CI gains a
  `workflow_dispatch` trigger.
  https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow
- Bun: `bun install` without `--frozen-lockfile` updates `bun.lock` to
  match `package.json`. https://bun.sh/docs/cli/install

## Acceptance criteria

- [x] `.github/workflows/sync-lockfile.yml`: on push to any branch except
      `main` that changes `package.json`, run `bun install`, commit
      `bun.lock` as furqanagwan if it changed, push, and dispatch CI
- [x] Never runs on `main`; one run per branch at a time
- [x] CI can be dispatched manually (`workflow_dispatch`)
- [x] Comments removed from `ci.yml`
- [ ] Proven end to end by FUR-0018 (the workflow only runs from branches
      that contain it, so it's exercised by the first dependency change
      after this merges)

## Notes

- Risk is low: it only ever writes `bun.lock`, only on non-main branches,
  and only when `package.json` changed.
