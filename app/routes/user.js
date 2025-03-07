import express from "express";

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

// import {validateUser} from "../middleware/validationMiddleware.js";

// import {validateResults} from "../middleware/validationResult.js";

const router = express.Router();

router.post('/upgradeRole', upgradeRole);
router.post('/', createUser);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/", listUser);
router.get("/tutors/status/:status", getTutorsByStatus);
router.patch("/tutors/:userId/status", updateTutorStatus);
router.get("/filter", filterUsers);
router.patch('/tutors/:userId/bank', updateBankDetails);

export default router;