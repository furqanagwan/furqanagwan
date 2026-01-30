/**
 * AI Generator Configuration
 *
 * Central configuration for the AI blog post generator.
 * Includes expanded topic list and provider settings.
 */

import type { GeneratorConfig, TopicConfig } from "./types";

// ============================================================================
// Topics Configuration
// ============================================================================

export const TOPICS: TopicConfig[] = [
    // Technology & Development
    {
        id: "technology",
        label: "Technology",
        category: "Technology",
        newsKeywords: ["AI", "software", "tech news", "programming", "startups"],
        promptHints: "Focus on practical implications for developers and tech workers",
    },
    {
        id: "web-development",
        label: "Web Development",
        category: "Technology",
        newsKeywords: ["JavaScript", "React", "web development", "frontend", "Next.js"],
        promptHints: "Include code examples where relevant, focus on modern practices",
    },
    {
        id: "ai-ml",
        label: "AI & Machine Learning",
        category: "Technology",
        newsKeywords: ["artificial intelligence", "machine learning", "ChatGPT", "LLM", "deep learning"],
        promptHints: "Explain concepts accessibly, discuss real-world applications",
    },
    {
        id: "cybersecurity",
        label: "Cybersecurity",
        category: "Technology",
        newsKeywords: ["cybersecurity", "data breach", "hacking", "security", "privacy"],
        promptHints: "Focus on actionable security advice for individuals and developers",
    },

    // Career & Professional
    {
        id: "career",
        label: "Career Development",
        category: "Career",
        newsKeywords: ["career advice", "job market", "tech jobs", "remote work", "salary"],
        promptHints: "Provide actionable advice, discuss trends in the job market",
    },
    {
        id: "productivity",
        label: "Productivity",
        category: "Career",
        newsKeywords: ["productivity", "time management", "work-life balance", "focus", "efficiency"],
        promptHints: "Share practical tips and tools, avoid generic advice",
    },
    {
        id: "leadership",
        label: "Leadership & Management",
        category: "Career",
        newsKeywords: ["leadership", "management", "team building", "engineering manager", "tech lead"],
        promptHints: "Focus on software engineering leadership specifically",
    },

    // Health & Wellness
    {
        id: "health",
        label: "Health & Wellness",
        category: "Health",
        newsKeywords: ["health", "wellness", "mental health", "exercise", "nutrition"],
        promptHints: "Focus on health tips relevant to desk workers and developers",
    },
    {
        id: "fitness",
        label: "Fitness",
        category: "Health",
        newsKeywords: ["fitness", "workout", "exercise", "gym", "strength training"],
        promptHints: "Practical fitness advice for busy professionals",
    },
    {
        id: "mental-health",
        label: "Mental Health",
        category: "Health",
        newsKeywords: ["mental health", "stress", "anxiety", "burnout", "mindfulness"],
        promptHints: "Sensitive, supportive tone, focus on tech industry burnout",
    },

    // Education & Learning
    {
        id: "university",
        label: "University & Education",
        category: "Education",
        newsKeywords: ["university", "education", "students", "learning", "college"],
        promptHints: "Advice for CS students and those entering tech",
    },
    {
        id: "learning",
        label: "Continuous Learning",
        category: "Education",
        newsKeywords: ["online courses", "skill development", "coding bootcamp", "certification", "upskilling"],
        promptHints: "Focus on learning resources and strategies for developers",
    },

    // Finance & Money
    {
        id: "personal-finance",
        label: "Personal Finance",
        category: "Finance",
        newsKeywords: ["investing", "personal finance", "stock market", "savings", "budgeting"],
        promptHints: "Practical financial advice, mention tech-specific compensation (RSUs, etc.)",
    },
    {
        id: "crypto-web3",
        label: "Crypto & Web3",
        category: "Finance",
        newsKeywords: ["cryptocurrency", "bitcoin", "blockchain", "web3", "ethereum"],
        promptHints: "Balanced view, focus on technology aspects not just speculation",
    },

    // Lifestyle
    {
        id: "travel",
        label: "Travel & Remote Work",
        category: "Lifestyle",
        newsKeywords: ["travel", "digital nomad", "remote work", "working abroad", "workation"],
        promptHints: "Focus on the intersection of travel and remote tech work",
    },
    {
        id: "food",
        label: "Food & Cooking",
        category: "Lifestyle",
        newsKeywords: ["cooking", "recipes", "meal prep", "healthy eating", "food"],
        promptHints: "Quick, healthy meals for busy developers",
    },

    // Industry News
    {
        id: "startups",
        label: "Startups & Entrepreneurship",
        category: "Business",
        newsKeywords: ["startups", "entrepreneurship", "venture capital", "founder", "Silicon Valley"],
        promptHints: "Lessons learned, trends in the startup ecosystem",
    },
    {
        id: "big-tech",
        label: "Big Tech",
        category: "Business",
        newsKeywords: ["Google", "Apple", "Microsoft", "Amazon", "Meta", "big tech"],
        promptHints: "Analysis of big tech news and what it means for the industry",
    },
];

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_CONFIG: GeneratorConfig = {
    ai: {
        type: "openai",
        apiKey: process.env.OPENAI_API_KEY || "",
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 4000,
    },
    news: {
        type: "newsapi",
        apiKey: process.env.NEWS_API_KEY || "",
        limit: 5,
    },
    topics: TOPICS,
    schedule: {
        frequency: "weekly",
        randomizeDay: true,
    },
    output: {
        directory: "content/posts",
        asDraft: true, // Always create as draft for review
        includeAttribution: true,
    },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a topic by ID
 */
export function getTopicById(id: string): TopicConfig | undefined {
    return TOPICS.find((t) => t.id === id);
}

/**
 * Get a random topic
 */
export function getRandomTopic(): TopicConfig {
    const index = Math.floor(Math.random() * TOPICS.length);
    return TOPICS[index]!;
}

/**
 * Get topics by category
 */
export function getTopicsByCategory(category: string): TopicConfig[] {
    return TOPICS.filter((t) => t.category === category);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
    return [...new Set(TOPICS.map((t) => t.category))];
}
