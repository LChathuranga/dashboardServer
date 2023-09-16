import express from "express";
import { getSales } from "../controllers/sales.js";
import { protect } from "../middleware/auth.js";

const router = express.Router()
router.get("/sales", protect(['admin', 'superadmin']), getSales);

export default router;