import { eq } from "drizzle-orm";
import { incidents } from "../db/schema/incident.schema";
import { Incident } from "../dtos/incident.dto";
import { db } from "../utils/db";

const create = async (incident: Incident): Promise<Incident> => {
  const resp = await db.insert(incidents).values(incident).returning();
  return resp.length > 0 ? resp[0] : null;
};

const getAll = async (): Promise<Incident[]> => {
  return db.select().from(incidents);
};

const getOne = async (id: string): Promise<Incident> => {
  const resp = await db.select().from(incidents).where(eq(incidents.id, id));
  return resp.length > 0 ? resp[0] : null;
};

const deleteOne = async (id: string): Promise<void> => {
  await db.delete(incidents).where(eq(incidents.id, id));
};

const updateOne = async (id: string, incident: Incident) => {
  const resp = db
    .update(incidents)
    .set(incident)
    .where(eq(incidents.id, id))
    .returning();
  return (await resp).length > 0 ? resp[0] : null;
};
