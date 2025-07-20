import express from 'express'
const router = express.Router();

import { checkflags, closeflag, checkItemsDetails } from '../controllers/flag.js'

router.get('/checkflags', checkflags);
router.post('/closeflags', closeflag);
router.get('/getItemDetails', checkItemsDetails);

export default router;