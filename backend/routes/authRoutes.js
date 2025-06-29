import express from "express";
import {
  register,
  login,
  logout,
  simpleLogin,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/simple-login", simpleLogin);
router.post("/logout", authMiddleware, logout);

export default router;
