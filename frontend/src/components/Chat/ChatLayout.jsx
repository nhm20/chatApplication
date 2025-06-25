import { useChat } from "../../hooks/useChat";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";

const ChatLayout = ({ username }) => {
  const { messages, users, typingUser, sendMessage, sendTyping } =
    useChat(username); 
  const messagesEndRef = useRef(null);

  const handleSend = (text) => {
    const messageData = {
      username,
      text,
      timestamp: new Date(),
    };
    sendMessage(messageData);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">Online Users</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.socketId}
              className={`flex items-center p-2 rounded ${
                user.username === username ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span
                className={user.username === username ? "font-semibold" : ""}
              >
                {user.username}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <Message
              key={i}
              message={msg}
              isCurrentUser={msg.username === username}
            />
          ))}

          <div ref={messagesEndRef} />

          {typingUser && typingUser !== username && (
            <div className="text-sm text-gray-500 mb-2 italic">
              {typingUser} is typing...
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <MessageInput
            onSendMessage={handleSend}
            onTyping={() => sendTyping(username)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
