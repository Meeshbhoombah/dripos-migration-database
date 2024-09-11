import { Router } from 'express';
import { migrateCustomerData } from '../constrollers/migrationController';


const router = Router();
router.post('/', migrateCustomerData);


export default router;


