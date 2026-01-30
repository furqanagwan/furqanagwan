/**
 * Google Gemini Provider
 *
 * Placeholder implementation for future Gemini API support.
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

export class GeminiProvider extends BaseAIProvider {
    readonly name: AIProviderType = "gemini";

    constructor(config: { apiKey: string; model?: string; temperature?: number; maxTokens?: number }) {
        super({ ...config, type: "gemini", model: config.model || "gemini-1.5-pro" });
    }

    async generateContent(
        newsArticles: NewsArticle[],
        topic: TopicConfig,
        options?: GenerationOptions,
    ): Promise<GeneratedPost> {
        // TODO: Implement Google Gemini API integration
        // Install: bun add @google/generative-ai
        //
        // Example implementation:
        // import { GoogleGenerativeAI } from "@google/generative-ai";
        // const genAI = new GoogleGenerativeAI(this.config.apiKey);
        // const model = genAI.getGenerativeModel({ model: this.config.model });
        //
        // const prompt = `${this.buildSystemPrompt(topic)}\n\n${this.buildUserPrompt(newsArticles, topic, options)}`;
        // const result = await model.generateContent(prompt);
        // const response = result.response.text();

        throw new Error(
            "Gemini provider not yet implemented. " +
            "To use Gemini, install @google/generative-ai and implement this provider.",
        );
    }
}
