import { useLocation } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import ChatLayout from "../components/Chat/ChatLayout";

const ChatPage = () => {
  const location = useLocation();
  const username = location.state?.username;
  const { messages, users, typingUser, sendMessage, sendTyping, error } =
    useChat(username);

  if (!username) {
    return <div className="p-4 text-red-500">Please login first</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <ChatLayout
      username={username}
      messages={messages}
      users={users}
      typingUser={typingUser}
      onSendMessage={sendMessage}
      onTyping={sendTyping}
    />
  );
};

export default ChatPage;
