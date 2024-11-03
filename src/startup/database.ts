import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./utils/db";

export const connectToDatabase = async () => {
  try {
    pool.on("connect", () => {
      console.log(`[PostgreSQL]: connected`);
    });
    pool.on("error", () => {
      console.log(`[PostgreSQL]: error`);
    });
    const client = await pool.connect();
    client.release();
    return drizzle(pool);
  } catch (error) {
    throw new Error(`Failed to connect to the database: ${error.message}`);
  }
};
