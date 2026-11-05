---
id: FUR-0021
title: Harden security headers
type: bug
status: done
priority: P2
created: 2026-11-05
---

## Problem

`next.config.ts` sends a Content-Security-Policy with `'unsafe-eval'` in
`script-src` (not needed by a production Next.js build), the deprecated
`X-XSS-Protection: 1; mode=block` header (removed from modern browsers and
able to introduce issues in old ones), and allows `https://api.github.com`
in `connect-src` although GitHub repos are fetched on the server.

## Research

- Next.js, "How to set a Content Security Policy": `'unsafe-eval'` is only
  needed in development (React uses eval for debugging); "Neither React nor
  Next.js use eval in production by default". For apps without nonces the
  recommended static policy is `default-src 'self'; script-src 'self'
  'unsafe-inline'` (+ `'unsafe-eval'` in dev only); `object-src 'none'`;
  `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`;
  `upgrade-insecure-requests`. Nonces would remove `'unsafe-inline'` but
  force every page to render dynamically (no static/CDN caching), which
  isn't worth it for a static personal site.
  https://nextjs.org/docs/app/guides/content-security-policy
- MDN, X-XSS-Protection: deprecated and non-standard; can create XSS
  issues; don't use it in new projects, use CSP instead.
  https://developer.mozilla.org/Web/HTTP/Headers/X-XSS-Protection

## Acceptance criteria

- [x] Research recorded
- [x] `'unsafe-eval'` only in development `script-src`
- [x] `X-XSS-Protection` removed
- [x] `connect-src` limited to what the browser calls (GitHub is fetched on the server only)
- [x] `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests` added
- [x] E2E test fails on any CSP violation on the main pages and checks the headers

## Notes

- `GITHUB_API_BASE` in `src/features/projects/constants.ts` is unused;
  left for a code-tidy ticket.
