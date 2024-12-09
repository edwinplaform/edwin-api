import db from "../models/index.js";
import zoomLinkGenerator from "../service/zoomLinkGenerator.js";
import http from "http-status-codes";

export const createSession = async (req, res) => {
    try {
        const {
            appointmentId,
            studentId,
            tutorId,
            subject,
            startTime,
            endTime,
            materialUrl
        } = req.body;

        const zoomLink = zoomLinkGenerator();

        const session = await db.session.create({
            id: `SESSION_${Date.now()}`,
            appointmentId,
            studentId,
            tutorId,
            subject,
            startTime,
            endTime,
            zoomLink,
            materialUrl,
            status: 'SCHEDULED'
        });

        // const student = await db.user.findByPk(studentId);
        // const tutor = await db.user.findByPk(tutorId);
        // sendSessionNotification(student.email, tutor, session);

        res.status(http.CREATED).json(session);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const updateSession = async (req, res) => {
    try {
        const {sessionId} = req.params;
        const updateData = req.body

        const session = await db.session.findByPk(sessionId);
        if (!session) {
            return res.status(http.NOT_FOUND).json({error: 'session not found'});
        }

        const updatedSession = await db.session.update(updateData);
        res.status(http.OK).json(updatedSession);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const getTutorSession = async (req, res) => {
    try {
        const {tutorId} = req.params;
        const sessions = await db.session.findAll({
            where: {tutorId},
            include: [
                {
                    model: db.user,
                    as: 'student',
                    attributes: ['firstName', 'lastName', 'email']
                }
            ]
        });
        res.status(http.OK).json(sessions);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};