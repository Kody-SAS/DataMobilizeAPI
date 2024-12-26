import { eq, sql } from "drizzle-orm";
import { users } from "../db/schema/user.schema";
import { db } from "../utils/db";
import { CreateUserInput, User } from "../dtos/user.dto";
import { verifications } from "../db/schema/verification.schema";
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
  const user = await db.select().from(users).where(eq(users.id, id));
  return user.length > 0 ? user[0] : null;
};

const getByUsername = async (username: string) => {
  const user = await db
    .select()
    .from(users)
    .where(sql`${users.username} = ${username}`);
  return user.length > 0 ? user[0] : null;
};

const getByEmail = async (email: string) => {
  const resp = await db.select().from(users).where(eq(users.email, email));
  return resp.length > 0 ? resp[0] : null;
};

const create = async (input: CreateUserInput): Promise<User> => {
  const newUser = await db.insert(users).values(input).returning();
  return newUser[0];
};

/**
 * Updates an existing user and returns the new one
 * @param user User - data content to replace user with
 * @returns Updated user
 */
const updateOne = async (user: User): Promise<User> => {
  const resp = await db
    .update(users)
    .set(user)
    .where(eq(users.id, user.id))
    .returning();
  return resp.length > 0 ? resp[0] : null;
};

const deleteOne = async (id: string) => {
  // remove all verification codes from user
  await db.delete(verifications).where(eq(verifications.userId, id));

  // remove user
  await db.delete(users).where(eq(users.id, id));
};

export default {
  getOne,
  getAll,
  create,
  getByUsername,
  getByEmail,
  updateOne,
  deleteOne,
};
