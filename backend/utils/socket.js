import { Server as SocketIO } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Message from "../models/Message.js";

let io;

const initializeSocket = (server) => {
  io = new SocketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.query.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new Error("Authentication error"));
      }

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.user.username}`);

    await User.findByIdAndUpdate(socket.user._id, { online: true });

    socket.join(socket.user._id.toString());

    socket.broadcast.emit("user-online", { userId: socket.user._id });

    socket.on("private-message", async ({ receiverId, content }) => {
      try {
        const message = new Message({
          sender: socket.user._id,
          receiver: receiverId,
          content,
        });

        await message.save();

        const populatedMessage = await Message.populate(message, [
          { path: "sender", select: "username avatar" },
          { path: "receiver", select: "username avatar" },
        ]);

        socket.emit("private-message", populatedMessage);

        io.to(receiverId.toString()).emit("private-message", populatedMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("typing", ({ receiverId, isTyping }) => {
      io.to(receiverId.toString()).emit("typing", {
        senderId: socket.user._id,
        isTyping,
      });
    });

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.user.username}`);

      await User.findByIdAndUpdate(socket.user._id, {
        online: false,
        lastSeen: Date.now(),
      });

      socket.broadcast.emit("user-offline", { userId: socket.user._id });
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export { initializeSocket, getIO };
