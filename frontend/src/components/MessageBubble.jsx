
import { Bot, User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export default function MessageBubble({ message }) {
    const [copied, setCopied] = useState(false);

    const isUser = message.role === "user";

    const copyMessage = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);

            setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    return (
        <div className={`message-row ${isUser ? "user-row" : "ai-row"}`}>

            <div className={`message-avatar ${isUser ? "user-avatar" : "ai-avatar"}`}>
                {isUser ? <User size={19} /> : <Bot size={21} />}
            </div>

            <div className="message-content">

                <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>

                    {isUser ? (
                        <p>{message.content}</p>
                    ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    )}

                </div>

                {!isUser && (
                    <div className="message-actions">
                        <button onClick={copyMessage} title="Copy response">
                            {copied ? <Check size={17} /> : <Copy size={17} />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                )}

            </div>

        </div>
    );
}
