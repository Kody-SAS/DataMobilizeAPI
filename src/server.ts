import express, { Application } from "express";
import { UserRoute } from "./routes/user.route";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./swagger.json";

export const setupRestEndPoint = (app: Application) => {
  app.use(express.json());
  app.use("/", UserRoute());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
