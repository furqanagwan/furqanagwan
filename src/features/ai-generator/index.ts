/**
 * AI Blog Post Generator
 *
 * Main orchestration module that ties together:
 * - News fetching
 * - AI content generation
 * - MDX post writing
 */

import { DEFAULT_CONFIG, getRandomTopic, getTopicById } from "./config";
import { fetchNewsWithFallback } from "./news-fetcher";
import { previewPost, writePost } from "./post-writer";
import { createAIProvider } from "./providers";
import type {
    CLIOptions,
    GenerationOptions,
    GenerationResult,
    GeneratorConfig,
    TopicConfig,
} from "./types";

// ============================================================================
// Main Generator Class
// ============================================================================

export class BlogPostGenerator {
    private config: GeneratorConfig;
    private projectRoot: string;

    constructor(config?: Partial<GeneratorConfig>, projectRoot?: string) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.projectRoot = projectRoot || process.cwd();
    }

    /**
     * Generate a blog post for a specific topic
     */
    async generate(
        topic: TopicConfig,
        options: GenerationOptions & { dryRun?: boolean } = {},
    ): Promise<GenerationResult> {
        const startTime = Date.now();

        try {
            console.log(`\n${"=".repeat(60)}`);
            console.log(`AI Blog Post Generator`);
            console.log(`${"=".repeat(60)}\n`);
            console.log(`Topic: ${topic.label} (${topic.category})`);
            console.log(`Provider: ${this.config.ai.type} / ${this.config.ai.model}`);
            console.log(`Dry Run: ${options.dryRun ? "Yes" : "No"}\n`);

            // Step 1: Fetch news
            console.log(`[1/3] Fetching news...`);
            const newsArticles = await fetchNewsWithFallback(
                topic,
                this.config.news.apiKey,
                this.config.news.limit,
            );

            if (newsArticles.length === 0) {
                throw new Error(`No news articles found for topic: ${topic.label}`);
            }
            console.log(`    Found ${newsArticles.length} articles\n`);

            // Step 2: Generate content with AI
            console.log(`[2/3] Generating content with AI...`);
            const provider = await createAIProvider(this.config.ai);
            const post = await provider.generateContent(newsArticles, topic, options);
            console.log(`    Generated: "${post.title}"\n`);

            // Step 3: Write or preview post
            console.log(`[3/3] ${options.dryRun ? "Previewing" : "Writing"} post...`);

            let filePath: string | undefined;

            if (options.dryRun) {
                const preview = previewPost(post, {
                    includeAttribution: this.config.output.includeAttribution,
                    asDraft: this.config.output.asDraft,
                });
                console.log(`\n${"─".repeat(60)}`);
                console.log(`PREVIEW: ${preview.filename}`);
                console.log(`${"─".repeat(60)}\n`);
                console.log(preview.content);
                console.log(`${"─".repeat(60)}\n`);
            } else {
                filePath = writePost(post, this.projectRoot, {
                    directory: this.config.output.directory,
                    includeAttribution: this.config.output.includeAttribution,
                    asDraft: this.config.output.asDraft,
                });
            }

            const duration = ((Date.now() - startTime) / 1000).toFixed(2);
            console.log(`✓ Completed in ${duration}s\n`);

            return {
                success: true,
                post,
                filePath,
                metadata: {
                    provider: this.config.ai.type,
                    model: this.config.ai.model,
                    topic: topic.id,
                    generatedAt: new Date().toISOString(),
                },
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`\n✗ Generation failed: ${message}\n`);

            return {
                success: false,
                error: message,
                metadata: {
                    provider: this.config.ai.type,
                    model: this.config.ai.model,
                    topic: topic.id,
                    generatedAt: new Date().toISOString(),
                },
            };
        }
    }

    /**
     * Generate a post for a random topic
     */
    async generateRandom(options: GenerationOptions & { dryRun?: boolean } = {}): Promise<GenerationResult> {
        const topic = getRandomTopic();
        console.log(`Selected random topic: ${topic.label}`);
        return this.generate(topic, options);
    }
}

// ============================================================================
// CLI Entry Point
// ============================================================================

/**
 * Run the generator from CLI options
 */
export async function runFromCLI(cliOptions: CLIOptions): Promise<GenerationResult> {
    // Build config from environment
    const config: Partial<GeneratorConfig> = {
        ai: {
            type: (process.env.AI_PROVIDER as "openai" | "anthropic" | "gemini") || "openai",
            apiKey: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY || "",
            model: process.env.AI_MODEL || "gpt-4o",
            temperature: 0.7,
            maxTokens: 4000,
        },
        news: {
            type: "newsapi",
            apiKey: process.env.NEWS_API_KEY,
            limit: 5,
        },
    };

    const generator = new BlogPostGenerator(config);

    // Determine topic
    let topic: TopicConfig;
    if (!cliOptions.topic || cliOptions.topic === "random") {
        topic = getRandomTopic();
        console.log(`Randomly selected topic: ${topic.label}`);
    } else {
        const found = getTopicById(cliOptions.topic);
        if (!found) {
            throw new Error(
                `Unknown topic: ${cliOptions.topic}. ` +
                `Use 'random' or one of: technology, web-development, ai-ml, etc.`,
            );
        }
        topic = found;
    }

    return generator.generate(topic, {
        dryRun: cliOptions.dryRun,
        wordCount: 800,
        style: "professional",
    });
}

// ============================================================================
// Re-exports
// ============================================================================

export { DEFAULT_CONFIG, TOPICS, getTopicById, getRandomTopic, getCategories } from "./config";
export { fetchNews, fetchNewsWithFallback } from "./news-fetcher";
export { writePost, previewPost } from "./post-writer";
export { createAIProvider } from "./providers";
export type * from "./types";
