import { Router } from "express";
import incidentController from "../controllers/incident.controller";

export const IncidentRoute = () => {
  const router = Router();
  const prefix: string = "/incidents";
  router.get(`${prefix}`, incidentController.findAll);
  router.get(`${prefix}/:id`, incidentController.findOne);
  router.post(`${prefix}`, incidentController.create);
  router.delete(`${prefix}/:id`, incidentController.deleteOne);
  router.put(`${prefix}/:id`, incidentController.updateOne);
  return router;
};
