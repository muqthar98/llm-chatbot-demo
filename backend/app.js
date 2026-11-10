import express from "express";
import cors from 'cors';
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use(cors("*"))

// API routes
app.use("/api/chat", chatRoutes);

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Chatbot API is running",
    });
});

export default app;