
import type {
    AIProviderType,
    GeneratedPost,
} from "../types";
import { BaseAIProvider } from "./base";

export class GeminiProvider extends BaseAIProvider {
    readonly name: AIProviderType = "gemini";

    constructor(config: { apiKey: string; model?: string; temperature?: number; maxTokens?: number }) {
        super({ ...config, type: "gemini", model: config.model || "gemini-1.5-pro" });
    }

    async generateContent(): Promise<GeneratedPost> {
        throw new Error(
            "Gemini provider not yet implemented. " +
            "To use Gemini, install @google/generative-ai and implement this provider.",
        );
    }
}
