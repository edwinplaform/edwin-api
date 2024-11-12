import express from "express";
import {createUser, deleteUser, getUser, updateUser, upgradeRole} from "../controllers/user.controller.js";
import {validateUser} from "../middleware/validationMiddleware.js";
import {validateResults} from "../middleware/validationResult.js";

const router = express.Router();

router.post('/upgradeRole', upgradeRole);
router.post('/create', validateUser, validateResults, createUser);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
