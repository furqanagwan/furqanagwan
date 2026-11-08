---
id: FUR-0040
title: Keep the desktop sidebar in place while the page scrolls
type: design
status: backlog
priority: P2
created: 2026-11-08
---

## Problem

The desktop sidebar's link list is `position: fixed`, but it scrolls away
with the page. Its ancestors in `LayoutContent.tsx` carry Tailwind's
`translate-x-0` (which sets the CSS `translate` property to `0px`), and any
`translate` other than `none` makes an element the containing block for
fixed-position descendants, so "fixed" behaves like "absolute".

Measured on production HTML and CSS (FUR-0013): at 1280×800 on
/experiences the list starts at 187px; after scrolling 400px it starts at
−213px, i.e. it left the screen with the content.

## Research

- [CSS Transforms Level 2: individual transform properties](https://www.w3.org/TR/css-transforms-2/#individual-transforms)
  and [MDN: position: fixed](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed_positioning):
  a `transform`, `translate`, `scale`, `rotate`, `perspective` or `filter`
  other than none on an ancestor makes it the containing block for fixed
  descendants.
- To do in this ticket: confirm openai.com's sidebar behaviour while
  scrolling and record it here.

## Acceptance criteria

- [ ] Research above completed (openai.com reference checked)
- [ ] Only apply the slide-over translate while the mobile menu is open (or
      use `position: sticky`), so the sidebar stays put on desktop
- [ ] Once it stays put, cap its height at the viewport
      (e.g. `max-h-[min(808px,calc(100dvh-187px))]`) so every link is
      reachable on short landscape screens (Galaxy Z Fold 7 cover landscape
      788×308, Galaxy Z Flip 6 landscape 828×308)
- [ ] The "every sidebar link can be reached" check in
      `tests/foldables.spec.ts` stays green
- [ ] Before/after screenshots

## Notes

- Filed from FUR-0013. Today the bug hides the short-screen problem: because
  the list scrolls with the page, its lower links are still reachable.
