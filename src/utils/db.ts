import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  DATABASE,
  HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "../startup/config";

console.log("Environment: ", process.env.NODE_ENV);

export const pool = new pg.Pool({
  host: HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: DATABASE,
  port: parseInt(POSTGRES_PORT) || 5432,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: false,
  }
});

export const db = drizzle(pool);
