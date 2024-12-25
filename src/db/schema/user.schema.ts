import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers.schema";
import { v7 as uuid } from "uuid";

export const users = pgTable("users", {
  id: text("id")
    .$defaultFn(() => uuid())
    .primaryKey()
    .notNull()
    .unique(),
  username: varchar("username", { length: 30 }),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  localisation: varchar("localisation", { length: 30 }),
  // type reports
  isVerified: boolean("isVerified").default(false),
  ...timestamps,
});
