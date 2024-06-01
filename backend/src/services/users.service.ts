import { User } from '../types/user';
import { db } from '../db';
import { users as usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export const findOneById = async (id: string): Promise<User | null> => {
  try {
    const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return (users[0] as User) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
