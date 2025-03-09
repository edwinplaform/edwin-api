import express from 'express';
import {createReview, getReviewsBySessionId, getTutorReviews} from "../controllers/review.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/reviews',authMiddleware, createReview);
router.get('/reviews/tutor/:tutorId', getTutorReviews);
router.get("/reviews/session/:sessionId", getReviewsBySessionId);

export default router;