import { roads } from "../db/schema/roadType.schema";
import { eq } from "drizzle-orm";
import { Road } from "../dtos/roadType.type";
import { db } from "../utils/db";

/**
 * Creates a new road
 * @param road - Road data to create
 * @returns Created road object or null if creation failed
 */
const create = async (road: Road): Promise<Road | null> => {
  const response = await db.insert(roads).values(road).returning();
  return response.length > 0 ? response[0] : null;
};

/**
 * Retrieves all roads
 * @returns List of all roads
 */
const getAll = async (): Promise<Road[]> => {
  return await db.select().from(roads);
};

/**
 * Retrieves a single road by ID
 * @param id - Road ID
 * @returns Road object or null if not found
 */
const getOne = async (id: string): Promise<Road | null> => {
  const response = await db.select().from(roads).where(eq(roads.id, id));
  return response.length > 0 ? response[0] : null;
};

/**
 * Deletes a road by ID
 * @param id - Road ID
 */
const deleteOne = async (id: string): Promise<void> => {
  await db.delete(roads).where(eq(roads.id, id));
};

/**
 * Updates an existing road and returns the updated road
 * @param id - Road ID
 * @param road - Road data to update
 * @returns Updated road object or null if not found
 */
const updateOne = async (id: string, road: Road): Promise<Road | null> => {
  const response = await db
    .update(roads)
    .set(road)
    .where(eq(roads.id, id))
    .returning();
  return response.length > 0 ? response[0] : null;
};

export default { create, deleteOne, updateOne, getAll, getOne };
