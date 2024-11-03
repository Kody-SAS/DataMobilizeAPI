import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  DATABASE,
  HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "../config";

export const pool = new pg.Pool({
  connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${HOST}:${POSTGRES_PORT}/${DATABASE}`,
});

export const db = drizzle(pool);
