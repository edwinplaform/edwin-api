import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import http from "http-status-codes";

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(http.UNAUTHORIZED).json({message: "Unauthorized"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(http.UNAUTHORIZED).json({message: "Invalid token"});
    }
};

export default authMiddleware;