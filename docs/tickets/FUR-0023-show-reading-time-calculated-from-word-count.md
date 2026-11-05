---
id: FUR-0023
title: Show reading time calculated from word count
type: feature
status: backlog
priority: P3
created: 2026-11-05
---

## Problem

Taken from the closed redesign PR #9 (FUR-0019): post reading time should
be calculated from each post's word count in `content-collections.ts`
rather than written by hand.

## Research

## Acceptance criteria

- [ ] Research recorded (common words-per-minute basis; how openai.com shows read time, if at all)
- [ ] `readTime` derived from the MDX body word count; manual values removed
- [ ] Unit tests for the calculation

## Notes
