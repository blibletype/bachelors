export enum Roles {
  Admin = 'admin',
  User = 'user',
  Device = 'device',
};

export type User = {
  id: string;
  email: string;
  password: string;
  role: Roles;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
};