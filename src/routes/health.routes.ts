import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';

const router = Router();
const accountController = new AccountController();

// Health check endpoint - not documented in Swagger
router.get('/', accountController.healthCheck);

export default router;
