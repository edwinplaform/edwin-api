// const User = require('../models/user.model');
// const db = require('../models/index.js');
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import http from "http-status-codes"
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


const maxAge = process.env.JWT_SECRET | 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: maxAge} )
}

export const signupPost = async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        const userExists = await db.user.findOne({ where: {email} });
        if (userExists) {
            return res.status(http.BAD_REQUEST).json({message:"user already exists"});
        }

        const newUser = await db.user.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password : await  bcrypt.hashSync(password,10),
        });

        const token = createToken({id: newUser.id});
        console.log(token);
        res.cookie('jwt',token, {httpOnly: true, maxAge: maxAge * 1000});
        return res.status(http.CREATED).json(newUser);
    } catch (err) {
        return res.status(http.BAD_REQUEST).json({message:"error creating user",error: err.message});
    }
}

export const loginPost = async (req, res) => {
    try {
        const user = await db.user.findOne({where : {email : req.body.email}});
        if (!user) {
            return res.status(http.BAD_REQUEST).json({message:"Sorry this email does not exist"});
        }
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        console.log(user.password );
        if (!validPassword) {
            return res.status(http.BAD_REQUEST).json({message:"Invalid Login Details"});
        }
        const token = createToken({id: user.id});
        res.cookie('jwt',token, {httpOnly: true, maxAge: maxAge * 1000});
        return res.status(http.OK).json({message:"Successfully logged in", user});

    }catch (error){
        return res.status(http.BAD_REQUEST).json({message:"An error occurred while logging in",error:error.message});
    }
}

export const signupGet = async (req, res) => {
    res.render('signup');
}

export const loginGet = async (req, res) => {
    res.render('login');
}

export const getUsers = async (req, res) => {
    try {
        const users = await db.user.findAll();
        res.status(200).json(users);
    }catch (err){
        res.status(400).json({message:"error getting users",error: err.message});
    }
}

export const logoutGet = (req, res) => {
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}



