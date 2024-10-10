import { Router } from 'express';
import { cleanData, cleanRedis, cleanMongo } from '../controllers/cleanController';


const router = Router();
router.get('/', cleanData);
router.get('/redis', cleanRedis);
router.get('/mongo', cleanMongo);

export default router;

