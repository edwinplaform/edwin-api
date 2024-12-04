import db from "../models/index.js";
import http from "http-status-codes";
import {Op} from "sequelize";
import err from "jsonwebtoken/lib/JsonWebTokenError.js";

export const createStudent = async (req, res) => {
    const {
        userId,
        grade
    } = req.body;

    try {
        const user = await db.user.findOne({
            where: {clerk_user_id: userId}
        });

        if (!user) {
            return res.status(http.NOT_FOUND).json({message: "User not found"});
        }

        const student = await db.student.create({
            user_id: user.id
        });

        res.status(http.CREATED).json({success: true, student});

    } catch (err) {
        console.log("Error creating student profile.", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
}

export const getStudentAppointments = async (req, res) => {
    const {studentId} = req.params;
    const {status} = req.query;

    try {
        const whereCondition = {student_id: studentId};

        if (status) {
            whereCondition.status = status;
        }

        const appointments = await db.appointment.findAll({
            where: whereCondition,
            include: [
                {
                    model: db.tutor,
                    include: [
                        {
                            model: db.user,
                            attributes: ['first_name', 'last_name', 'profile_photo']
                        }
                    ]
                },
                {
                    model: db.subject
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(http.OK).json(appointments);
    } catch (err) {
        console.log("Error getting student appointments.", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};

export const bookAppointment = async (req, res) => {
    const {
        studentId,
        tutorId,
        subjectId,
        date,
        startTime,
        endTime,
        notes
    } = req.body;

    try {
        const tutorAvailability = await db.tutorAvailability.findOne({
            where: {
                tutor_id: tutorId,
                day: new Date(date).toLocaleString('en-US', {weekday: 'long'}),
                start_time: {[Op.lte]: startTime},
                end_time: {[Op.gte]: endTime}
            }
        });

        if (!tutorAvailability) {
            return res.status(http.NOT_FOUND).json({message: err.message});
        }

        const conflictingAppointment = await db.appointment.findOne({
            where: {
                tutor_id: tutorId,
                date,
                [Op.or]: [
                    {
                        start_time: {[Op.between]: [startTime, endTime]}
                    },
                    {
                        end_time: {[Op.between]: {startTime, endTime}}
                    }
                ]
            }
        });

        if (conflictingAppointment) {
            return res.status(http.BAD_REQUEST).json({message: err.message});
        }

        const appointment = await db.appointment.create({
            student_id: studentId,
            tutor_id: tutorId,
            subject_id: subjectId,
            proposed_date: date,
            start_time: startTime,
            end_time: endTime,
            notes: notes,
        });

        res.status(http.CREATED).json({success: true, appointment});

    } catch (err) {
        console.log("Error booking appointment: ", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};

export const cancelAppointment = async (req, res) => {
    const {appointmentId} = req.params;

    try {
        const appointment = await db.appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(http.NOT_FOUND).json({message: "Appointment not found"});
        }

        await appointment.destroy();
        res.status(http.OK).json({success: true, message: "Appointment canceled successfully."});

    } catch (err) {
        console.log("Error canceling appointment: ", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};