/**
 * AI Generator Types
 *
 * Core type definitions for the AI blog post generator feature.
 * Designed to be provider-agnostic for future extensibility.
 */

// ============================================================================
// Topic Configuration
// ============================================================================

export interface TopicConfig {
    /** Unique identifier for the topic */
    id: string;
    /** Display label */
    label: string;
    /** Category name used in MDX frontmatter */
    category: string;
    /** Keywords for news API queries */
    newsKeywords: string[];
    /** Optional: Custom prompt additions for this topic */
    promptHints?: string;
}

// ============================================================================
// News Types
// ============================================================================

export interface NewsArticle {
    /** Article headline */
    title: string;
    /** Article summary/description */
    description: string;
    /** News source name */
    source: string;
    /** Publication date (ISO string) */
    publishedAt: string;
    /** URL to original article */
    url: string;
    /** Optional: Author name */
    author?: string;
    /** Optional: Image URL */
    imageUrl?: string;
}

export interface NewsFetchResult {
    articles: NewsArticle[];
    topic: string;
    fetchedAt: string;
}

// ============================================================================
// Generated Content Types
// ============================================================================

export interface GeneratedPost {
    /** Blog post title */
    title: string;
    /** SEO-friendly description */
    description: string;
    /** MDX body content */
    content: string;
    /** Tags for the post */
    tags: string[];
    /** Category (matches topic.category) */
    category: string;
    /** Source URLs for attribution */
    sources: Array<{
        title: string;
        url: string;
    }>;
    /** Suggested slug for the file */
    slug: string;
}

export interface GenerationResult {
    success: boolean;
    post?: GeneratedPost;
    filePath?: string;
    error?: string;
    metadata: {
        provider: string;
        model: string;
        topic: string;
        generatedAt: string;
        tokensUsed?: number;
    };
}

// ============================================================================
// AI Provider Types (Extensible Pattern)
// ============================================================================

export type AIProviderType = "openai" | "anthropic" | "gemini";

export interface AIProviderConfig {
    type: AIProviderType;
    apiKey: string;
    model: string;
    /** Temperature for generation (0-1) */
    temperature?: number;
    /** Max tokens for response */
    maxTokens?: number;
}

export interface AIProvider {
    /** Provider identifier */
    readonly name: AIProviderType;

    /** Generate blog post content from news context */
    generateContent(
        newsArticles: NewsArticle[],
        topic: TopicConfig,
        options?: GenerationOptions,
    ): Promise<GeneratedPost>;
}

export interface GenerationOptions {
    /** Target word count */
    wordCount?: number;
    /** Writing style hints */
    style?: "professional" | "casual" | "technical" | "educational";
    /** Include code examples where relevant */
    includeCodeExamples?: boolean;
    /** Additional custom instructions */
    customInstructions?: string;
}

// ============================================================================
// News Provider Types
// ============================================================================

export type NewsProviderType = "newsapi" | "gnews" | "rss";

export interface NewsProviderConfig {
    type: NewsProviderType;
    apiKey?: string;
    /** Number of articles to fetch */
    limit?: number;
}

export interface NewsProvider {
    readonly name: NewsProviderType;
    fetchNews(topic: TopicConfig): Promise<NewsArticle[]>;
}

// ============================================================================
// Generator Configuration
// ============================================================================

export interface GeneratorConfig {
    /** AI provider configuration */
    ai: AIProviderConfig;
    /** News provider configuration */
    news: NewsProviderConfig;
    /** Available topics */
    topics: TopicConfig[];
    /** Schedule configuration */
    schedule: {
        frequency: "daily" | "weekly" | "fortnightly";
        randomizeDay: boolean;
    };
    /** Output configuration */
    output: {
        /** Directory for generated posts */
        directory: string;
        /** Mark as draft (featured: false) */
        asDraft: boolean;
        /** Add AI attribution notice */
        includeAttribution: boolean;
    };
}

// ============================================================================
// CLI Options
// ============================================================================

export interface CLIOptions {
    /** Specific topic to generate for (or "random") */
    topic?: string;
    /** Preview without writing file */
    dryRun?: boolean;
    /** Verbose logging */
    verbose?: boolean;
    /** Custom output path */
    output?: string;
}
