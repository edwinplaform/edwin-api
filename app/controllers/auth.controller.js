import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import http from 'http-status-codes';
import dotenv from "dotenv";
import db from "../models/index.js";
import {sendEmail} from "../service/emailService.js";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({
            id: user.userId,
            role: user.role,
            isOnboarding: user.isOnboarding,
        },
        process.env.JWT_SECRET,
        {expiresIn: "30d"}
    );
};

const generateOtp = () => {
    return Math.floor(10000 + Math.random() * 900000).toString();
}

export const register = async (req, res) => {
    try {
        const {email, password, role} = req.body;

        if (!email || !password || !role) {
            return res.status(http.BAD_REQUEST).json({message: "Missing required field"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOtp();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        const user = await db.user.create({
            userId: `USER_${Date.now()}`,
            email,
            password: hashedPassword,
            role,
            isOnboarding: false,
            otp,
            otpExpiresAt,
            firstName: null,
            lastName: null,
            phone: null,
            address: null
        });

        await sendEmail(email, "OTP", {otp});

        res.status(http.CREATED).json({message: "User registered successfully"});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error registering user", error: err.message});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await db.user.findOne({where: {email}});

        if (!user) {
            return res.status(http.UNAUTHORIZED).json({message: "User not found"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(http.UNAUTHORIZED).json({message: "Invalid password"});
        }

        const token = generateToken(user);
        res.json({user, accessToken: token});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error logging user", error: err.message});
    }
};

export const oauthLogin = async (req, res) => {
    try {
        const {email, name, image, provider, providerAccountId} = req.body;

        let user = await db.user.findOne({where: {email}});
        if (!user) {
            user = await db.user.create({
                email,
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1] || "",
                profilePhotoUrl: image,
                role: "STUDENT",
                isOnboarding: false,
            });
        }

        const token = generateToken(user);
        res.json({user, accessToken: token});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "OAuth login failed", error: err.message});
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const {email, code} = req.body;

        const user = await db.user.findOne({where: {email}});
        if (!user) return res.status(http.NOT_FOUND).json({message: "User not found."});

        if (user.otp !== code || new Date() > user.otpExpiresAt) {
            return res.status(http.BAD_REQUEST).json({message: "Invalid or expired otp."});
        }

        await user.update({otp: null, otpExpiresAt: null});

        res.json({message: "Email verified successfully"});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({
            message: "Error verifying email verification",
            error: err.message
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const {userId} = req.user;
        const {oldPassword, newPassword} = req.body;

        const user = await db.user.findByPk(userId);
        if (!user) return res.status(http.NOT_FOUND).json({message: "User not found"});

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) return res.status(http.UNAUTHORIZED).json({message: "Invalid password"});


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({password: hashedPassword});

        res.json({message: "Password changed successfully."});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error changing password.", error: err.message});
    }
};