import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import {
  DATABASE,
  DATABASE_URL,
  HOST,
  PORT,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "./src/startup/config";

const isProduction = process.env.NODE_ENV == 'production' ? true : false;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: isProduction ? DATABASE_URL : `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${HOST}:${POSTGRES_PORT}/${DATABASE}`,
  },
  migrations: {
    table: "my-migrations-table", 
    schema: "public", 
  },
});
