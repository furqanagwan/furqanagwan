---
id: FUR-0022
title: Harden GitHub Actions workflows
type: ci
status: done
priority: P2
created: 2026-11-05
---

## Problem

The workflows don't declare least-privilege `permissions` for
`GITHUB_TOKEN` (so they get the repository default), and third-party
actions are referenced by mutable tags (`@v4`, `@v2`, `@v6`) rather than
pinned commits, which is a supply-chain risk.

## Research

- GitHub's security hardening guidance for Actions ("Using third-party
  actions"): a full-length commit SHA is the only immutable way to
  reference an action; tags can be moved. Grant `GITHUB_TOKEN` the least
  privilege each workflow needs. Summarised with a link to GitHub's guide in:
  https://docs.datadoghq.com/security/code_security/iac_security/iac_rules/cicd-github-unpinned-actions-full-length-commit-sha/
- Each action's own `action.yml` at the chosen release confirms it runs on
  Node 24 (closing FUR-0009). Release notes checked for breaking changes:
  - checkout v5 (Node 24), v6 (credentials stored outside `.git/config`, no
    workflow change), v7 (refuses fork PR checkout under
    `pull_request_target`/`workflow_run`; not used here)
  - cache v5 (Node 24), v6 (internal ESM/dependency update)
  - upload-artifact v6 and v7 run on Node 24 (v5 was still Node 20)
  - create-pull-request v8 (Node 24; v7 renamed `git-token`, not used here)
  - setup-bun v2.2.0 (Node 24)

## Acceptance criteria

- [x] Research recorded
- [x] CI defaults `GITHUB_TOKEN` to `contents: read`; the lockfile and
      blog workflows keep their explicit write scopes
- [x] Every action pinned to a full commit SHA, version in the step name:
      checkout v7.0.1, cache v6.1.0, upload-artifact v7.0.2, setup-bun
      v2.2.0, create-pull-request v8.1.1
- [x] CI/CD runs green on this branch

## Notes

- Overlaps with FUR-0009 (Node 20 deprecation): bump to the Node 24 releases while pinning.
