import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
    return(
        !chat.hideInChat && (
            <div className={`message message-${chat.role === "model" ? "bot" : "user"}`}>
            { chat.role === "model" && <ChatbotIcon />}
                <p className="message-text">
                    {chat.text}
                </p>
            </div>
        )
    );
}

export default ChatMessage;