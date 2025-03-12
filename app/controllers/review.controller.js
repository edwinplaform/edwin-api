import db from "../models/index.js";
import http from "http-status-codes";

export const createReview = async (req, res) => {
    try {
        const {
            userId,
            sessionId,
            rating,
            title,
            comment
        } = req.body;
        const studentId = userId;

        const session = await db.session.findByPk(sessionId);
        if (!session) {
            return res.status(http.NOT_FOUND).json({error: "Session not found"});
        }
        if (session.status !== 'COMPLETED') {
            return res.status(http.BAD_REQUEST).json({error: "Session must be completed to leave a review"});
        }
        if (session.studentId !== studentId) {
            return res.status(http.FORBIDDEN).json({error: "You can only review your own sessions"});
        }

        const existingReview = await db.review.findOne({where: {sessionId, studentId}});
        if (existingReview) {
            return res.status(http.BAD_REQUEST).json({error: "You have already reviewed this session"});
        }

        const review = await db.review.create({
            id: `REVIEW_${Date.now()}`,
            sessionId,
            studentId,
            tutorId: session.tutorId,
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
                    as: "student",
                    attributes: ['firstName', 'lastName']
                }
            ]
        });

        const transformedReviews = reviews.map((review) => ({
            title: review.title,
            User: review.student,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        }));

        res.status(http.OK).json(transformedReviews);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const getReviewsBySessionId = async (req, res) => {
    try {
        const {sessionId} = req.params;
        const reviews = await db.review.findAll({where: {sessionId}});
        res.status(http.OK).json(reviews);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};