---
id: FUR-0045
title: Upload the CI build output, or stop trying to
type: ci
status: backlog
priority: P3
created: 2026-11-11
---

## Problem

The Build job's "Upload build artifacts" step uploads `.next/`, but every
run logs `No files were found with the provided path: .next/. No artifacts
will be uploaded.` (seen on runs for a598a4b). Nothing downloads the
`build-output` artifact, so the step only adds time and a warning.

## Research

To confirm before implementing: actions/upload-artifact stopped uploading
hidden files and directories (names starting with `.`) by default in
v4.4.0, behind an `include-hidden-files` input
([releases](https://github.com/actions/upload-artifact/releases),
[README](https://github.com/actions/upload-artifact#readme)). `.next/` is a
hidden directory.

## Acceptance criteria

- [ ] Research recorded
- [ ] Either remove the unused upload step, or keep it with
      `include-hidden-files: true` and a reason (e.g. E2E reuses the build)
- [ ] CI log has no "No files were found" warning

## Notes
