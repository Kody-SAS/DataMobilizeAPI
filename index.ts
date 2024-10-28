import express from "express";
import { PORT } from "./src/startup/config";
import { connectToDatabase } from "./src/startup/database";

const app = express();
connectToDatabase();

export const server = app.listen(PORT, () => {
  console.log(`[SERVER]: running to ${PORT}`);
});
