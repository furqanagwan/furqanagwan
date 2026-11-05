---
id: FUR-0018
title: Upgrade Next.js to a patched release
type: bug
status: done
priority: P1
created: 2026-11-05
---

## Problem

The site runs Next.js 16.1.1, which no longer receives security fixes and
is affected by every Next.js security release since July 2026, including
two critical remote-code-execution issues (October 2026) and four high
severity issues from July (SSRF via rewrites/redirects and Server Actions,
middleware bypass, Server Actions DoS). Snyk PR #5 only goes to 16.1.5,
which is still affected.

## Research

- Next.js security programme (July 2026): scheduled monthly security
  releases, patches published for the active LTS lines only (16.x latest
  minor and 15.5), so 16.1 gets no fixes.
  https://nextjs.org/blog/next-security-release-program
- Next.js security advisories index: July, August, September (x2),
  October and November 2026 releases. https://nextjs.org/blog/security
- October 14, 2026 (16.4.1): critical RCE in `use cache` returning typed
  arrays (React GHSA-xqc2-xf4c-x3h3), critical RCE via SVG in Image
  Optimization (`sharp` < 0.35.5, CVE-2026-96889), high-severity Server
  Actions DoS. Upgrading `next` brings the fixed React server code and
  `sharp` version with it.
  https://nextjs.org/blog/nextjs-security-update-october-14-2026
- November 3, 2026 (16.4.5, latest): one high and six medium issues
  (cache disclosure with Cache Components, cookie exposure in Edge routes,
  SVG rejection bypass in Image Optimization, among others).
  https://nextjs.org/blog/november-2026-security-release
- `eslint-config-next` is released in lockstep with `next`. Its newer
  `react-hooks` rules include `set-state-in-effect`, which flags calling
  setState synchronously in an effect (an extra render pass).
  https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
- React, "You Might Not Need an Effect": to adjust some state when a value
  changes, compare it with the previous value during render instead of
  using an effect. https://react.dev/learn/you-might-not-need-an-effect

## Acceptance criteria

- [x] `next` and `eslint-config-next` at 16.4.5 (latest patched 16.x)
- [x] `bun.lock` regenerated (by the FUR-0020 workflow) and CI green: lint, unit, build, E2E
- [x] Preview checked page by page before merge; production checked after
- [x] Snyk PR #5 superseded (to be closed)

## Notes

- First real use of FUR-0020: the workflow regenerated `bun.lock` on this
  branch and dispatched CI.
- The new lint rules flagged two effects in `BlogPageContent.tsx` that set
  state synchronously; both now adjust state during render as React
  recommends (no behaviour change).
