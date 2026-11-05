
import type {
    AIProviderType,
    GeneratedPost,
    GenerationOptions,
    NewsArticle,
    TopicConfig,
} from "../types";
import { BaseAIProvider } from "./base";

export class AnthropicProvider extends BaseAIProvider {
    readonly name: AIProviderType = "anthropic";

    constructor(config: { apiKey: string; model?: string; temperature?: number; maxTokens?: number }) {
        super({ ...config, type: "anthropic", model: config.model || "claude-3-5-sonnet-20241022" });
    }

    async generateContent(
        newsArticles: NewsArticle[],
        topic: TopicConfig,
        options?: GenerationOptions,
    ): Promise<GeneratedPost> {

        throw new Error(
            "Anthropic provider not yet implemented. " +
            "To use Claude, install @anthropic-ai/sdk and implement this provider.",
        );
    }
}
