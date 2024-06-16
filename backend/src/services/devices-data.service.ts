import { db } from "../db";
import { devicesData as devicesDataTable } from "../db/schema";
import { devices as devicesTable } from "../db/schema";
import { users as usersTable } from "../db/schema";
import { eq, and, between, asc } from "drizzle-orm";
import { CreateDeviceDataDTO, DeviceData } from "../types/devices-data";

class DevicesDataService {
  public async findAllInRangeByUserId(
    userId: string,
    start: Date,
    end: Date
  ): Promise<DeviceData[]> {
    const result = await db
      .select()
      .from(devicesDataTable)
      .leftJoin(devicesTable, eq(devicesDataTable.deviceId, devicesTable.id))
      .leftJoin(usersTable, eq(devicesTable.userId, usersTable.id))
      .where(
        and(
          eq(usersTable.id, userId),
          between(devicesDataTable.timestamp, start, end)
        )
      )
      .orderBy(asc(devicesDataTable.timestamp))
      .limit(50);

      return result.map((item) => item.devicesData as DeviceData);
  }

  public async insertOne(data: CreateDeviceDataDTO) {
    const [insertedData] = await db
      .insert(devicesDataTable)
      .values(data)
      .returning();

    return insertedData;
  }
}

export default new DevicesDataService();