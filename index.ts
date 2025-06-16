import express from "express";
import { PORT } from "./src/startup/config";
import { connectToDatabase } from "./src/startup/database";
import { setupRestEndPoint } from "./src/server";

const app = express();
connectToDatabase();
setupRestEndPoint(app);

const NEW_PORT = PORT || 3010

export const server = app.listen(NEW_PORT, () => {
  console.log(`[SERVER]: running to ${NEW_PORT}`);
});
