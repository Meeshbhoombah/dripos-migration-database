import { Router } from 'express';

import { handle } from '../controllers/webhook';


const router = Router();
router.post('/', handle);


export default router;

