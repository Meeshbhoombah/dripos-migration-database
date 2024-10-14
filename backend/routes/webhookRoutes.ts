import { Router } from 'express';
import { handle } from '../controllers/webhookController';


const router = Router();
router.post('/', handle);


export default router;

