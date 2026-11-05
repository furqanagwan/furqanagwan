# Tickets

Every piece of work on this site has a ticket. Tickets live here as one
Markdown file each, so they're versioned with the code and readable by both
people and AI agents.

## IDs

- Format: `FUR-` + a four-digit, zero-padded number: `FUR-0001`, `FUR-0002`, …
- IDs only ever increase and are never reused, even if a ticket is dropped.
- The next ID is the highest existing number + 1. Let the script work it out:

  ```sh
  bun run ticket:new --title "Fix footer links" --type bug --priority P2
  bun run ticket:list                    # everything
  bun run ticket:list --status backlog   # one status
  ```

- File name: `FUR-0001-short-slug.md` (the script does this for you).

## Fields (frontmatter)

| Field      | Values                                                            |
| ---------- | ----------------------------------------------------------------- |
| `id`       | `FUR-0001`                                                        |
| `title`    | Short, imperative: "Fix footer links"                             |
| `type`     | `bug` `feature` `chore` `ci` `docs` `design` `a11y` `perf`        |
| `status`   | `backlog` → `in-progress` → `done`; or `blocked`, `wont-do`        |
| `priority` | `P1` (urgent/broken) · `P2` (should do soon) · `P3` (nice to have) |
| `created`  | `YYYY-MM-DD`                                                      |

Optional: `owner` (who must act, e.g. when a ticket needs Furqan) and
`blocked-by` (what it's waiting on).

Body sections: **Problem**, **Research** (what the official guidance says,
with links), **Acceptance criteria** (checkboxes), **Notes** (findings,
decisions, and links to commits, PRs and CI runs).

## Working on a ticket

1. Research before implementing, on every ticket. Find the correct way to do
   it from primary sources and record it under **Research** with links:
   - Platform and device guidance: Apple Human Interface Guidelines and
     WebKit docs for iPhone (including iPhone Duo); Samsung's Galaxy Z Fold
     and One UI guidance and Google's Android large-screen and foldable
     guidance for other foldables
   - Web standards and browsers: MDN, W3C/WHATWG specs, web.dev
   - The framework or tool's own docs (Next.js, React, Tailwind, Playwright,
     GitHub Actions, Vercel) for the version this project uses
   - Accessibility: WCAG and WAI-ARIA Authoring Practices
   - Design: openai.com is the site's visual reference
2. Set `status: in-progress`.
3. Branch: the ticket ID in capitals and nothing else: `FUR-0006`.
   One ticket, one branch.
4. Commits start with the ticket ID: `FUR-0006: remove the dead Log In button`.
   The author and committer is `furqanagwan <furqanagwan@outlook.com>` only:
   no co-author trailers or tool signatures in commits, PRs or files.
5. Merge by squashing: each ticket lands on `main` as exactly one commit,
   titled `FUR-0006: <title>`, whose message is the PR description and ends
   with `Closes FUR-0006`.
6. The ticket closes on merge, never before: the squashed commit that lands
   on `main` is the one that ticks the acceptance criteria, sets
   `status: done` and adds the verification notes. If production
   verification then fails, the revert reopens it.

## Pull requests

- Check open PRs regularly; keep the number of open and stale PRs low.
- Keep each PR current with `main` by rebasing it, so conflicts surface
  early and the final merge is a fast-forward.
- Merge a PR as soon as it is green, verified and in scope; don't let
  finished work wait.
- Every PR maps to a ticket. A PR that is superseded, out of date beyond
  saving, or can't pass CI as written is folded into a ticket and closed
  with a note pointing at it.
- PRs that change the design or add content need Furqan's decision; give
  them a ticket owned by him rather than merging or closing them.

## PR description (and squashed commit message)

Detailed enough that someone who wasn't there understands the change:

```
FUR-0006: Remove dead Log In button from mobile menu

Summary      One or two sentences on what changed.
Why          The problem, and who it affected.
Research     What the guidance says, with links.
What changed Bullet list of the actual changes, file by file where useful.
Screenshots  UI changes: before and after (mobile and desktop, light and
             dark where relevant).
Verification CI run, preview URL, pages checked, production check.
Risks        Anything that could go wrong, and how to roll back.
```

Found something new while working? Open a new ticket for it rather than
widening the current one.
