import express from "express";
import {
  getUsers,
  getMessages,
  markAsRead,
} from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, getUsers);
router.get("/messages/:receiverId", authMiddleware, getMessages);
router.put("/messages/read/:senderId", authMiddleware, markAsRead);

export default router;
