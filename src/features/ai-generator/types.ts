

export interface TopicConfig {
    id: string;
    label: string;
    category: string;
    newsKeywords: string[];
    promptHints?: string;
}

export interface NewsArticle {
    title: string;
    description: string;
    source: string;
    publishedAt: string;
    url: string;
    author?: string;
    imageUrl?: string;
}

export interface NewsFetchResult {
    articles: NewsArticle[];
    topic: string;
    fetchedAt: string;
}

export interface GeneratedPost {
    title: string;
    description: string;
    content: string;
    tags: string[];
    category: string;
    sources: Array<{
        title: string;
        url: string;
    }>;
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

export type AIProviderType = "openai" | "anthropic" | "gemini";

export interface AIProviderConfig {
    type: AIProviderType;
    apiKey: string;
    model: string;
    temperature?: number;
    maxTokens?: number;
}

export interface AIProvider {
    readonly name: AIProviderType;

    generateContent(
        newsArticles: NewsArticle[],
        topic: TopicConfig,
        options?: GenerationOptions,
    ): Promise<GeneratedPost>;
}

export interface GenerationOptions {
    wordCount?: number;
    style?: "professional" | "casual" | "technical" | "educational";
    includeCodeExamples?: boolean;
    customInstructions?: string;
}

export type NewsProviderType = "newsapi" | "gnews" | "rss";

export interface NewsProviderConfig {
    type: NewsProviderType;
    apiKey?: string;
    limit?: number;
}

export interface NewsProvider {
    readonly name: NewsProviderType;
    fetchNews(topic: TopicConfig): Promise<NewsArticle[]>;
}

export interface GeneratorConfig {
    ai: AIProviderConfig;
    news: NewsProviderConfig;
    topics: TopicConfig[];
    schedule: {
        frequency: "daily" | "weekly" | "fortnightly";
        randomizeDay: boolean;
    };
    output: {
        directory: string;
        asDraft: boolean;
        includeAttribution: boolean;
    };
}

export interface CLIOptions {
    topic?: string;
    dryRun?: boolean;
    verbose?: boolean;
    output?: string;
}
