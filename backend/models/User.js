import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  socketId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  online: { type: Boolean, default: true },
  lastSeen: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
