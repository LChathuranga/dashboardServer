import express from "express";
import { getCustomers, getGeoGraphy, getProducts, getTransactions } from '../controllers/client.js'
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/products", getProducts);
router.get("/customers", protect(['admin', 'superadmin']), getCustomers);
router.get("/transactions", protect(['admin', 'superadmin']), getTransactions);
router.get("/geography", protect(['admin', 'superadmin']), getGeoGraphy);

export default router;