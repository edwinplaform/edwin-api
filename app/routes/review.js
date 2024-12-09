import express from 'express';
import {createReview, getTutorReviews} from "../controllers/review.controller.js";

const router = express.Router();

router.post('/review', createReview);
router.get('/tutors/:tutorId/reviews', getTutorReviews);

export default router;