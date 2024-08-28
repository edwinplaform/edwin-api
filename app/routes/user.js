import express from "express";
import {loginGet, loginPost, logoutGet, signupGet, signupPost} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/signup', signupPost );
router.post('/login', loginPost);
router.get('/signup', signupGet);
router.get('/login', loginGet);
router.get('/logout',logoutGet);

export default router;
