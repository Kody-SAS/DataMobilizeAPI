import { sql } from "drizzle-orm";
import { users } from "../db/schema/user.schema";
import { db } from "../utils/db";
import { CreateUserInput } from "../dtos/user.dto";

const getAll = async () => {
  return await db.select().from(users);
};

const getOne = async (id: number) => {
  const user = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${id}`);
  return user.length > 0 ? user[0] : null;
};

const getByUsername = async (username: string) => {
  const user = await db
    .select()
    .from(users)
    .where(sql`${users.username} = ${username}`);
  return user.length > 0 ? user[0] : null;
};

const create = async (input: CreateUserInput) => {
  return await db.insert(users).values(input).returning();
};

export default { getOne, getAll, create, getByUsername };
