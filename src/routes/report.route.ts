import { Router } from "express";
import reportController from "../controllers/report.controller";

export const ReportRoute = () => {
  const router = Router();
  const prefix: string = "/reports";
  router.get(`${prefix}/:id`, reportController.findOne);
  router.get(`${prefix}`, reportController.findAll);
  router.post(`${prefix}`, reportController.create);
  router.delete(`${prefix}/:id`, reportController.deleteOne);
  router.put(`${prefix}/:id`, reportController.updateOne);
  return router;
};
