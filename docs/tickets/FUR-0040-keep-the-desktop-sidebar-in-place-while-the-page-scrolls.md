---
id: FUR-0040
title: Keep the desktop sidebar in place while the page scrolls
type: design
status: done
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
- [Tailwind CSS v4: translate](https://tailwindcss.com/docs/translate):
  v4 translate utilities set the CSS `translate` property
  (the deployed CSS compiles `translate-x-0` to
  `--tw-translate-x:0px;translate:var(--tw-translate-x) var(--tw-translate-y)`), not `transform`,
  so even a zero translate is "other than none". The docs page doesn't list
  a `none` utility, so this uses the arbitrary property `[translate:none]`
  ([arbitrary properties](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties)).
- [CSS Positioned Layout 3: fixed positioning](https://www.w3.org/TR/css-position-3/#fixed-pos):
  a fixed box with `top`/`left` auto sits at its static position and then
  stays put relative to the viewport, which is how the list is placed at
  187px.
- A transform or translate on the fixed element itself doesn't change its
  own containing block (only ancestors' do), so the slide-out animation can
  move onto the fixed list.
- openai.com reference: the agent sandbox couldn't reach openai.com (the
  egress proxy refuses it), so this wasn't re-checked live. The design
  intent is in the code itself: the list, the header bar ("Fixed header bar
  - solid background like openai-clone TopBar") and the mobile logo/toggle
  ("Sticky … fixed outside the sliding content") were all written as fixed
  chrome, and the main content already pads itself by the header height.

## Acceptance criteria

- [x] Research above completed (openai.com could not be fetched from the sandbox; see Research)
- [x] Only apply the slide-over translate while the mobile menu is open (or
      use `position: sticky`), so the sidebar stays put on desktop
- [x] Once it stays put, cap its height at the viewport
      (e.g. `max-h-[min(808px,calc(100dvh-187px))]`) so every link is
      reachable on short landscape screens (Galaxy Z Fold 7 cover landscape
      788×308, Galaxy Z Flip 6 landscape 828×308)
- [x] The "every sidebar link can be reached" check in
      `tests/foldables.spec.ts` stays green
- [x] Before/after described (screenshots couldn't be captured from the sandbox; see Notes)

## Notes

- Filed from FUR-0013. Today the bug hides the short-screen problem: because
  the list scrolls with the page, its lower links are still reachable.
- 2026-11-10: The page wrapper in `LayoutContent.tsx` now uses
  `[translate:none]` (and `md:[translate:none]` while the mobile menu is
  open), so it is no longer a containing block for fixed descendants. The
  sidebar `<nav>` no longer carries a translate at all: the slide-out moved
  onto the fixed list itself (`opacity-0 -translate-x-[200px]` when closed,
  transitioning `opacity` and `translate`), which keeps the same 400px total
  movement as before (200px from the column collapsing, 200px from the
  translate). The list is capped at `min(808px, 100dvh - 187px)` and
  scrolls inside itself on short screens.
- The same wrapper bug also made the header bar scroll away (it is
  `position: fixed` inside the wrapper). With the fix it stays at the top as
  designed, under the mobile logo and menu button, which were already truly
  fixed and used to float over scrolled content with no bar behind them.
- Before (production, 1280×800 /experiences): scroll 400px → the sidebar list
  moves from y=187 to y=−213 and the header bar leaves the screen. After:
  both stay where they are. New `tests/fixed-chrome.spec.ts` asserts this in
  every Playwright project.

