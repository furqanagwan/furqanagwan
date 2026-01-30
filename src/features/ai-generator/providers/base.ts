/**
 * AI Provider Base
 *
 * Abstract base class and factory for AI providers.
 * Designed for easy extension to support multiple AI providers.
 */

import type {
    AIProvider,
    AIProviderConfig,
    AIProviderType,
    GeneratedPost,
    GenerationOptions,
    NewsArticle,
    TopicConfig,
} from "../types";

// ============================================================================
// Provider Factory
// ============================================================================

/**
 * Create an AI provider instance based on configuration
 */
export async function createAIProvider(
    config: AIProviderConfig,
): Promise<AIProvider> {
    switch (config.type) {
        case "openai":
            const { OpenAIProvider } = await import("./openai");
            return new OpenAIProvider(config);

        case "anthropic":
            const { AnthropicProvider } = await import("./anthropic");
            return new AnthropicProvider(config);

        case "gemini":
            const { GeminiProvider } = await import("./gemini");
            return new GeminiProvider(config);

        default:
            throw new Error(`Unsupported AI provider: ${config.type}`);
    }
}

// ============================================================================
// Base Provider Implementation
// ============================================================================

export abstract class BaseAIProvider implements AIProvider {
    abstract readonly name: AIProviderType;
    protected config: AIProviderConfig;

    constructor(config: AIProviderConfig) {
        this.config = config;
        this.validateConfig();
    }

    protected validateConfig(): void {
        if (!this.config.apiKey) {
            throw new Error(
                `API key is required for ${this.config.type} provider. ` +
                `Set the ${this.getEnvVarName()} environment variable.`,
            );
        }
    }

    protected getEnvVarName(): string {
        const envVars: Record<AIProviderType, string> = {
            openai: "OPENAI_API_KEY",
            anthropic: "ANTHROPIC_API_KEY",
            gemini: "GEMINI_API_KEY",
        };
        return envVars[this.config.type];
    }

    /**
     * Build the system prompt for blog generation
     */
    protected buildSystemPrompt(topic: TopicConfig): string {
        return `You are an expert blog writer creating content for a personal portfolio/blog website.

WRITING STYLE:
- Professional yet accessible
- Developer-focused when relevant
- Actionable and practical
- Well-structured with clear headings
- Engaging and informative

TARGET AUDIENCE:
- Software developers and tech professionals
- People interested in ${topic.label}
- Those seeking practical advice and insights

OUTPUT FORMAT:
You must respond with a valid JSON object containing:
{
  "title": "Compelling, SEO-friendly title",
  "description": "1-2 sentence summary for meta description (max 160 chars)",
  "content": "Full blog post content in Markdown format",
  "tags": ["Tag1", "Tag2", "Tag3"] (3-5 relevant tags)
}

CONTENT GUIDELINES:
- Write in Markdown format
- Use ## for main headings, ### for subheadings
- Include bullet points and lists where appropriate
- Keep paragraphs concise (3-4 sentences max)
- Add practical takeaways and actionable advice
${topic.promptHints ? `- ${topic.promptHints}` : ""}

IMPORTANT:
- Create ORIGINAL content synthesizing the news, not just summarizing
- Add your own insights and analysis
- Make it valuable for readers, not just a news recap
- Do NOT use the exact headlines from the sources`;
    }

    /**
     * Build the user prompt with news context
     */
    protected buildUserPrompt(
        newsArticles: NewsArticle[],
        topic: TopicConfig,
        options?: GenerationOptions,
    ): string {
        const wordCount = options?.wordCount || 800;
        const style = options?.style || "professional";

        const newsContext = newsArticles
            .map(
                (article, i) =>
                    `[Article ${i + 1}]
Title: ${article.title}
Source: ${article.source}
Summary: ${article.description}
Published: ${article.publishedAt}`,
            )
            .join("\n\n");

        return `Based on the following recent news about ${topic.label}, write an original blog post.

NEWS CONTEXT:
${newsContext}

REQUIREMENTS:
- Target length: approximately ${wordCount} words
- Writing style: ${style}
- Category: ${topic.category}
${options?.includeCodeExamples ? "- Include relevant code examples where appropriate" : ""}
${options?.customInstructions ? `- Additional instructions: ${options.customInstructions}` : ""}

Synthesize these news items into an engaging, original blog post that provides value to readers.
Remember to respond with valid JSON only.`;
    }

    /**
     * Parse the AI response into a GeneratedPost
     */
    protected parseResponse(
        response: string,
        topic: TopicConfig,
        sources: NewsArticle[],
    ): GeneratedPost {
        // Try to extract JSON from the response
        let parsed: { title: string; description: string; content: string; tags: string[] };

        try {
            // Handle case where response might be wrapped in markdown code blocks
            const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) ||
                response.match(/```\s*([\s\S]*?)\s*```/);
            const jsonStr = jsonMatch ? jsonMatch[1]! : response;
            parsed = JSON.parse(jsonStr.trim());
        } catch {
            throw new Error(`Failed to parse AI response as JSON: ${response.substring(0, 200)}...`);
        }

        // Validate required fields
        if (!parsed.title || !parsed.content) {
            throw new Error("AI response missing required fields (title, content)");
        }

        // Generate a slug from the title
        const slug = this.generateSlug(parsed.title, topic.id);

        return {
            title: parsed.title,
            description: parsed.description || "",
            content: parsed.content,
            tags: parsed.tags || [topic.label],
            category: topic.category,
            sources: sources.map((s) => ({ title: s.title, url: s.url })),
            slug,
        };
    }

    /**
     * Generate a URL-safe slug
     */
    protected generateSlug(title: string, topicId: string): string {
        const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const titleSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
            .substring(0, 50);

        return `ai-${topicId}-${titleSlug}-${date}`;
    }

    /**
     * Main generation method - must be implemented by each provider
     */
    abstract generateContent(
        newsArticles: NewsArticle[],
        topic: TopicConfig,
        options?: GenerationOptions,
    ): Promise<GeneratedPost>;
}
