import db from '../models/index.js';
import {Op} from "sequelize";
import http from "http-status-codes";

export const createAppointment = async (req, res) => {
    try {
        const {
            studentId,
            tutorId,
            subject,
            grade,
            comment,
            date,
            time
        } = req.body;

        const student = await db.student.findOne({where: {userId: studentId}});
        const tutor = await db.tutor.findOne({where: {userId: tutorId}});

        if (!student) {
            return res.status(http.NOT_FOUND).json({message: "Student not found"});
        }

        if (!tutor) {
            return res.status(http.NOT_FOUND).json({message: "Tutor not found"});
        }

        const booking = await db.appointment.create({
            id: Date.now().toString(),
            studentId,
            tutorId,
            subject,
            grade,
            comment,
            date,
            time,
            status: "PENDING"
        });

        res.status(http.CREATED).json({message: "Appointment created successfully", booking});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: "Error creating Appointment", error: err.message});
    }
};

export const updateStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status, rejectReason} = req.body;

        const booking = await db.appointment.findByPk(id);

        if (!booking) {
            return res.status(http.NOT_FOUND).json({message: 'Booking not found'});
        }

        booking.status = status;
        if (status === 'REJECTED' && rejectReason) {
            booking.rejectReason = rejectReason;
        }

        await booking.save();

        res.status(http.OK).json({message: 'Booking status updated successfully!', booking});
    } catch (error) {
        res.status(500).json({
            message: 'Error updating booking status',
            error: error.message
        });
    }
};

export const getAppointmentByStatus = async (req, res) => {
    try {
        const {status} = req.params;
        const {userId} = req.query;

        const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({message: 'Invalid status'});
        }

        const whereConditions = {status};
        if (userId) {
            whereConditions[Op.or] = [
                {studentId: userId},
                {tutorId: userId}
            ];
        }

        const bookings = await db.appointment.findAll({
            where: whereConditions,
            include: [
                {
                    model: db.user,
                    as: 'Student',
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: db.user,
                    as: 'Tutor',
                    attributes: ['firstName', 'lastName']
                }
            ]
        });

        res.status(http.OK).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const {id} = req.params;

        const booking = await db.appointment.findByPk(id, {
            include: [
                {
                    model: db.user,
                    as: 'Student',
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: db.user,
                    as: 'Tutor',
                    attributes: ['firstName', 'lastName']
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({message: 'Booking not found'});
        }

        res.status(http.OK).json(booking);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching booking',
            error: error.message
        });
    }
};