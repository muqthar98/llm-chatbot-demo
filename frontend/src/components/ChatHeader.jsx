
import { Bot, ChevronDown, Sparkles } from "lucide-react";

export default function ChatHeader({
    provider,
    onProviderChange,
}) {
    return (
        <header className="chat-header">

            <div className="assistant-info">
                <div className="assistant-avatar">
                    <Bot size={26} />
                </div>

                <div>
                    <h2>AI Assistant</h2>

                    <span className="online-status">
                        <span className="online-dot"></span>
                        Online
                    </span>
                </div>
            </div>

            <div className="provider-selector">
                <Sparkles size={19} />

                <select
                    value={provider}
                    onChange={(e) =>
                        onProviderChange(e.target.value)
                    }
                >
                    <option value="openai">
                        OpenAI
                    </option>

                    <option value="claude">
                        Claude
                    </option>
                </select>

                <ChevronDown size={17} />
            </div>

        </header>
    );
}
