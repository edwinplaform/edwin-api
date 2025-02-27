import express from "express";
import {
    register,
    login,
    oauthLogin,
    verifyEmail,
    changePassword
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/oauth", oauthLogin);
router.post("/verify", verifyEmail);
router.post("/change-password", authMiddleware, changePassword);

export default router;