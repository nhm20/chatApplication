import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import useChat from "../hooks/useChat";
import ChatList from "../components/ChatList";
import ChatContainer from "../components/ChatContainer";
import LoadingSpinner from "../components/LoadingSpinner";
import { IoMenuOutline } from "react-icons/io5";

const ChatPage = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    users,
    messages,
    selectedUser,
    selectUser,
    sendMessage,
    sendTyping,
    isTyping,
    typingUser,
  } = useChat();

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      selectUser(users[0]);
    }
  }, [users, selectedUser, selectUser]);

  const handleMobileMenuToggle = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsMobileMenuOpen((prev) => !prev);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isAnimating]);

  const handleCloseMobileMenu = useCallback(() => {
    if (isMobileMenuOpen && !isAnimating) {
      setIsAnimating(true);
      setIsMobileMenuOpen(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isMobileMenuOpen, isAnimating]);

  if (!user) {
    return (
      <div className="fixed inset-0 top-20 bottom-0 flex items-center justify-center bg-white">
        <LoadingSpinner message="Loading your chats..." size="large" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-20 bottom-0 bg-white overflow-hidden">
      <div
        className={`lg:hidden fixed inset-0 z-[9999] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCloseMobileMenu();
          }}
        ></div>
        <div
          className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? "transform translate-x-0 opacity-100"
              : "transform -translate-x-full opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ChatList
            users={users}
            selectedUser={selectedUser}
            onSelectUser={selectUser}
            isMobile={true}
            onClose={handleCloseMobileMenu}
          />
        </div>
      </div>

      <div className="flex h-full bg-white shadow-xl relative">
        <div className="hidden lg:flex w-80 xl:w-96 border-r border-gray-200 flex-shrink-0">
          <ChatList
            users={users}
            selectedUser={selectedUser}
            onSelectUser={selectUser}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="lg:hidden flex items-center justify-between p-4 bg-blue-600 text-white shadow-lg flex-shrink-0 relative z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleMobileMenuToggle();
              }}
              disabled={isAnimating}
              className="p-3 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 backdrop-blur-sm z-10 relative"
              type="button"
              aria-label="Toggle menu"
            >
              <IoMenuOutline className="w-6 h-6 text-white" />
            </button>

            <div className="flex-1 text-center px-4 min-w-0">
              <h1 className="text-lg font-bold text-white truncate">
                {selectedUser ? selectedUser.username : "Select a Chat"}
              </h1>
              {selectedUser && (
                <div className="flex items-center justify-center mt-1">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      selectedUser.online
                        ? "bg-green-400 animate-pulse"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-xs text-blue-100">
                    {selectedUser.online ? "Online" : "Offline"}
                  </span>
                </div>
              )}
            </div>

            <div className="w-12 flex-shrink-0"></div>
          </div>

          <div className="flex-1 min-h-0">
            <ChatContainer
              selectedUser={selectedUser}
              messages={messages}
              onSendMessage={sendMessage}
              onTyping={sendTyping}
              isTyping={isTyping}
              typingUser={typingUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
