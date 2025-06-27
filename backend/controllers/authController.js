import User from "../models/User.js";
import jwt from "jsonwebtoken";

const simpleLogin = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    if (cleanUsername.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters long",
      });
    }

    let user = await User.findOne({ username: cleanUsername });

    if (!user) {
      user = new User({
        username: cleanUsername,
        password: "temp_password_123",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          username
        )}&background=random`,
      });
      await user.save();
    }

    user.online = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        online: user.online,
      },
    });
  } catch (error) {
    console.error("Simple login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed due to server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const register = async (req, res) => {
  try {
    console.log("Register request body:", req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
        errors: {
          username: !username ? "Username is required" : null,
          password: !password ? "Password is required" : null,
        },
      });
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Registration failed server",
        errors: { username: "Username is already taken" },
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Registration failed server",
        errors: { password: "Password must be at least 6 characters" },
      });
    }

    const user = new User({
      username: username.toLowerCase(),
      password,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        online: true,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed due to server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.online = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        online: user.online,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.online = false;
    user.lastSeen = Date.now();
    await user.save();
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login, logout, simpleLogin };
