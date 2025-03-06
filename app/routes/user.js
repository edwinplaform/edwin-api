import express from "express";
import { sendEmail } from '../service/emailService.js';
import {
    createUser,
    deleteUser,
    getUserById,
    updateUser,
    upgradeRole,
    listUser,
    getTutorsByStatus,
    updateTutorStatus,
    filterUsers,
    updateBankDetails
} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/upgradeRole', upgradeRole);

router.post('/', async (req, res) => {
    try {
        const user = await createUser(req, res); // Assuming createUser returns the created user object

        // Trigger welcome email
        await sendEmail(user.email, 'Welcome to EDWin!', 'welcomeEmail', { username: user.name });

        res.status(201).json({ message: "User created successfully", user }); //send success response.
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/", listUser);
router.get("/tutors/status/:status", getTutorsByStatus);

router.patch("/tutors/:userId/status", async (req, res) => {
    try{
        const updatedTutor = await updateTutorStatus(req,res);
        if(updatedTutor.status === "approved"){
            await sendEmail(updatedTutor.email, 'Your Tutor Profile Has Been Approved!', 'tutorApprovalEmail', { tutorName: updatedTutor.name });
        }
    }catch(error){
        console.error("error updating tutor status", error)
    }
});

router.get("/filter", filterUsers);
router.patch('/tutors/:userId/bank', updateBankDetails);

export default router;