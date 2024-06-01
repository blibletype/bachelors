import { pgTable, uuid, varchar, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { Roles } from '../types/user';
import { DeviceStatus } from '../types/device';

export const roles = pgEnum('roles', Object.values(Roles) as [string]);
export const deviceStatus = pgEnum(
  'deviceStatus',
  Object.values(DeviceStatus) as [string]
);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: roles('role').notNull().default(Roles.User),
  accessToken: varchar('accessToken', { length: 255 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const devices = pgTable('devices', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: uuid('userId').references(() => users.id),
  status: deviceStatus('status').notNull().default(DeviceStatus.Offline),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
