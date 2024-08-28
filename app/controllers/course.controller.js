import db from '../models/index.js'

export const postCourses = async (req, res) => {
    try {
        const { name } = req.body;
        const newCourse = await db.course.create({
            name
        });
        res.status(201).json(newCourse);
    }catch (err) {
        res.status(400).json({message:"error creating course",error: err.message});
    }
}

export const getCourses = async (req, res) => {
    try {
        const courses = await db.course.findAll();
        res.status(200).json(courses);
    }catch (err){
        res.status(400).json({message:"error getting courses",error: err.message});
    }
}