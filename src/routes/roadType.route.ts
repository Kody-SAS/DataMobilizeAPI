import { Router } from "express";
import roadTypeController from "../controllers/roadType.controller";

export const RoadTypeRoute = () => {
  const router = Router();
  const prefix: string = "/road-types";
  router.get(`${prefix}`, roadTypeController.findAll);
  router.get(`${prefix}/:id`, roadTypeController.findOne);
  router.post(`${prefix}`, roadTypeController.create);
  router.delete(`${prefix}/:id`, roadTypeController.deleteOne);
  router.put(`${prefix}/:id`, roadTypeController.updateOne);
  return router;
};
