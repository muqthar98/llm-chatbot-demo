
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const sendMessage = async ({
    message,
    provider,
    model,
}) => {
    try {
        const response = await API.post("/chat", {
            message,
            provider,
            model,
        });

        return response.data.data.reply;
    } catch (error) {
        console.error(
            "Chat API Error:",
            error.response?.data || error.message
        );

        throw new Error(
            error.response?.data?.message ||
            "Unable to connect to AI server."
        );
    }
};
