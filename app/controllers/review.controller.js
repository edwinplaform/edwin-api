import db from "../models/index.js";
import http from "http-status-codes";

export const createReview = async (req, res) => {
    try {
        const {
            sessionId,
            studentId,
            tutorId,
            rating,
            title,
            comment
        } = req.body;

        const session = await db.session.findByPk(sessionId);
        if (session.status !== 'COMPLETED') {
            return res.status(http.BAD_REQUEST).json({message: "Session must be completed to leave a review"});
        }

        const review = await db.review.create({
            id: `REVIEW_${Date.now()}`,
            sessionId,
            studentId,
            tutorId,
            rating,
            title,
            comment
        });

        

        res.status(http.CREATED).json({message: "Review has been created", review});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const getTutorReviews = async (req, res) => {
    try {
        const {tutorId} = req.params;
        const reviews = await db.review.findAll({
            where: {tutorId},
            include: [
                {
                    model: db.user,
                    attributes: ['firstName', 'lastName']
                }
            ]
        });
        res.status(http.OK).json(reviews);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};