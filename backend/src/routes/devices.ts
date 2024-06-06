import { Router } from 'express';
import { validateRequestBody } from 'zod-express-middleware';

import controller from '../controllers/devices.controller';
import { createDeviceSchema } from '../validation/devices';
import { auth } from '../middlewares/auth';
import { role } from '../middlewares/role';
import { Roles } from '../types/user';

const router = Router();

router.post(
  '/devices',
  auth,
  role(Roles.Admin),
  validateRequestBody(createDeviceSchema),
  controller.createDevice
);

router.get('/devices', auth, role(Roles.Admin), controller.getAllDevices);

router.patch('/devices/:id', auth, role(Roles.Admin), controller.updateDevice);

router.delete('/devices/:id', auth, role(Roles.Admin), controller.deleteDevice);

export default router;
