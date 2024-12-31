import { pgTable, text } from "drizzle-orm/pg-core";
import { v7 as uuid } from "uuid";

export const roads = pgTable("roadTypes", {
  id: text("id")
    .$defaultFn(() => uuid())
    .primaryKey()
    .notNull()
    .unique(),
  name: text("name").notNull(),
  roadType: text("road_type"),
});
