
import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

export default function ChatInput({
    onSend,
    loading,
}) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message.trim() || loading) return;

        onSend(message.trim());
        setMessage("");
    };

    return (
        <form className="chat-input-container" onSubmit={handleSubmit}>

            <button
                type="button"
                className="attachment-btn"
                title="Attachments coming soon"
                disabled
            >
                <Paperclip size={21} />
            </button>

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                rows={1}
                disabled={loading}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />

            <button
                type="submit"
                className="send-btn"
                disabled={!message.trim() || loading}
                title="Send message"
            >
                <Send size={19} />
            </button>

        </form>
    );
}
