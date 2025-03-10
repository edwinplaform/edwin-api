import db from "../models/index.js";
import {createZoomMeeting} from "../service/zoomService.js";
import http from "http-status-codes";
import moment from "moment";

export const createSession = async (req, res) => {
    try {
        const {
            appointmentId,
            studentId,
            tutorId,
            subject,
            date,
            startTime,
            endTime,
        } = req.body;

        // const zoomLink = zoomService();

        const session = await db.session.create({
            id: `SESSION_${Date.now()}`,
            appointmentId,
            studentId,
            tutorId,
            subject,
            date,
            startTime,
            endTime,
            status: 'PENDING'
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
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            return res
                .status(http.BAD_REQUEST)
                .json({error: "No fields provided to update"});
        }

        const session = await db.session.findByPk(sessionId);
        if (!session) {
            return res.status(http.NOT_FOUND).json({error: "session not found"});
        }

        await session.update(updates);
        res
            .status(http.OK)
            .json({message: "Session updated successfully", session});
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
                    model: db.appointment,
                    as: "appointment",
                },
                {
                    model: db.user,
                    as: "student",
                    attributes: ["firstName", "lastName", "email"],
                },
            ],
        });
        res.status(http.OK).json(sessions);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const updateSessionStatus = async (req, res) => {
    try {
        const {sessionId} = req.params;
        const {status} = req.body;

        if (!status) {
            return res.status(http.BAD_REQUEST).json({message: "Status field is required"});
        }

        const validStatuses = ['PENDING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            return res.status(http.BAD_REQUEST).json({message: 'Invalid status'});
        }

        const session = await db.session.findByPk(sessionId);
        if (!session) {
            return res.status(http.NOT_FOUND).json({error: 'Session not found'});
        }

        if (status === "COMPLETED" && session.status !== "SCHEDULED") {
            return res.status(http.BAD_REQUEST).json({message: "Only SCHEDULED session can be marked as COMPLETED"});
        }

        session.status = status;
        if (status === 'SCHEDULED') {
            // session.zoomLink = zoomService();

            const startTime = moment(`${session.date} ${session.startTime}`, 'YYYY-MM-DD HH:mm:ss').toISOString();
            // const endTime = moment(session.endTime, 'HH:mm:ss');
            // const duration = moment.duration(endTime.diff(startTime)).asHours();
            const duration = moment(session.endTime, "HH:mm:ss").diff(moment(session.startTime, "HH:mm:ss"), "minutes");

            const zoomMeeting = await createZoomMeeting(
                `${session.subject} Tutoring Session`,
                startTime,
                duration
            )

            session.zoomLink = zoomMeeting.join_url;
            session.zoomMeetingId = zoomMeeting.id;

            const tutor = await db.tutor.findByPk(session.tutorId);
            const hourlyRate = tutor.hourlyRate;
            const totalAmount = duration * (hourlyRate / 60);

            const invoice = await db.invoice.create({
                invoiceId: `INV_${Date.now()}`,
                sessionId: session.id,
                tutorId: session.tutorId,
                studentId: session.studentId,
                subject: session.subject,
                sessionDuration: duration / 60,
                totalAmount,
                status: 'PENDING'
            });

            await session.save();
            return res.status(http.CREATED).json({message: "Session scheduled successfully", invoice});
        }

        await session.save();
        res.status(http.OK).json({message: "Session updated successfully", session});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};


//     session.status = status;
//     if (status === "SCHEDULED") {
//       session.zoomLink = zoomLinkGenerator();
//
//       const startTime = moment(session.startTime, "HH:mm:ss");
//       const endTime = moment(session.endTime, "HH:mm:ss");
//       const duration = moment.duration(endTime.diff(startTime)).asHours();
//
//       const tutor = await db.tutor.findByPk(session.tutorId);
//       const hourlyRate = tutor.hourlyRate;
//       const totalAmount = duration * hourlyRate;
//
//       const invoice = await db.invoice.create({
//         invoiceId: `INV_${Date.now()}`,
//         sessionId: session.id,
//         tutorId: session.tutorId,
//         studentId: session.studentId,
//         subject: session.subject,
//         sessionDuration: duration,
//         totalAmount,
//         status: "PENDING",
//       });
//
//       await session.save();
//       return res
//         .status(http.CREATED)
//         .json({ message: "Session scheduled successfully", invoice });
//     }
//
//     await session.save();
//     res
//       .status(http.OK)
//       .json({ message: "Session updated successfully", session });
//   } catch (err) {
//     res.status(http.INTERNAL_SERVER_ERROR).json({ message: err.message });
//   }
// };


export const getUserSessions = async (req, res) => {
    const {userId} = req.params;

    try {
        const sessions = await db.session.findAll({
            where: {
                studentId: userId,
                status: "SCHEDULED",
            },
        });

        const formattedSessions = sessions.map((session) => ({
            id: session.id,
            title: `${session.subject} (Tutor: ${session.tutorId})`,
            start: new Date(session.date + "T" + session.startTime),
            end: new Date(session.date + "T" + session.endTime),
            zoomLink: session.zoomLink,
            materialUrl: session.materialUrl,
        }));

        res.json(formattedSessions);
    } catch (error) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};

export const getPaidSessionsForStudent = async (req, res) => {
    try {
        const {studentId} = req.params;

        const sessions = await db.session.findAll({
            include: [
                {
                    model: db.invoice,
                    where: {status: 'APPROVED'},
                    required: true,
                },
                {
                    model: db.user,
                    as: 'tutor',
                    attributes: ['firstName', 'lastName', 'email'],
                },
            ],
            where: {studentId},
        });

        if (sessions.length === 0) {
            return res.status(http.NOT_FOUND).json({message: 'No approved sessions found for this student.'});
        }

        res.status(http.OK).json(sessions);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: 'Error fetching approved sessions', error: err.message});
    }
};
