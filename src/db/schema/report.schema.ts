import { jsonb, numeric, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers.schema";
import { v7 as uuid } from "uuid";
import { users } from "./user.schema";

export const reports = pgTable("reports", {
  id: text("id")
    .$defaultFn(() => uuid())
    .primaryKey()
    .notNull()
    .unique(),
  description: text("description").notNull(),
  localisation: varchar("localisation", { length: 255 }).notNull(),
  roadType: text("road_type"),
  category: text("category"),
  photos: jsonb("photos").notNull(),
  latitude: numeric("latitude").notNull(),
  longitude: numeric("longitude").notNull(),
  userId: text("userId").references(() => users.id),
  ...timestamps,
});
