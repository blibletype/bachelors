import { Router } from 'express';
import { validateRequestBody } from 'zod-express-middleware';

import { createUserSchema } from '../validation/users';
import authController from '../controllers/auth.controller';

const router = Router();

router.post(
  '/register',
  validateRequestBody(createUserSchema),
  authController.register
);

router.post(
  '/login',
  validateRequestBody(createUserSchema),
  authController.login
);

export default router;
