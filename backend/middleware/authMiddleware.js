import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token, user not found" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
