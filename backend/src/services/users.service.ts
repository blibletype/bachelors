import { eq } from 'drizzle-orm';

import { db } from '../db';
import { CreateUserDTO, User } from '../types/user';
import { users as usersTable } from '../db/schema';

class UsersService {
  public async findOneById(id: string): Promise<User | null> {
    try {
      const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));

      return (users[0] as User) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public async findOneByEmail(email: string): Promise<User | null> {
    try {
      const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      return (users[0] as User) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public async insertOne(user: CreateUserDTO): Promise<User> {
    const [insertedUser] = await db.insert(usersTable).values(user).returning();

    return insertedUser as User;
  };

  public async updateOneById(id: string, user: Partial<User>): Promise<User> {
    const [updatedUser] = await db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id))
      .returning();

    return updatedUser as User;
  };
}

export default new UsersService();
