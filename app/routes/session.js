import express from "express";
import {
    createSession,
    updateSession,
    getTutorSession
} from "../controllers/session.controller.js";

const router = express.Router();

router.post('/sessions', createSession);
router.put('/sessions/:sessionId', updateSession);
router.get('/tutors/:tutorId/sessions', getTutorSession);

export default router;