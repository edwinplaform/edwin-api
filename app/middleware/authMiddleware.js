import jwt from "jsonwebtoken";
import db from "../models/index.js"
import dotenv from "dotenv";
dotenv.config();

export const requireAuth = (req, res, next) => {
    const token = req.cookies.get("jwt");

    if (!token) {
        return res.status(401).json({message:"No token provided"});
    }else if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decoded);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

export const checkUser = (req, res, next) => {
    const token = req.cookies.get("jwt");
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err){
                res.locals.user = null;
                next();
            } else {
                let user = await db.user.findOne(decoded.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
