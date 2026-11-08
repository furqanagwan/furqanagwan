---
id: FUR-0039
title: Use Device Posture and Viewport Segments once they ship unflagged
type: feature
status: blocked
priority: P3
created: 2026-11-08
blocked-by: Safari and Chrome shipping the APIs without flags
---

## Problem

FUR-0013 found that the only fold-aware code on the site is the
`horizontal-viewport-segments: 2` rule that keeps blog text on one side of
the crease. Safari 27.1 ships the Device Posture and Viewport Segments APIs
only behind feature flags, and Chrome's last public status is a 2024 origin
trial, so no visitor gets that rule today and nothing can be verified on a
real device.

## Research

- [WebKit Features for Safari 27.1](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/):
  `@media (device-posture: folded)`, `navigator.devicePosture`,
  `horizontal-viewport-segments` / `vertical-viewport-segments`,
  `env(viewport-segment-*)` and `window.viewport.segments` are a developer
  preview behind flags.
- [Chrome: Origin trial for Foldable APIs](https://developer.chrome.com/blog/foldable-apis-ot):
  Chrome 125–128 origin trial; JS shape was still undecided
  (`window.visualViewport.segments` there vs `window.viewport.segments` in WebKit).
- [MDN: horizontal-viewport-segments](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/horizontal-viewport-segments):
  limited availability, not Baseline.

## Acceptance criteria

- [ ] Re-check browser status (MDN compat data, WebKit and Chrome release notes)
- [ ] Once shipped: verify the existing `.fold-avoid` rule on a device or emulator
- [ ] Consider a `vertical-viewport-segments: 2` (laptop / Flex mode) layout
      that keeps controls off the crease, per Samsung's Flex mode guidance

## Notes

- Filed from FUR-0013.
