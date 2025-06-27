import Message from "../models/Message.js";
import User from "../models/User.js";

const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: receiverId },
        { sender: receiverId, receiver: req.user.id },
      ],
    })
      .sort("timestamp")
      .populate("sender", "username avatar")
      .populate("receiver", "username avatar");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
      "-password"
    );

    const usersWithMessageInfo = await Promise.all(
      users.map(async (user) => {
        const latestMessage = await Message.findOne({
          $or: [
            { sender: req.user.id, receiver: user._id },
            { sender: user._id, receiver: req.user.id },
          ],
        })
          .sort({ createdAt: -1 })
          .populate("sender", "username avatar");

        const unreadCount = await Message.countDocuments({
          sender: user._id,
          receiver: req.user.id,
          read: false,
        });

        return {
          ...user.toObject(),
          latestMessage,
          unreadCount,
          lastMessageTime: latestMessage
            ? latestMessage.createdAt || latestMessage.timestamp
            : user.createdAt,
        };
      })
    );

    usersWithMessageInfo.sort((a, b) => {
      if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
      if (b.unreadCount > 0 && a.unreadCount === 0) return 1;

      if (a.unreadCount > 0 && b.unreadCount > 0) {
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      }

      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });

    res.json(usersWithMessageInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { senderId } = req.params;
    await Message.updateMany(
      { sender: senderId, receiver: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length < 1) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      _id: { $ne: req.user.id },
      username: { $regex: query.trim(), $options: "i" },
    })
      .select("-password")
      .limit(20);

    const usersWithMessageInfo = await Promise.all(
      users.map(async (user) => {
        const latestMessage = await Message.findOne({
          $or: [
            { sender: req.user.id, receiver: user._id },
            { sender: user._id, receiver: req.user.id },
          ],
        })
          .sort({ createdAt: -1 })
          .populate("sender", "username avatar");

        const unreadCount = await Message.countDocuments({
          sender: user._id,
          receiver: req.user.id,
          read: false,
        });

        return {
          ...user.toObject(),
          latestMessage,
          unreadCount,
          lastMessageTime: latestMessage
            ? latestMessage.createdAt || latestMessage.timestamp
            : user.createdAt,
        };
      })
    );

    res.json(usersWithMessageInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getMessages, getUsers, markAsRead };
