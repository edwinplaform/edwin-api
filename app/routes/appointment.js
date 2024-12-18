import express from "express";
import {
    createAppointment,
    updateStatus,
    getAppointmentByStatus,
    getBookingById,
    deleteAppointment, getAppointmentByTutorId
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/", createAppointment);
router.patch('/:id/status', updateStatus);
router.get('/status/:status', getAppointmentByStatus);
router.get('/:id', getBookingById);
router.delete("/:id", deleteAppointment);
router.get("/tutor/:tutorId",getAppointmentByTutorId);

export default router;