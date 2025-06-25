import {
  createMessage,
  fetchMessagesFromDB,
} from "../controllers/messageController.js";
import {
  getOnlineUsers,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

const initializeSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("New user connected:", socket.id);

    try {
      const messages = await fetchMessagesFromDB(); // ✅ use correct method
      socket.emit("chatHistory", messages);
    } catch (error) {
      console.error("Error loading chat history:", error);
      socket.emit("chatHistory", []); // send empty if failed
    }

    try {
      const users = await getOnlineUsers();
      io.emit("userList", users);
    } catch (error) {
      console.error("Error getting online users:", error);
    }

    socket.on("login", async (userName) => {
      try {
        const user = await loginUser(socket.id, userName);
        socket.emit("loginSuccess", user);
        const updateUsers = await getOnlineUsers();
        io.emit("userList", updateUsers);
      } catch (error) {
        console.error("Login error:", error);
      }
    });

    socket.on("message", async (messageData) => {
      try {
        const message = await createMessage(messageData);
        io.emit("receiveMessage", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("typing", (userName) => {
      socket.broadcast.emit("typing", userName);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);
      try {
        const user = await logoutUser(socket.id);
        if (user) {
          const updateUsers = await getOnlineUsers();
          io.emit("userList", updateUsers);
        }
      } catch (error) {
        console.error("Error during disconnect:", error);
      }
    });
  });
};

export default initializeSocket;
