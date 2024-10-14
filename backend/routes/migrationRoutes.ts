import { Router } from 'express';
import { migrateCustomerData } from '../controllers/migrationController';


const router = Router();
router.post('/', migrateCustomerData);


export default router;

