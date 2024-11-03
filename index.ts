import express from "express";
import { PORT } from "./src/startup/config";
import { connectToDatabase } from "./src/startup/database";
import { setupRestEndPoint } from "./src/server";

const app = express();
connectToDatabase();
setupRestEndPoint(app);

export const server = app.listen(PORT, () => {
  console.log(`[SERVER]: running to ${PORT}`);
});
