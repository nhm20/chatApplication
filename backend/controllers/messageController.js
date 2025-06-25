import Message from "../models/Message.js";

export async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(50);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createMessage(req, res) {
  try {
    const message = await Message.create(messageData);
    return message;
  } catch (err) {
    console.error("Message save error:", err);
    throw err;
  }
}
