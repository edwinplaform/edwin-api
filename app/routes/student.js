import express from "express";
import {getAllStudent, getStudent, postStudent} from "../controllers/student.contoller.js";

const router = express.Router();

router.post("/student", postStudent);
router.get("/student", getAllStudent);
router.get("/student/:id", getStudent);

export default router;