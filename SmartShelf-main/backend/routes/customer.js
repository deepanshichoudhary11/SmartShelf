import express from 'express';
const router = express.Router();
import { flagItem, fetchPointsByEmail } from '../controllers/flag.js'

router.post('/flagItem', flagItem);
router.get('/fetchPoints', fetchPointsByEmail);

export default router