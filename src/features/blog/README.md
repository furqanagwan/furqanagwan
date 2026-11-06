# Blog Feature

## Purpose

Handles blog post listing, filtering, pagination, and individual post rendering.

## Components

- `BlogPageContent`: Client component for the blog listing page (sorting, view toggle, pagination). It takes the `category` and `view` search params as props: `app/blog/page.tsx` reads them on the server and validates them with `parseBlogSearchParams()`, so the list is in the server-rendered HTML.
- `PostHeader`, `PostBody`, `PostFooter`: Components for rendering individual blog post pages.
- `AudioPlayer`, `VideoPlayer`, `ImageGrid`, `ImageSwitcher`: Media components for rich blog content.

## API

- `getFeaturedPost()`: Returns the featured post.
- `getRecentPosts(limit)`: Returns recent posts.
- `getRelatedPosts(slug)`: Returns posts related to a given post.
- `parseBlogSearchParams(searchParams)`: Validates `/blog`'s `category` and `view` search params with Zod; anything invalid becomes `null`.

## Data

Uses `allPosts` from `content-collections`.

## Testing

```bash
bun test src/features/blog
```
