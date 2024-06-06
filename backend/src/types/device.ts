export enum DeviceStatus {
  Online = 'online',
  Offline = 'offline',
}

export type Device = {
  id: string;
  name: string;
  userId?: string;
  status: DeviceStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateDeviceDTO = Pick<Device, 'name'> & Partial<Omit<Device, 'name' | 'id'>>;

export type UpdateDeviceDTO = Partial<CreateDeviceDTO>;
