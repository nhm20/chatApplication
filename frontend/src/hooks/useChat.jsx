import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import chatService from "../services/chatService";
import { useAuth } from "../context/AuthContext";

const useChat = () => {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    if (!user || !token) return;

    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const newSocket = io(socketUrl, {
      auth: { token },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user, token]);

  const loadUsers = useCallback(async () => {
    try {
      const users = await chatService.getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }, []);

  // Socket event listeners
  useEffect(() => {
    if (!socket || !user) return;

    socket.on("private-message", (message) => {
      // Only add the message if it's part of the current conversation
      if (selectedUser) {
        console.log("Received message:", message);
        console.log("Selected user:", selectedUser);
        const isRelevantMessage =
          (message.sender._id === user.id &&
            message.receiver._id === selectedUser._id) ||
          (message.sender._id === selectedUser._id &&
            message.receiver._id === user.id);

        if (isRelevantMessage) {
          setMessages((prev) => [...prev, message]);
        }
      }

      // Always refresh the user list to update unread counts and sorting
      // But do it after a small delay to ensure the message is saved in the backend
      setTimeout(() => {
        loadUsers();
      }, 100);
    });

    socket.on("typing", ({ senderId, isTyping }) => {
      // Only show typing indicator for the selected user
      if (selectedUser && senderId === selectedUser._id) {
        setIsTyping(isTyping);
        console.log("Typing status:", isTyping, "from user:", senderId);
        setTypingUser(isTyping ? senderId : null);
      }
    });

    socket.on("user-online", ({ userId }) => {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, online: true } : user
        )
      );
    });

    socket.on("user-offline", ({ userId }) => {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, online: false, lastSeen: new Date() }
            : user
        )
      );
    });

    return () => {
      socket.off("private-message");
      socket.off("typing");
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, [socket, selectedUser, user, loadUsers]);

  // Load users and messages
  useEffect(() => {
    if (!user) return;
    loadUsers();
  }, [user, loadUsers]);

  const loadMessages = useCallback(async (receiverId) => {
    try {
      const messages = await chatService.getMessages(receiverId);
      setMessages(messages);
      await chatService.markAsRead(receiverId);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  }, []);

  const selectUser = useCallback(
    async (user) => {
      setSelectedUser(user);
      await loadMessages(user._id);
      setTimeout(() => {
        loadUsers();
      }, 100);
    },
    [loadMessages, loadUsers]
  );

  const sendMessage = useCallback(
    (content) => {
      if (!socket || !selectedUser || !content.trim()) return;

      console.log("Sending message:", content);
      socket.emit("private-message", {
        receiverId: selectedUser._id,
        content,
      });
    },
    [socket, selectedUser]
  );

  const sendTyping = useCallback(
    (isTyping) => {
      if (!socket || !selectedUser) return;
      socket.emit("typing", {
        receiverId: selectedUser._id,
        isTyping,
      });
    },
    [socket, selectedUser]
  );

  return {
    socket,
    messages,
    users,
    selectedUser,
    selectUser,
    sendMessage,
    sendTyping,
    isTyping,
    typingUser,
  };
};

export default useChat;
