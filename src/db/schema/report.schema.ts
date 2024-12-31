import { jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers.schema";
import { v7 as uuid } from "uuid";
import { users } from "./user.schema";

const roadTypeEnum = [
  "Section",
  "Intersection",
  "Station",
  "Bridge",
  "Other",
] as const;

const categoryEnum = [
  "Safety Perception",
  "Crash Reporting",
  "Infrastructure Issue",
  "Audit",
  "Other",
] as const;

export const reports = pgTable("reports", {
  id: text("id")
    .$defaultFn(() => uuid())
    .primaryKey()
    .notNull()
    .unique(),
  description: text("description").notNull(),
  localisation: varchar("localisation", { length: 255 }).notNull(),
  roadType: text("road_type", { enum: roadTypeEnum }).notNull(),
  category: text("category", { enum: categoryEnum }).notNull(),
  photos: jsonb("photos").notNull(),
  userId: text("userId").references(() => users.id),
  ...timestamps,
});
