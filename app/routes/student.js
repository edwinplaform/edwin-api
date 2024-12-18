import express from "express";
import {createStudent, getStudentAppointments, bookAppointment,cancelAppointment} from "../controllers/student.contoller.js";

const router = express.Router();

// router.post("/student", postStudent);
// router.get("/student", getAllStudent);
// router.get("/student/:id", getStudent);

export default router;