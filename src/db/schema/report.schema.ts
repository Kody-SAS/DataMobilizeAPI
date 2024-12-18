import { jsonb, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers.schema";
import { v7 as uuid } from "uuid";
import { users } from "./user.schema";

export const issueTypeEnum = pgEnum("issue_type", [
  "Incident",
  "Audit",
  "Quick Reporting",
  "Safety Perception",
]);

export const reports = pgTable("reports", {
  id: text("id")
    .$defaultFn(() => uuid())
    .primaryKey()
    .notNull()
    .unique(),
  description: text("description"),
  type: issueTypeEnum("issueType").notNull(),
  localisation: varchar("localisation", { length: 255 }).notNull(),
  media: jsonb("media").notNull(),
  // userId: text("userId").references(() => users.id),
  ...timestamps,
});
