import { Router } from 'express';
import { handleWebhookEvent } from '../controllers/webhookController';


const router = Router();
router.post('/', handleWebhookEvent);


export default router;

