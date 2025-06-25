import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export const useChat = () => {
  const { socket, isConnected, connect } = useSocket();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (!socket) return;

    connect();

    socket.on("chatHistory", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("userList", (users) => {
      setUsers(users);
    });

    socket.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(null), 3000); 
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.off("userList");
      socket.off("typing");
    };
  }, [socket]);

  const sendMessage = (messageData) => {
    if (socket && isConnected) {
      socket.emit("message", messageData);
    }
  };

  const sendTyping = (username) => {
    if (socket && isConnected) {
      socket.emit("typing", username);
    }
  };

  return { messages, users, typingUser, sendMessage, sendTyping };
};
