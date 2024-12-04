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
    const {
        userId,
        firstName,
        lastName,
        phone,
        address,
        subjects,
        qualifications,
        availability,
        certificateUrl,
        description,
        hourlyRate,
        status,
        role
    } = req.body;

    const t = await db.sequelize.transaction();

    try {
        const user = await db.user.create({
            userId,
            firstName,
            lastName,
            phone,
            address,
            role
        }, {transaction: t});

        if (role === 'TUTOR') {
            await db.tutor.create({
                userId,
                subjects,
                qualifications: qualifications || null,
                availability: availability || null,
                certificateUrl: certificateUrl || null,
                description: description || null,
                hourlyRate: hourlyRate || null,
                status: status || "PENDING"
            }, {transaction: t});
        } else if (role === 'STUDENT') {
            await db.student.create({
                userId,
                subjects
            }, {transaction: t});
        }

        await t.commit();
        res.status(http.CREATED).json({message: "User created successfully ", user});
    } catch (err) {
        await t.rollback();
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error creating user", error: err.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await db.user.findByPk(req.params.userId, {
            include: [
                {model: db.tutor, required: false},
                {model: db.student, required: false}
            ]
        });

        if (!user) {
            return res.status(http.NOT_FOUND).json({message: 'User not found'});
        }
        res.status(http.OK).json(user);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error fetching user", error: err.message});
    }
};

export const updateUser = async (req, res) => {
    const {userId} = req.params;
    const {
        firstName,
        lastName,
        phone,
        address,
        subjects,
        qualifications,
        availability,
        certificateUrl,
        description,
        hourlyRate,
        status,
        role
    } = req.body;

    const t = await db.sequelize.transaction();

    try {
        const [userUpdated] = await db.user.update({
            firstName,
            lastName,
            phone,
            address,
            role
        }, {
            where: {userId},
            transaction: t
        });

        if (role === 'TUTOR') {
            await db.tutor.update({
                subjects,
                qualifications: qualifications || null,
                availability: availability || null,
                certificateUrl: certificateUrl || null,
                description: description || null,
                hourlyRate: hourlyRate || null,
                status: status || 'PENDING'
            }, {
                where: {userId},
                transaction: t
            });
        } else if (role === 'STUDENT') {
            await db.student.update({
                subjects
            }, {
                where: {userId},
                transaction: t
            });
        }

        await t.commit();
        res.status({message: 'User updated successfully', updated: userUpdated > 0});
    } catch (err) {
        await t.rollback();
        res.status(http.INTERNAL_SERVER_ERROR).json({message: 'Error updating user', error: err.message});
    }
};

export const listUser = async (req, res) => {
    try {
        const {role} = req.query;
        let users;

        if (role === 'TUTOR') {
            users = await db.user.findAll({
                where: {role: 'TUTOR'},
                include: [{
                    model: db.tutor,
                    required: true
                }]
            });
        } else if (role === 'STUDENT') {
            users = await db.user.findAll({
                where: {role: 'STUDENT'},
                include: [{
                    model: db.student,
                    required: true
                }]
            });
        } else {
            users = await db.user.findAll({
                include: [
                    {model: db.tutor, required: false},
                    {model: db.student, required: false}
                ]
            });
        }

        res.status(http.OK).json(users);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: 'Error listing users', error: err.message});
    }
};

export const deleteUser = async (req, res) => {
    const {userId} = req.params;
    const t = await db.sequelize.transaction();

    try {
        await db.tutor.destroy({
            where: {userId},
            transaction: t
        });

        await db.student.destroy({
            where: {userId},
            transaction: t
        });

        const userDeleted = await db.user.destroy({
            where: {userId},
            transaction: t
        });

        await t.commit();
        res.status(http.OK).json({message: 'User deleted', deleted: userDeleted > 0});
    } catch (err) {
        await t.rollback();
        res.status(http.INTERNAL_SERVER_ERROR).json({message: 'Error deleting user', error: err.message});
    }
};



