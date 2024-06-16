import { z } from 'zod';

export const createDeviceSchema = z.strictObject({
  name: z.string().min(3).max(255),
});

export const createDeviceDataSchema = z.strictObject({
  current: z.string(),
  power: z.string(),
});