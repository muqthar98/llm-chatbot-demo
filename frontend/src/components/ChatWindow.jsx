
import { useEffect, useRef } from "react";
import { Bot, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({
    messages,
    loading,
}) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    return (
        <main className="chat-window">

            {messages.length === 0 ? (
                <div className="welcome-screen">

                    <div className="welcome-icon">
                        <Bot size={38} />
                    </div>

                    <h1>How can I help you today?</h1>

                    <p>
                        Ask me anything. I'm here to help
                        with coding, learning and ideas.
                    </p>

                    <div className="suggestion-list">

                        <button onClick={() => window.dispatchEvent(
                            new CustomEvent("chat-suggestion", {
                                detail: "Explain Node.js in simple terms"
                            })
                        )}>
                            Explain Node.js
                        </button>

                        <button onClick={() => window.dispatchEvent(
                            new CustomEvent("chat-suggestion", {
                                detail: "What is REST API?"
                            })
                        )}>
                            What is REST API?
                        </button>

                        <button onClick={() => window.dispatchEvent(
                            new CustomEvent("chat-suggestion", {
                                detail: "Explain system design fundamentals"
                            })
                        )}>
                            System design fundamentals
                        </button>

                    </div>

                </div>
            ) : (
                <div className="messages-container">

                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                        />
                    ))}

                    {loading && (
                        <div className="typing-indicator">
                            <div className="message-avatar ai-avatar">
                                <Bot size={21} />
                            </div>

                            <div className="typing-content">
                                <Sparkles size={16} />
                                AI is thinking
                                <span className="typing-dots">
                                    ...
                                </span>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />

                </div>
            )}

        </main>
    );
}
