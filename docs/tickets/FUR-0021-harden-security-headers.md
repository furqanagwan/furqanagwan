---
id: FUR-0021
title: Harden security headers
type: bug
status: backlog
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

## Acceptance criteria

- [ ] Research recorded: Next.js CSP guide, MDN on CSP, X-XSS-Protection
      and Permissions-Policy, OWASP Secure Headers
- [ ] `'unsafe-eval'` removed from production `script-src` (kept for dev only if Next needs it)
- [ ] `X-XSS-Protection` removed or set as MDN/OWASP recommend
- [ ] `connect-src` limited to what the browser actually calls
- [ ] Every page loads with no CSP violations in the console; analytics and speed insights still report

## Notes
