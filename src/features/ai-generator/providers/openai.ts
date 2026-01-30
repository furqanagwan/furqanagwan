/**
 * OpenAI Provider
 *
 * Implementation of the AI provider interface for OpenAI's GPT models.
 */

import OpenAI from "openai";
import type {
    AIProviderType,
    GeneratedPost,
    GenerationOptions,
    NewsArticle,
    TopicConfig,
} from "../types";
import { BaseAIProvider } from "./base";

export class OpenAIProvider extends BaseAIProvider {
    readonly name: AIProviderType = "openai";
    private client: OpenAI;

    constructor(config: { apiKey: string; model?: string; temperature?: number; maxTokens?: number }) {
        super({ ...config, type: "openai", model: config.model || "gpt-4o" });
        this.client = new OpenAI({ apiKey: config.apiKey });
    }

    async generateContent(
        newsArticles: NewsArticle[],
        topic: TopicConfig,
        options?: GenerationOptions,
    ): Promise<GeneratedPost> {
        if (newsArticles.length === 0) {
            throw new Error("No news articles provided for content generation");
        }

        const systemPrompt = this.buildSystemPrompt(topic);
        const userPrompt = this.buildUserPrompt(newsArticles, topic, options);

        console.log(`[OpenAI] Generating content for topic: ${topic.label}`);
        console.log(`[OpenAI] Using model: ${this.config.model}`);

        const response = await this.client.chat.completions.create({
            model: this.config.model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: this.config.temperature ?? 0.7,
            max_tokens: this.config.maxTokens ?? 4000,
            response_format: { type: "json_object" },
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error("OpenAI returned empty response");
        }

        console.log(`[OpenAI] Response received, tokens used: ${response.usage?.total_tokens || "unknown"}`);

        return this.parseResponse(content, topic, newsArticles);
    }
}
