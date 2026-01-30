#!/usr/bin/env bun
/**
 * Generate AI Blog Post
 *
 * CLI script to generate blog posts using AI based on current news.
 *
 * Usage:
 *   bun run scripts/generate-post.ts [options]
 *
 * Options:
 *   --topic=<topic>   Specific topic (or "random")
 *   --dry-run         Preview without writing file
 *   --verbose         Enable verbose logging
 *   --help            Show this help message
 *
 * Environment Variables:
 *   OPENAI_API_KEY    Required for OpenAI provider
 *   NEWS_API_KEY      Optional (falls back to Google News RSS)
 *   AI_PROVIDER       openai | anthropic | gemini (default: openai)
 *   AI_MODEL          Model name (default: gpt-4o)
 *
 * Examples:
 *   bun run scripts/generate-post.ts --topic=technology
 *   bun run scripts/generate-post.ts --topic=random --dry-run
 *   bun run scripts/generate-post.ts --topic=health --verbose
 */

import { runFromCLI, TOPICS } from "../src/features/ai-generator";

// ============================================================================
// CLI Argument Parser
// ============================================================================

interface ParsedArgs {
    topic?: string;
    dryRun: boolean;
    verbose: boolean;
    help: boolean;
}

function parseArgs(args: string[]): ParsedArgs {
    const result: ParsedArgs = {
        dryRun: false,
        verbose: false,
        help: false,
    };

    for (const arg of args) {
        if (arg === "--help" || arg === "-h") {
            result.help = true;
        } else if (arg === "--dry-run" || arg === "-d") {
            result.dryRun = true;
        } else if (arg === "--verbose" || arg === "-v") {
            result.verbose = true;
        } else if (arg.startsWith("--topic=")) {
            result.topic = arg.split("=")[1];
        }
    }

    return result;
}

function showHelp(): void {
    console.log(`
AI Blog Post Generator
======================

Generate blog posts using AI based on current news.

USAGE:
  bun run scripts/generate-post.ts [OPTIONS]

OPTIONS:
  --topic=<topic>   Generate for a specific topic, or "random"
  --dry-run, -d     Preview the post without writing to disk
  --verbose, -v     Enable verbose logging
  --help, -h        Show this help message

AVAILABLE TOPICS:
${TOPICS.map((t) => `  ${t.id.padEnd(20)} ${t.label} (${t.category})`).join("\n")}

ENVIRONMENT VARIABLES:
  OPENAI_API_KEY    Required for OpenAI provider
  NEWS_API_KEY      Optional (falls back to Google News RSS if not set)
  AI_PROVIDER       openai | anthropic | gemini (default: openai)
  AI_MODEL          Model name (default: gpt-4o)

EXAMPLES:
  # Generate a random topic post (preview only)
  bun run scripts/generate-post.ts --dry-run

  # Generate a technology post
  bun run scripts/generate-post.ts --topic=technology

  # Generate and save a health post
  bun run scripts/generate-post.ts --topic=health
`);
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main(): Promise<void> {
    const args = parseArgs(process.argv.slice(2));

    if (args.help) {
        showHelp();
        process.exit(0);
    }

    // Validate environment
    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Error: No AI API key found.");
        console.error("Set one of: OPENAI_API_KEY, ANTHROPIC_API_KEY, or GEMINI_API_KEY");
        console.error("\nRun with --help for more information.");
        process.exit(1);
    }

    try {
        const result = await runFromCLI({
            topic: args.topic,
            dryRun: args.dryRun,
            verbose: args.verbose,
        });

        if (result.success) {
            console.log("\n✅ Post generated successfully!");
            if (result.filePath) {
                console.log(`📄 File: ${result.filePath}`);
            }
            console.log(`📝 Title: ${result.post?.title}`);
            console.log(`🏷️  Topic: ${result.metadata.topic}`);
            console.log(`🤖 Provider: ${result.metadata.provider}/${result.metadata.model}`);
            process.exit(0);
        } else {
            console.error(`\n❌ Generation failed: ${result.error}`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`\n❌ Unexpected error: ${error}`);
        process.exit(1);
    }
}

main();
