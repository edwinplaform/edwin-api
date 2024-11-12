import db from "../models/index.js";
import http from "http-status-codes";

export const postStudent = async (req, res) => {
    try {
        const {id, username, firstName, lastName, email, phone, image} = req.body;
        const newStudent = await db.student.create({
            id: id,
            username: username,
            firstname: firstName,
            lastname: lastName,
            email: email,
            image: image,
            phone: phone
        });

        return res.status(http.CREATED).json(newStudent);

    }catch (err){
        return res.status(http.BAD_REQUEST).json({message:"error creating student",error: err.message});
    }
}

export const getAllStudent = async (req,res) => {
    try {
        const students = await db.student.findAll();
        res.status(http.OK).json(students);

    } catch (err){
        return res.status(http.BAD_REQUEST).json({message:"error getting students",error: err.message});
    }
}

export const getStudent = async (req, res) => {
    try {
        const {id}  = req.params;
        const student = await db.student.findOne({where: {id: id}});
        if (student === null) {
            return res.status(http.OK).json({message:"no student"});
        }
        res.status(http.OK).json(student);

    } catch (err) {
        return res.status(http.BAD_REQUEST).json({message:"error getting student",error: err.message});
    }
}