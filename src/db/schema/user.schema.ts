import { pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers.schema";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 30 }).unique(),
  email: varchar().unique().notNull(),
  password: varchar().notNull(),
  localisation: varchar({ length: 30 }),
  ...timestamps,
});
