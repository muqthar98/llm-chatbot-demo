
import {
    MessageSquare,
    Plus,
    MoreHorizontal,
    Bot,
    User,
} from "lucide-react";

export default function Sidebar({
    conversations,
    activeChatId,
    onNewChat,
    onSelectChat,
}) {
    return (
        <aside className="sidebar">

            <div className="brand">
                <div className="brand-icon">
                    <Bot size={25} />
                </div>
                <h2>AI Chatbot</h2>
            </div>

            <button
                className="new-chat-btn"
                onClick={onNewChat}
            >
                <Plus size={21} />
                New Chat
            </button>

            <div className="sidebar-heading">
                <h3>Chats</h3>
            </div>

            <div className="conversation-list">

                <p className="sidebar-label">Recent</p>

                {conversations.map((chat) => (
                    <button
                        key={chat.id}
                        className={`conversation-item ${
                            activeChatId === chat.id
                                ? "active"
                                : ""
                        }`}
                        onClick={() => onSelectChat(chat.id)}
                    >
                        <MessageSquare size={19} />

                        <span>{chat.title}</span>

                        <MoreHorizontal
                            size={18}
                            className="conversation-more"
                        />
                    </button>
                ))}

                {conversations.length === 0 && (
                    <p className="empty-sidebar">
                        No conversations yet
                    </p>
                )}

            </div>

            <div className="sidebar-profile">
                <div className="profile-avatar">
                    <User size={22} />
                </div>

                <div className="profile-info">
                    <strong>My Account</strong>
                    <span>AI Chatbot User</span>
                </div>
            </div>

        </aside>
    );
}
