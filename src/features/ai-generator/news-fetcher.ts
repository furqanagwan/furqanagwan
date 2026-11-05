
import type { NewsArticle, NewsProviderConfig, TopicConfig } from "./types";

interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: Array<{
        source: { id: string | null; name: string };
        author: string | null;
        title: string;
        description: string | null;
        url: string;
        urlToImage: string | null;
        publishedAt: string;
        content: string | null;
    }>;
}

async function fetchFromNewsAPI(
    topic: TopicConfig,
    apiKey: string,
    limit: number = 5,
): Promise<NewsArticle[]> {
    if (!apiKey) {
        throw new Error("NEWS_API_KEY environment variable is required for NewsAPI");
    }

    const query = topic.newsKeywords.slice(0, 3).join(" OR ");

    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", query);
    url.searchParams.set("language", "en");
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", String(limit));
    url.searchParams.set("apiKey", apiKey);

    console.log(`[NewsFetcher] Fetching news for: ${topic.label}`);
    console.log(`[NewsFetcher] Query: ${query}`);

    const response = await fetch(url.toString());

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`NewsAPI request failed: ${response.status} - ${error}`);
    }

    const data: NewsAPIResponse = await response.json();

    if (data.status !== "ok") {
        throw new Error(`NewsAPI returned error status: ${data.status}`);
    }

    console.log(`[NewsFetcher] Found ${data.totalResults} total articles, returning ${data.articles.length}`);

    return data.articles
        .filter((a) => a.title && a.description)
        .map((article) => ({
            title: article.title,
            description: article.description || "",
            source: article.source.name,
            publishedAt: article.publishedAt,
            url: article.url,
            author: article.author || undefined,
            imageUrl: article.urlToImage || undefined,
        }));
}

async function fetchFromGoogleNewsRSS(
    topic: TopicConfig,
    limit: number = 5,
): Promise<NewsArticle[]> {
    const query = encodeURIComponent(topic.newsKeywords.slice(0, 3).join(" "));
    const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;

    console.log(`[NewsFetcher] Fetching from Google News RSS for: ${topic.label}`);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Google News RSS request failed: ${response.status}`);
    }

    const xml = await response.text();

    const articles: NewsArticle[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>([\s\S]*?)<\/title>/;
    const linkRegex = /<link>([\s\S]*?)<\/link>/;
    const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;
    const sourceRegex = /<source[^>]*>([\s\S]*?)<\/source>/;

    let match;
    while ((match = itemRegex.exec(xml)) !== null && articles.length < limit) {
        const item = match[1]!;
        const title = item.match(titleRegex)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/, "$1") || "";
        const link = item.match(linkRegex)?.[1] || "";
        const pubDate = item.match(pubDateRegex)?.[1] || "";
        const source = item.match(sourceRegex)?.[1] || "Google News";

        if (title && link) {
            articles.push({
                title: title.trim(),
                description: "",
                source: source.trim(),
                publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
                url: link.trim(),
            });
        }
    }

    console.log(`[NewsFetcher] Found ${articles.length} articles from Google News RSS`);

    return articles;
}

export async function fetchNews(
    topic: TopicConfig,
    config: NewsProviderConfig,
): Promise<NewsArticle[]> {
    const limit = config.limit || 5;

    switch (config.type) {
        case "newsapi":
            return fetchFromNewsAPI(topic, config.apiKey || "", limit);

        case "gnews":
        case "rss":
            return fetchFromGoogleNewsRSS(topic, limit);

        default:
            throw new Error(`Unsupported news provider: ${config.type}`);
    }
}

export async function fetchNewsWithFallback(
    topic: TopicConfig,
    newsApiKey?: string,
    limit: number = 5,
): Promise<NewsArticle[]> {
    if (newsApiKey) {
        try {
            return await fetchFromNewsAPI(topic, newsApiKey, limit);
        } catch (error) {
            console.warn(`[NewsFetcher] NewsAPI failed, falling back to Google News RSS: ${error}`);
        }
    }

    return fetchFromGoogleNewsRSS(topic, limit);
}
