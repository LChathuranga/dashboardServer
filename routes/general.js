import express from "express";
import { getUser, getDashboardStat } from "../controllers/general.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.get('/user/:id', getUser);
router.get('/dashboard', protect(['superadmin']), getDashboardStat);

export default router;