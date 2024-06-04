import { Router } from 'express';

import authController from '../controllers/auth.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/me', auth, authController.getMe);

export default router;