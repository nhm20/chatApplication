import User from "../models/User.js";

export async function loginUser(socketId,userName) {
  try {
    const existingUser= await User.findOne({ username: userName });
    if (existingUser) {
      existingUser.socketId = socketId;
      existingUser.online = true;
      await existingUser.save();
      return existingUser;
    } else {
      const newUser = await User.create({ socketId, username: userName });
      return newUser;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export async function logoutUser(socketId) {
    try {
        const user = await User.findOne({ socketId });
        if (user) {
            user.online = false;
            user.lastSeen = new Date();
            await user.save();
            return user;
        }
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}
export async function getOnlineUsers() {
  try {
    const onlineUsers = await User.find({ online: true });
    return onlineUsers;
  } catch (error) {
    console.error("Error fetching online users:", error);
    throw error;
  }
}