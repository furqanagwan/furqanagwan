# AI Blog Post Generator

Automated blog post generation using AI, based on current news across various topics.

## Features

- 🤖 **Multiple AI Providers**: OpenAI (implemented), Claude and Gemini (ready for future use)
- 📰 **News Integration**: NewsAPI.org with automatic fallback to Google News RSS
- 📝 **18 Topics**: Technology, Health, Career, Finance, Education, and more
- ⏰ **Scheduled Generation**: GitHub Actions workflow runs weekly
- 🔍 **Manual Generation**: CLI script for on-demand post creation
- 📋 **PR-based Review**: Generated posts create PRs for human review

## Quick Start

### 1. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-...
```

### 2. Generate a post (dry run)

```bash
bun run generate:post:dry-run
```

This previews the generated post without writing to disk.

### 3. Generate and save a post

```bash
bun run generate:post --topic=technology
```

This creates an MDX file in `content/posts/`.

## CLI Usage

```bash
# Show help
bun run generate:post:help

# Generate for a random topic (dry run)
bun run generate:post:dry-run

# Generate for a specific topic
bun run generate:post --topic=health

# Generate and save
bun run generate:post --topic=ai-ml
```

## Available Topics

| Category | Topics |
|----------|--------|
| **Technology** | technology, web-development, ai-ml, cybersecurity |
| **Career** | career, productivity, leadership |
| **Health** | health, fitness, mental-health |
| **Education** | university, learning |
| **Finance** | personal-finance, crypto-web3 |
| **Lifestyle** | travel, food |
| **Business** | startups, big-tech |

## Architecture

```
src/features/ai-generator/
├── index.ts              # Main orchestration
├── config.ts             # Topics and configuration
├── types.ts              # TypeScript interfaces
├── news-fetcher.ts       # News API integration
├── post-writer.ts        # MDX file generation
└── providers/
    ├── base.ts           # Provider abstraction
    ├── openai.ts         # OpenAI implementation
    ├── anthropic.ts      # Claude (placeholder)
    └── gemini.ts         # Gemini (placeholder)
```

## Adding a New AI Provider

1. Create a new file in `providers/` (e.g., `custom.ts`)
2. Extend `BaseAIProvider` and implement `generateContent()`
3. Add the provider type to `types.ts`
4. Register in `providers/base.ts` factory function

Example:

```typescript
// providers/custom.ts
import { BaseAIProvider } from "./base";

export class CustomProvider extends BaseAIProvider {
  readonly name = "custom";

  async generateContent(newsArticles, topic, options) {
    // Your implementation here
  }
}
```

## GitHub Actions

The workflow runs automatically every Sunday at 10:00 UTC.

### Manual trigger

1. Go to Actions → "Generate AI Blog Post"
2. Click "Run workflow"
3. Select topic and dry-run options
4. A PR will be created with the generated post

### Required secrets

- `OPENAI_API_KEY`: Your OpenAI API key
- `NEWS_API_KEY`: (Optional) NewsAPI.org key

## Generated Post Format

```mdx
---
title: "AI-Generated Title"
description: "SEO description"
date: "2026-01-30"
tags: ["Topic", "AI-Generated"]
category: "Technology"
featured: false
---

[Generated content...]

---

*This post was created with AI assistance based on current news and trends.*

## Sources

- [Source 1](url)
- [Source 2](url)
```

## Configuration

Edit `src/features/ai-generator/config.ts` to:

- Add/remove topics
- Change default AI model
- Adjust output settings
- Modify generation prompts
