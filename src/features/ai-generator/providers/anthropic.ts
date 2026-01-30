/**
 * Anthropic (Claude) Provider
 *
 * Placeholder implementation for future Claude API support.
 * Structure is in place for easy implementation.
 */

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
        // TODO: Implement Anthropic API integration
        // Install: bun add @anthropic-ai/sdk
        //
        // Example implementation:
        // import Anthropic from "@anthropic-ai/sdk";
        // const client = new Anthropic({ apiKey: this.config.apiKey });
        // const response = await client.messages.create({
        //   model: this.config.model,
        //   max_tokens: this.config.maxTokens ?? 4000,
        //   system: this.buildSystemPrompt(topic),
        //   messages: [{ role: "user", content: this.buildUserPrompt(newsArticles, topic, options) }],
        // });

        throw new Error(
            "Anthropic provider not yet implemented. " +
            "To use Claude, install @anthropic-ai/sdk and implement this provider.",
        );
    }
}
