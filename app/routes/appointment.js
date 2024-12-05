import express from "express";
import {
    createAppointment,
    updateStatus,
    getAppointmentByStatus,
    getBookingById
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/create",createAppointment);
router.patch('/:id/status',updateStatus);
router.get('/status/:status',getAppointmentByStatus);
router.get('/:id',getBookingById);

export default router;