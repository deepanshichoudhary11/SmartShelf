import express from 'express';
const router = express.Router();

import { SignUp, Login } from '../controllers/Auth.js'

router.post("/signup", SignUp);
router.post("/login", Login);

export default router