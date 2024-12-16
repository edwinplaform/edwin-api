import express from "express";
import {
    createSession,
    updateSession,
    getTutorSession,
    updateSessionStatus, getPaidSessionsForStudent
} from "../controllers/session.controller.js";

const router = express.Router();

router.post('/sessions', createSession);
router.put('/sessions/:sessionId', updateSession);
router.get('/tutors/:tutorId/sessions', getTutorSession);
router.patch('/sessions/:sessionId/status', updateSessionStatus)
router.get('/students/:studentId/sessions/paid', getPaidSessionsForStudent);

export default router;