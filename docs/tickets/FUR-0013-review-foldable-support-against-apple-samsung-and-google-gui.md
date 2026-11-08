---
id: FUR-0013
title: Review foldable support against Apple, Samsung and Google guidance
type: design
status: done
priority: P2
created: 2026-11-05
---

## Problem

FUR-0001 added iPhone Duo support based on WebKit's Safari 27.1 notes, but
wasn't checked against Apple's Human Interface Guidelines for iPhone Duo,
nor against Samsung (Galaxy Z Fold, One UI) and Google (Android large
screens and foldables, Chrome's Device Posture / Viewport Segments) guidance.

## Research

- **Apple / WebKit** — [WebKit Features for Safari 27.1](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/):
  iPhone Duo Safari viewports range 382–951px wide and 368–902px tall
  (outer 382×580 / 594×368, inner 669×867 / 951×585, split view 385×571).
  Use responsive layouts and feature detection, not UA sniffing. Device
  Posture (`device-posture: folded | continuous`) and Viewport Segments
  (`horizontal-viewport-segments`, `env(viewport-segment-*)`) are a
  developer preview behind feature flags. Content does not extend under
  the outer display's side controls; Apple mentions `viewport-fit=cover` +
  `env(safe-area-inset-*)` but makes no recommendation yet. The HIG has no
  web-specific foldable guidance beyond this.
- **Google / Android** — [Use window size classes](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes):
  width compact < 600dp, medium 600–840dp, expanded ≥ 840dp; height compact
  < 480dp. Size classes follow the window, not the device; open flippables
  in landscape are medium width but compact height, so two-pane layouts are
  impractical there. Test compact, medium and expanded.
  [Chrome: Origin trial for Foldable APIs](https://developer.chrome.com/blog/foldable-apis-ot):
  the same two APIs, Chrome 125–128 origin trial only.
- **Samsung** — [One UI: Designing for foldables](https://developer.samsung.com/one-ui/largescreen-and-foldable/designing_for_foldable.html):
  support cover and main screens at any size and aspect ratio including
  landscape, keep scroll position on screen switch, no letterboxing; in Flex
  mode keep interactive elements away from the crease.
- **Specs** — [MDN: horizontal-viewport-segments](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/horizontal-viewport-segments)
  (Media Queries 5; limited availability, not Baseline).
- **Accessibility** — [WCAG 2.2 Understanding 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow):
  content must work without two-dimensional scrolling at 320 CSS px wide,
  and at 256 CSS px tall for horizontally scrolling content.
  [WCAG F94](https://www.w3.org/WAI/WCAG21/Techniques/failures/F94): text
  sized only in viewport units fails Resize Text, so fluid sizes need rem
  terms. [Tailwind CSS font-size](https://tailwindcss.com/docs/font-size):
  custom sizes are `--text-*` theme variables with an optional
  `--text-*--line-height`.
- **Real foldable viewports** — Playwright's device registry: Galaxy Z Fold 7
  cover 360×764 and landscape 788×308, inner 984×1016; Galaxy Z Flip 6 cover
  360×298 and 322×308; Flip 6 landscape 828×308; Flip 7 cover 474×448.

## Gaps found

Measured by rendering production's HTML and CSS (deployment for 331f225)
in Chromium at every viewport above:

1. **Mobile menu Contact button covers menu items on short screens.** It
   was `position: absolute; bottom: 1.5rem` inside the scrolling menu, so on
   iPhone Duo outer landscape (594×368) it sat at 304–344px over Blog
   (287–318px), and on a Galaxy Z Flip cover (360×298) at 234–274px over
   Experiences/About. **Fixed here.**
2. **Page titles overflow below ~330px.** Layouts were only promised from
   382px, but Galaxy Z Flip covers are 322px and WCAG reflow requires 320px.
   The new E2E check found the 48px page titles ("Documenting",
   "engineering", "Qualifications") 5–8px wider than the screen at 320 and
   322px on / and /qualifications. Mobile page titles now use a
   `text-page-title` size, `clamp(2rem, 0.75rem + 8vw, 3rem)`: 37.6px at
   320px, 42.6px at 382px, the old 48px from 450px up; desktop (`md:`) sizes
   are unchanged. The rem terms keep it zoomable (WCAG F94). **Fixed here.**
3. **Desktop sidebar is "fixed" but scrolls with the page** (an ancestor's
   `translate` makes it the containing block). Filed as **FUR-0040**, which
   must also cap its height so it works at 788×308.
4. **Fold-aware APIs are flagged in every browser**, so the existing
   `.fold-avoid` rule never applies yet. Filed as **FUR-0039** (blocked).
5. Safe areas: the site already uses `viewport-fit=cover` with
   `env(safe-area-inset-*)`; Apple has no recommendation to change to yet.
   No action.

## Acceptance criteria

- [x] Research section summarises each source's guidance for web content,
      with links: Apple HIG (iPhone Duo / foldable layouts), WebKit,
      Samsung foldable guidance, Google Android large-screen and foldable
      guidance, MDN/W3C Device Posture and Viewport Segments specs
- [x] Gaps between that guidance and the current site listed
- [x] Each gap fixed here or filed as its own ticket
- [x] Before/after screenshots for any visual change

## Notes

- Mobile menu is now a flex column; the Contact button sits in normal flow
  with `mt-auto`, so it stays at the bottom on tall screens (unchanged
  position at 382×580 and 360×764) and below the last item on short ones.
- `tests/foldables.spec.ts` adds the WCAG 320×256 and Samsung Galaxy Z
  viewports, a check that the menu's Contact button never covers an item,
  and a check that every desktop sidebar link can be reached at 788×308
  and 828×308.
- AGENTS.md rule 8 now says 320px wide and 256px tall.
