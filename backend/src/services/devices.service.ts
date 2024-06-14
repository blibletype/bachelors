import { db } from "../db";
import { Device, CreateDeviceDTO, UpdateDeviceDTO } from "../types/device";
import { devices as devicesTable } from "../db/schema";
import { eq } from "drizzle-orm";

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

  public async updateOneById(
    id: string,
    device: UpdateDeviceDTO
  ): Promise<Device> {
    const [updatedDevice] = await db
      .update(devicesTable)
      .set(device)
      .where(eq(devicesTable.id, id))
      .returning();

    return updatedDevice as Device;
  }

  public async deleteOneById(id: string): Promise<void> {
    await db.delete(devicesTable).where(eq(devicesTable.id, id));
  }
}

export default new DevicesService();
