import { pgTable, text } from "drizzle-orm/pg-core";
import { v7 as uuid } from "uuid";

export const categories = pgTable("categories", {
  id: text("id")
    .$defaultFn(() => uuid())
    .primaryKey()
    .notNull()
    .unique(),
  name: text("name").notNull(),
});
