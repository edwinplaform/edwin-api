import {clerkClient} from "@clerk/express";
import dotenv from "dotenv";
import http from "http-status-codes"
import db from "../models/index.js";

dotenv.config();

export const upgradeRole = async (req, res) => {
    const {userId, role, isOnboarding} = req.body;
    console.log(userId, role);

    try {
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: role,
                isOnboarding: isOnboarding,
            },
        })
        res.status(200).json({success: true});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


export const createUser = async (req, res) => {
    // const userId = req.auth.userId;
    const {userId, first_name, last_name, email, profile_photo, contact_number, role} = req.body;

    try {
        const user = await db.user.create({
            clerk_user_id: userId,
            first_name: first_name,
            last_name: last_name,
            email: email,
            profile_photo: profile_photo,
            contact_number: contact_number,
            role: role,
        });

        await clerkClient.users.updateUser(userId, {
            firstName: first_name,
            lastName: last_name,
            profileImageID: profile_photo,
        });

        res.status(http.CREATED).json({success: true, user});

    } catch (err) {
        console.error("Error creating user", err);
        res.status(http.BAD_REQUEST).json({message: err.message});
    }
};

export const getUser = async (req, res) => {
    const {userId} = req.params;

    try {
        const user = await db.user.findOne({
            where: {clerk_user_id: userId},
            include: [
                {model: db.student, attributes: ['student_id']},
                {model: db.tutor, attributes: ['tutor_id', 'hourly_rate', 'description']}
            ]
        });

        if (!user) {
            return res.status(http.NOT_FOUND).json({message: "no student"});
        }

        res.status(http.OK).json(user);
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
}

export const updateUser = async (req, res) => {
    const {userId} = req.params;
    const {first_name, last_name, email} = req.body;

    try {
        const user = await db.user.findOne({where: {clerk_user_id: userId}});

        if (!user) {
            return res.status(http.NOT_FOUND).json({message: "User not found"});
        }

        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;

        await user.save();

        res.status(http.OK).json({success: true, user});
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
}


export const deleteUser = async (req, res) => {
    const {userId} = req.params;

    try {
        await clerkClient.users.deleteUser(userId);

        await db.user.destroy({where: {clerk_user_id: userId}});

        res.status(http.OK).json({success: true, message: "successfully user deleted"});
    } catch (err) {
        console.error("Error deleting user", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};



