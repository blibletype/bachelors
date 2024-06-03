import { db } from '../db';
import { Device, CreateDeviceDTO } from '../types/device';
import { devices as devicesTable } from '../db/schema';

class DevicesService {
  public async findAll(): Promise<Device[]> {
    const devices = await db.select().from(devicesTable);
    return devices as Device[];
  }

  public async insertOne(device: CreateDeviceDTO): Promise<Device> {
    const [insertedDevice] = await db
      .insert(devicesTable)
      .values(device)
      .returning();

    return insertedDevice as Device;
  }
}

export default new DevicesService();
