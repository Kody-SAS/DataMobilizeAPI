import { eq, sql } from "drizzle-orm";
import { users } from "../db/schema/user.schema";
import { db } from "../utils/db";
import { CreateUserInput, User } from "../dtos/user.dto";
import { reports } from "../db/schema/report.schema";
import { transformData } from "../utils/helper";

const getAll = async () => {
  const res = await db
    .select()
    .from(users)
    .leftJoin(reports, eq(reports.userId, users.id));
  return transformData(res);
};

const getOne = async (id: string): Promise<User> => {
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

const create = async (input: CreateUserInput): Promise<User> => {
  return await db.insert(users).values(input).returning()[0];
};

/**
 * Updates an existing user and returns the new one
 * @param user User - data content to replace user with
 * @returns Updated user
 */
const updateOne = async (user: User): Promise<User> => {
  return await db
    .update(users)
    .set(user)
    .where(eq(users.id, user.id))
    .returning()[0];
};

export default { getOne, getAll, create, getByUsername, updateOne };
