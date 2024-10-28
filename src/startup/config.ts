import { config } from "dotenv";

config();

export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const PORT = process.env.PORT;
