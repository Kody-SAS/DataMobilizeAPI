import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers.schema";
import { v7 as uuid } from "uuid";
import { users } from "./user.schema";

export const verifications = pgTable("verifications", {
  id: text("id").$defaultFn(() => uuid()).primaryKey().notNull().unique(),
  userId: text("userId").references(() => users.id).notNull(),
  code: integer("code").notNull(),
  ...timestamps,
});
