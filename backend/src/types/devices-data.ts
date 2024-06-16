export type DeviceData = {
  id: string;
  deviceId: string;
  current: string;
  power: string;
  timestamp: Date;
};

export type CreateDeviceDataDTO = Pick<
  DeviceData,
  'deviceId' | 'current' | 'power'
>;
