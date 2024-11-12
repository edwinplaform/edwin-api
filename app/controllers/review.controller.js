import db from "../models/index.js";
import http from "http-status-codes";

export const createReview = async (req, res) => {
    const {tutorId, studentId, rating, comment} = req.body;

    try {
        const review = await db.review.create({
            tutor_id: tutorId,
            student_id: studentId,
            rating: rating,
            comment: comment
        });

        res.status(http.CREATED).json({status: "success", review});

    } catch (err) {
        console.error("Error creating review", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};

export const getReview = async (req, res) => {
    const {tutorId} = req.params;

    try {
        const review = await db.review.findAll({
            where: {tutor_id: tutorId},
            include: [{
                //check--------------------
                model: db.student, attributes:['first_name', 'last_name']
            }]
        });

        res.status(http.OK).json(review);
    }catch (err){
        console.error("Error getting review", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
}