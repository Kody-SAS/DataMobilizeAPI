import { eq } from "drizzle-orm";
import { reports } from "../db/schema/report.schema";
import { Report } from "../dtos/report.dto";
import { db } from "../utils/db";

/**
 * Create a report object in database
 * @param report CreateReportInput - DTO to create Report
 * @returns report
 */
const create = async (report: Report): Promise<Report> => {
  const response = await db.insert(reports).values(report).returning();
  return response.length > 0 ? response[0] : null;
};

/**
 * Gets the first report
 * @param id string - Report id to be provided to fetch the report
 * @returns First matching report
 */
const getOne = async (id: string) => {
  const report = await db.select().from(reports).where(eq(reports.id, id));
  return report.length > 0 ? report[0] : null;
};

/**
 * Gets all reports
 * @returns All reports
 */
const getAll = async () => {
  return await db.select().from(reports);
};

/**
 * Deletes report
 * @param id string - provided report'id to be used
 */
const deleteReport = async (id: string) => {
  await db.delete(reports).where(eq(reports.id, id));
};

const updateReport = async (id: string, report: Report): Promise<Report> => {
  const response = await db
    .update(reports)
    .set(report)
    .where(eq(reports.id, id))
    .returning();
  return response.length > 0 ? response[0] : null;
};

export default { create, getOne, getAll, deleteReport, updateReport };
