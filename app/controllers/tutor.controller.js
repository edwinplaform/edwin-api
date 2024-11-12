import db from "../models/index.js";
import http from "http-status-codes";
import {Op} from "sequelize";

export const createTutor = async (req, res) => {
    const {
        userId,
        hourlyRate,
        description,
        yearsOfExperience,
        teachingLanguages,
        proofUrl,
        qualification
    } = req.body;

    try {
        const user = await db.user.findOne({where: {clerk_user_id: userId}});

        if (!user) {
            return res.status(http.NOT_FOUND).json({message: "No user found."});
        }

        const tutor = await db.tutor.create({
            user_id: user.id,
            hourly_rate: hourlyRate,
            description: description,
            qualification: JSON.stringify(qualification),
            proof_url: proofUrl,
            years_of_experience: yearsOfExperience,
            teaching_languages: JSON.stringify(teachingLanguages),
            isVerified: false,
        });

        res.status(http.CREATED).json({success: true, tutor});

    } catch (err) {
        console.error("Error creating tutor profile: ", err);
        res.status(http.BAD_REQUEST).json({message: err.message});
    }
};

export const getTutorDetails = async (req, res) => {
    const {tutorId} = req.params;

    try {
        const tutor = await db.tutor.findByPk(tutorId, {
            include: [
                {
                    model: db.user,
                    attributes: ['first_name', 'last_name', 'profile_photo']
                },
                {model: db.subject},
                {model: db.tutorAvailability},
                {
                    model: db.review,
                    include: [{
                        model: db.student,
                        include: [{model: db.user, attributes: ['first_name', 'last_name', 'profile_photo']}]
                    }
                    ]
                }
            ]
        });

        if (!tutor) {
            return res.status(http.NOT_FOUND).json({message: "tutor not found"});
        }

        tutor.qualification = JSON.parse(tutor.qualification);
        tutor.teaching_languages = JSON.parse(tutor.teaching_languages);

        res.status(http.OK).json(tutor);

    } catch (err) {
        console.error("Error fetching tutor profile: ", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};

export const updateTutor = async (req, res) => {
    const {tutorId} = req.params;
    const {
        hourlyRate,
        description,
        qualification,
        proofUrl,
        yearsOfExperience,
        teachingLanguages
    } = req.body;

    try {
        const tutor = await db.tutor.findByPk(tutorId);
        if (!tutor) {
            return res.status(http.NOT_FOUND).json({message: "tutor not found"});
        }

        tutor.hourly_rate = hourlyRate || tutor.hourly_rate;
        tutor.description = description || tutor.description;
        tutor.qualification = qualification ? JSON.stringify(qualification) : tutor.qualification;
        tutor.proof_url = proofUrl || tutor.proof_url;
        tutor.years_of_experience = yearsOfExperience || tutor.years_of_experience;
        tutor.teaching_languages = teachingLanguages ? JSON.stringify(teachingLanguages) : tutor.teaching_languages;

        await tutor.save();

        res.status(http.OK).json({success: true, tutor});

    } catch (err) {
        console.error("Error updating tutor profile: ", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};

export const searchTutors = async (req, res) => {
    const {
        subject,
        hourlyRateMin,
        hourlyRateMax,
        yearsOfExperience,
        language,
        limit = 10,
        offset = 0
    } = req.query;

    try {
        const where = {};
        const includeConditions = [];

        if (hourlyRateMin) {
            where.hourly_rate = {
                [Op.gte]: hourlyRateMin
            };
        }

        if (hourlyRateMax) {
            where.hourly_rate = {
                ...where.hourly_rate,
                [Op.lte]: hourlyRateMax
            };
        }

        if (yearsOfExperience) {
            where.years_of_experience = {
                [Op.gte]: yearsOfExperience
            };
        }

        if (subject) {
            where.teaching_languages = db.Sequelize.literal(
                `teaching_languages::jsonb ? '${language}'`
            );
        }

        const tutors = await db.tutor.findAll({
            where,
            include: [
                {
                    model: db.user,
                    attributes: ['first_name', 'last_name', 'profile_photo']
                },
                ...includeConditions,
                {model: db.tutorAvailability}
            ],
            limit,
            offset
        });

        res.status(http.OK).json(tutors);
    } catch (err) {
        console.error("Error searching tutors: ", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};

export const addTutorAvailability = async (req, res) => {
    const {tutorId} = req.params;
    const {
        day,
        startTime,
        endTime
    } = req.body;

    try {
        const tutor = await db.tutor.findByPk(tutorId);
        if (!tutor) {
            return res.status(http.NOT_FOUND).json({message: "tutor not found"});
        }

        const availability = db.tutorAvailability.create({
            tutor_id: tutorId,
            day_of_week: day,
            start_time: startTime,
            end_time: endTime
        });

        res.status(http.CREATED).json({success: true, availability});
    } catch (err) {
        console.error("Error adding tutor availability", err);
        res.status(http.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
};










