import express from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    updateUser,
    listUser,
    getTutorsByStatus,
    updateTutorStatus,
    filterUsers,
    updateBankDetails
} from "../controllers/user.controller.js";

const router = express.Router();

router.patch('/:userId', createUser);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/", listUser);
router.get("/tutors/status/:status", getTutorsByStatus);
router.patch("/tutors/:userId/status", updateTutorStatus);
router.get("/filter", filterUsers);
router.patch('/tutors/:userId/bank', updateBankDetails);

export default router;
