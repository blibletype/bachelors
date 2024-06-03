import { Router } from 'express';
import { validateRequestBody } from 'zod-express-middleware';

import { createUserSchema } from '../validation/users';
import authController from '../controllers/auth.controller';

const router = Router();

router.post(
  '/signup',
  validateRequestBody(createUserSchema),
  authController.signup
);

router.post(
  '/signin',
  validateRequestBody(createUserSchema),
  authController.signin
);

export default router;
