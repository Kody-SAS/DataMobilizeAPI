import { config } from "dotenv";

config();

// database
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const PORT = process.env.PORT;
export const DATABASE = process.env.DATABASE;
export const HOST = process.env.HOST;


// email client
export const EMAIL_API_KEY = process.env.BREVO_API_KEY;

// kody
export const KODY_NOREPLY_EMAIL = process.env.KODY_NOREPLY_EMAIL;