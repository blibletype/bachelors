import { z } from 'zod';

export const createDeviceSchema = z.strictObject({
  name: z.string().min(3).max(255),
});