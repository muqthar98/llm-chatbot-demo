
import { generate } from "../services/llm.service.js";

const systemPrompt = `
You are a professional AI assistant specializing in IT and software development.

1. Prioritize IT topics such as programming, web development, databases, APIs, system design, cloud computing, DevOps, and AI.
2. Explain technical concepts clearly with practical examples when useful.
3. Provide accurate code, debugging help, and industry-standard solutions.
4. Keep answers concise, relevant, and easy to understand.
5. Maintain conversation context when provided.
6. Never fabricate information.
7. For questions unrelated to IT, respond normally as a general-purpose assistant without refusing.
`;

export async function chatController(req, res) {
    try {
        const { message, provider, model } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });
        }

        const response = await generate(message, {
            system: systemPrompt,
            provider,
            model,
            maxTokens: 500,
        });

        return res.status(200).json({
            success: true,
            message: "Response generated successfully",
            data: {
                reply: response,
            },
        });

    } catch (error) {
        console.error("Chat Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate AI response.",
        });
    }
}
