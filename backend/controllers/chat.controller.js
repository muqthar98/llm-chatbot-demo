
import { generate } from "../services/llm.service.js";
import { systemPrompt } from "../system-prompt.js"

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
