import dotenv from "dotenv";
import {Op} from "sequelize";
import http from "http-status-codes"
import db from "../models/index.js";

dotenv.config();

// export const upgradeRole = async (req, res) => {
//     const {userId, role, isOnboarding} = req.body;
//     console.log(userId, role);
//
//     try {
//         await clerkClient.users.updateUserMetadata(userId, {
//             publicMetadata: {
//                 role: role,
//                 isOnboarding: isOnboarding,
//             },
//         })
//         res.status(http.OK).json({success: true});
//     } catch (error) {
//         console.error("Error updating user metadata:", error);
//         res.status(http.INTERNAL_SERVER_ERROR).json({message: error.message});
//     }
// };

export const createUser = async (req, res) => {
    const {userId} = req.params;
    const {
        firstName,
        lastName,
        phone,
        profilePhotoUrl,
        address,
        subjects,
        qualifications,
        availability,
        certificateUrl,
        description,
        hourlyRate,
        status,
        role,
        isOnboarding
    } = req.body;

    console.log("UserID:", userId);

    const t = await db.sequelize.transaction();

    try {
        const user = await db.user.findByPk(userId);
        if (!user) {
            return res.status(http.NOT_FOUND).json({message: "User not found"});
        }

        await db.user.update({
            firstName,
            lastName,
            phone,
            profilePhotoUrl,
            address,
            isOnboarding
        }, {where: {userId}, transaction: t});

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
        console.log(err);
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

export const getTutorsByStatus = async (req, res) => {
    try {
        const {status} = req.params;

        const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED'];
        if (!validStatuses.includes(status)) {
            return res.status(http.NOT_FOUND).json({message: "Invalid status. Must be one of: PENDING, ACCEPTED, REJECTED"});
        }

        const tutors = await db.tutor.findAll({
            where: {status},
            include: [{
                model: db.user,
                attributes: ['firstName', 'lastName', 'phone', 'address','profilePhotoUrl']
            }],
            // order: [['createdAt', 'DESC']]
        });

        res.status(http.OK).json(tutors);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: 'Error fetching tutors by status.', error: err.message});
    }
};

export const updateTutorStatus = async (req, res) => {
    const {userId} = req.params;
    const {status} = req.body;


    const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(http.NOT_FOUND).json({message: "Invalid status. Must be one of: PENDING, ACCEPTED, REJECTED"});
    }
    //if statement to be done
    const t = await db.sequelize.transaction();

    try {
        const [updatedRows] = await db.tutor.update(
            {status},
            {
                where: {userId},
                transaction: t
            }
        );

        if (updatedRows === 0) {
            await t.rollback();
            return res.status(http.NOT_FOUND).json({message: 'Tutor not found!'});
        }

        await t.commit();
        res.status(http.OK).json({message: 'Tutor status updated successfully!', status});
    } catch (err) {
        await t.rollback();
        res.status(http.INTERNAL_SERVER_ERROR).json({message: 'Error updating tutor status.', error: err.message});
    }
};

export const filterUsers = async (req, res) => {
    try {
        const {
            role,
            subjects,
            minRate,
            maxRate,
            page = 1,
            pageSize = 10
        } = req.query;

        const userWhere = {};
        const tutorWhere = {};
        const studentWhere = {};

        if (subjects) {
            const subjectArray = Array.isArray(subjects)
                ? subjects : [subjects];

            if (role === 'TUTOR') {
                tutorWhere.subjects = {
                    [Op.overlap]: subjectArray
                };
            }
        }

        if (minRate || maxRate) {
            tutorWhere.hourlyRate = {};
            if (minRate) tutorWhere.hourlyRate[Op.gte] = minRate;
            if (maxRate) tutorWhere.hourlyRate[Op.lte] = maxRate;
        }

        const offset = (page - 1) * pageSize;

        let users;
        let total;

        if (role === 'TUTOR') {
            const result = await db.user.findAndCountAll({
                where: userWhere,
                include: [{
                    model: db.tutor,
                    where: tutorWhere,
                    required: true
                }],
                limit: parseInt(pageSize),
                offset: offset
            });

            users = result.rows;
            total = result.count;
        } else {
            const result = await db.user.findAndCountAll({
                where: userWhere,
                include: [
                    {
                        model: db.tutor,
                        where: tutorWhere,
                        required: false
                    },
                    {
                        model: db.student,
                        where: studentWhere,
                        required: false
                    }
                ],
                limit: parseInt(pageSize),
                offset: offset
            });
            users = result.rows;
            total = result.count;
        }

        res.status(http.OK).json({
            users,
            pagination: {
                total,
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                totalPages: Math.ceil(total / pageSize)
            }
        });
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error filtering users", error: err.message});
    }
};

export const updateBankDetails = async (req, res) => {
    const {userId} = req.params;
    const {bank, accountNumber, branch, holderName} = req.body;

    const t = await db.sequelize.transaction();

    try {
        const tutor = await db.tutor.findByPk(userId);
        if (!tutor) {
            return res.status(http.NOT_FOUND).json({message: "Tutor not found!"});
        }

        await tutor.update({
            bankDetails: {
                bank,
                accountNumber,
                branch,
                holderName
            }
        }, {transaction: t});

        await t.commit();
        res.status(http.OK).json({message: "Bank details updated successfully!"});
    } catch (err) {
        await t.rollback();
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error updating bank details: ", err});
    }
};
