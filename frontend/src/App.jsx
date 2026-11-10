
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

import { sendMessage } from "./services/chatService";

function createChat() {
    return {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: [],
    };
}

export default function App() {

    const [conversations, setConversations] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);

    const [provider, setProvider] = useState("openai");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const activeChat = conversations.find(
        (chat) => chat.id === activeChatId
    );

    const messages = activeChat?.messages || [];

    const handleNewChat = () => {
        if (loading) return;

        const newChat = createChat();

        setConversations((prev) => [
            newChat,
            ...prev,
        ]);

        setActiveChatId(newChat.id);
        setError("");
    };

    const updateMessages = (chatId, newMessages) => {
        setConversations((prev) =>
            prev.map((chat) =>
                chat.id === chatId
                    ? { ...chat, messages: newMessages }
                    : chat
            )
        );
    };

    const handleSendMessage = async (text) => {

        if (loading || !text.trim()) return;

        let chatId = activeChatId;

        // Create conversation if one doesn't exist
        if (!chatId) {
            const newChat = createChat();

            chatId = newChat.id;

            setConversations((prev) => [
                newChat,
                ...prev,
            ]);

            setActiveChatId(chatId);
        }

        const currentChat = conversations.find(
            (chat) => chat.id === chatId
        );

        const userMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
        };

        const existingMessages = currentChat?.messages || [];

        const updatedMessages = [
            ...existingMessages,
            userMessage,
        ];

        updateMessages(chatId, updatedMessages);

        // Set conversation title from first message
        if (existingMessages.length === 0) {
            setConversations((prev) =>
                prev.map((chat) =>
                    chat.id === chatId
                        ? {
                            ...chat,
                            title: text.length > 35
                                ? text.substring(0, 35) + "..."
                                : text,
                        }
                        : chat
                )
            );
        }

        setLoading(true);
        setError("");

        try {

            const reply = await sendMessage({
                message: text,
                provider,
            });

            const aiMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: reply,
            };

            updateMessages(chatId, [
                ...updatedMessages,
                aiMessage,
            ]);

        } catch (err) {

            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    // Handle suggested questions
    useEffect(() => {
        const handleSuggestion = (event) => {
            handleSendMessage(event.detail);
        };

        window.addEventListener(
            "chat-suggestion",
            handleSuggestion
        );

        return () => {
            window.removeEventListener(
                "chat-suggestion",
                handleSuggestion
            );
        };
    }, [handleSendMessage]);

    return (
        <div className="app-container">

            <Sidebar
                conversations={conversations}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={(id) => {
                    if (!loading) {
                        setActiveChatId(id);
                        setError("");
                    }
                }}
            />

            <section className="chat-main">

                <ChatHeader
                    provider={provider}
                    onProviderChange={setProvider}
                />

                <ChatWindow
                    messages={messages}
                    loading={loading}
                />

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <ChatInput
                    onSend={handleSendMessage}
                    loading={loading}
                />

            </section>

        </div>
    );
}
