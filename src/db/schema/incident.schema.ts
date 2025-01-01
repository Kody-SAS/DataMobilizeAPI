import { pgTable, text } from "drizzle-orm/pg-core";
import { v7 as uuid } from "uuid";
import { reports } from "./report.schema";

export const incidents = pgTable("incidents", {
  id: text("id")
    .$defaultFn(() => uuid())
    .primaryKey()
    .notNull()
    .unique(),
  incidentType: text("incident_type"),
  severity: text("severity"),
  responderType: text("responder_type"),
  description: text("description"),
  reportId: text("report_id").references(() => reports.id),
});
