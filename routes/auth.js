import express from 'express';
import { login, logoutUser, register } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logoutUser);

export default router;