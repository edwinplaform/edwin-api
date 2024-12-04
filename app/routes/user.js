import express from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    updateUser,
    upgradeRole,
    listUser
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

export default router;
