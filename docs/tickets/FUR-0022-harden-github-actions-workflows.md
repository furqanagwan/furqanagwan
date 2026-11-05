---
id: FUR-0022
title: Harden GitHub Actions workflows
type: ci
status: backlog
priority: P2
created: 2026-11-05
---

## Problem

The workflows don't declare least-privilege `permissions` for
`GITHUB_TOKEN` (so they get the repository default), and third-party
actions are referenced by mutable tags (`@v4`, `@v2`, `@v6`) rather than
pinned commits, which is a supply-chain risk.

## Research

## Acceptance criteria

- [ ] Research recorded: GitHub "Security hardening for GitHub Actions"
      (least privilege, pinning actions to full-length commit SHAs)
- [ ] Every workflow declares minimal `permissions` (read-only by default, write only where needed)
- [ ] Third-party actions pinned to full commit SHAs with the version noted in the step name
- [ ] CI/CD, lockfile sync and blog workflow still run

## Notes

- Overlaps with FUR-0009 (Node 20 deprecation): bump to the Node 24 releases while pinning.
