# Blog Feature

## Purpose

Handles blog post listing, filtering, pagination, and individual post rendering.

## Components

- `BlogPageContent`: Main client component for the blog listing page (filtering, sorting, pagination).
- `PostHeader`, `PostBody`, `PostFooter`: Components for rendering individual blog post pages.
- `AudioPlayer`, `VideoPlayer`, `ImageGrid`, `ImageSwitcher`: Media components for rich blog content.

## API

- `getFeaturedPost()`: Returns the featured post.
- `getRecentPosts(limit)`: Returns recent posts.
- `getRelatedPosts(slug)`: Returns posts related to a given post.

## Data

Uses `allPosts` from `content-collections`.

## Testing

```bash
bun test src/features/blog
```
