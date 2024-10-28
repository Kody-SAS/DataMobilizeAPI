import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { PORT, POSTGRES_PASSWORD, POSTGRES_USER } from "./config";

export const connectToDatabase = async () => {
  try {
    const pool = new pg.Pool({
      connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${PORT}/asam`,
    });
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
