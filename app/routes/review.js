import express from 'express';
import {createReview, getReview} from "../controllers/review.controller.js";


const  router = express.Router();

router.post('/review', createReview);
router.get('/tutors/:tutorId/reviews', getReview);

export default router;