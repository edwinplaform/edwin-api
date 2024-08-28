import express from "express";
import {getCourses, postCourses} from "../controllers/course.controller.js";

const router = express.Router();

router.get("/course", getCourses);
router.post("/course", postCourses);

export default router;