import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js"
import { protect } from "../middleware/auth.js";

const router = express.Router()
router.get("/admins", protect(['superadmin']), getAdmins);
router.get("/performance/:id", protect(['superadmin']), getUserPerformance);

export default router;