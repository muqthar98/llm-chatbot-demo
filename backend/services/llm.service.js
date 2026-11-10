import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

// Initialize clients
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const claude = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Default models
const DEFAULT_MODELS = {
    openai: "gpt-6.1-sol",
    claude: "claude-sonnet-4-5",
};

// Reusable AI function
export async function generate(prompt, {
    system = "",
    provider = process.env.LLM_PROVIDER ?? "claude",
    model,
    maxTokens = 500,
} = {}) {

    // Use default model if not provided
    model ??= DEFAULT_MODELS[provider];

    // Claude provider
    if (provider === "claude") {

        const r = await claude.messages.create({
            model,
            max_tokens: maxTokens,

            ...(system && { system }),

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return r.content
            .filter((b) => b.type === "text")
            .map((b) => b.text)
            .join("");
    }

    // OpenAI provider
    if (provider === "openai") {

        const r = await openai.responses.create({
            model,
            max_output_tokens: maxTokens,

            instructions: system,

            input: prompt,
        });

        return r.output_text;
    }

    throw new Error(`Unknown provider: ${provider}`);
}
