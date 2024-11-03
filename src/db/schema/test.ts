import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  test: varchar(),
});
