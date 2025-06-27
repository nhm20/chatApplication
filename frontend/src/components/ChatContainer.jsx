import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { IoChatbubblesOutline } from "react-icons/io5";

const ChatContainer = ({
  selectedUser,
  messages,
  onSendMessage,
  onTyping,
  isTyping,
  typingUser,
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
      onTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onTyping(e.target.value.length > 0);
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center animate-fade-in p-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoChatbubblesOutline className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome to Chat!
          </h3>
          <p className="text-gray-600 max-w-sm text-sm leading-relaxed">
            Select a conversation from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="hidden lg:flex p-4 bg-blue-600 text-white border-b items-center shadow-lg flex-shrink-0">
        <div className="relative">
          <img
            src={selectedUser.avatar}
            alt={selectedUser.username}
            className="w-12 h-12 rounded-full object-cover ring-3 ring-white/30"
          />
          {selectedUser.online && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          )}
        </div>
        <div className="ml-4 flex-1 min-w-0">
          <h3 className="text-lg font-bold truncate">
            {selectedUser.username}
          </h3>
          <div className="text-sm text-blue-100 flex items-center">
            {selectedUser.online ? (
              <>
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span>Online</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                <span>Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-4 min-h-0">
        <div className="space-y-1">
          {messages.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoChatbubblesOutline className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <Message
                key={message._id}
                message={message}
                isOwnMessage={message.sender._id !== selectedUser._id}
              />
            ))
          )}
          {isTyping && typingUser === selectedUser._id && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <MessageInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSend={handleSendMessage}
          placeholder={`Message ${selectedUser.username}...`}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
